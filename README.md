# 🎯 Interview Preparation Board

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-27_Tests_Passed-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Testing Library](https://img.shields.io/badge/Testing_Library-RTL-E33332?logo=testing-library&logoColor=white)](https://testing-library.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, responsive **Interview Preparation Tracker** engineered in React 18, Vite, and Tailwind CSS. Built strictly adhering to **Test-Driven Development (TDD)** with 100% test coverage across component state, nested accordion sub-tasks, derived auto-completion logic, and multi-criteria filters.

---

## ✨ Features & Engineering Highlights

- **🗂️ Nested Sub-tasks with Collapsible Accordion**:
  - Each topic functions as an expandable card revealing a checklist of granular sub-tasks.
  - Inline input to quickly add new sub-tasks to any specific topic.
  - Individual sub-task progress counter (e.g. `2/4 Sub-tasks Done`).

- **⚡ Automatic Completion Logic (Derived State & `useEffect`)**:
  - Parent topics automatically mark themselves as **Completed** if and only if **100%** of their sub-tasks are checked off.
  - Unchecking any sub-task or adding a new pending sub-task instantly reverts the parent topic back to **Pending**.

- **📊 Dynamic Progress Dashboard**:
  - Real-time animated progress bar showing overall syllabus completion percentage.
  - Metric summary cards: Total Topics, Completed, Pending, and milestone achievement badge.

- **🔍 Multi-Dimensional Filtering**:
  - Filter by **Category**: `All`, `Coding`, `Aptitude`, `HR`, and `Technical`.
  - Filter by **Status**: `All`, `Pending`, and `Completed`.
  - Dynamic count badges on every filter button reflecting active topic distributions.

- **🛡️ Strict Test-Driven Development (TDD)**:
  - 27 unit and end-to-end integration tests written with **Vitest** and **React Testing Library**.
  - Accessible ARIA attributes throughout (`role="progressbar"`, `role="checkbox"`, `aria-expanded`).

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Hooks) |
| **Build & Dev Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 with custom Plus Jakarta Sans typography |
| **Icons** | Lucide React |
| **Unit & Integration Testing** | Vitest + React Testing Library + `@testing-library/jest-dom` + `@testing-library/user-event` |
| **CI/CD** | GitHub Actions (`.github/workflows/deploy.yml`) |

---

## 📂 Project Structure

```
interview-prep-board/
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── components/
│   │   ├── AddTopicForm.jsx     # Controlled form with validation & category select
│   │   ├── FilterPanel.jsx      # Multi-criteria Category & Status filter pills
│   │   ├── ProgressDashboard.jsx# Real-time progress bar & stats cards
│   │   ├── TopicCard.jsx        # Collapsible accordion item with subtasks & controls
│   │   ├── TopicList.jsx        # Maps topics or presents empty-state fallback
│   │   └── __tests__/
│   │       ├── AddTopicForm.test.jsx
│   │       ├── FilterPanel.test.jsx
│   │       ├── ProgressDashboard.test.jsx
│   │       ├── TopicCard.test.jsx
│   │       └── TopicList.test.jsx
│   ├── __tests__/
│   │   └── App.test.jsx         # Full-app end-to-end integration suite
│   ├── App.jsx                  # Single source of truth & state orchestration
│   ├── main.jsx                 # React root mount
│   ├── index.css                # Tailwind directives & base styles
│   └── setupTests.js            # RTL jest-dom configuration
├── vercel.json                  # Vercel SPA routing configuration
├── netlify.toml                 # Netlify SPA redirect rules
├── tailwind.config.js
└── vite.config.js               # Vite config with Vitest & relative asset paths
```

---

## 🧪 Testing

Every feature and state transition is covered by automated unit and integration tests.

```bash
# Run the complete test suite once
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Suite Summary
```text
 ✓ src/components/__tests__/ProgressDashboard.test.jsx (3 tests)
 ✓ src/components/__tests__/FilterPanel.test.jsx (4 tests)
 ✓ src/components/__tests__/TopicList.test.jsx (3 tests)
 ✓ src/components/__tests__/AddTopicForm.test.jsx (4 tests)
 ✓ src/components/__tests__/TopicCard.test.jsx (7 tests)
 ✓ src/__tests__/App.test.jsx (6 tests)

 Test Files  6 passed (6)
      Tests  27 passed (27)
```

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/interview-prep-board.git
   cd interview-prep-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
