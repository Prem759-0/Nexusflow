import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import useSettingsStore from './stores/useSettingsStore';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Notes = lazy(() => import('./pages/Notes'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Kanban = lazy(() => import('./pages/Kanban'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Focus = lazy(() => import('./pages/Focus'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
  const navigate = useNavigate();
  useKeyboardShortcuts([
    { key: 'k', ctrl: true, action: () => document.querySelector('button')?.click() }, // command palette already handled by Navbar
    { key: 'd', ctrl: true, action: () => navigate('/') },
    { key: 'n', ctrl: true, action: () => navigate('/notes') },
    { key: 't', ctrl: true, action: () => navigate('/tasks') },
  ]);

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-2xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="notes" element={<Notes />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="focus" element={<Focus />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const theme = useSettingsStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CustomCursor />
        <AppRoutes />
        <Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(16px)',
      color: '#0f172a',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
  }}
/>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
