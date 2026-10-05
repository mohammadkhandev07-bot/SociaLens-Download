# SociaLens Web (Next.js static export · PWA · Firebase Hosting)

No terminal needed:
1. Upload everything inside this folder (not the folder itself) to the GitHub repo `SociaLens-Download` (branch `main`).
   If the hidden `.github` folder is skipped: GitHub -> Add file -> Create new file -> name `.github/workflows/deploy.yml` -> paste `workflow-deploy.yml`.
2. GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret: name `FIREBASE_SERVICE_ACCOUNT`, value = full JSON key of a Firebase service account (roles: Firebase Hosting Admin + API Keys Viewer).
3. Every push to `main` builds and deploys the site to https://socialens-download.web.app (Actions tab shows progress).

Installers: GitHub Releases (see `public/downloads/README.md`). iPhone: PWA install guide popup (Add to Home Screen).
Support form + newsletter -> email via Web3Forms (`lib/config.js`).
Photos: `public/blog/` (replace a file with the same name to change it). Video: `public/video/bg.mp4`.
