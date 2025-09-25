import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, TrendingDown, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';

interface ProductPageProps {
  productId: string;
  onBack: () => void;
}

export function ProductPage({ productId, onBack }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await api.getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">{error || 'Product not found'}</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  const minPrice = Math.min(...product.shops.map(shop => shop.price));
  const maxPrice = Math.max(...product.shops.map(shop => shop.price));
  const savings = maxPrice - minPrice;
  const cheapestShop = product.shops.find(shop => shop.price === minPrice);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {savings > 0 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                Save up to ${savings}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {product.category}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
          </div>

          {/* Price Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Best Price</p>
                <p className="text-4xl font-bold text-gray-900">${minPrice}</p>
              </div>
              {cheapestShop && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Available at</p>
                  <p className="text-lg font-semibold text-green-600">{cheapestShop.name}</p>
                </div>
              )}
            </div>
            
            {maxPrice !== minPrice && (
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Price range: ${minPrice} - ${maxPrice}</span>
                <span className="text-green-600 font-medium">Save up to ${savings}</span>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Price Comparison</h2>
        
        <div className="space-y-4">
          {product.shops
            .sort((a, b) => a.price - b.price)
            .map((shop, index) => (
            <div
              key={shop.name}
              className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-200 ${
                shop.price === minPrice
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{shop.logo}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{shop.name}</h3>
                  {shop.price === minPrice && (
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Best Price
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${shop.price}</p>
                  {shop.price !== minPrice && (
                    <p className="text-sm text-red-500">+${shop.price - minPrice} more</p>
                  )}
                </div>
                
                <a
                  href={shop.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    shop.price === minPrice
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Visit Store
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Price Alert</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get notified when the price drops below your target. We'll monitor all stores for you.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Set Price Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}