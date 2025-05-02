import { useState } from 'react';
import { StatusFilter, SortBy, Priority, Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => [
    {
      id: 1,
      title: 'Learn React Hooks',
      completed: false,
      priority: 'High' as Priority,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Complete practice project',
      completed: true,
      priority: 'Medium' as Priority,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [filter, setFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');

  const addTodo = (todo: { title: string; priority: Priority }) => {
    setTodos([
      ...todos,
      {
        ...todo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    return todos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter((todo) => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityValues = { Low: 1, Medium: 2, High: 3 };
          return priorityValues[b.priority] - priorityValues[a.priority];
        }
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as StatusFilter)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value as Priority | 'all')
          }
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
