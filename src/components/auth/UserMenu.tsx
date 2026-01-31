import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = '' }: UserMenuProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (err) {
      console.error('[UserMenu] Logout error:', err);
    }
  };

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const displayEmail = user.email || '';

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-bento hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-action-primary text-white flex items-center justify-center font-semibold">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-gray-900">{displayName}</div>
          <div className="text-xs text-gray-500">{displayEmail}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-bento shadow-bento-lg border border-gray-200 py-2 z-50">
          {/* User info (mobile) */}
          <div className="lg:hidden px-4 py-2 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">{displayName}</div>
            <div className="text-xs text-gray-500">{displayEmail}</div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
