import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleCompareItem, compareItems } = useCompare();
  const isSelectedForCompare = compareItems.some(p => p.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    // overflow-visible so the thought bubble can escape the card boundary
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-[2rem] overflow-visible cursor-pointer h-full"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* ── Thought bubble — above the card, outside image ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute -top-11 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/25 text-white text-[11px] font-medium px-4 py-1.5 rounded-2xl shadow-xl whitespace-nowrap tracking-wide">
              Click to view details
            </div>
            {/* Thought dots */}
            <div className="flex flex-col items-center gap-[3px] mt-1">
              <div className="w-2 h-2 rounded-full bg-white/70" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Card shell (clipped to rounded corners) ── */}
      <div className="relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/[0.05] shadow-[0_0_20px_rgba(59,130,246,0.05)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:border-white/[0.15] transition-all duration-500">

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[1.5rem] bg-gradient-to-b from-[#111] to-[#050505] shadow-inner flex items-center justify-center p-3">
          <motion.img
            animate={isHovered ? { y: [-4, 4, -4] } : { y: 0 }}
            transition={isHovered ? { repeat: Infinity, duration: 3, ease: 'easeInOut' } : { duration: 0.5 }}
            src={product.image}
            alt={product.itemname}
            className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700 z-10"
            loading="lazy"
          />
          {/* Light sweep */}
          <motion.div
            initial={{ left: '-100%', opacity: 0 }}
            whileHover={{ left: '200%', opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] z-20 pointer-events-none hidden group-hover:block"
          />
        </div>

        {/* Name + Compare */}
        <div className="px-5 pb-5 pt-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide truncate pr-3">
            {product.itemname}
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); toggleCompareItem(product); }}
            className={`p-2.5 rounded-full flex items-center justify-center transition-all shrink-0 backdrop-blur-md ${
              isSelectedForCompare
                ? 'bg-primary text-black shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                : 'bg-black/50 text-white hover:bg-primary hover:text-black border border-white/10'
            }`}
          >
            {isSelectedForCompare ? <CheckCircle size={18} /> : <PlusCircle size={18} />}
          </button>
        </div>

        {/* Inner glow border */}
        <div className="absolute inset-0 rounded-[2rem] border border-transparent group-hover:border-white/10 pointer-events-none transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

export default ProductCard;
