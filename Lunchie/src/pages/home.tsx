import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { RunawayButton } from "@/components/runaway-button";

function PlateIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="100"
      height="100"
      fill="none"
      className="inline-block drop-shadow-md"
    >
      <ellipse cx="32" cy="40" rx="22" ry="6" fill="#f3c97a" />
      <ellipse cx="32" cy="37" rx="22" ry="10" fill="#fff" stroke="#222" strokeWidth="2.5" />
      <ellipse cx="32" cy="37" rx="16" ry="7" fill="#fce9c8" />
      <line x1="14" y1="10" x2="14" y2="30" stroke="#222" strokeWidth="3" strokeLinecap="round" />
      <line x1="11" y1="10" x2="11" y2="20" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="10" x2="14" y2="20" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="10" x2="17" y2="20" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 48 10 Q 54 18 50 26 L 48 30" stroke="#222" strokeWidth="3" strokeLinecap="round" fill="none" />
      <line x1="48" y1="10" x2="48" y2="30" stroke="#222" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [noVisible, setNoVisible] = useState(true);
  const [cheekyMessage, setCheekyMessage] = useState("");
  const [pulseYes, setPulseYes] = useState(false);
  const [showIKnewIt, setShowIKnewIt] = useState(false);

  const handleMaxEscapes = () => {
    setNoVisible(false);
    setCheekyMessage("fine, suit yourself 😤");
    setPulseYes(true);
    setTimeout(() => {
      setCheekyMessage("");
      setNoVisible(true);
    }, 2500);
  };

  const handleYes = () => {
    setShowIKnewIt(true);
    setTimeout(() => setLocation("/school"), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-6 text-center"
    >
      <motion.div
        className="flex flex-col items-center mb-12"
        animate={{ rotate: [-12, 12, -12] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <PlateIcon />
        <h1 className="text-5xl md:text-7xl font-black mt-4 tracking-tight text-foreground">
          DO YOU WANT LUNCHIEE?
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-sm md:text-base text-muted-foreground italic font-medium -mt-8 mb-10 px-4"
      >
        Productivity may pause, but the pursuit of nourishment continues.
      </motion.p>

      <div className="relative flex flex-row items-center justify-center gap-6 w-full max-w-lg px-4">
        <div className="relative flex-1 flex justify-center">
          <motion.button
            animate={pulseYes ? { scale: [1, 1.2, 1] } : {}}
            transition={pulseYes ? { repeat: Infinity, duration: 1 } : {}}
            onClick={handleYes}
            className="bg-primary text-primary-foreground text-3xl md:text-4xl font-bold py-5 px-8 md:px-12 rounded-full chunky-shadow z-10 relative w-full max-w-[160px]"
          >
            YES
          </motion.button>

          <AnimatePresence>
            {showIKnewIt && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -60 }}
                exit={{ opacity: 0 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full z-50 pointer-events-none"
              >
                <div className="bg-yellow-400 text-yellow-900 font-black text-lg px-4 py-2 rounded-2xl shadow-xl whitespace-nowrap border-2 border-yellow-600 -rotate-3">
                  I KNEW IT! 😏
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex justify-center">
          <AnimatePresence>
            {noVisible && (
              <RunawayButton
                maxEscapes={5}
                onMaxEscapes={handleMaxEscapes}
                className="bg-secondary text-secondary-foreground text-3xl md:text-4xl font-bold py-5 px-8 md:px-12 rounded-full chunky-shadow-secondary z-20 w-full max-w-[160px]"
              >
                NO
              </RunawayButton>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {cheekyMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-lg font-bold text-destructive -rotate-6 bg-white px-4 py-2 rounded-xl shadow-lg border-2 border-destructive whitespace-nowrap"
            >
              {cheekyMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
