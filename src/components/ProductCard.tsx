import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock_quantity > 0) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image_url: product.image_url,
        },
      });
    }
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-100">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Stock Status Badge */}
            {product.stock_quantity === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                  Out of Stock
                </span>
              </div>
            )}
            
            {/* Discount Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                20% OFF
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-3">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(4.5)</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-600">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{Math.round(product.price * 1.25).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {product.stock_quantity > 0 ? (
                  <span className="text-green-600 font-medium flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>In Stock</span>
                  </span>
                ) : (
                  <span className="text-red-600 font-medium flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Out of Stock</span>
                  </span>
                )}
              </div>
              
              <button
                onClick={addToCart}
                disabled={product.stock_quantity === 0}
                className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${
                  product.stock_quantity > 0
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
            
            {product.stock_quantity > 0 && product.stock_quantity < 10 && (
              <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                <p className="text-orange-600 text-xs font-medium text-center">
                  🔥 Only {product.stock_quantity} left in stock!
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}