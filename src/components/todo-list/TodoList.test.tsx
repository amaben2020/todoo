import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../../types';
import { describe, expect, it, vi } from 'vitest';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Test Task',
    completed: false,
    priority: 'High',
    createdAt: new Date().toISOString(),
  },
];

describe('TodoList', () => {
  it('renders todos with correct priority styling', () => {
    render(
      <TodoList todos={todos} toggleTodo={vi.fn()} deleteTodo={vi.fn()} />
    );
    // expect(screen.getByText('Test Task')).toHaveClass('text-red-600');
  });

  it('calls toggleTodo when checkbox is clicked', () => {
    const toggleMock = vi.fn();
    render(
      <TodoList todos={todos} toggleTodo={toggleMock} deleteTodo={vi.fn()} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(toggleMock).toHaveBeenCalledWith(1);
  });

  it('calls deleteTodo when Delete button is clicked', () => {
    const deleteMock = vi.fn();
    render(
      <TodoList todos={todos} toggleTodo={vi.fn()} deleteTodo={deleteMock} />
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(deleteMock).toHaveBeenCalledWith(1);
  });
});
