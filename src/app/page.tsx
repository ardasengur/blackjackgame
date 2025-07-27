"use client"

import GameBoard from "../../components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center p-4">
      <GameBoard />
    </main>
  )
}
