# Delivery verification

Verified on September 13, 2026, against the production build served over HTTP in headless Chromium.

## Passed

- Vite production build and formatted source.
- Three project cards; Systems filter returns two and Infrastructure returns one.
- Project detail dialogs open with the corresponding content; Escape and close button dismiss them.
- Common Core list expands to show eleven linked entries and collapses.
- Tic-tac-toe detects a win and disables remaining moves; detects a draw; reset clears the board.
- Contact form rejects empty required fields and malformed email; accepts complete valid input.
- The form produces a native POST containing email, subject and message. The request was intercepted and fulfilled locally; no email was sent.
- No horizontal page overflow at widths of 320, 390, 768, 1024 and 1440 CSS pixels.
- Mobile menu opens and closes after selecting a section.
- Reduced-motion preference disables the decorative floating animation.
- No JavaScript page errors during the interaction checks.
- Desktop and mobile screenshots reviewed; desktop menu-button visibility corrected and web fonts bundled locally.

## Scope and remaining activation

Inbox delivery, the provider's live CAPTCHA, and GitHub Actions deployment were not executed. The site has not been pushed or published. FormSubmit inbox activation and a real delivery check are required after deployment; see README.md. External project URLs were preserved from the repository, except the old placeholder C++ URL, which was replaced with the existing Circle_04 directory. No performance benchmark, cross-browser certification, full accessibility audit, or automated external-link availability claim is made.

## Previews

- `previews/hero.png`: desktop hero.
- `previews/desktop.png`: full desktop page.
- `previews/mobile.png`: full mobile page.
