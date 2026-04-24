import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  
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
  };

  return (
    <motion.div
      ref={cardRef}
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
      className="group relative flex flex-col glass-card rounded-[3rem] overflow-hidden cursor-pointer h-full perspective-1000"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* 3D Floating Image Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden m-4 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent shadow-2xl flex items-center justify-center p-4"
        style={{ transform: "translateZ(50px)" }}
      >
        <motion.img
          src={product.image}
          alt={product.itemname}
          className="w-full h-full object-contain transition-all duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>
      
      {/* Content */}
      <div 
        className="p-10 flex flex-col flex-grow"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-black group-hover:text-primary transition-colors duration-300 tracking-tighter">
            {product.itemname}
          </h3>
          {product.category === 'Cars' && (
            <Sparkles size={24} className="text-primary opacity-50" />
          )}
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

      {/* Shine Effect */}
      <div className="absolute inset-0 pointer-events-none group-hover:bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProductCard;
