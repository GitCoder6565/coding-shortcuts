# 🌍 How to Host Your Website for Free

Since your "Antigravity Shortcut Mastery" project is a **static site** (HTML, CSS, JavaScript), you can host it for free on several high-performance platforms.

Here are the two best methods:

---

## 🚀 Method 1: Netlify Drop (Easiest & Fastest)
*Best if you want it live in 30 seconds without installing anything.*

1.  **Prepare your files**:
    *   Make sure all your files (`index.html`, `shortcuts-styles.css`, etc.) are in your project folder: `c:\Users\shame\.gemini\antigravity\playground\spectral-space`.
    *   **Important**: Netlify looks for `index.html`. You currently have `shortcuts-guide.html` and `dashboard.html`.
    *   **Action**: You should rename `shortcuts-guide.html` to `index.html` (or create a copy) so it loads automatically.

2.  **Go to Netlify**:
    *   Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.

3.  **Drag and Drop**:
    *   Drag your entire `spectral-space` folder onto the Netlify page.

4.  **Done!**:
    *   Netlify will upload and give you a live URL (e.g., `random-name.netlify.app`).
    *   You can change the name in "Site Settings".

---

## 🐙 Method 2: GitHub Pages (Best for Long Term)
*Best if you want to save your versions and collaborate.*

1.  **Create a GitHub Account**: Go to [github.com](https://github.com).
2.  **Create a New Repository**: Name it something like `shortcut-mastery`.
3.  **Upload Files**:
    *   You can use the "Upload files" button on the GitHub website to upload your folder contents.
    *   OR use Git commands if you have Git installed:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
        git push -u origin main
        ```
4.  **Enable Pages**:
    *   Go to your Repository **Settings** > **Pages**.
    *   Under "Source", select `main` branch.
    *   Click **Save**.
5.  **Live URL**: Your site will be at `https://your-username.github.io/repo-name/`.

---

## ▲ Method 3: Vercel
*Similar to Netlify, very fast.*

1.  Go to [vercel.com](https://vercel.com) and sign up.
2.  Install Vercel CLI: `npm i -g vercel` (requires Node.js).
3.  Run `vercel` in your project folder.
4.  Follow the prompts.

---

## 💡 Recommendation
Start with **Method 1 (Netlify Drop)** to see it live immediately. Then move to **GitHub Pages** when you want to keep improving it properly.
