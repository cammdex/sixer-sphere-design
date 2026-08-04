import { motion } from "framer-motion";

const particles = Array.from({ length: 18 });

export function BroadcastDust() {
  return (
    <>
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${5 + Math.random() * 90}%`,
            top: `${10 + Math.random() * 80}%`,
            background: "rgba(255,238,200,.45)",
            filter: "blur(.4px)",
          }}
          animate={{
            y: [-8, 8, -8],
            x: [-3, 3, -3],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </>
  );
}