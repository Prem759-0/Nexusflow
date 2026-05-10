import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here', description = '', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon size={48} className="text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
      {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
    </div>
  );
}
