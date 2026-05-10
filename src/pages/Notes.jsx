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
  const [editingNote, setEditingNote] = useState(null);
  const debouncedSearch = useDebounce(search, 200);

  const allTags = useMemo(() => [...new Set(notes.flatMap(n => n.tags))], [notes]);

  const filtered = useMemo(() => {
    let result = notes.filter(n =>
      n.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      n.content.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (filterTag) result = result.filter(n => n.tags.includes(filterTag));
    result.sort((a,b) => {
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
    if (editingNote) {
      updateNote(editingNote.id, data);
      toast.success('Note updated');
    } else {
      addNote(data);
      toast.success('Note created');
    }
    setEditingNote(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={() => setEditingNote({})} leftIcon={<Plus size={16} />}>New Note</Button>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="pl-9 pr-4 py-2 w-full bg-white dark:bg-slate-800 border rounded-xl"
          />
        </div>
        <select value={filterTag} onChange={e => setFilterTag(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-xl">
          <option value="">All tags</option>
          {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-xl">
          <option value="updated">Last updated</option>
          <option value="created">Created</option>
          <option value="title">Title</option>
        </select>
      </div>
      <Modal isOpen={!!editingNote} onClose={() => setEditingNote(null)} title={editingNote?.id ? 'Edit Note' : 'New Note'}>
        <form onSubmit={handleSave} className="space-y-4">
          <input name="title" defaultValue={editingNote?.title} placeholder="Title" required className="w-full p-2 bg-transparent border-b outline-none" />
          <textarea name="content" defaultValue={editingNote?.content} placeholder="Content..." rows={4} className="w-full p-2 bg-transparent border rounded-lg resize-none" />
          <input name="tags" defaultValue={editingNote?.tags?.join(', ')} placeholder="Tags (comma separated)" className="w-full p-2 bg-transparent border rounded-lg" />
          <Button type="submit" className="w-full">{editingNote?.id ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
      {filtered.length === 0 ? (
        <EmptyState title="No notes" description="Create your first note" />
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-5 cursor-pointer hover:shadow-lg transition"
                onClick={() => setEditingNote(note)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold truncate">{note.title}</h3>
                  <div className="flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); togglePin(note.id); }} className={`p-1 ${note.pinned ? 'text-indigo-500' : 'text-gray-400'}`}><Pin size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); toast.success('Note deleted'); }} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{note.content}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
