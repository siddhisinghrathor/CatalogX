import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutGrid, Info, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between p-4 rounded-[2rem] transition-all duration-500 ${
        scrolled ? 'glass shadow-2xl' : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl group-hover:rotate-[15deg] transition-transform duration-500">
            F
          </div>
          <span className="text-xl font-black tracking-tighter text-white">FlexiCatalog</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all ${
                location.pathname === link.path ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-[1px] h-6 bg-white/10 mx-2" />
          <Link 
            to="/contact"
            className="px-6 py-2 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            Talk to Us <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 bg-white/5 rounded-xl border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 glass p-8 rounded-[2.5rem] shadow-2xl border border-white/10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button className="btn btn-primary w-full justify-center py-4 text-lg mt-4">
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="relative z-10 border-t border-white/5 py-40 bg-black mt-20">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-black text-2xl">F</div>
          <span className="text-4xl font-black tracking-tighter">FlexiCatalog</span>
        </div>
        <p className="text-slate-500 max-w-sm text-lg leading-relaxed">
          Crafting the next generation of digital product experiences. 
          Dynamic, immersive, and built for performance.
        </p>
      </div>
      <div>
        <h4 className="text-xs uppercase font-black tracking-[0.3em] text-white/40 mb-10">Navigation</h4>
        <ul className="space-y-6 text-xl font-bold">
          <Link to="/home" className="block hover:text-primary transition-colors">Explorer</Link>
          <Link to="/about" className="block hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase font-black tracking-[0.3em] text-white/40 mb-10">Connect</h4>
        <ul className="space-y-6 text-xl font-bold">
          <li className="hover:text-primary cursor-pointer transition-colors">Twitter / X</li>
          <li className="hover:text-primary cursor-pointer transition-colors">Instagram</li>
          <li className="hover:text-primary cursor-pointer transition-colors">LinkedIn</li>
          <li className="hover:text-primary cursor-pointer transition-colors">Email Us</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
      <p>&copy; 2026 FlexiCatalog. Built with Passion.</p>
      <div className="flex gap-12">
        <span className="hover:text-white cursor-pointer transition-colors">Legal Details</span>
        <span className="hover:text-white cursor-pointer transition-colors">Privacy Shield</span>
      </div>
    </div>
  </footer>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
