import { useState } from 'react';
import { Priority } from '../../types';

interface TodoFormProps {
  addTodo: (todo: { title: string; priority: Priority }) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, priority });
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mb-6 sm:flex-row"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
      >
        Add Todo
      </button>
    </form>
  );
}
