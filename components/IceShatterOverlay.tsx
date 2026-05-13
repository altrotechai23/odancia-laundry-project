import { motion } from "framer-motion"

const IceShatterOverlay = () => {
  // Define custom "shard" shapes using clip-path
  const shards = [
    "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
    "polygon(20% 0, 100% 0, 100% 100%, 0% 80%)",
    "polygon(0 0, 100% 20%, 100% 100%, 20% 100%)",
    "polygon(0 0, 80% 0, 100% 100%, 0% 100%)",
    // Add more variety as needed
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none grid grid-cols-3 grid-rows-4">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            scale: 1.5,
            // Randomize direction: shards fly away from center
            x: (i % 3 - 1) * 300,
            y: (Math.floor(i / 3) - 1.5) * 300,
            rotate: (Math.random() - 0.5) * 45,
            transition: {
              duration: 1.2,
              delay: i * 0.05, // Slight stagger for a "chain reaction" break
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          className="w-full h-full bg-white/40 backdrop-blur-2xl border-[0.5px] border-white/30"
          style={{
            clipPath: shards[i % shards.length],
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.5)"
          }}
        />
      ))}
    </div>
  );
};
