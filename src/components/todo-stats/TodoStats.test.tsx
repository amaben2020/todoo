import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoStats from './TodoStats';
import { Todo } from '../../types';
import '@testing-library/jest-dom/vitest'; // This fixes the toBeInTheDocument error

describe('TodoStats', () => {
  // Test data
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: 'Learn React',
      completed: false,
      priority: 'High',
      createdAt: '2023-10-05T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'Write tests',
      completed: true,
      priority: 'Medium',
      createdAt: '2023-10-04T10:00:00.000Z',
    },
    {
      id: 3,
      title: 'Deploy app',
      completed: false,
      priority: 'Low',
      createdAt: '2023-10-03T10:00:00.000Z',
    },
  ];

  it('should render the correct total count', () => {
    render(<TodoStats todos={mockTodos} />);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  it('should render the correct active count', () => {
    render(<TodoStats todos={mockTodos} />);
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
  });

  it('should render the correct completed count', () => {
    render(<TodoStats todos={mockTodos} />);
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
  });

  it('should display the highest priority incomplete todo', () => {
    render(<TodoStats todos={mockTodos} />);

    const highestPriorityText = screen.getByText('Highest Priority:');
    expect(highestPriorityText).toBeInTheDocument();

    const todoTitle = screen.getByText('Learn React');
    expect(todoTitle).toBeInTheDocument();
    expect(todoTitle).toHaveClass('text-red-600');
    expect(todoTitle).toHaveClass('font-bold');
  });

  it('should not show highest priority when all todos are completed', () => {
    const completedTodos: Todo[] = mockTodos.map((todo) => ({
      ...todo,
      completed: true,
    }));

    render(<TodoStats todos={completedTodos} />);
    expect(screen.queryByText('Highest Priority:')).not.toBeInTheDocument();
  });

  it('should handle empty todo list', () => {
    render(<TodoStats todos={[]} />);

    expect(screen.getByText('Total: 0')).toBeInTheDocument();
    expect(screen.getByText('Active: 0')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
    expect(screen.queryByText('Highest Priority:')).not.toBeInTheDocument();
  });
});
