import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Award, Star, Zap, Gift } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
}

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Latest gadgets and tech',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trendy clothing and accessories',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Home & Living',
    image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Furniture and home decor',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    name: 'Sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sports equipment and gear',
    gradient: 'from-orange-500 to-red-600',
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders above ₹999',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment processing',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round the clock customer support',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Verified products with warranty',
    color: 'from-orange-500 to-amber-600',
  },
];

// Mock products for when Supabase is not configured
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium quality wireless headphones with noise cancellation',
    price: 2999,
    category: 'Electronics',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 50,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 4999,
    category: 'Electronics',
    image_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 30,
  },
  {
    id: '3',
    name: 'Casual T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 799,
    category: 'Fashion',
    image_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 100,
  },
  {
    id: '4',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug with elegant design',
    price: 299,
    category: 'Home & Living',
    image_url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 75,
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with rich sound',
    price: 1999,
    category: 'Electronics',
    image_url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 40,
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily workouts',
    price: 3499,
    category: 'Sports',
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 60,
  },
  {
    id: '7',
    name: 'Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 1299,
    category: 'Home & Living',
    image_url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 25,
  },
  {
    id: '8',
    name: 'Backpack',
    description: 'Durable travel backpack with multiple compartments',
    price: 2199,
    category: 'Fashion',
    image_url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 35,
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using mock data');
        setFeaturedProducts(mockProducts);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Fallback to mock data if there's an error
      setFeaturedProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium">New Arrivals Daily</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Welcome to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    BhuviDevo
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
                  Your ultimate destination for premium products at unbeatable prices
                </p>
                <p className="text-lg text-purple-200 leading-relaxed">
                  Discover thousands of products across multiple categories with fast delivery, 
                  exceptional customer service, and the best deals in India.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 group shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/categories"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 text-center backdrop-blur-sm"
                >
                  Browse Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50k+</div>
                  <div className="text-purple-200 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">10k+</div>
                  <div className="text-purple-200 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">99%</div>
                  <div className="text-purple-200 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Shopping Experience"
                  className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-purple-900 p-4 rounded-xl shadow-lg z-20 animate-bounce">
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <div>
                    <p className="font-bold text-lg">Free</p>
                    <p className="text-xs">Shipping</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-400 text-white p-4 rounded-xl shadow-lg z-20 animate-pulse">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-current" />
                  <div>
                    <p className="font-bold text-lg">4.9</p>
                    <p className="text-xs">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BhuviDevo?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-bold text-xl mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of trending products with amazing deals
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-10 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-orange-600 transition-all duration-200 inline-flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-orange-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-30 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with BhuviDevo
              </h2>
              <p className="text-xl text-purple-100 leading-relaxed max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, 
                exclusive deals, flash sales, and special offers.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white bg-opacity-20 p-2 rounded-2xl backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 font-medium"
                />
                <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-purple-200 text-sm mt-4">
                Join 50,000+ subscribers and never miss a deal!
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex justify-center items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-purple-200 text-sm">Spam Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">24/7</div>
                <div className="text-purple-200 text-sm">Exclusive Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">1-Click</div>
                <div className="text-purple-200 text-sm">Unsubscribe</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}