export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    
    // Honeypot check (anti-spam)
    const botField = formData.get('bot_field');
    if (botField !== null && botField !== '') {
      // If the honeypot field is filled out, it's likely a bot.
      // We return a success response to trick the bot into thinking it succeeded.
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields.' }), {
        status: 400,
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
      const errorData = await resendResponse.json();
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
