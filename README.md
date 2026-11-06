# Interview Preparation Board

An interactive, responsive Interview Preparation Board built with **React 18**, **Vite**, **Tailwind CSS**, and rigorously tested with **Vitest** and **React Testing Library**.

## Features

- **Progress Dashboard**: Dynamic progress bar calculating completion percentage, live count of completed/pending/total topics, and celebratory milestone badge.
- **Add Topic Form**: Controlled form with validation preventing empty inputs, category selection (`Aptitude`, `Coding`, `HR`, `Technical`), and automatic reset upon submission.
- **Category & Status Filtering**: Instant multi-dimensional filtering by Category (`All`, `Coding`, `Aptitude`, `HR`, `Technical`) and Status (`All`, `Pending`, `Completed`) with badge counters.
- **Topic Management**: Interactive cards with category badges, completion toggle (with strikethrough & badge), and topic deletion.
- **Clean Architecture & TDD**: Built following Test-Driven Development (TDD) with modular, single-responsibility components and 100% passing tests.

## Tech Stack

- **Framework**: React 18
- **Bundler & Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + @testing-library/jest-dom + @testing-library/user-event

## Component Architecture

```
src/
├── components/
│   ├── AddTopicForm.jsx          # Controlled form for adding topics with validation
│   ├── FilterPanel.jsx           # Category & completion status filter controls
│   ├── ProgressDashboard.jsx     # Visual progress bar & summary counters
│   ├── TopicCard.jsx             # Individual topic item with completion & delete actions
│   ├── TopicList.jsx             # Renders filtered topics or empty state
│   └── __tests__/
│       ├── AddTopicForm.test.jsx
│       ├── FilterPanel.test.jsx
│       ├── ProgressDashboard.test.jsx
│       ├── TopicCard.test.jsx
│       └── TopicList.test.jsx
├── __tests__/
│   └── App.test.jsx              # End-to-end integration test
├── App.jsx                       # Main application state & orchestration
├── main.jsx                      # React DOM mounting
├── index.css                     # Tailwind CSS imports & global styles
└── setupTests.js                 # Testing setup (jest-dom matchers)
```

## Running the Application

### 1. Run Tests
```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

