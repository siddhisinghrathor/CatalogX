import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Cpu, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HorizontalGameIntro = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  
  // Create a tall container to allow for vertical scrolling
  // The useScroll hook will track progress through this tall container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll to horizontal translation
  // 4 sections means we want to move left by -75% of the total width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Parallax elements
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const fgX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  
  // Bot movement - travels horizontally across the screen relative to viewport
  const botX = useTransform(scrollYProgress, [0, 1], ["10vw", "70vw"]);
  const botY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ["0px", "-50px", "0px", "-50px", "0px", "-20px"]);

  // Memoize random obstacle generation
  const obstacles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      height: Math.random() * 100 + 50,
      marginLeft: Math.random() * 100
    }));
  }, []);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
        
        {/* Background Grid / Parallax Layer */}
        <motion.div 
          style={{ x: bgX }} 
          className="absolute inset-0 flex w-[400vw] h-full pointer-events-none opacity-20"
        >
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
        </motion.div>

        {/* Floating Hero Character (The "Player") */}
        <motion.div
          style={{ x: botX, y: botY }}
          className="absolute z-50 left-0 bottom-1/3 pointer-events-none drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
             {/* Character Sprite (Constructed with CSS) */}
             <motion.div 
               animate={{ y: [-5, 5, -5] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="w-20 h-20 bg-cyan-400 rounded-xl shadow-[0_0_50px_rgba(34,211,238,1)] border-4 border-white flex flex-col items-center justify-center overflow-hidden relative"
             >
               <div className="w-10 h-4 bg-black rounded-full relative overflow-hidden mb-2">
                 <motion.div 
                   animate={{ x: [-10, 10, -10] }}
                   transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                   className="absolute top-0 left-1/2 w-4 h-full bg-cyan-200 blur-sm rounded-full"
                 />
               </div>
               <div className="flex gap-2">
                 <div className="w-2 h-4 bg-white/50 rounded-full" />
                 <div className="w-2 h-4 bg-white/50 rounded-full" />
               </div>
             </motion.div>
             {/* Thrust */}
             <motion.div 
               animate={{ height: ['20px', '40px', '20px'], opacity: [0.8, 1, 0.8] }}
               transition={{ repeat: Infinity, duration: 0.2 }}
               className="absolute -bottom-8 w-6 bg-cyan-300 blur-md rounded-full"
             />
          </div>
        </motion.div>

        {/* Foreground Parallax Obstacles */}
        <motion.div 
          style={{ x: fgX }} 
          className="absolute bottom-0 flex w-[400vw] h-32 pointer-events-none z-40 items-end"
        >
          {obstacles.map((obs) => (
            <div 
              key={obs.id} 
              className="w-40 bg-slate-900 border-t-2 border-r-2 border-cyan-900/30"
              style={{ height: `${obs.height}px`, marginLeft: `${obs.marginLeft}px` }}
            />
          ))}
        </motion.div>

        {/* The Track */}
        <motion.div style={{ x }} className="flex w-[400vw] h-full relative z-30">
          
          {/* Level 1: Speed */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-20 md:px-40 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="max-w-xl glass p-12 rounded-[3rem] border border-yellow-500/30 shadow-[0_0_50px_rgba(250,204,21,0.1)] relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/20 blur-[80px] rounded-full" />
              <Zap size={64} className="text-yellow-400 mb-8" />
              <h2 className="text-5xl font-black mb-6 text-white uppercase tracking-tighter">Level 1:<br/>Nano-Speed Engine</h2>
              <p className="text-slate-300 text-xl leading-relaxed">
                Watch as your catalog blazes past the competition. Our proprietary engine delivers data at sub-millisecond speeds. 
                Zero loading screens, just pure velocity.
              </p>
            </motion.div>
          </div>

          {/* Level 2: Schema */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-20 md:px-40 relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-xl glass p-12 rounded-[3rem] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden ml-auto"
            >
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full" />
              <Cpu size={64} className="text-blue-400 mb-8" />
              <h2 className="text-5xl font-black mb-6 text-white uppercase tracking-tighter">Level 2:<br/>Universal Schema</h2>
              <p className="text-slate-300 text-xl leading-relaxed">
                Adaptive architecture maps complex product hierarchies automatically. 
                Like solving a puzzle instantly, FlexiCatalog adapts to your unique data shape.
              </p>
            </motion.div>
          </div>

          {/* Level 3: Security */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-20 md:px-40 relative">
            <motion.div 
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl glass p-12 rounded-[3rem] border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full" />
              <Shield size={64} className="text-emerald-400 mb-8 relative z-10" />
              <h2 className="text-5xl font-black mb-6 text-white uppercase tracking-tighter relative z-10">Level 3:<br/>Ironclad Security</h2>
              <p className="text-slate-300 text-xl leading-relaxed relative z-10">
                Military-grade encryption protects your digital assets. 
                Navigate the cyber frontier with complete peace of mind.
              </p>
            </motion.div>
          </div>

          {/* Level 4: The Boss / Finish Line */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center px-20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-black to-black" />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="relative z-10 text-center"
            >
              <h2 className="text-7xl md:text-[8rem] font-black mb-8 text-white tracking-tighter leading-none">
                MISSION <br/><span className="text-cyan-400">COMPLETE</span>
              </h2>
              <p className="text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
                You've reached the pinnacle of product exploration. The catalog is unlocked.
              </p>
              <button 
                onClick={() => navigate('/home')}
                className="group relative px-12 py-6 bg-cyan-400 text-black font-black text-2xl rounded-[3rem] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,211,238,0.5)]"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative z-10 flex items-center gap-4">
                  ENTER CATALOG <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGameIntro;
