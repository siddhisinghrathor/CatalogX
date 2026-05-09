import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';

const FeedCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleCompareItem, compareItems } = useCompare();
  
  const isSaved = compareItems.some(p => p.id === product.id);
  const [isLiked, setIsLiked] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowBigHeart(true);
    setTimeout(() => setShowBigHeart(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-2xl mx-auto mb-20 bg-black border-b border-white/10 pb-8"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-black rounded-full border-2 border-black flex items-center justify-center">
              <span className="text-white text-xs font-bold uppercase">{product.category.substring(0, 2)}</span>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wide">{product.itemname}</h4>
            <p className="text-white/50 text-xs tracking-widest uppercase">{product.category}</p>
          </div>
        </div>
        <button className="text-white/50 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image (Double Tap to Like) */}
      <div 
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#111] to-[#050505] flex items-center justify-center cursor-pointer overflow-hidden group"
        onDoubleClick={handleDoubleTap}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={product.image}
          alt={product.itemname}
          className="w-full h-full object-contain p-8 drop-shadow-2xl"
          loading="lazy"
        />
        
        {/* Big Heart Animation */}
        <AnimatePresence>
          {showBigHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <Heart size={100} className="text-white fill-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsLiked(!isLiked)}
            className="text-white hover:text-red-500 transition-colors"
          >
            <Heart size={26} className={isLiked ? "fill-red-500 text-red-500" : ""} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-white hover:text-gray-400 transition-colors"
          >
            <MessageCircle size={26} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            className="text-white hover:text-gray-400 transition-colors"
          >
            <Send size={26} />
          </motion.button>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleCompareItem(product)}
          className="text-white hover:text-gray-400 transition-colors"
        >
          <Bookmark size={26} className={isSaved ? "fill-white text-white" : ""} />
        </motion.button>
      </div>

      {/* Likes count (Fake for effect) */}
      <div className="px-4 mb-2">
        <p className="text-white text-sm font-semibold">{isLiked ? '1,043' : '1,042'} likes</p>
      </div>

      {/* Caption & Specs */}
      <div className="px-4">
        <p className="text-white text-sm leading-relaxed font-light">
          <span className="font-semibold mr-2">{product.itemname}</span>
          Experience the ultimate performance and design. 
          {product.itemprops.slice(0, 2).map((prop, idx) => (
            <span key={idx} className="ml-1 text-white/70">
              Featuring a stunning {prop.label.toLowerCase()} ({prop.value}).
            </span>
          ))}
        </p>
        <button 
          onClick={() => navigate(`/product/${product.id}`)}
          className="text-white/50 text-sm mt-2 uppercase tracking-widest text-[10px] font-semibold hover:text-white transition-colors"
        >
          View all specifications
        </button>
      </div>
    </motion.div>
  );
};

export default FeedCard;
