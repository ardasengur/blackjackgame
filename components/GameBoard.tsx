"use client"

import { useState } from "react"
import Card from "./Card"
import {
  generateDeck,
  drawCard,
  calculateScore,
  calculateScoreDetailed,
} from "../lib/blackjackLogic"

export default function GameBoard() {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const [deck, setDeck] = useState<string[]>([])
  const [playerCards, setPlayerCards] = useState<string[]>([])
  const [dealerCards, setDealerCards] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [message, setMessage] = useState("")
  const [showDealerSecondCard, setShowDealerSecondCard] = useState(false)

  const playerScoreDetailed = calculateScoreDetailed(playerCards)
  const dealerVisibleScore = calculateScoreDetailed([dealerCards[0]])
  const dealerFullScore = calculateScoreDetailed(dealerCards)

  const startGame = () => {
    const newDeck = generateDeck()
    const player = [drawCard(newDeck), drawCard(newDeck)]
    const dealer = [drawCard(newDeck), drawCard(newDeck)]

    setDeck(newDeck)
    setPlayerCards(player)
    setDealerCards(dealer)
    setIsGameOver(false)
    setShowDealerSecondCard(false)
    setMessage("")
  }

  const handleHit = () => {
    const newDeck = [...deck]
    const newCard = drawCard(newDeck)
    const newHand = [...playerCards, newCard]
    setPlayerCards(newHand)
    setDeck(newDeck)

    const playerScore = calculateScore(newHand)
    if (playerScore > 21) {
      setIsGameOver(true)
      setShowDealerSecondCard(true)
      setMessage("💥 You busted! Dealer wins.")
    }
  }

  // GameBoard.tsx içinden snippet
const handleStand = async () => {
  const newDeck = [...deck]      // let -> const
  const dealerHand = [...dealerCards]  // let -> const
  setShowDealerSecondCard(true)

  while (calculateScore(dealerHand) < 17) {
    const card = drawCard(newDeck)
    dealerHand.push(card)
    setDealerCards([...dealerHand])
    await sleep(800)
  }

  setDealerCards(dealerHand)
  setDeck(newDeck)
  await sleep(600)

  const playerScore = calculateScore(playerCards)
  const dealerScore = calculateScore(dealerHand)

  setIsGameOver(true)

  if (dealerScore > 21 || playerScore > dealerScore) {
    setMessage("🎉 You win!")
  } else if (dealerScore === playerScore) {
    setMessage("🤝 It's a tie.")
  } else {
    setMessage("💀 Dealer wins.")
  }
}


  return (
    <div className="flex flex-col items-center gap-6 mt-10 max-w-screen-md w-full">
      <h1 className="text-4xl font-bold text-white drop-shadow">♠ Blackjack ♣</h1>

      <div className="flex flex-col gap-6 w-full">
        {/* Dealer */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-gray-400">Dealer</p>
          <p className="text-sm text-gray-300">
            Sum:{" "}
            {showDealerSecondCard
              ? dealerFullScore
              : `${dealerVisibleScore} + ?`}
          </p>
          <div className="flex gap-2 justify-center">
            {dealerCards.map((card, index) => {
              const hidden = index === 1 && !showDealerSecondCard
              return (
                <Card
                  key={index}
                  code={hidden ? "🂠" : card}
                  delay={index * 0.4}
                />
              )
            })}
          </div>
        </div>

        {/* Player */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-gray-400">You</p>
          <p className="text-sm text-gray-300">Sum: {playerScoreDetailed}</p>
          <div className="flex gap-2 justify-center">
            {playerCards.map((card, index) => (
              <Card key={index} code={card} delay={index * 0.4} />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isGameOver && playerCards.length > 0 && (
          <>
            <button
              onClick={handleHit}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl transition font-medium"
            >
              Hit
            </button>
            <button
              onClick={handleStand}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black rounded-xl transition font-medium"
            >
              Stand
            </button>
          </>
        )}
        <button
          onClick={startGame}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium"
        >
          {isGameOver || playerCards.length === 0 ? "Deal" : "Restart"}
        </button>
      </div>

      {message && <p className="text-xl text-white mt-4">{message}</p>}
    </div>
  )
}
