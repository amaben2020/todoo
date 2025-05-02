import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';
import { describe, expect, it, vi } from 'vitest';

describe('TodoForm', () => {
  it('calls addTodo with correct input', () => {
    const addTodoMock = vi.fn();
    render(<TodoForm addTodo={addTodoMock} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const select = screen.getByRole('combobox');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.change(select, { target: { value: 'High' } });
    fireEvent.click(button);

    expect(addTodoMock).toHaveBeenCalledWith({
      title: 'New Task',
      priority: 'High',
    });
  });

  it('does not call addTodo for empty input', () => {
    const addTodoMock = vi.fn();
    render(<TodoForm addTodo={addTodoMock} />);
    fireEvent.click(screen.getByText('Add Todo'));
    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
