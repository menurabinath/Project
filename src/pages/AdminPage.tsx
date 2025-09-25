import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MousePointer } from 'lucide-react';
import { api } from '../services/api';
import { AdminStats } from '../types';

export function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminData = await api.getAdminStats();
        setStats(adminData);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Unable to load admin dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-xl mr-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor search trends and user behavior</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Top Searches */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Top Searches</h2>
          </div>
          <div className="space-y-4">
            {stats.topSearches.map((search, index) => (
              <div key={search.query} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                    index === 0 ? 'bg-gold text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-800 font-medium">{search.query}</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">{search.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* No Results Queries */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">No Results</h2>
          </div>
          <div className="space-y-4">
            {stats.noResultsQueries.map((query) => (
              <div key={query.query} className="flex items-center justify-between">
                <span className="text-gray-800">{query.query}</span>
                <span className="text-sm font-semibold text-orange-600">{query.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              Consider adding products for these search terms to improve user experience.
            </p>
          </div>
        </div>

        {/* Top Clicked Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <MousePointer className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Top Products</h2>
          </div>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                    index === 0 ? 'bg-purple-600 text-white' :
                    index === 1 ? 'bg-purple-400 text-white' :
                    index === 2 ? 'bg-purple-300 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-600">{product.clickCount} clicks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analytics Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.topSearches.reduce((sum, search) => sum + search.count, 0)}
            </div>
            <div className="text-sm text-blue-800">Total Searches</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.topProducts.reduce((sum, product) => sum + product.clickCount, 0)}
            </div>
            <div className="text-sm text-green-800">Product Views</div>
          </div>
          
          <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.noResultsQueries.reduce((sum, query) => sum + query.count, 0)}
            </div>
            <div className="text-sm text-orange-800">No Results</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {((stats.topSearches.reduce((sum, search) => sum + search.count, 0) - stats.noResultsQueries.reduce((sum, query) => sum + query.count, 0)) / stats.topSearches.reduce((sum, search) => sum + search.count, 0) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-purple-800">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}