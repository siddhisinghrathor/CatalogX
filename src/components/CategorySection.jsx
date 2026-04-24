import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySection = ({ title, products }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group/section"
    >
      {/* Header - Cleaned up: removed right-side info and buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 px-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{title}</h2>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group overflow-visible">
        {/* Apple Style Side Arrows */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll('left')}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-90"
            >
              <ChevronLeft size={32} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll('right')}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 rounded-full glass border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-90"
            >
              <ChevronRight size={32} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-10 px-4 md:px-0 snap-x snap-mandatory"
          style={{
            touchAction: 'pan-x',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[80vw] md:min-w-[480px] snap-center md:snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
          {/* End Spacer */}
          <div className="min-w-[40px] shrink-0" />        </div>
      </div>
    </motion.section>
  );
};

export default CategorySection;
