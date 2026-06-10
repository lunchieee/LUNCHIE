import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapModal } from "@/components/map-modal";

const options = [
  { name: "Vietnamese Food Stall", emoji: "🍜" },
  { name: "Korean Food Stall", emoji: "🥢" },
  { name: "Chicken Rice Stall", emoji: "🍗" },
  { name: "Joy Kitchen", emoji: "😋" },
  { name: "Fried Yong Tau Foo Stall", emoji: "🍢" },
  { name: "Economic Rice / Mixed Rice Stall", emoji: "🍚" },
  { name: "Beverage Stall", emoji: "🧋" },
];

const COLORS = ["primary", "secondary", "accent"];

export default function QuadCafe() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  
  const shareToTeams = async (food: string) => {
  const message = `🍱 Lunchiee

    I'm heading to:

    NTU
    Quad Cafe
    ${food}

    Join me?`;

  try {
    await navigator.clipboard.writeText(message);

    window.open("https://teams.microsoft.com", "_blank");

    alert("Lunch choice copied! Paste it into Teams.");
  } catch (err) {
    console.error(err);
    alert("Unable to copy message.");
  }
};
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  if (selected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-6 text-center bg-accent text-accent-foreground"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          <h2 className="text-3xl font-bold mb-4">WE ARE EATING</h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase drop-shadow-lg">
            {selected}!
          </h1>
        </motion.div>
        
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  className="mt-12 flex flex-wrap gap-4 justify-center"
>
  <button
    onClick={() => shareToTeams(selected)}
    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform"
  >
    Share to Teams
  </button>

  <button
    onClick={() => setSelected(null)}
    className="bg-white text-accent-foreground font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform"
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
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-4xl pointer-events-none"
          >
            {["✨", "🎉", "🎊", "🍜", "🍗", "🥢"][Math.floor(Math.random() * 6)]}
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
      <div className="shrink-0 pt-6 pb-2 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black mb-1">
          Quad Cafe 🏫
        </h1>
        <p className="text-muted-foreground font-semibold text-lg">
          What are we having?
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-12 pb-24 pt-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {options.map((option, i) => (
          <motion.button
            key={option.name}
            variants={item}
            whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 2 : -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(option.name)}
            className="bg-white border-2 text-foreground font-bold p-5 rounded-2xl chunky-shadow text-base flex flex-col items-center justify-center text-center gap-2 min-h-[120px]"
            style={{
              borderColor: `hsl(var(--${COLORS[i % COLORS.length]}))`,
            }}
          >
            <span className="text-4xl">{option.emoji}</span>
            <span>{option.name}</span>
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
