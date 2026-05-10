import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">404</h1>
      <p className="mt-4 text-xl text-gray-500">Page not found</p>
      <Link to="/" className="mt-8">
        <Button><Home size={16} className="mr-2" /> Go Home</Button>
      </Link>
    </div>
  );
}
