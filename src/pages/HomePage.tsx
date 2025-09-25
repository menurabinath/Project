import React, { useEffect, useState } from 'react';
import { TrendingUp, Star, Zap } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types';

interface HomePageProps {
  onSearch: (query: string) => void;
  onProductClick: (productId: string) => void;
}

export function HomePage({ onSearch, onProductClick }: HomePageProps) {
  const [trendingData, setTrendingData] = useState<{ searches: string[]; products: Product[] } | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await api.getTrending();
        setTrendingData(data);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Find the Best
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Prices
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare prices across hundreds of stores and save money on every purchase. 
            Your smart shopping companion.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onSearch={onSearch}
            placeholder="Search for products, brands, or categories..."
            className="mb-8"
          />
        </div>

        {/* Quick Features */}
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-1 text-yellow-500" />
            Instant Search
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-green-500" />
            Best Prices
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
            Price Tracking
          </div>
        </div>
      </div>

      {/* Trending Searches */}
      {trendingData && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Trending Searches</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingData.searches.map((search) => (
              <button
                key={search}
                onClick={() => onSearch(search)}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-full transition-all duration-200 border border-transparent hover:border-blue-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Products */}
      {trendingData && (
        <div>
          <div className="flex items-center mb-8">
            <Star className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Popular Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingData.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}