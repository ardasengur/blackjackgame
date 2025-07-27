import { motion } from "framer-motion"

type Props = {
  code: string
  delay?: number
}

export default function Card({ code, delay = 0 }: Props) {
  const isHidden = code === "🂠"
  const suit = code.slice(-1)
  const value = code.slice(0, -1)
  const suitColor = suit === "♥" || suit === "♦" ? "text-red-600" : "text-black"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 60, x: -40 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="w-16 h-24 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-xl font-bold"
    >
      {isHidden ? (
        <div className="w-full h-full bg-gray-700 rounded-xl text-white text-3xl flex items-center justify-center">
          🂠
        </div>
      ) : (
        <>
          <div className={suitColor}>{value}</div>
          <div className={suitColor}>{suit}</div>
        </>
      )}
    </motion.div>
  )
}
