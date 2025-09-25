import React, { useState, useEffect } from 'react';
import { Grid, List, ArrowUpDown, AlertCircle } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { FilterPanel } from '../components/FilterPanel';
import { api } from '../services/api';
import { Product, SearchResult } from '../types';

interface SearchPageProps {
  query: string;
  onSearch: (query: string) => void;
  onProductClick: (productId: string) => void;
}

export function SearchPage({ query, onSearch, onProductClick }: SearchPageProps) {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, selectedCategory, minPrice, maxPrice, sortBy, currentPage]);

  const performSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const result = await api.search({
        query,
        category: selectedCategory,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice !== 10000 ? maxPrice : undefined,
        sort: sortBy,
        page: currentPage,
        limit: 12
      });
      
      if (currentPage === 1) {
        setSearchResult(result);
      } else {
        setSearchResult(prev => ({
          ...result,
          products: [...(prev?.products || []), ...result.products]
        }));
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(10000);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  if (!query && !searchResult) {
    return (
      <div className="text-center py-16">
        <SearchBar onSearch={onSearch} placeholder="What are you looking for?" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <SearchBar 
          onSearch={onSearch}
          initialQuery={query}
          showVoiceInput={false}
          className="mb-4"
        />
        
        {searchResult && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {searchResult.total > 0 ? (
                <>Showing {searchResult.products.length} of {searchResult.total} results for <span className="font-medium">"{query}"</span></>
              ) : (
                <>No results found for <span className="font-medium">"{query}"</span></>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                handleFilterChange();
              }}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
                handleFilterChange();
              }}
              onSortChange={(sort) => {
                setSortBy(sort);
                handleFilterChange();
              }}
              onClearFilters={clearFilters}
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {loading && currentPage === 1 ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : searchResult && searchResult.products.length > 0 ? (
            <div className="space-y-6">
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {searchResult.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onProductClick(product.id)}
                  />
                ))}
              </div>

              {/* Load More */}
              {searchResult.hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : 'Load More Products'}
                  </button>
                </div>
              )}
            </div>
          ) : searchResult && searchResult.products.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Suggestions:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['iPhone', 'laptop', 'headphones', 'camera'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => onSearch(suggestion)}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-full text-sm transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}