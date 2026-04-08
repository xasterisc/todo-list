# Todo List

A React application developed for the **Intro to React Curriculum V4**.

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-list
```

### 2. Scaffold Project

Initialize the React environment using the Vite CLI:

```bash
npx create-vite@latest . --template react
```

### 3. Install Dependencies

```bash
npm install
```

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

## Code Quality and Standards

This project uses **ESLint** and **Prettier** to enforce code consistency.

- **Workspace Settings:** Configured for **Format on Save** in VS Code.
- **Formatting:** Single quotes, semi-colons, and 2-space tabs.
- **Linting Rules:** Prettier violations are treated as errors. Unused variables are permitted only if they begin with a capital letter (e.g., `const MyVariable`).

**Manual Lint Fix:**

```bash
npx eslint . --fix
```
