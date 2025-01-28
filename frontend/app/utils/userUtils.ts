export async function getUserTier(): Promise<string> {
  // Simulating an API call or database lookup
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if the user has logged in before
  const hasLoggedIn = localStorage.getItem("hasLoggedIn")

  if (!hasLoggedIn) {
    // First time login, set to Free and mark as logged in
    localStorage.setItem("hasLoggedIn", "true")
    localStorage.setItem("userPlan", "Free")
    return "Free"
  }

  // Return the stored plan, defaulting to 'Free' if not set
  return localStorage.getItem("userPlan") || "Free"
}

export function signIn(email: string): void {
  localStorage.setItem("userEmail", email)
  // You might want to fetch and set the user's plan here as well
}

export function signOut(): void {
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userPlan")
  localStorage.removeItem("hasLoggedIn")
  // Clear IndexedDB data
  if (typeof window !== "undefined" && window.indexedDB) {
    window.indexedDB.deleteDatabase("chandla-db")
  }
}

