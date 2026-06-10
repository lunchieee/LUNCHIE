import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RunawayButtonProps {
  children: React.ReactNode;
  maxEscapes?: number;
  onMaxEscapes?: () => void;
  onCatch?: () => void;
  className?: string;
  fineText?: string;
  popupPosition?: "above" | "right" | "left";
}

export function RunawayButton({
  children,
  maxEscapes = Infinity,
  onMaxEscapes,
  onCatch,
  className = "",
  fineText = "FINE! 😤",
  popupPosition = "above",
}: RunawayButtonProps) {
  const [escapes, setEscapes] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showFine, setShowFine] = useState(false);

  const isCaught = escapes >= maxEscapes;

  const moveButton = () => {
    if (isCaught) return;

    const isMobile = window.innerWidth < 640;
    const maxX = isMobile ? window.innerWidth / 2 - 80 : window.innerWidth / 2 - 120;
    const maxY = isMobile ? window.innerHeight / 4 - 40 : window.innerHeight / 2 - 60;

    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;

    setPosition({ x: newX, y: newY });
    const nextEscapes = escapes + 1;
    setEscapes(nextEscapes);

    if (nextEscapes >= maxEscapes) {
      setShowFine(true);
      if (onMaxEscapes) onMaxEscapes();
    }
  };

  const handleClick = () => {
    if (isCaught) {
      if (onCatch) onCatch();
    } else {
      moveButton();
    }
  };

  const popupClasses: Record<string, string> = {
    above: "absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full",
    right: "absolute left-full top-1/2 -translate-y-1/2 ml-3",
    left: "absolute right-full top-1/2 -translate-y-1/2 mr-3",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <AnimatePresence>
        {showFine && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`${popupClasses[popupPosition]} z-50 pointer-events-none`}
          >
            <div className="bg-red-500 text-white font-black text-sm px-3 py-2 rounded-2xl shadow-lg whitespace-nowrap border-2 border-red-700">
              {fineText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        onMouseEnter={!isCaught ? moveButton : undefined}
        onClick={handleClick}
        className={className}
        style={isCaught ? { backgroundColor: "rgb(239 68 68)", color: "white", cursor: "pointer" } : {}}
      >
        {children}
      </motion.button>
    </div>
  );
}
