---
title: "How I Figured Out How to Hide the Cursor on Disney+ Movies and Shows"
description: "A technical deep dive into how I hid the cursor on Disney+, navigating Shadow DOMs, high z-index layers, and synthetic events."
date: "2026-09-19 12:00:00"
tag: "engineering"
featuredImage: ./images/how-to-hide-cursor-on-disney-plus.png
draft: false
---

> [!NOTE]
> **Quick Jump:** This is a technical blog, but I understand you might be looking for a quick solution for your Disney Plus cursor problem. **[Click here to jump straight to the solution for non-technical folks.](#the-quick-solution-for-non-technical-folks)**

## The Problem: Why is Disney+ Different from YouTube?

If you've ever tried to hide the mouse cursor on YouTube, you know it’s usually pretty straightforward. I can just write a basic browser extension with a simple CSS rule like `body { cursor: none !important; }`, and boom, the cursor vanishes.

But Disney+? They use a highly complex, modern web architecture that completely breaks these simple solutions.

While trying to figure this out, I kept seeing Reddit threads where people suggested workarounds. One person claimed:

> _"Where do you have the cursor located when you try to get the mouse cursor to disappear? I placed the cursor on the bottom where the media control bar is and the cursor always vanishes but if you try the sides or the top they don't."_

I tested this exact trick on macOS using both Chrome and Firefox, and it never worked for me. The cursor just stubbornly sat there on the screen. As for the Disney+ native desktop app—sadly, there isn't much we can do there. I really hope Disney just builds a native solution for it eventually. But for the web version, I decided to dig into the technical reasons behind why it was so hard to hide the cursor, and I ended up building my own robust solution: the **[Vanish (hide-cursor-on-playback)](https://github.com/mateustav/hide-cursor-on-playback)** extension.

Here is a deep dive into the technical hurdles I ran into with the Disney+ player, and how I overcame them.

---

## 1. Web Components & Shadow DOM Encapsulation

When I started poking around in the browser dev tools, I found that Disney+ uses modern custom Web Components for its video player. Specifically, I noticed elements like:

- `<pointer-actions>`
- `<disney-web-player>`
- `<draggable-surface>`

When you try to apply basic CSS like `body { cursor: none !important; }`, standard CSS selectors just stop dead at the Shadow DOM boundary.

During my live inspection of an active Disney+ tab, I confirmed that elements inside the `<pointer-actions>`'s `shadowRoot` still computed their cursor as `cursor: auto`. Because of how Shadow DOMs work, style rules applied to the `body` or `html` simply don't cascade down into open or closed shadow trees.

To break through this boundary cleanly with CSS, I did two things in my extension:

### CSS `::part()` Rules

I used rules like `pointer-actions::part(pointer-mask-root)` to reach into internal shadow parts directly from the global stylesheet:

```css
/* Reaching into internal shadow parts directly from stylesheet */
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root),
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root) *,
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root) path {
  cursor: none !important;
}
```

### Dynamic Style Injection

I wrote a `processShadowRoots` function in TypeScript that dynamically queries the custom Web Components and injects explicit `<style>` tags directly into their shadow roots whenever playback is active:

```typescript
/**
 * Lightweight targeted Shadow Root processor.
 * Only queries known custom Web Components (e.g. <pointer-actions>).
 */
export function processShadowRoots(
  root: ParentNode = document,
  hide: boolean = false
): void {
  try {
    const customElements = root.querySelectorAll(
      'pointer-actions, pivot-tray-overlay, [part*="pointer"]'
    )
    customElements.forEach((el) => {
      if (el.shadowRoot) {
        let shadowStyle = el.shadowRoot.getElementById(SHADOW_STYLE_ID)
        if (hide) {
          if (!shadowStyle) {
            shadowStyle = document.createElement("style")
            shadowStyle.id = SHADOW_STYLE_ID
            shadowStyle.textContent = `
              * { cursor: none !important; }
              path, svg, div, button, a, [part*="pointer"] { cursor: none !important; }
            `
            el.shadowRoot.appendChild(shadowStyle)
          }
        } else {
          if (shadowStyle && shadowStyle.parentNode) {
            shadowStyle.parentNode.removeChild(shadowStyle)
          }
        }
      }
    })
  } catch {}
}
```

---

## 2. Floating High Z-Index Interaction Layers

Another hurdle I noticed when inspecting the Disney+ rendering stack is that the actual `<video>` element is buried something like 15+ layers deep. Disney+ places top-level transparent gesture surfaces (like `<pointer-actions>` and `<draggable-surface>`) on top of the video to handle all user interactions.

Instead of trying to monkey-patch Disney's complicated player DOM or alter player state via JavaScript—which would likely break the next time they update their site—I took a simpler, more resilient approach:

I created a full-screen, click-through overlay with maximum `z-index` (`2147483647`) set to `cursor: none !important; pointer-events: none !important`.

```css
/* Transparent overlay covering the entire viewport */
#ach-cursor-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 2147483647 !important;
  background: transparent !important;
  pointer-events: none !important;
  cursor: none !important;
  display: none;
}

#ach-cursor-overlay.active {
  display: block !important;
}
```

Because `pointer-events: none` is applied, this layer allows all normal click-through play, pause, and scrubber gestures to pass straight through. Meanwhile, it guarantees that moving your mouse over any part of the screen won't render a pointer.

---

## 3. Synthetic Event Avoidance (event.isTrusted)

The last major hurdle I ran into was that the Disney+ player script constantly fires off internal, synthetic `pointermove` and `mousemove` events to update its own UI timers.

My first naive attempt listened to `mousemove` events and immediately un-hid the cursor, assuming the user moved the mouse. This caused an endless loop: Disney's own player fired a fake event, waking the cursor back up, preventing it from ever vanishing.

I solved this by checking `event.isTrusted === false` inside `handleUserActivity`. This easily identifies and ignores Disney's synthetic events, ensuring the cursor stays hidden until a real physical movement occurs:

```typescript
public handleUserActivity(event?: MouseEvent | Event): void {
  // 1. Ignore synthetic events generated by internal player scripts
  if (event && (event as any).isTrusted === false) {
    return;
  }

  // 2. Filter out duplicate mouse coordinates
  if (event && (event.type === "mousemove" || event.type === "pointermove")) {
    const mouseEv = event as MouseEvent;
    if (
      mouseEv.clientX === this.lastMouseX &&
      mouseEv.clientY === this.lastMouseY
    ) {
      return;
    }
    this.lastMouseX = mouseEv.clientX;
    this.lastMouseY = mouseEv.clientY;
  }

  // Real physical user activity: restore pointer and reset idle countdown
  this.showCursor();
  this.restartTimer();
}
```

---

## Summary

In the end, combining targeted CSS injection with Shadow DOM handling turned out to be the most performant and resilient path. It completely avoids monkey-patching internal Disney+ player JavaScript or private media APIs, which are notoriously fragile and break across site updates.

By injecting pure CSS properties like `cursor: none !important` into both the root DOM and shadow trees, you get instantaneous, zero-latency hiding across the entire player.

---

<a id="the-quick-solution-for-non-technical-folks"></a>

## The Quick Solution for Non-Technical Folks

If you came here from Reddit or a Google search just looking for a way to hide that annoying cursor while watching Disney+, you're in the right place!

**How it works:**
You just need to install my browser extension. Once installed, it runs silently in the background. When you start watching a movie or show on Disney+ (or YouTube and other supported platforms), the extension waits for you to stop moving your mouse. After a brief moment of inactivity, it completely hides the cursor from the screen. If you need to pause or change the volume, just move your mouse, and the cursor instantly reappears.

### Download Links:

- 🌐 **[Download for Google Chrome](https://chromewebstore.google.com/detail/ajoijgcmnbajmenieiiogkmgceeagoam?utm_source=mattavares.com&utm_medium=blog&utm_campaign=how-to-hide-cursor-on-disney-plus)**
- 🦊 **[Download for Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/vanish-auto-pointer-hider/?utm_source=mattavares.com&utm_medium=blog&utm_campaign=how-to-hide-cursor-on-disney-plus)**
- 💻 **[View Source on GitHub](https://github.com/mateustav/hide-cursor-on-playback)**

_(While this works in your browser on macOS, Windows, and Linux, note that if you are using the Disney+ native desktop app, browser extensions cannot modify it. Like I mentioned earlier, I'm hoping Disney adds native cursor hiding to their app soon!)_
