import { Todo, Priority } from '../../types';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  const getHighestPriorityIncomplete = (): Todo | null => {
    const incomplete = todos.filter((todo) => !todo.completed);
    if (incomplete.length === 0) return null;

    const priorityValues: Record<Priority, number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
    return incomplete.reduce((highest, current) =>
      priorityValues[current.priority] > priorityValues[highest.priority]
        ? current
        : highest
    );
  };

  const highestPriorityTodo = getHighestPriorityIncomplete();

  const getPriorityHighlight = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-amber-500';
      case 'Low':
        return 'text-green-600';
      default:
        return '';
    }
  };

  const style = {
    display: 'flex',
    gap: 12,
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6" style={style}>
      <div className="px-4 py-2 bg-gray-100 rounded">Total: {total}</div>
      <div className="px-4 py-2 bg-blue-100 rounded">Active: {active}</div>
      <div className="px-4 py-2 bg-green-100 rounded">
        Completed: {completed}
      </div>
      {highestPriorityTodo && (
        <div className="px-4 py-2 bg-yellow-100 rounded">
          Highest Priority:{' '}
          <span
            className={`font-bold ${getPriorityHighlight(
              highestPriorityTodo.priority
            )}`}
          >
            {highestPriorityTodo.title}
          </span>
        </div>
      )}
    </div>
  );
}
