import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, PlusCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const { toggleCompareItem, compareItems } = useCompare();
  
  const isSelectedForCompare = compareItems.some(p => p.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-[2rem] overflow-hidden cursor-pointer h-full bg-[#0a0a0a] border border-white/[0.05] shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-white/[0.2] transition-all duration-500"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div 
        className="relative aspect-[16/10] overflow-hidden m-2 rounded-[1.5rem] bg-gradient-to-b from-[#111] to-[#050505] shadow-inner flex items-center justify-center p-3"
      >
        <motion.img
          animate={isHovered ? { y: [-5, 5, -5] } : { y: 0 }}
          transition={isHovered ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { duration: 0.5 }}
          src={product.image}
          alt={product.itemname}
          className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] group-hover:scale-125 transition-transform duration-700 z-10"
          loading="lazy"
        />
        {/* Clean Light Sweep */}
        <motion.div
          initial={{ left: '-100%', opacity: 0 }}
          whileHover={{ left: '200%', opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] z-20 pointer-events-none hidden group-hover:block"
        />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompareItem(product);
          }}
          className={`p-3 rounded-full flex items-center justify-center transition-all ${
            isSelectedForCompare 
              ? 'bg-primary text-black shadow-[0_0_20px_rgba(var(--primary),0.5)]' 
              : 'bg-black/50 text-white hover:bg-primary hover:text-black border border-white/10'
          } backdrop-blur-md`}
        >
          {isSelectedForCompare ? <CheckCircle size={20} /> : <PlusCircle size={20} />}
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow z-20">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medium text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide pr-2">
            {product.itemname}
          </h3>
          <div className="p-2 bg-white/5 rounded-full text-white/50 border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-colors shrink-0 tooltip-trigger relative">
            <Sparkles size={20} />
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-white/10">
              AI Powered Insights Inside
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            {product.itemprops.slice(0, 1).map((prop, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-widest mb-1">{prop.label}</span>
                <span className="text-lg font-medium text-white/90">{prop.value}</span>
              </div>
            ))}
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.15, x: 5 }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-xl"
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Shine & Tech Border Glow Effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-white/10 pointer-events-none transition-colors duration-500" />
      <div className="absolute inset-0 pointer-events-none group-hover:bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProductCard;
