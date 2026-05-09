import React, { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import CategorySection from '../components/CategorySection';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSemanticSearch } from '../hooks/useSemanticSearch';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const { results: semanticResultIds, isSearching } = useSemanticSearch(searchTerm);

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = semanticResultIds.includes(product.id);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [semanticResultIds, selectedCategory]);

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
      {/* Minimalist Ambient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none z-0" />
      
      <div className="relative z-10 container mx-auto px-4 pt-40 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-light tracking-widest uppercase leading-tight mb-6"
            >
              Explore <br/> <span className="text-primary font-medium">Products</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl"
          >
            <div className="px-6 py-3">
              <span className="block text-[10px] text-slate-400 uppercase font-medium tracking-widest mb-1">Total Items</span>
              <span className="text-2xl font-light tracking-wide">{productsData.length}</span>
            </div>
            <div className="hidden md:block w-[1px] h-10 bg-white/10" />
            <div className="hidden md:block px-6 py-3">
              <span className="block text-[10px] text-slate-400 uppercase font-medium tracking-widest mb-1">Categories</span>
              <span className="text-2xl font-light tracking-wide">{categories.length - 1}</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row gap-4 mb-20 relative z-30"
        >
          <div className="relative flex-grow group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={18} />
            <input
              type="text"
              placeholder={selectedCategory === 'All' ? "Search items here..." : `Search in ${selectedCategory}...`}
              className="w-full bg-black/40 backdrop-blur-3xl border border-white/10 hover:border-white/30 rounded-full py-4 pl-14 pr-12 focus:outline-none focus:border-white/50 transition-all text-white placeholder:text-slate-500 text-sm font-light tracking-wide"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              {isSearching ? (
                <Loader2 className="animate-spin text-primary" size={18} />
              ) : searchTerm ? (
                <Sparkles className="text-primary" size={18} />
              ) : null}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium text-xs uppercase tracking-widest transition-all whitespace-nowrap border backdrop-blur-xl ${
                  selectedCategory === category 
                  ? 'bg-white text-black border-white' 
                  : 'bg-black/40 text-slate-500 border-white/10 hover:border-white/30 hover:text-white'
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
                  layout={selectedCategory === 'All' ? 'horizontal' : 'grid'}
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
              <h2 className="text-3xl font-light tracking-wide mb-4">No results found</h2>
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
