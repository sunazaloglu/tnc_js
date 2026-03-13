import type { Todo } from '../Interfaces';

const STORAGE_KEY = 'todo-app-tasks';

export function getTodos(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
