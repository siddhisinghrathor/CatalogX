import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-black pt-40 pb-20">
      <div className="fixed inset-0 grid-background pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Column: Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary mb-6"
            >
              <div className="w-10 h-[1px] bg-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Get in Touch</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10"
            >
              LET'S <span className="text-primary">TALK.</span>
            </motion.h1>
            
            <div className="space-y-12 mt-20">
              {[
                { icon: <Mail />, label: "Email Us", val: "hello@flexicatalog.io" },
                { icon: <MessageSquare />, label: "Live Support", val: "Available 24/7" },
                { icon: <MapPin />, label: "HQ Address", val: "Silicon Valley, CA" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</span>
                    <span className="text-xl font-bold">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 md:p-14 glass rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden"
            >
              <h2 className="text-3xl font-black mb-10">SEND A MESSAGE</h2>
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Inquiry Type</label>
                  <select className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none text-slate-400">
                    <option>General Inquiry</option>
                    <option>Enterprise Licensing</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Your Message</label>
                  <textarea 
                    rows="5"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button className="w-full bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-[0.98]">
                  Submit Message <Send size={18} />
                </button>
              </form>

              {/* Background glow */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
