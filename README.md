# Oussama El Hassouni — Portfolio

A bespoke React portfolio for a backend developer and systems programmer at 1337 / 42 Network. Designed around project evidence, with an ivory-and-forest palette, custom technical illustrations, responsive layouts, and accessible interactions.

## Start here

The ZIP includes **source code** and a **ready-built `dist/` folder**. No API keys are required. The email form requires one-time inbox activation before receiving messages.

### Local development

Use **Node.js 22.12 or newer** on a supported operating system.

```bash
npm ci
npm run dev
```

Open the URL printed in your terminal. To build and preview production:

```bash
npm run build
npm run preview
```

On macOS Catalina, do not assume modern Node / Vite will run. You can inspect the already-built website without Node:

```bash
python3 -m http.server 8080 --directory dist
```

Then open http://localhost:8080. Do not open `index.html` through `file://`; JavaScript modules require an HTTP server. For source development on an old school iMac, use a supported Linux environment or GitHub Codespaces. GitHub Actions can build and deploy without installing Node locally.

## Deploy to alemdaar.github.io

1. Extract this ZIP and put the project contents at the root of `alemdaar/alemdaar.github.io`. Include `.github/workflows/deploy.yml`, `package-lock.json`, `src/`, and `public/`; hidden files must also be copied. Preserve your repository's `.git` folder. Commit and push to `main`.
2. In GitHub → repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. In **Actions**, run “Deploy portfolio to GitHub Pages” if the initial push happened before changing the Pages setting.
4. Wait for the build and deployment jobs. The website is https://alemdaar.github.io/.

This archive has been prepared locally; it has not been pushed to GitHub or deployed. The workflow builds `dist/` automatically, so committing `dist/` is unnecessary. Root-relative assets are intentional for the `alemdaar.github.io` user site. Hosting under a subdirectory needs a Vite `base` setting and matching asset URLs.

## Activate “Send a message”

GitHub Pages hosts static files and cannot send email on its own. The form posts to **FormSubmit**, addressed to `elhassounioussama2@gmail.com`. It includes your visitor's name, email, subject, and message. Browser validation, a honeypot, and FormSubmit's default CAPTCHA are enabled. The visitor's email is used by the provider for Reply-To.

1. Deploy the site first.
2. Submit one test message from the live contact form.
3. Open the activation email sent to **elhassounioussama2@gmail.com** and confirm the endpoint. Check spam if needed.
4. Submit another message and verify delivery and reply behavior before sharing the portfolio widely.

The site submits through standard HTML POST and continues to the provider's CAPTCHA / result page. It does **not** display a fake “sent” notification. Delivery depends on activation and the external service. If the service is unavailable, visitors can use the direct email link. No live email was sent during automated verification.

The form explains that FormSubmit processes submitted details. No analytics, tracking scripts, cookies, or local storage are added by this application. Fonts are bundled locally; FormSubmit has its own privacy practices. Review the form service if your hosting requirements change.

Official form documentation: https://formsubmit.co/ and https://formsubmit.co/documentation

## Features

- Three flagship projects: Webserv, Inception, Minishell.
- Project category filters and keyboard-accessible native dialog details.
- Personal background, school, technology groups and expandable Common Core list.
- Freere, X-O and in-progress Roya section.
- Local two-player tic-tac-toe with wins, draws and restart. This React demo is separate from the linked C game; it does not claim to implement its AI.
- Contact form, copy-email action, email/phone/GitHub/LinkedIn links.
- Responsive navigation, skip link, visible focus, reduced-motion support.
- Page metadata, social image, favicon, sitemap and robots file.
- GitHub Pages build-and-deploy workflow.

## Edit the content

| File                           | Purpose                                                                 |
| ------------------------------ | ----------------------------------------------------------------------- |
| `src/data.js`                  | Identity, links, featured projects, implementation notes and curriculum |
| `src/main.jsx`                 | React sections, navigation, project modal, contact form and game        |
| `src/styles.css`               | Design tokens, illustrations, typography, breakpoints and motion        |
| `public/oelhasso.jpg`          | Optimized portrait from the original repository                         |
| `public/social-card.png`       | Link-sharing image                                                      |
| `index.html`                   | SEO metadata and canonical URL                                          |
| `.github/workflows/deploy.yml` | GitHub Pages deployment                                                 |

The source repository was the authority for project descriptions. Java and Spring Boot are described as developing skills; no employment history, fabricated metrics, testimonials or unverified degree claims were added. The old placeholder C++ link now points to the existing Circle_04 directory. Availability is editable in the hero. The curriculum labels `ft_transcendence` as in progress.

## Quality checks

See `VERIFICATION.md` for the checks performed on this delivery. Fonts are bundled locally with system-font fallbacks. This is a client-rendered React website; the noscript message provides a direct contact route.
