# 🚀 Boilerplate Customization Checklist

Follow this guide to remove the default branding ("Stoxie") and configure this starter kit for your own project.

---

### 1. Project Metadata
- [ ] **package.json**: Update `"name"`, `"description"`, `"author"`, and `"version"`.
- [ ] **app/layout.js**: Update the `metadata` object (title and description) which appears in browser tabs and SEO.

### 2. Branding & Visuals
- [ ] **Logo & Favicon**: 
    - Replace `public/favicon.ico`.
    - Replace `public/logo.svg` (or use your own logo component).
- [ ] **App Name Strings**: Search the entire project for `"Stoxie"` and replace it with your app name. Key files:
    - `components/auth/login-form.jsx`
    - `components/app-sidebar.jsx`
    - `app/forgot-password/page.jsx`
- [ ] **Images**: Replace or remove `public/sign-up.jpg` and `public/bg.jpg`.

### 3. Firebase Configuration
- [ ] **Environment Variables**: Update `.env.local` with your own Firebase Project keys (found in Firebase Console).
- [ ] **Service Account**:
    - Generate a new Service Account JSON from Firebase Console -> Project Settings -> Service Accounts.
    - Minify the JSON to a single line and add it to `FIREBASE_SERVICE_ACCOUNT_KEY` in your environment variables.
- [ ] **Firestore Rules**: Review `firestore.rules` to ensure the collection names and permissions align with your data model.

### 4. User Interface (UI)
- [ ] **Sidebar Navigation**: Modify `components/app-sidebar.jsx` to update the navigation items, icons, and groups.
- [ ] **Main Navigation**: Update `components/nav-main.jsx` and `components/nav-secondary.jsx`.
- [ ] **Colors**: Update primary colors in `app/globals.css` (Tailwind v4 variables like `--primary`).

### 5. Cleaning Up Example Data
- [ ] **Mock Data**: Delete `app/dashboard/data.json` once you start fetching real data.
- [ ] **Example Routes**:
    - If you aren't building a stock/finance app, remove `app/dashboard/stock/` and `app/dashboard/fund/`.
- [ ] **Example Components**: Remove or repurpose `components/component-example.jsx`.

### 6. Deployment (CI/CD)
- [ ] **GitHub Secrets**: If using the provided GitHub Actions (`.github/workflows/ci.yml`), ensure you add the following secrets to your repository:
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`

---

*Tip: Use `Cmd+Shift+F` (or `Ctrl+Shift+F`) in VS Code to find all instances of "Stoxie" or "Next Js With Firebase" to quickly swap titles.*
