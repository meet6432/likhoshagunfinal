export const USD_TO_INR_RATE = 75

export function convertToINR(usdAmount: number): number {
  return usdAmount * USD_TO_INR_RATE
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function convertToUSD(inrAmount: number): number {
  return inrAmount / USD_TO_INR_RATE
}

