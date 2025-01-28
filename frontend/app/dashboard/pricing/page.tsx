"use client"

import { useState, useEffect } from "react"
import { PricingTiers } from "../../components/PricingTiers"
import { getUserTier } from "../../utils/userUtils"
import { BackToDashboardButton } from "../../components/BackToDashboardButton"

export default function PricingPage() {
  const [userTier, setUserTier] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserTier = async () => {
      const tier = await getUserTier()
      setUserTier(tier)
    }

    fetchUserTier()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 p-4">
      <div className="container mx-auto">
        <BackToDashboardButton />
        <h1 className="text-3xl font-bold text-red-800 mb-6">Upgrade Your Plan</h1>
        {userTier && (
          <p className="text-lg text-gray-700 mb-8">
            Your current plan: <span className="font-semibold">{userTier}</span>
          </p>
        )}
        <PricingTiers currentTier={userTier} onSelectPlan={(plan) => console.log(`Selected plan: ${plan}`)} />
      </div>
    </div>
  )
}

