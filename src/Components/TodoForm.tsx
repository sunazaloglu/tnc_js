import { useState, type FormEvent } from 'react';
import type { TodoFormData } from '../Interfaces';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  initialData?: Partial<TodoFormData>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function TodoForm({ onSubmit, initialData, submitLabel = 'Ekle', onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [completed, setCompleted] = useState(initialData?.completed ?? false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), completed });
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Başlık
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo başlığı..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Açıklama
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama (isteğe bağlı)..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
        />
        <label htmlFor="completed" className="text-sm text-gray-700">
          Tamamlandı olarak işaretle
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
