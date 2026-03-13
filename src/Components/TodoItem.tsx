import type { Todo } from '../Interfaces';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const containerClass = todo.completed
    ? 'bg-emerald-50 border-emerald-200'
    : 'bg-white border-gray-200 hover:border-emerald-300';
  const titleClass = todo.completed ? 'text-gray-500 line-through' : 'text-gray-900';
  const descClass = todo.completed ? 'text-sm mt-0.5 text-gray-400' : 'text-sm mt-0.5 text-gray-600';

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${containerClass}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
      />
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${titleClass}`}>{todo.title}</h3>
        {todo.description && <p className={descClass}>{todo.description}</p>}
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          title="Düzenle"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Sil"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
