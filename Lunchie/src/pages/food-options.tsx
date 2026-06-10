import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapModal } from "@/components/map-modal";

const options = [
  "Boost Juice",
  "Each-a-Cup",
  "Encik Tan",
  "Gelare",
  "Nine Fresh",
  "Popeyes",
  "Starbucks",
  "Subway",
  "McDonald's",
  "KFC",
  "Mr Bean",
  "The Soup Spoon Union",
  "PEN & INC",
  "Blue Ocean",
  "North Spine Food Court (Koufu)",
  "Paik's Bibim",
  "Crowded Bowl",
  "QQ Rice",
  "Pasta Express",
];

export default function FoodOptions() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (selected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-6 text-center bg-primary text-primary-foreground"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          <h2 className="text-3xl font-bold mb-4">WE ARE EATING</h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase drop-shadow-lg">
            {selected}!
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <button
            onClick={() => setSelected(null)}
            className="bg-white text-primary font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform"
          >
            Actually, nah
          </button>
        </motion.div>

        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: "50%", left: "50%", opacity: 1 }}
            animate={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-4xl pointer-events-none"
          >
            {['✨', '🎉', '🎊', '🍔', '🍟', '🥤'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[100dvh] w-full flex flex-col relative"
    >
      <h1 className="text-3xl md:text-5xl font-black pt-6 pb-4 px-6 text-center shrink-0">
        North Spine Eats 🍽️
      </h1>

      <div className="flex-1 overflow-y-auto px-4 md:px-12 pb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
      >
        {options.map((option, i) => (
          <motion.button
            key={option}
            variants={item}
            whileHover={{ scale: 1.05, rotate: (i % 2 === 0 ? 2 : -2) }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(option)}
            className="bg-white border-2 border-border text-foreground font-bold p-4 rounded-2xl chunky-shadow text-lg flex items-center justify-center text-center min-h-[100px]"
            style={{
              borderColor: `hsl(var(--${i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent'}))`
            }}
          >
            {option}
          </motion.button>
        ))}
      </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMapOpen(true)}
        className="fixed bottom-8 right-8 text-4xl bg-white rounded-full p-2 shadow-lg border-2 border-foreground hover:shadow-xl transition-shadow z-40"
        title="View Campus Map"
      >
        🗺️
      </motion.button>

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </motion.div>
  );
}
