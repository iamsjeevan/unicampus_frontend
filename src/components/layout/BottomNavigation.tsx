
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/dashboard' },
  { id: 'communities', label: 'Communities', icon: '👥', path: '/communities' },
  { id: 'resources', label: 'Resources', icon: '📚', path: '/resources' },
  { id: 'results', label: 'Results', icon: '📊', path: '/results' },
  { id: 'attendance', label: 'Attendance', icon: '📅', path: '/attendance' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-unicampus-red" 
                  : "text-gray-500 dark:text-gray-400 hover:text-unicampus-red dark:hover:text-unicampus-red"
              )}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-unicampus-red" : "text-gray-500 dark:text-gray-400"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
