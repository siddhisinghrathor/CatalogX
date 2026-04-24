import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, ShieldCheck, Box } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/')} className="btn btn-primary">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-12"
      >
        <ArrowLeft size={20} /> Back to Catalog
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative aspect-square rounded-3xl overflow-hidden glass border-white/10 shadow-2xl">
            <img
              src={product.image}
              alt={product.itemname}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="mb-8">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 mb-4 inline-block">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              {product.itemname}
            </h1>
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 text-accent">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <span className="text-slate-500 text-sm font-medium">Trusted Performance</span>
            </div>
          </div>

          {/* Dynamic Properties */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Box size={22} className="text-primary" /> Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.itemprops.map((prop, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:bg-white/10 transition-colors"
                >
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{prop.label}</span>
                  <span className="text-xl font-semibold text-white">{prop.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-wrap gap-4 pt-10 border-t border-white/5">
            <button className="btn btn-primary flex-grow justify-center py-4 text-lg">
              Check Availability
            </button>
            <button className="btn btn-outline p-4">
              <Heart size={24} />
            </button>
            <button className="btn btn-outline p-4">
              <Share2 size={24} />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} /> 2 Year Warranty
            </div>
            <div className="flex items-center gap-2">
              <Box size={16} /> Free Delivery
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
