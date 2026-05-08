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
  
  // Mouse Position for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-[3rem] overflow-hidden cursor-pointer h-full perspective-1000 bg-black/40 backdrop-blur-xl border border-white/[0.05] shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-white/[0.2] transition-all duration-500"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* 3D Floating Image Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden m-4 rounded-[2.5rem] bg-white/[0.02] shadow-2xl flex items-center justify-center p-4"
        style={{ transform: "translateZ(50px)" }}
      >
        <motion.img
          animate={isHovered ? { y: [-10, 10, -10] } : { y: 0 }}
          transition={isHovered ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { duration: 0.5 }}
          src={product.image}
          alt={product.itemname}
          className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          style={{ transform: "translateZ(30px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
        
        {/* Techy Scanning Laser Line */}
        <motion.div
          initial={{ top: '-10%', opacity: 0 }}
          whileHover={{ top: '110%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] z-20 pointer-events-none hidden group-hover:block"
        />
        
        {/* Holographic Glitch Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none transition-opacity duration-500 z-10" />
      </div>

      {/* Compare Badge / Button */}
      <div 
        className="absolute top-8 right-8 z-20"
        style={{ transform: "translateZ(40px)" }}
      >
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
      <div 
        className="p-10 flex flex-col flex-grow"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-black group-hover:text-cyan-400 transition-colors duration-300 tracking-tighter pr-4">
            {product.itemname}
          </h3>
          <div className="p-2 bg-white/5 rounded-full text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-400/20 transition-colors shrink-0 tooltip-trigger relative">
            <Sparkles size={20} />
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-white/10">
              AI Powered Insights Inside
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            {product.itemprops.slice(0, 1).map((prop, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{prop.label}</span>
                <span className="text-lg font-black text-white/90">{prop.value}</span>
              </div>
            ))}
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.15, x: 5 }}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl"
          >
            <ArrowRight size={24} />
          </motion.div>
        </div>
      </div>

      {/* Shine & Tech Border Glow Effect */}
      <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent group-hover:border-cyan-500/30 pointer-events-none transition-colors duration-500" />
      <div className="absolute inset-0 pointer-events-none group-hover:bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProductCard;
