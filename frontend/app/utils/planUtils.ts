export function getEventLimit(plan: string): number {
  switch (plan) {
    case "Premium":
      return 20
    case "Basic":
      return 4
    default:
      return 1
  }
}

export function getGiftLimit(plan: string): number {
  switch (plan) {
    case "Premium":
      return 2000
    case "Basic":
      return 800
    default:
      return 150
  }
}

