import { Priority, Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: TodoListProps) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-bold';
      case 'Medium':
        return 'text-amber-500';
      case 'Low':
        return 'text-green-600';
      default:
        return '';
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center p-3 bg-gray-50 rounded-lg ${
            todo.completed ? 'opacity-70' : ''
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5 mr-3"
          />
          <span className={`flex-1 ${getPriorityColor(todo.priority)}`}>
            {todo.title}
          </span>
          <span className="mx-3 text-sm text-gray-500">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="px-3 py-1 text-white transition-colors bg-red-500 rounded hover:bg-red-600 bg-red"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
