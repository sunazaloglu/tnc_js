import { useState, useEffect } from 'react';
import type { Todo, TodoFormData } from '../Interfaces';
import { TodoForm, TodoList } from '../Components';
import { getTodos, saveTodos } from '../utils/storage';

function generateId(): string {
  return crypto.randomUUID?.() ?? `todo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = (data: TodoFormData) => {
    const newTodo: Todo = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdate = (data: TodoFormData) => {
    if (!editingTodo) return;
    setTodos((prev) =>
      prev.map((t) =>
        t.id === editingTodo.id
          ? { ...t, ...data }
          : t
      )
    );
    setEditingTodo(null);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (editingTodo?.id === id) setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <p className="text-gray-600 mt-1">Web Geliştirme Projesi</p>
        </header>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingTodo ? 'Todo Düzenle' : 'Yeni Todo Ekle'}
          </h2>
          <TodoForm
            key={editingTodo?.id ?? 'add'}
            onSubmit={editingTodo ? handleUpdate : handleAdd}
            initialData={editingTodo ?? undefined}
            submitLabel={editingTodo ? 'Güncelle' : 'Ekle'}
            onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Todo Listesi</h2>
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}
