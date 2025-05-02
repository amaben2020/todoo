export type Priority = 'Low' | 'Medium' | 'High';
export type StatusFilter = 'all' | 'active' | 'completed';
export type SortBy = 'createdAt' | 'priority';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}
