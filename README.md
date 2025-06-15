# React JSONPlaceholder App

This project is a modern full-stack web application built with **React**, **Redux Toolkit**, **RTK Query**, **Vite**, and **Ant Design** on the frontend, and an **Express.js** server on the backend. It demonstrates fetching, displaying, and manipulating data from a mock REST API (JSONPlaceholder), with state persisted locally.

---

## ✨ Features

- 🔁 **Redux Toolkit** for state management
- 🔥 **RTK Query** for efficient data fetching and caching
- 🧪 **React Testing Library** and **Vitest** for unit and integration testing
- 📦 **MSW (Mock Service Worker)** for API mocking during tests
- 🎨 **Ant Design** for a polished UI/UX
- ⚡ **Vite** as the build tool for fast development
- 🚀 **Express.js** API boilerplate ready to replace external API

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Redux Toolkit + RTK Query
- Vite
- Ant Design
- React Router
- TypeScript

**Testing**
- React Testing Library
- Vitest
- MSW
- ExpressJS

**Backend**
- Node.js with Express.js (boilerplate, replace JSONPlaceholder). A repo for testing the App could be found [here](https://github.com/venzovisa/jsonplaceholder) that could provide a way to perform a CRUD operations.

---

## 📁 Project Structure
```bs
├── src/
│ ├── __tests__/ # Unit tests
│ ├── api/ # RTK Query slice and endpoints
│ ├── components/ # Reusable UI components
│ ├── store/ # Redux slices, setup, persist
│ ├── App.tsx # App component wrapper
│ ├── MainContent.tsx # Routes component wrapper
│ ├── hooks/ # Custom hooks
│ ├── models.ts # Global types
│ ├── index.css # Global styles
| ├── mocks/ # MSW for mocking API
| ├── setupTest.ts # Store setup for testing
| ├── mocks/ # MSW for mocking API
│ └── main.tsx # Root component with providers
├── vite.config.ts # Vite configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm / npm / yarn

### Installation

```js
git clone https://github.com/venzovisa/react-jsonplaceholder
cd react-jsonplaceholder
npm install
npm run dev
```

### Run Express Backend (Optional)
```js
git clone https://github.com/venzovisa/jsonplaceholder
cd jsonplaceholder
npm install
npm start
```
* Note: You should update .env file with URl of the server. Default is http://localhost:5000. Otherwise the client will use [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) as domain.

### Testing

```js
npm run test
```

