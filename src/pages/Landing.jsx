import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Layers, Globe, Play, Shield, Cpu } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const handleShowcase = () => {
    alert("Experience the FlexiCatalog Showcase: Coming Soon with 4K Virtual Tours!");
  };

  return (
    <div className="relative min-h-[250vh] bg-black text-white overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none" />
      
      {/* Spotlight Effect */}
      <div className="fixed inset-0 spotlight pointer-events-none opacity-40" />

      {/* Sticky Hero Section */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div 
          style={{ scale, opacity, rotate }}
          className="relative z-10 w-full max-w-6xl"
        >
          {/* Main Container (The Box) */}
          <div className="relative glass p-12 md:p-20 rounded-[3rem] border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden">
            {/* Mac-style controls */}
            <div className="absolute top-8 left-10 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>

            <motion.div 
              style={{ scale: textScale }}
              className="text-center"
            >
              

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-[7rem] font-black mb-6 tracking-tighter leading-none"
              >
                FLEXI<span className="text-primary">CATALOG</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
              >
                A high-performance product explorer built for the modern era. 
                Experience dynamic data with 3D interactions and premium aesthetics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <button 
                  onClick={() => navigate('/home')}
                  className="group relative px-10 py-5 bg-white text-black font-black text-lg rounded-[2rem] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Explorer <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button 
                  onClick={handleShowcase}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black text-lg rounded-[2rem] hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Play size={20} fill="currentColor" /> Watch Showcase
                </button>
              </motion.div>
            </motion.div>

            {/* Inner Glow */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
          </div>
        </motion.div>

        {/* Backdrop 3D Plane */}
        <motion.div 
          style={{ y: y1, rotate: rotate }}
          className="absolute inset-0 flex items-center justify-center -z-10"
        >
          <div className="w-full max-w-7xl aspect-video bg-gradient-to-br from-primary/5 to-transparent border border-white/5 rounded-[4rem] transform perspective-1000 rotate-x-12 opacity-50" />
        </motion.div>
      </section>

      {/* Feature Section with Vibrant Styling */}
      <section className="relative z-10 py-60 container mx-auto px-4">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-black mb-8">ENGINEERED FOR EXCELLENCE</h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
            FlexiCatalog Inc. is a global leader in high-performance digital asset management, 
            serving over 10,000+ businesses with ultra-fast catalog solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <Zap />, 
              title: "Nano-Speed Engine", 
              desc: "Our proprietary engine delivers data at sub-millisecond speeds, ensuring a zero-latency experience for your users.",
              color: "text-yellow-400",
              bg: "bg-yellow-400/10",
              border: "border-yellow-400/20"
            },
            { 
              icon: <Cpu />, 
              title: "Universal Schema", 
              desc: "FlexiCatalog's adaptive architecture automatically maps complex product hierarchies without any manual configuration.",
              color: "text-blue-400",
              bg: "bg-blue-400/10",
              border: "border-blue-400/20"
            },
            { 
              icon: <Shield />, 
              title: "Enterprise Security", 
              desc: "Military-grade encryption for your product data. We ensure your catalog is secure, reliable, and always available.",
              color: "text-emerald-400",
              bg: "bg-emerald-400/10",
              border: "border-emerald-400/20"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-12 rounded-[3rem] bg-white/[0.02] border ${feature.border} hover:bg-white/[0.04] transition-all group relative overflow-hidden`}
            >
              <div className={`w-20 h-20 rounded-3xl ${feature.bg} flex items-center justify-center ${feature.color} mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {React.cloneElement(feature.icon, { size: 32 })}
              </div>
              <h3 className="text-3xl font-black mb-6">{feature.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{feature.desc}</p>
              <div className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                Learn more <ArrowRight size={16} />
              </div>
              
              {/* Vibrant Background Glow */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${feature.bg} blur-[60px] opacity-0 group-hover:opacity-50 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Company Info Banner */}
      <section className="relative z-10 py-40 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1">
            <h2 className="text-5xl font-black mb-10 leading-none">TRUSTED BY INNOVATORS WORLDWIDE</h2>
            <p className="text-slate-500 text-xl leading-relaxed mb-12">
              From Fortune 500 tech giants to boutique design studios, FlexiCatalog provides the infrastructure 
              to showcase products with unparalleled elegance and technical precision.
            </p>
            <div className="flex gap-10">
              <div>
                <span className="block text-4xl font-black">99.9%</span>
                <span className="text-slate-600 text-sm font-black uppercase tracking-widest">Uptime</span>
              </div>
              <div>
                <span className="block text-4xl font-black">10M+</span>
                <span className="text-slate-600 text-sm font-black uppercase tracking-widest">Products Synced</span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-video glass rounded-3xl border-white/5 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity">
                 <span className="font-black text-2xl tracking-tighter italic">LOGO {i}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
      </motion.div>
    </div>
  );
};

export default Landing;
