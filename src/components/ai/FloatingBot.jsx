import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const FloatingBot = ({ onClick, isOpen }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [introFinished, setIntroFinished] = useState(!isLanding);
  const [greetingText, setGreetingText] = useState('Need help finding something?');

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timers = [];
    if (isLanding && !introFinished) {
      timers.push(setTimeout(() => setGreetingText("HELLO! I am your AI Guide."), 800));
      timers.push(setTimeout(() => setGreetingText("Let's explore the catalog!"), 2800));
      timers.push(setTimeout(() => {
        setIntroFinished(true);
        setGreetingText("Need help finding something?");
      }, 4300));
    }
    return () => timers.forEach(clearTimeout);
  }, [isLanding, introFinished]);

  // Separate effect for idle float animation — uses CSS repeat, no while loop
  useEffect(() => {
    if (isOpen) return;
    controls.start({
      y: [0, -12, 0],
      rotate: [0, 4, -4, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
    });
    return () => controls.stop();
  }, [controls, isOpen]);

  if (isOpen) return null;
  // On landing page the inline BotSiddhi handles the intro — no duplicate
  if (isLanding && !introFinished) return null;

  return (
    <>
      {/* Cosmic Astro Stars & Neon Blue Background */}
      <AnimatePresence>
        {isLanding && !introFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-black z-40 pointer-events-none overflow-hidden"
          >
            {/* Deep Neon Blue Space Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-900/20 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/30 blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/10 blur-[50px] rounded-full" />

            {/* Astro Stars Array */}
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: Math.random() * 0.5 + 0.1, scale: Math.random() * 0.5 + 0.5 }}
                animate={{ 
                  opacity: [null, Math.random() * 0.8 + 0.5, Math.random() * 0.5 + 0.1],
                  scale: [null, Math.random() * 1.5 + 0.8, Math.random() * 0.5 + 0.5]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  boxShadow: '0 0 15px 3px rgba(34, 211, 238, 0.6)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onClick={introFinished ? onClick : undefined}
        className={`fixed z-50 ${introFinished ? 'cursor-pointer' : 'pointer-events-none'}`}
        initial={isLanding ? { 
          top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 0, opacity: 0 
        } : { 
          bottom: '2rem', right: '2rem', scale: 0, opacity: 0 
        }}
        animate={introFinished ? { 
          top: 'auto', left: 'auto', bottom: '2rem', right: '2rem', x: 0, y: 0, scale: 1, opacity: 1 
        } : { 
          top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 3, opacity: 1 
        }}
        transition={introFinished ? { type: "spring", stiffness: 60, damping: 15 } : { delay: 0.8, type: "spring", stiffness: 50 }}
        whileHover={introFinished ? { scale: 1.1 } : {}}
        whileTap={introFinished ? { scale: 0.9 } : {}}
      >


      <motion.div animate={controls} className="relative w-24 h-24 flex items-center justify-center">
        {/* Thrust Exhaust */}
        <motion.div 
          animate={{ height: ['20px', '40px', '20px'], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 w-6 rounded-full bg-blue-500 blur-md z-0"
        />
        
        {/* Main Body */}
        <div className="relative z-10 w-16 h-16 bg-gradient-to-b from-slate-200 to-slate-400 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.5)] border-2 border-white/20 flex flex-col items-center justify-center overflow-hidden">
          {/* Glass Visor */}
          <div className="w-12 h-6 bg-black rounded-xl mb-1 relative overflow-hidden border border-white/10 shadow-inner">
            {/* Scanning Eye/Laser */}
            <motion.div
              animate={{ 
                x: [-10, 10, -10],
                x: mousePos.x * 15 // override with mouse tracking
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)]"
              style={{ left: '50%', marginLeft: '-8px' }}
            >
              <motion.div 
                animate={{ scaleY: [1, 0.1, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 1] }} // Blinking
                className="w-full h-full bg-white rounded-full"
              />
            </motion.div>
            
            {/* Visor Glare */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />
          </div>
          
          {/* Speaker grill */}
          <div className="flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="w-1 h-1 bg-slate-600 rounded-full" />
            ))}
          </div>
        </div>

        {/* Antennas */}
        <motion.div 
          animate={{ rotate: mousePos.x * 20 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-400 origin-bottom"
        >
          <div className="absolute -top-2 -left-1 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Greeting Tooltip */}
      <AnimatePresence>
        {(!isOpen) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: introFinished ? 2 : 1.5 }}
            className={`absolute ${introFinished ? 'top-1/2 right-full -translate-y-1/2 mr-4 rounded-tr-sm' : 'top-full left-1/2 -translate-x-1/2 mt-4 rounded-tl-sm'} bg-white text-black px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl whitespace-nowrap z-50`}
          >
            {greetingText}
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
};

export default FloatingBot;
