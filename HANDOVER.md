# Pal Wabuson Website Handover

## Live Site

- Primary domain: https://palwabuson.com
- WWW domain: https://www.palwabuson.com
- Vercel project: `pal-wabuson-website`
- Vercel production alias: https://pal-wabuson-website.vercel.app

## Source Code

- GitHub repo: https://github.com/Palwabuson100/pal-wabuson-website
- Main branch: `main`
- Local folder: `/Users/bon/openspace\ app/my website`

## Hosting

The website is hosted on Vercel as a static site. There is no build framework.

- Build command: none
- Output directory: `.`
- Main files: `index.html`, `styles.css`, `script.js`
- Media assets: `assets/`

## DNS

The domain is attached to Vercel.

Required DNS records:

```txt
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

An `A` record for `www` pointing to `76.76.21.21` also works, but the CNAME is preferred.

## Recent Notes

- Large local video files were compressed before pushing so GitHub and Vercel deployment remain reliable.
- GitHub Pages was disabled; the live website is on Vercel.
- The footer marquee was fixed so `Still Building.` displays fully.
- The hero video includes a loading indicator and sound behavior that mutes when the hero scrolls out of view, then restores sound when the visitor returns after choosing Sound On.

## Deployment

To deploy after changes:

```bash
git add .
git commit -m "Describe the change"
git push
vercel --prod --yes
```

## Local Preview

From the project folder:

```bash
python3 -m http.server 4173
```

Then open:

```txt
http://127.0.0.1:4173/
```
