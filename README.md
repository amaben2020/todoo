Install dependencies

Pull code from repo

bash
npm install
Start development server

bash
npm run dev
Run tests

bash
npm test ✅
Component Structure
Main Components
App (App.tsx)

Root component

Manages global state

Handles filtering/sorting logic

TodoForm (components/TodoForm.tsx)

Form for adding new todos

Includes title input and priority selector

TodoList (components/TodoList.tsx)

Displays list of todos

Handles completion toggle and deletion

TodoStats (components/TodoStats.tsx)

Shows statistics about todos

Highlights highest priority incomplete todo
