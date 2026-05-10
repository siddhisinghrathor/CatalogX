import React, { useRef, useState, useEffect } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence, useAnimation
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { Navbar } from '../components/Layout';
import CinematicBackground from '../components/3d/CinematicBackground';

// ─────────────────────────────────────────────────────────────────────────────
// AI BOT SIDDHI — hero bot with animated face
// ─────────────────────────────────────────────────────────────────────────────
const BotSiddhi = ({ isSmiling = false, mouseX = 0 }) => (
  <div className="relative flex flex-col items-center">
    {/* Ambient glow */}
    <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-3xl scale-150 pointer-events-none" />

    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      {/* Body */}
      <div className="relative w-24 h-24 bg-gradient-to-b from-slate-100 to-slate-400 rounded-[2.2rem] border-2 border-white/30
                      shadow-[0_0_50px_rgba(59,130,246,0.6)] flex flex-col items-center justify-center overflow-hidden">

        {/* Visor */}
        <div className="w-16 h-8 bg-black rounded-2xl mb-2 relative overflow-hidden border border-white/10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isSmiling ? (
              /* 😊 Smile face */
              <motion.div
                key="smile"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-0.5"
              >
                <div className="flex gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,1)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,1)]" />
                </div>
                <div className="w-7 h-1 border-b-2 border-blue-300 rounded-full" />
              </motion.div>
            ) : (
              /* 👁 Scanning eye */
              <motion.div
                key="eye"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: mouseX * 14 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                className="w-5 h-3 bg-blue-400 rounded-full shadow-[0_0_14px_rgba(96,165,250,1)]"
              >
                <motion.div
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.05, 1] }}
                  className="w-full h-full bg-white rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Visor glare */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl pointer-events-none" />
        </div>

        {/* Speaker grill */}
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-1 h-1 bg-slate-500 rounded-full" />
          ))}
        </div>

        {/* Inner sheen */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/15 to-transparent rounded-t-[2.2rem]" />
      </div>

      {/* Antenna */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)]"
        />
      </div>

      {/* Thruster */}
      <motion.div
        animate={{ height: ['10px', '22px', '10px'], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5 rounded-full bg-blue-500 blur-sm"
      />
    </motion.div>

    {/* Name badge */}
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-6 text-xs uppercase tracking-[0.4em] text-white font-bold drop-shadow-[0_0_8px_rgba(147,197,253,0.9)]"
    >
      · AI Bot Siddhi ·
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// FLEXICATALOG — blurry rise letter by letter from below
// ─────────────────────────────────────────────────────────────────────────────
const FlexiTitle = ({ show }) => {
  const letters = 'FLEXICATALOG'.split('');
  return (
    <div className="flex items-end overflow-visible" style={{ lineHeight: 1 }}>
      <AnimatePresence>
        {show && letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: 120, opacity: 0, filter: 'blur(20px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              delay: i * 0.1,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-[13vw] md:text-[9vw] font-black tracking-tighter leading-none text-white select-none"
            style={{ textShadow: '0 0 60px rgba(96,165,250,0.25)' }}
          >
            {ch}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Feature Card
// ─────────────────────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, color, bg, border, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className={`relative p-10 rounded-[2.5rem] bg-white/[0.02] border ${border} overflow-hidden group transition-all duration-500`}
  >
    <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center ${color} mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-base">{desc}</p>
    <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${bg} blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full`} />
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Stats scene
// ─────────────────────────────────────────────────────────────────────────────
const StatsScene = ({ smoothProgress }) => {
  // Features fully gone by 0.65 → Stats in at 0.67, out by 0.82 → CTA in at 0.84
  const op = useTransform(smoothProgress, [0.67, 0.76, 0.80, 0.84], [0, 1, 1, 0]);
  const y  = useTransform(smoothProgress, [0.67, 0.76], [60, 0]);
  return (
    <motion.div
      style={{ opacity: op, y }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-16 px-6 bg-black/90"
    >
      <div className="text-center">
        <p className="text-blue-400 text-xs uppercase tracking-widest mb-4">By the Numbers</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Trusted Worldwide</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-20">
        {[
          { value: '10M+',  label: 'Products Synced' },
          { value: '99.9%', label: 'Uptime' },
          { value: '10K+',  label: 'Businesses' },
          { value: '60fps', label: 'Smooth Always' },
        ].map(({ value, label }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-black text-white mb-2">{value}</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CTA bot for end of scroll
// ─────────────────────────────────────────────────────────────────────────────
const CTABotIcon = ({ mouseX }) => (
  <div className="relative">
    <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-2xl scale-150 pointer-events-none" />
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-16 h-16 bg-gradient-to-b from-slate-200 to-slate-400 rounded-[1.8rem] border-2 border-white/20 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(59,130,246,0.6)]"
    >
      <div className="w-12 h-6 bg-black rounded-xl mb-1 flex items-center justify-center relative overflow-hidden border border-white/10">
        <motion.div
          animate={{ x: mouseX * 12 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="w-4 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,1)]"
        >
          <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 1] }} className="w-full h-full bg-white rounded-full" />
        </motion.div>
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1 border-b-2 border-blue-300 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl pointer-events-none" />
      </div>
      <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-600 rounded-full" />)}</div>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-slate-400">
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
      </div>
      <motion.div animate={{ height: ['10px', '20px', '10px'], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity }} className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 rounded-full bg-blue-500 blur-sm" />
    </motion.div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
const Landing = () => {
  const navigate  = useNavigate();
  const containerRef = useRef(null);

  // ── Intro state machine ───────────────────────────────────────────────────
  // phase 0 → bot enters from bottom
  // phase 1 → bot smiles + greeting bubble "Hello! I'm Siddhi!"
  // phase 2 → FLEXICATALOG letters rise blurry→crisp
  // phase 3 → subtitle + scroll cue appear
  const [phase, setPhase] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA]   = useState(false);
  const [mouseX, setMouseX]     = useState(0);
  const [greeting, setGreeting] = useState('Hi! I\'m Siddhi. Ready to discover? 🚀');

  // Mouse tracking for eye
  useEffect(() => {
    const h = e => setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // Intro sequence — all timers cleaned up on unmount
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => { setGreeting('Building your ultimate catalog... 📦'); setPhase(2); }, 2400);
    const t3 = setTimeout(() => setPhase(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Hide scroll cue once user scrolls
  useEffect(() => {
    const h = () => { if (window.scrollY > 10) setIsScrolled(true); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // ── Scroll progress (smooth) ─────────────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // ── SCENE 1: Hero — out by 0.18 ──────────────────────────────────────────
  const heroOpacity = useTransform(smoothProgress, [0, 0.14, 0.18], [1, 1, 0]);
  const heroY       = useTransform(smoothProgress, [0, 0.18], [0, -80]);
  const heroScale   = useTransform(smoothProgress, [0, 0.18], [1, 0.92]);
  const heroBlurN   = useTransform(smoothProgress, [0.1, 0.18], [0, 14]);
  const heroBlur    = useTransform(heroBlurN, v => `blur(${v}px)`);

  // ── SCENE 2: Tagline — in 0.20, out 0.38 (fully gone by 0.42) ────────────
  const tagOpacity = useTransform(smoothProgress, [0.20, 0.30, 0.36, 0.42], [0, 1, 1, 0]);
  const tagY       = useTransform(smoothProgress, [0.20, 0.30], [60, 0]);

  // ── SCENE 3: Features — in 0.44, out 0.60 (fully gone by 0.64) ──────────
  const feat3Opacity = useTransform(smoothProgress, [0.44, 0.54, 0.60, 0.65], [0, 1, 1, 0]);
  const feat3Y       = useTransform(smoothProgress, [0.44, 0.54], [80, 0]);

  // ── SCENE 5: Final CTA — in 0.84, stays to 1.0 ───────────────────────────
  const ctaOp   = useTransform(smoothProgress, [0.84, 0.92], [0, 1]);
  const ctaY2   = useTransform(smoothProgress, [0.84, 0.92], [60, 0]);
  const ctaBtnX = useTransform(smoothProgress, [0.86, 1.0], [-700, 0]);
  const ctaBtnOp = useTransform(smoothProgress, [0.86, 0.95], [0, 1]);

  useEffect(() => {
    const unsub = smoothProgress.on('change', v => setShowCTA(v > 0.88));
    return unsub;
  }, [smoothProgress]);

  // Navbar: visible ONLY on hero scene, fades out at 0.16–0.20, never returns
  const navbarOpacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.20],
    [1,  1,    0]
  );
  const navbarY = useTransform(
    smoothProgress,
    [0, 0.14, 0.20],
    [0,  0,   -20]
  );

  return (
    <div ref={containerRef} className="relative bg-black text-white" style={{ height: '550vh' }}>

      {/* ── 3D starry background (fixed, always visible) ── */}
      <CinematicBackground />

      {/* ── Navbar: visible only on first + last scene ── */}
      <motion.div
        style={{ opacity: navbarOpacity, y: navbarY }}
        className="fixed top-0 w-full z-50"
      >
        <Navbar />
      </motion.div>

      {/* ══════════════════════════════════════════════
          STICKY CINEMA CONTAINER
      ══════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ─────────────────────────────────────────
            SCENE 1 · BOT INTRO + TITLE REVEAL
        ───────────────────────────────────────── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: heroBlur }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-10 md:px-24 gap-6"
        >
          {/* Bot Siddhi */}
          <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: phase >= 1 ? 1 : 0.8 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <BotSiddhi isSmiling={phase === 1} mouseX={mouseX} />

            {/* Greeting bubble */}
            <AnimatePresence>
              {phase >= 1 && phase < 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                  className="mt-4 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-2xl rounded-tl-sm shadow-2xl whitespace-nowrap"
                >
                  {greeting}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* FLEXICATALOG — from below, blurry → crisp */}
            {phase >= 2 && (
              <div className="flex flex-col items-center">
                <FlexiTitle show={phase >= 2} />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-[0.5em] mt-4"
                >
                  AI-Powered Product Discovery
                </motion.p>
              </div>
            )}

          {/* Subtitle + scroll cue */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6 mt-2"
              >

                {/* Scroll cue — fades away when user scrolls */}
                <AnimatePresence>
                  {!isScrolled && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center gap-2 text-slate-600"
                    >
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-[1px] h-10 bg-gradient-to-b from-blue-400/60 to-transparent"
                      />
                      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to discover</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─────────────────────────────────────────
            SCENE 2 · TAGLINE
        ───────────────────────────────────────── */}
        <motion.div
          style={{ opacity: tagOpacity, y: tagY }}
          className="absolute inset-0 z-20 flex items-center justify-center px-10 md:px-24 pointer-events-none"
        >
          <div className="text-center max-w-5xl">
            <div className="text-[4.5vw] md:text-[3.5vw] font-extralight leading-[1.1] text-white tracking-tight">
              A cinematic experience,
            </div>
            <div className="text-[4.5vw] md:text-[3.5vw] font-black leading-[1.1] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              engineered for perfection.
            </div>

          </div>
        </motion.div>

        {/* ─────────────────────────────────────────
            SCENE 3 · FEATURES
        ───────────────────────────────────────── */}
        <motion.div
          style={{ opacity: feat3Opacity, y: feat3Y }}
          className="absolute inset-0 z-20 flex items-center justify-center px-10 md:px-24 bg-black/85"
        >
          <div className="max-w-5xl w-full">
            <div className="text-center mb-12">
              <p className="text-blue-400 text-xs uppercase tracking-widest mb-3">Platform Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Engineered for Excellence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard icon={<Zap />}    title="Nano-Speed Engine"   desc="Sub-millisecond data delivery with zero-latency experience." color="text-yellow-400" bg="bg-yellow-400/10" border="border-yellow-400/20" delay={0.0} />
              <FeatureCard icon={<Cpu />}    title="Universal Schema"    desc="Adaptive architecture that maps complex product hierarchies automatically." color="text-blue-400" bg="bg-blue-400/10" border="border-blue-400/20" delay={0.1} />
              <FeatureCard icon={<Shield />} title="Enterprise Security" desc="Military-grade encryption. Always secure, always available." color="text-emerald-400" bg="bg-emerald-400/10" border="border-emerald-400/20" delay={0.2} />
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────
            SCENE 4 · STATS
        ───────────────────────────────────────── */}
        <StatsScene smoothProgress={smoothProgress} />

        {/* ─────────────────────────────────────────
            SCENE 5 · FINAL CTA
            Bot + button slide from LEFT, stop center
        ───────────────────────────────────────── */}
        <motion.div
          style={{ opacity: ctaOp, y: ctaY2 }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-10 px-10 md:px-24"
        >

          <div className="flex flex-col items-center gap-6">
            {/* Bot slides in from left */}
            <motion.div style={{ x: ctaBtnX, opacity: ctaBtnOp }} className="flex flex-col items-center gap-4">
              <CTABotIcon mouseX={mouseX} />
              <AnimatePresence>
                {showCTA && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="bg-white text-black text-sm font-bold px-5 py-2.5 rounded-2xl rounded-tl-sm shadow-2xl whitespace-nowrap"
                  >
                    👋 Let's explore together!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Explore button slides in with bot */}
            <motion.button
              style={{ x: ctaBtnX, opacity: ctaBtnOp }}
              onClick={() => navigate('/home')}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="group flex items-center gap-3 px-14 py-5 bg-white text-black rounded-full font-black text-xl tracking-wide shadow-[0_0_60px_rgba(255,255,255,0.35)] hover:shadow-[0_0_90px_rgba(255,255,255,0.55)] transition-shadow"
            >
              Explore Collection
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <p className="text-slate-700 text-xs">No sign-up required. Explore freely.</p>
        </motion.div>

      </div>{/* end sticky */}
    </div>
  );
};

export default Landing;
