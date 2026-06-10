import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function LetsGo() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-secondary text-secondary-foreground relative overflow-hidden">
      
      {/* Background radial rays */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: "repeating-conic-gradient(from 0deg, transparent 0deg 15deg, white 15deg 30deg)"
        }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
        transition={{ duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-black uppercase drop-shadow-2xl"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          LETS GO NOW! 🎉
        </motion.h1>
      </motion.div>

      {/* Confetti particles hack */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: "100%", 
            left: `${Math.random() * 100}%`,
            opacity: 1 
          }}
          animate={{ 
            top: "-10%", 
            left: `${Math.random() * 100}%`,
            opacity: 0,
            rotate: Math.random() * 720
          }}
          transition={{ 
            duration: 1.5 + Math.random() * 2, 
            delay: Math.random() * 0.5,
            repeat: Infinity
          }}
          className="absolute text-5xl pointer-events-none z-20"
        >
          {['✨', '🎉', '🎊', '🎈', '🔥'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setLocation("/")}
        className="relative z-30 mt-16 bg-white text-secondary font-bold py-4 px-8 rounded-full text-xl chunky-shadow-secondary hover:scale-105"
      >
        Start Over
      </motion.button>
    </div>
  );
}
