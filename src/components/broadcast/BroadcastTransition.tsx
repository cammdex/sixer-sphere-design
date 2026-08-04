import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BROADCAST_TIMINGS } from "./utils/timings";

interface BroadcastTransitionProps {
  sceneKey: string;
  children: ReactNode;
}

export function BroadcastTransition({
  sceneKey,
  children,
}: BroadcastTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sceneKey}
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
        "
        initial={{
          opacity: 0,
          scale: 0.96,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(2px)",
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}