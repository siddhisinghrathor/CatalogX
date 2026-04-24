import React, { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import CategorySection from '../components/CategorySection';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.itemname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none z-0" />
      
      <div className="relative z-10 container mx-auto px-4 pt-40 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6"
            >
              EXPLORE <br/> <span className="text-primary">PRODUCTS</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl"
          >
            <div className="px-6 py-3">
              <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Items</span>
              <span className="text-2xl font-black">{productsData.length}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="px-6 py-3">
              <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Categories</span>
              <span className="text-2xl font-black">{categories.length - 1}</span>
            </div>
          </motion.div>
        </div>

        {/* Filters & Search - Updated: Removed sticky positioning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-20 relative z-30"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white/[0.04] backdrop-blur-3xl border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-white placeholder:text-slate-600 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border ${
                  selectedCategory === category 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                  : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {Object.keys(groupedProducts).length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-40"
            >
              {Object.entries(groupedProducts).map(([category, products]) => (
                <CategorySection 
                  key={category} 
                  title={category} 
                  products={products} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-40 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-sm"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-500">
                <Search size={40} />
              </div>
              <h2 className="text-3xl font-black mb-4">No results found</h2>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="btn btn-primary mx-auto"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
