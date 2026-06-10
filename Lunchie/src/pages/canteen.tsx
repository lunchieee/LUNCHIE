import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapModal } from "@/components/map-modal";

export default function Canteen() {
  const [, setLocation] = useLocation();
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full p-6 text-center relative"
    >
      <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
        Where we eating? 😋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/north-spine")}
          className="bg-white border-4 border-foreground text-foreground text-3xl md:text-4xl font-black py-12 px-6 rounded-[2rem] chunky-shadow flex items-center justify-center h-64"
        >
          North Spine Plaza
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/quad-cafe")}
          className="bg-white border-4 border-foreground text-foreground text-3xl md:text-4xl font-black py-12 px-6 rounded-[2rem] chunky-shadow flex items-center justify-center h-64"
        >
          Quad Cafe
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMapOpen(true)}
        className="absolute bottom-8 right-8 text-4xl bg-white rounded-full p-2 shadow-lg border-2 border-foreground hover:shadow-xl transition-shadow"
        title="View Campus Map"
      >
        🗺️
      </motion.button>

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </motion.div>
  );
}
