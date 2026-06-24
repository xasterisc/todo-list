# Todo List

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack todo app built with React, featuring user authentication,
real-time API sync, and multi-page navigation.

**[Live Demo](https://todo-list-nu-coral.vercel.app/)**

## Screenshots

### **Core Features (Mobile Views)**

![About - iPhone 12 Pro](<src/assets/todo-list-nu-coral.vercel.app_about(iPhone 12 Pro).png>)
![Login View - iPhone 12 Pro](<src/assets/todo-list-nu-coral.vercel.app_login(iPhone 12 Pro).png>)
![Profile - iPhone 12 Pro](<src/assets/todo-list-nu-coral.vercel.app_profile(iPhone 12 Pro).png>)

![Todos List - iPhone SE](<src/assets/todo-list-nu-coral.vercel.app_todos(iPhone SE).png>)
![Add Todo - iPhone SE](<src/assets/todo-list-nu-coral.vercel.app_add_todo(iPhone SE).png>)
![Edit Todo - iPhone XR](<src/assets/todo-list-nu-coral.vercel.app_edit(iPhone XR).png>)

### **Tablet & Smart Display**

![Edit Todo - iPad Air](<src/assets/todo-list-nu-coral.vercel.app_edit(iPad Air).png>)

### **Error Handling & Edge Cases**

![Character Limit - iPad Mini](<src/assets/todo-list-nu-coral.vercel.app_limit(iPad Mini).png>)
![Update Todo - Nest Hub Max](<src/assets/lotodo-list-nu-coral.vercel.app_update(Nest Hub Max).png>)
![Fetch Error - Samsung Galaxy S20 Ultra](<src/assets/localhost_fetch(Samsung Galaxy S20 Ultra).png>)
![Filter Error - iPhone 14 Pro Max](<src/assets/localhost_filter(iPhone 14 Pro Max).png>)
![404 Error Route - iPhone XR](<src/assets/localhost_404(iPhone XR).png>)

## Features

- Add, edit, and complete todos
- User authentication
- Sort and filter todos
- Deployed on Vercel

## Tech Stack

React · Vite · React Router · React Context - CSS modules

## Getting Started

### Clone the Repository

```bash
git clone <your-repo-url>
cd todo-list
```

### Start Development Server

```bash
npm install && npm run dev
```

## Development Story

**What I Learned:**
This process deepened my understanding of React's render lifecycle. I learned how to properly memoize context values using `useMemo` and `useCallback` to prevent unnecessary re-renders across the app, ensuring the UI remains fast and responsive even when sorting or filtering large lists of todos.

## Future Improvements

- **Drag-and-Drop Functionality:** Implement `react-beautiful-dnd` to allow users to manually reorder their tasks.
- **Due Dates & Notifications:** Allow users to set deadlines for tasks and receive browser notifications when a task is nearing its due date.

## Code Quality and Standards

This project uses **ESLint** and **Prettier** to enforce code consistency.

- **Workspace Settings:** Configured for **Format on Save** in VS Code.
- **Formatting:** Single quotes, semi-colons, and 2-space tabs.
- **Linting Rules:** Prettier violations are treated as errors. Unused variables are permitted only if they begin with a capital letter (e.g., `const MyVariable`).

**Manual Lint Fix:**

```bash
npx eslint . --fix
```

## Contact

**Mohamed Zouari** - business [at] zouari [dot] org

- **LinkedIn:** [Mohamed Zouari](www.linkedin.com/in/dr-mohamed-zouari)
- **GitHub:** [@xasterisc](https://github.com/xasterisc)
- **Project Link:** [https://github.com/xasterisc/todo-list](https://github.com/xasterisc/todo-list)

## License

Distributed under the MIT License. See **[LICENSE](LICENSE)** for more information.
