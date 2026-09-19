interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_ADDRESS: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
}

export async function onRequestPost({ request, env }: { request: Request, env: Env }) {
  try {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Origin / Referer check: silently drop automated cross-site POSTs
    const isAllowedSource = (sourceUrl: string | null) => {
      if (!sourceUrl) return true; // Allow if header not sent (e.g. some privacy browsers)
      try {
        const { hostname } = new URL(sourceUrl);
        return (
          hostname === 'mattavares.com' ||
          hostname.endsWith('.mattavares.com') ||
          hostname === 'localhost' ||
          hostname === '127.0.0.1'
        );
      } catch {
        return false;
      }
    };

    if (!isAllowedSource(origin) || !isAllowedSource(referer)) {
      console.warn('Blocked request from unauthorized origin/referer:', { origin, referer });
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formData = await request.formData();

    // 1. Honeypot check (multiple deceptive fields)
    const botField = formData.get('bot_field')?.toString().trim();
    const websiteField = formData.get('website')?.toString().trim();
    const phoneField = formData.get('phone_number')?.toString().trim();

    if (botField || websiteField || phoneField) {
      console.warn('Spam detected via honeypot trap');
      // Return 200 success to trick bots into believing they succeeded
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Time-trap check (bots submit instantaneously)
    const loadTimeStr = formData.get('form_load_time')?.toString();
    if (loadTimeStr) {
      const loadTime = parseInt(loadTimeStr, 10);
      const now = Date.now();
      const elapsed = now - loadTime;

      // Humans take at least 3 seconds (3000ms) to read and fill out a contact form.
      // Flag if < 3s, or timestamp is far in the future (> 5s skew) or older than 24 hours.
      if (isNaN(loadTime) || elapsed < 3000 || elapsed > 86400000 || loadTime > now + 5000) {
        console.warn(`Spam detected: form submitted suspiciously (${elapsed}ms elapsed)`);
        return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 3. Cloudflare Turnstile check (canonical server-side siteverify)
    const turnstileSecret = env.TURNSTILE_SECRET || env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = formData.get('cf-turnstile-response')?.toString();
      const expectedAction = 'contact';
      const expectedHostnames = new Set(
        (env.TURNSTILE_HOSTNAMES ?? 'mattavares.com,localhost,127.0.0.1')
          .split(',')
          .map((h) => h.trim())
          .filter(Boolean)
      );

      if (
        typeof token !== 'string' ||
        token.length === 0 ||
        token.length > 2048 ||
        expectedHostnames.size === 0
      ) {
        return new Response(JSON.stringify({ success: false, message: 'Anti-spam verification required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      let result: any;
      try {
        const clientIp = request.headers.get('CF-Connecting-IP') || '';
        const turnstileVerifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          signal: AbortSignal.timeout(10_000),
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: token,
            ...(clientIp ? { remoteip: clientIp } : {}),
          }),
        });

        if (!turnstileVerifyRes.ok) {
          throw new Error(`siteverify ${turnstileVerifyRes.status}`);
        }
        result = await turnstileVerifyRes.json();
      } catch (err) {
        console.error('Turnstile verification request failed:', err);
        return new Response(JSON.stringify({ success: false, message: 'Anti-spam verification failed.' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (
        !result.success ||
        (result.action && result.action !== expectedAction) ||
        (result.hostname && !expectedHostnames.has(result.hostname))
      ) {
        console.warn('Turnstile verification failed or hostname/action mismatch:', result);
        return new Response(JSON.stringify({ success: false, message: 'Anti-spam verification failed.' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    // Basic required fields validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Input length limits
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return new Response(JSON.stringify({ success: false, message: 'Input exceeds maximum permitted length.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Link stuffing heuristic (messages with > 3 URLs are almost universally spam)
    const linkMatches = message.match(/https?:\/\/|www\./gi) || [];
    if (linkMatches.length > 3) {
      console.warn('Spam detected: message contains excessive links');
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email using Resend (Free Tier: 3,000 emails/month)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'mattavares.com Form <me@mattavares.com>',
        to: env.CONTACT_EMAIL_ADDRESS, // The email address you want to receive messages at
        reply_to: email, // Allows you to hit "Reply" in your email client and reply directly to the sender!
        subject: `New message from ${name} via mattavares.com`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
        `
      })
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json() as any;
      throw new Error(errorData.message || 'Resend API failed');
    }

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Form submission error:', err); // Log the actual error to Cloudflare console for debugging
    return new Response(JSON.stringify({ success: false, message: 'Server error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
