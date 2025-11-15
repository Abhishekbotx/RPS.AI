// utils/game.ts
export type Move = "rock" | "paper" | "scissors";
export type GestureType = "rock" | "paper" | "scissors" | "unknown";

export function randomMove(): Move {
  const arr: Move[] = ["rock", "paper", "scissors"];
  return arr[Math.floor(Math.random() * arr.length)];
}

export function computeResult(user: Move, comp: Move): "You Win" | "You Lose" | "Draw" {
  if (user === comp) return "Draw";
  if (user === "rock" && comp === "scissors") return "You Win";
  if (user === "paper" && comp === "rock") return "You Win";
  if (user === "scissors" && comp === "paper") return "You Win";
  return "You Lose";
}
