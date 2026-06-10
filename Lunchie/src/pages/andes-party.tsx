import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const EMOJIS = ["🎉", "🎊", "🥳", "✨", "🌟", "💃", "🕺", "🎈", "🔥", "💥", "🌈", "🎶"];

export default function AndesParty() {
  const [, setLocation] = useLocation();

  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        startLeft: Math.random() * 100,
        endLeft: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 24 + Math.floor(Math.random() * 28),
      })),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full text-center relative overflow-hidden bg-gradient-to-br from-pink-300 via-yellow-200 to-cyan-300">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background: "repeating-conic-gradient(from 0deg, transparent 0deg 15deg, white 15deg 30deg)",
        }}
      />

      {confetti.map((c) => (
        <motion.div
          key={c.id}
          initial={{ top: "110%", left: `${c.startLeft}%`, opacity: 1, rotate: 0 }}
          animate={{
            top: "-15%",
            left: `${c.endLeft}%`,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none select-none z-20"
          style={{ fontSize: c.size }}
        >
          {c.emoji}
        </motion.div>
      ))}

      <div className="relative z-30 flex flex-col items-center gap-6 px-6">
        <motion.h1
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{ duration: 0.7, times: [0, 0.5, 1] }}
          className="text-5xl md:text-7xl font-black uppercase leading-tight drop-shadow-xl"
          style={{
            background: "linear-gradient(90deg,#FF6B6B,#FFD93D,#6BCB77,#4D96FF,#FF6B6B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
          }}
        >
          <motion.span
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ display: "block" }}
          >
            LETS GO NOW!!
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.4, duration: 0.5 }, y: { delay: 0.8, duration: 1.2, repeat: Infinity, ease: "easeInOut" } }}
          className="text-3xl md:text-5xl font-black text-white drop-shadow-lg"
        >
          LIFT UP UR BUTT! 🍑
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
          style={{ width: 280, height: 280 }}
        >
          <img
            src="https://media1.tenor.com/m/RdYowW9KtNMAAAAd/dancing-happy-dance.gif"
            alt="Dancing!"
            className="w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setLocation("/")}
          className="bg-white text-pink-600 font-black py-4 px-10 rounded-full text-xl shadow-xl hover:scale-105 transition-transform border-2 border-pink-300"
        >
          Start Over 🔄
        </motion.button>
      </div>
    </div>
  );
}
