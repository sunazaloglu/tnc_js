export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type TodoFormData = Omit<Todo, 'id' | 'createdAt'>;
