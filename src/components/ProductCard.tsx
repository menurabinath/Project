import React from 'react';
import { ExternalLink, TrendingDown } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const minPrice = Math.min(...product.shops.map(shop => shop.price));
  const maxPrice = Math.max(...product.shops.map(shop => shop.price));
  const savings = maxPrice - minPrice;
  const cheapestShop = product.shops.find(shop => shop.price === minPrice);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {savings > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <TrendingDown className="w-3 h-3 mr-1" />
            Save ${savings}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-600">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-gray-900">
            ${minPrice}
            {maxPrice !== minPrice && (
              <span className="text-sm text-gray-500 font-normal ml-1">
                from
              </span>
            )}
          </div>
          {cheapestShop && (
            <div className="text-sm text-green-600 font-medium">
              Best at {cheapestShop.name}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {product.shops.length} store{product.shops.length !== 1 ? 's' : ''}
          </div>
          <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-sm font-medium">
            Compare prices
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}