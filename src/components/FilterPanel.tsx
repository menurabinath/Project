import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  sortBy,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  onClearFilters
}: FilterPanelProps) {
  const hasActiveFilters = selectedCategory || minPrice > 0 || maxPrice < 10000 || sortBy !== 'relevance';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="relevance">Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mr-3 text-blue-500"
            />
            <span className="text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-3 text-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Min"
              value={minPrice || ''}
              onChange={(e) => onPriceChange(parseInt(e.target.value) || 0, maxPrice)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice === 10000 ? '' : maxPrice}
              onChange={(e) => onPriceChange(minPrice, parseInt(e.target.value) || 10000)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}