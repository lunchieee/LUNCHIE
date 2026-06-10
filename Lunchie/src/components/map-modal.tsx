import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
}

export function MapModal({ open, onClose }: MapModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-foreground w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
            style={{ height: "75vh" }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground bg-accent">
              <span className="font-black text-lg text-accent-foreground">🗺️ NTU Campus Map</span>
              <button
                onClick={onClose}
                className="font-black text-2xl text-accent-foreground hover:scale-110 transition-transform leading-none"
                aria-label="Close map"
              >
                ✕
              </button>
            </div>
            <iframe
              src="https://maps.ntu.edu.sg/"
              title="NTU Campus Map"
              className="w-full h-full border-0"
              style={{ height: "calc(100% - 56px)" }}
              allow="geolocation"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
