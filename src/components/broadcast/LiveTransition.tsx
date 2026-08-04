import { motion } from "framer-motion";

export function LiveTransition() {
  return (
    <motion.div
      className="
        absolute
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/35
        backdrop-blur-[2px]
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="text-center">

        <p
          className="
            text-sm
            uppercase
            tracking-[0.55em]
            text-[#C79A35]
            font-semibold
          "
        >
          OFFICIAL LIVE AUCTION
        </p>

        <h1
          className="
            mt-6
            text-7xl
            font-black
            tracking-[-0.05em]
            text-[#F5E7C2]
          "
        >
          LIVE PLAYER
        </h1>

        <p
          className="
            mt-6
            text-2xl
            text-[#D7C39A]
          "
        >
          Coming to Auction...
        </p>

      </div>
    </motion.div>
  );
}