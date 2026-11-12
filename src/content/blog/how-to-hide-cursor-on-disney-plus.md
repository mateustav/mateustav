---
title: "How I Figured Out How to Hide the Cursor on Disney+ Movies and Shows"
description: "A technical guide on how I hid the mouse cursor on Disney+ by handling Shadow DOMs, high z-index layers, and fake mouse events."
date: "2026-09-19 12:00:00"
tag: "engineering"
featuredImage: ./images/how-to-hide-cursor-on-disney-plus.png
draft: false
---

> [!NOTE]
> **Quick Jump:** This is a technical article, but you may just want a fast fix for your Disney+ cursor issue. **[Click here to jump straight to the easy solution for non-technical users.](#the-quick-solution-for-non-technical-folks)**

## The Problem: Why is Disney+ Different from YouTube?

If you have ever tried to hide the mouse cursor on YouTube, you know it is usually very easy. You can write a small browser extension with one simple CSS rule like `body { cursor: none !important; }`, and the cursor disappears right away.

Disney+ is different. It uses a complex, modern web setup that breaks simple CSS fixes.

While looking for answers, I saw many Reddit posts where users suggested tricks. One user wrote:

> _"Where do you have the cursor located when you try to get the mouse cursor to disappear? I placed the cursor on the bottom where the media control bar is and the cursor always vanishes but if you try the sides or the top they don't."_

I tested this exact trick on macOS in both Chrome and Firefox, and it did not work for me. The cursor just stayed on the screen. The problem is even harder on the Disney+ native desktop app. Sadly, there is not much we can do there. I hope Disney adds a built-in cursor-hiding feature to the app one day.

For the web version, however, I decided to study why the cursor would not hide. In the end, I built my own reliable tool to fix it: the **[Vanish (hide-cursor-on-playback)](https://github.com/mateustav/hide-cursor-on-playback)** extension.

Here are the main technical problems I found in the Disney+ player, and how I solved each one.

---

## 1. Web Components & Shadow DOM Encapsulation

When I checked the page in the browser developer tools, I saw that Disney+ builds its video player with custom Web Components. Specifically, I found elements such as:

- `<pointer-actions>`
- `<disney-web-player>`
- `<draggable-surface>`

When you add normal CSS like `body { cursor: none !important; }`, those styles stop at the Shadow DOM boundary.

While inspecting an active Disney+ tab, I saw that elements inside `<pointer-actions>`'s `shadowRoot` still used `cursor: auto`. Because of how Shadow DOM works, CSS rules added to `body` or `html` do not pass down into shadow trees.

To get past this boundary with CSS, I used two methods in my extension:

### CSS `::part()` Rules

I used rules like `pointer-actions::part(pointer-mask-root)` to target internal shadow parts directly from the main stylesheet:

```css
/* Reaching into internal shadow parts directly from stylesheet */
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root),
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root) *,
html.ach-cursor-hidden pointer-actions::part(pointer-mask-root) path {
  cursor: none !important;
}
```

### Dynamic Style Injection

I also wrote a `processShadowRoots` function in TypeScript. It finds the custom Web Components and adds `<style>` tags directly inside their shadow roots while a video is playing:

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

Another problem I found in Disney+'s layout is that the `<video>` element sits deep inside the page, under more than 15 layers. Disney+ puts transparent control layers (such as `<pointer-actions>` and `<draggable-surface>`) on top of the video to handle mouse and touch actions.

I did not want to change Disney's complex player DOM or alter its player state with JavaScript. That kind of code would likely break the next time Disney updates its website. Instead, I took a simpler and more reliable approach.

I created a full-screen, transparent overlay with the highest `z-index` (`2147483647`) and set `cursor: none !important; pointer-events: none !important;`.

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

Because `pointer-events: none` is set, your clicks and mouse actions still go straight through to the player. You can pause, play, and use the progress bar normally. At the same time, moving your mouse anywhere on the screen will not show a cursor.

---

## 3. Ignoring Fake Mouse Events (`event.isTrusted`)

The last big problem was that Disney+'s player script keeps sending its own internal, fake `pointermove` and `mousemove` events to update its UI timers.

In my first simple attempt, my code listened for `mousemove` events and showed the cursor right away, thinking the user had moved the mouse. This created an endless loop. Disney's own player sent a fake event, which brought the cursor back and stopped it from ever hiding.

I fixed this by checking `event.isTrusted === false` inside `handleUserActivity`. This check detects and ignores Disney's fake (synthetic) events, so the cursor stays hidden until you actually move your physical mouse:

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

In the end, combining targeted CSS injection with Shadow DOM support was the fastest and most reliable solution. It completely avoids changing Disney+'s internal JavaScript or private media APIs, which break easily when a website updates.

By adding pure CSS rules like `cursor: none !important` to both the main page and the shadow trees, the cursor hides right away with no delay.

---

<a id="the-quick-solution-for-non-technical-folks"></a>

## The Quick Solution for Non-Technical Users

If you came here from Reddit or a Google search and just want an easy way to hide the cursor on Disney+, you are in the right place!

**How it works:**
You only need to install my browser extension. After you install it, it runs quietly in the background. When you watch a movie or show on Disney+ (or YouTube and other supported sites), the extension waits until you stop moving your mouse. After a short pause, it hides the cursor from your screen. When you want to pause the video or change the volume, just move your mouse, and the cursor comes back right away.

### Download Links:

- 🌐 **[Download for Google Chrome](https://chromewebstore.google.com/detail/ajoijgcmnbajmenieiiogkmgceeagoam?utm_source=mattavares.com&utm_medium=blog&utm_campaign=how-to-hide-cursor-on-disney-plus)**
- 🦊 **[Download for Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/vanish-auto-pointer-hider/?utm_source=mattavares.com&utm_medium=blog&utm_campaign=how-to-hide-cursor-on-disney-plus)**
- 💻 **[View Source on GitHub](https://github.com/mateustav/hide-cursor-on-playback)**

_(This works in your browser on macOS, Windows, and Linux. However, browser extensions cannot change the Disney+ native desktop app. As I said earlier, I hope Disney adds built-in cursor hiding to their app soon!)_
