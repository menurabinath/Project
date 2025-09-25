import React, { ReactNode } from 'react';
import { Search, ShoppingCart, BarChart3 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Wasilanka
                </span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/admin"
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Wasilanka. Find the best prices across all stores.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}