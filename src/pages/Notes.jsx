import { useState, useMemo } from 'react';
import { Plus, Pin, Trash2, Search } from 'lucide-react';
import useNoteStore from '../stores/useNoteStore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';

export default function Notes() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNoteStore();
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [editingNoteId, setEditingNoteId] = useState(null); // <-- null = new, string = editing
  const debouncedSearch = useDebounce(search, 200);

  const allTags = useMemo(() => [...new Set(notes.flatMap(n => n.tags))], [notes]);

  const filtered = useMemo(() => {
    let result = notes.filter(n =>
      n.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      n.content.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (filterTag) result = result.filter(n => n.tags.includes(filterTag));
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return result;
  }, [notes, debouncedSearch, filterTag, sortBy]);

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      title: form.title.value,
      content: form.content.value,
      tags: form.tags.value.split(',').map(t => t.trim()).filter(Boolean),
    };

    if (editingNoteId) {
      updateNote(editingNoteId, data);
      toast.success('Note updated');
    } else {
      addNote(data);
      toast.success('Note created');
    }
    setEditingNoteId(null);
    form.reset();
  };

  const noteToEdit = editingNoteId ? notes.find(n => n.id === editingNoteId) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={() => setEditingNoteId(null)} leftIcon={<Plus size={16} />}>
          New Note
        </Button>
      </div>
      {/* filters same as before */}
      <Modal
        isOpen={editingNoteId !== undefined}
        onClose={() => setEditingNoteId(undefined)}
        title={noteToEdit ? 'Edit Note' : 'New Note'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <input
            name="title"
            defaultValue={noteToEdit?.title}
            placeholder="Title"
            required
            className="w-full p-2 bg-transparent border-b outline-none"
          />
          <textarea
            name="content"
            defaultValue={noteToEdit?.content}
            placeholder="Content..."
            rows={4}
            className="w-full p-2 bg-transparent border rounded-lg resize-none"
          />
          <input
            name="tags"
            defaultValue={noteToEdit?.tags?.join(', ')}
            placeholder="Tags (comma separated)"
            className="w-full p-2 bg-transparent border rounded-lg"
          />
          <Button type="submit" className="w-full">
            {noteToEdit ? 'Update' : 'Create'}
          </Button>
        </form>
      </Modal>
      {/* ... grid of notes ... */}
    </div>
  );
}
