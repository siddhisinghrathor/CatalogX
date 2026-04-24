import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Target, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="relative min-h-screen bg-black pt-40 pb-20">
      <div className="fixed inset-0 grid-background pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary mb-6"
          >
            <div className="w-10 h-[1px] bg-primary" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Our Story</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10"
          >
            WE REDEFINE <br/> <span className="text-primary">PRODUCT DATA.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium"
          >
            FlexiCatalog Inc. was born out of a simple vision: to make complex product catalogs 
            feel as fluid and interactive as the physical world. Since 2018, we've helped 
            thousands of enterprises showcase their assets with technical precision.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-40">
          {[
            { label: "Active Users", value: "2.5M+" },
            { label: "Global Offices", value: "14" },
            { label: "Products Synced", value: "500M" },
            { label: "Uptime SLA", value: "99.99%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 glass-card rounded-[2.5rem] border-white/5"
            >
              <span className="block text-4xl md:text-5xl font-black mb-2">{stat.value}</span>
              <span className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
           {[
             { icon: <Target />, title: "Precision", desc: "Every attribute, every pixel, mapped with mathematical accuracy." },
             { icon: <Zap />, title: "Velocity", desc: "Nano-speed data retrieval for a zero-latency digital experience." },
             { icon: <Globe />, title: "Unity", desc: "Connecting fragmented data silos into a single source of truth." }
           ].map((val, i) => (
             <div key={i} className="p-12 glass rounded-[3rem] border-white/5 group hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{val.title}</h3>
                <p className="text-slate-400 leading-relaxed">{val.desc}</p>
             </div>
           ))}
        </div>

        {/* Team CTA */}
        <div className="p-20 glass rounded-[4rem] border-white/10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8">JOIN THE FUTURE OF DATA</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
              We're always looking for brilliant minds to help us push the boundaries 
              of interactive product exploration.
            </p>
            <button className="btn btn-primary mx-auto px-10 py-4 text-lg">View Openings</button>
          </div>
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
