# Gaya Shorthand Classes (ShorthandPlus)

A modern, comprehensive web platform for stenography and typing exam preparation, tailored for SSC Stenographer (Grade C & D), Patna High Court, Civil Courts, and state skill tests.

---

## 📋 Prerequisites (What You Need to Install)

Before running this project, ensure you have the following installed on your computer:

1. **Node.js** (v18.0.0 or higher recommended)
   - Download & install from [nodejs.org](https://nodejs.org/)
   - Verify installation in your terminal:
     ```bash
     node -v
     ```
2. **npm** (Node Package Manager - comes automatically with Node.js)
   - Verify installation:
     ```bash
     npm -v
     ```
3. **Web Browser**
   - Google Chrome, Microsoft Edge, Brave, or Mozilla Firefox.

---

## 🚀 Quick Start Guide

Follow these simple steps to get the project running locally:

### 1. Open Project Folder
Open your terminal or command prompt in the project root directory:
```bash
cd /path/to/Ew
```

### 2. Install Project Dependencies
Run the install command to download all required packages:
```bash
npm install
```

### 3. Start the Website (Frontend + Backend Together)
You can run both the frontend and the backend server together with a single command:
```bash
npm run dev:all
```

Alternatively, you can run them in two separate terminal windows:
- **Terminal 1 (Backend API + SQLite Database):**
  ```bash
  npm run server
  ```
- **Terminal 2 (Frontend Web App):**
  ```bash
  npm run dev
  ```

### 4. Open in Your Browser
Open your browser and navigate to:
```
http://localhost:5173
```
- **Frontend URL:** `http://localhost:5173`
- **Backend API & Healthcheck:** `http://localhost:5000/api/health`

---

## 🔑 Pre-Configured Demo Accounts

| Role | Email / ID | Password / PIN | Access Level |
| :--- | :--- | :--- | :--- |
| **Student** | `shadabca@gmail.com` | `shadab12345` | Active 12-Month Pass, full test suite & score history |
| **Faculty Director (Admin)** | `admin@gaya.com` | `8080` (or `admin`) | Candidate roster, course catalog, live class scheduling, CSV results export |

*(You can also click the "Auto-Fill Demo" button in the Login modal to sign in with one click.)*

---

## 🛠️ Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev:all` | **(Recommended)** Runs both the Express backend API and the Vite frontend simultaneously. |
| `npm run dev` | Starts only the Vite frontend dev server on `http://localhost:5173`. |
| `npm run server` | Starts only the Express backend server on `http://localhost:5000`. |
| `npm run build` | Compiles and minifies the production build into the `dist/` directory. |
| `npm run preview` | Runs a local web server to preview the production build. |
| `npm run lint` | Runs Oxlint to check code quality. |

---

## 📦 Installed Packages & Technologies

- **Frontend Core**: [React 19](https://react.dev/) & [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Effects**: `canvas-confetti`
- **Typing Engine**: Support for English, Kruti Dev 010, and Mangal / Inscript fonts
- **Theme**: Imperial Burgundy & Warm Alabaster Design System
