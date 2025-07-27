const suits = ["♠", "♥", "♦", "♣"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export function generateDeck(): string[] {
  const deck: string[] = []
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}${suit}`)
    }
  }
  return shuffle(deck)
}

export function drawCard(deck: string[]): string {
  const card = deck.pop()
  if (!card) throw new Error("Tried to draw a card from an empty deck.")
  return card
}



export function calculateScore(hand: string[]): number {
  let score = 0
  let aces = 0

  for (const card of hand) {
    if (!card) continue

    const value = card.slice(0, -1)
    if (["K", "Q", "J"].includes(value)) {
      score += 10
    } else if (value === "A") {
      aces += 1
      score += 11
    } else {
      score += parseInt(value)
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10
    aces -= 1
  }

  return score
}
// blackjackLogic.ts içinden snippet
export function calculateScoreDetailed(hand: string[] | undefined): string {
  if (!hand || hand.length === 0 || hand.some(card => card === undefined)) return "0"

  let score = 0
  let aces = 0

  for (const card of hand) {
    if (!card) continue
    const value = card.slice(0, -1)
    if (["K", "Q", "J"].includes(value)) {
      score += 10
    } else if (value === "A") {
      aces += 1
      score += 11
    } else {
      score += parseInt(value)
    }
  }

  const scores: number[] = [score]  // let -> const
  for (let i = 0; i < aces; i++) {
    score -= 10
    scores.push(score)
  }

  const validScores = scores.filter(s => s <= 21)
  if (validScores.length === 0) {
    return `${Math.min(...scores)}`
  } else {
    const uniqueScores = Array.from(new Set(validScores))
    return uniqueScores.join(" or ")
  }
}




function shuffle(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
