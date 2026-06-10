import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { RunawayButton } from "@/components/runaway-button";

const BG_EMOJIS = ["🍜", "🍔", "🌮", "🍕", "🍣", "🥗", "🍛", "🍱", "🧆", "🍝", "❓", "📍"];

function FloatingBgEmoji({ emoji, delay, x, y, size }: { emoji: string; delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-20"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
      animate={{
        y: [0, -18, 0, 10, 0],
        rotate: [-8, 8, -5, 5, -8],
        opacity: [0.12, 0.22, 0.12],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

function ColorfulEgg() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 90, height: 110 }}>
      <svg viewBox="0 0 90 110" width="90" height="110" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="egg-clip">
            <ellipse cx="45" cy="58" rx="38" ry="48" />
          </clipPath>
        </defs>
        <ellipse cx="45" cy="58" rx="38" ry="48" fill="#fff" stroke="#e0c060" strokeWidth="3" />
        <rect x="0" y="30" width="90" height="18" fill="#FF6B6B" clipPath="url(#egg-clip)" />
        <rect x="0" y="48" width="90" height="18" fill="#FFD93D" clipPath="url(#egg-clip)" />
        <rect x="0" y="66" width="90" height="18" fill="#6BCB77" clipPath="url(#egg-clip)" />
        <rect x="0" y="84" width="90" height="18" fill="#4D96FF" clipPath="url(#egg-clip)" />
        <ellipse cx="45" cy="58" rx="38" ry="48" fill="none" stroke="#e0c060" strokeWidth="3" />
        <circle cx="28" cy="42" r="5" fill="white" opacity="0.5" />
        <circle cx="60" cy="70" r="4" fill="white" opacity="0.4" />
        <circle cx="50" cy="35" r="3" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
}

function EasterEggPopup({ onClose, onParty }: { onClose: () => void; onParty: () => void }) {
  const handleParty = () => {
    onClose();
    onParty();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative z-10 bg-white rounded-3xl p-8 max-w-sm w-full mx-6 text-center shadow-2xl border-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "linear-gradient(135deg, #fff9e6 0%, #fff 60%, #f0fff4 100%)" }}
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-3"
        >
          <ColorfulEgg />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-black mb-1"
          style={{ color: "#e65c00" }}
        >
          🎊 EASTER EGG FOUND! 🎊
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-gray-600 font-semibold mb-1 text-sm"
        >
          You found the secret ANDES button 🤫
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-xs text-gray-400 mb-6"
        >
          Pssst... Andes is a canteen too. Just vibes though 👀
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <button
            onClick={handleParty}
            className="font-black py-3 px-8 rounded-full text-lg text-white hover:scale-105 transition-transform shadow-lg"
            style={{ background: "linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF)" }}
          >
            Nice find! 🎉
          </button>
        </motion.div>

        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: (Math.random() - 0.5) * 240,
              y: (Math.random() - 0.5) * 240,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.4, delay: 0.2 + i * 0.04, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 pointer-events-none text-2xl"
          >
            {["🥚", "✨", "🌟", "💛", "💚", "💙", "❤️", "🎊"][i % 8]}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function School() {
  const [, setLocation] = useLocation();
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const bgEmojis = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        emoji: BG_EMOJIS[i % BG_EMOJIS.length],
        x: Math.random() * 95,
        y: Math.random() * 90,
        delay: Math.random() * 3,
        size: 20 + Math.floor(Math.random() * 22),
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-6 text-center relative overflow-hidden"
    >
      {/* Pulsing radial anticipation background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 50%, rgba(255,180,50,0.18) 0%, rgba(255,100,100,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(100,180,255,0.18) 0%, rgba(150,80,255,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(100,220,120,0.18) 0%, rgba(255,220,50,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse at 50% 50%, rgba(255,180,50,0.18) 0%, rgba(255,100,100,0.08) 40%, transparent 70%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Expanding ring pulses */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-primary/20 z-0"
          style={{ width: 120, height: 120, top: "50%", left: "50%", marginLeft: -60, marginTop: -60 }}
          animate={{ scale: [1, 5], opacity: [0.4, 0] }}
          transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Floating background emojis */}
      {bgEmojis.map((e) => (
        <FloatingBgEmoji key={e.id} emoji={e.emoji} delay={e.delay} x={e.x} y={e.y} size={e.size} />
      ))}

      <motion.h1
        className="text-4xl md:text-6xl font-black mb-8 md:mb-16 tracking-tight relative z-30"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        WHERE TO AMIGOS?
      </motion.h1>

      <div className="flex flex-row items-center justify-center gap-6 md:gap-16 w-full max-w-4xl relative z-30 px-4 min-h-40">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/ntu-canteens")}
          className="bg-accent text-accent-foreground text-3xl md:text-5xl font-black py-5 px-8 md:py-8 md:px-16 rounded-3xl chunky-shadow-accent"
        >
          NTU
        </motion.button>

        <RunawayButton
          maxEscapes={5}
          onCatch={() => setLocation("/andes-party")}
          fineText="FINE FINE! 😤"
          popupPosition="right"
          className="bg-primary text-primary-foreground text-3xl md:text-5xl font-black py-5 px-8 md:py-8 md:px-16 rounded-3xl chunky-shadow"
        >
          NIE
        </RunawayButton>
      </div>

      {/* Chris Pratt hype GIF — bottom right, peeking up (below buttons on mobile) */}
      <motion.div
        className="absolute bottom-0 right-2 md:right-4 z-0 flex flex-col items-center"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 18 }}
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-t-2xl overflow-hidden border-4 border-b-0 border-white shadow-2xl"
          style={{ width: "clamp(110px, 22vw, 230px)", height: "clamp(110px, 22vw, 230px)" }}
        >
          <img
            src="https://media1.tenor.com/m/QC7e6PuyMb4AAAAd/chris-pratt-andy-dwyer.gif"
            alt="hyped!"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="bg-white text-xs font-black px-3 py-1 rounded-full shadow border-2 border-foreground -mt-1"
        >
          pick one!! 👆
        </motion.div>
      </motion.div>

      {/* ANDES easter egg button — top left */}
      <motion.button
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(250,204,21,0.3)",
            "0 0 18px 6px rgba(250,204,21,0.7)",
            "0 0 8px 2px rgba(250,204,21,0.3)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowEasterEgg(true)}
        className="absolute top-4 left-4 text-xs font-bold text-yellow-600 opacity-50 hover:opacity-90 transition-opacity p-2 rounded-full border border-dashed border-yellow-400 bg-yellow-50 z-20"
        title="?"
      >
        ANDES?
      </motion.button>

      <AnimatePresence>
        {showEasterEgg && (
          <EasterEggPopup
            onClose={() => setShowEasterEgg(false)}
            onParty={() => setLocation("/andes-party")}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
