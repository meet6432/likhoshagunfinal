import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export interface PricingTiersProps {
  currentTier: string | null
  onSelectPlan: (plan: string) => void
  selectedPlan: string | null
  paymentButton: React.ReactNode
}

export function PricingTiers({ currentTier, onSelectPlan, selectedPlan, paymentButton }: PricingTiersProps) {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      description: "For small events and testing",
      features: [
        "Up to 150 gifts",
        "Basic gift list and guest management",
        "Simple analytics (total gifts, total amount)",
        "Create 1 event",
      ],
    },
    {
      name: "Basic",
      price: "₹119",
      description: "For medium-sized events",
      features: [
        "Up to 800 gifts",
        "Advanced gift list and guest management",
        "Basic analytics (gift distribution, payment modes)",
        "CSV and HTML export",
        "Thank you note tracker",
        "Email support",
        "Create up to 4 events",
      ],
    },
    {
      name: "Premium",
      price: "₹299",
      description: "For large events and professionals",
      features: [
        "Up to 2000 gifts",
        "Advanced gift and guest management",
        "Comprehensive analytics (trends, insights)",
        "All export options (CSV, HTML, Excel)",
        "Thank you note tracker with templates",
        "Priority email and chat support",
        "Custom branding options",
        "Create up to 20 events",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`rounded-lg transition-all duration-300 overflow-hidden ${
            selectedPlan === tier.name
              ? "border-4 border-red-500 shadow-lg transform scale-[1.02]"
              : currentTier === tier.name
                ? "border-4 border-green-500"
                : "border-2 border-red-200 hover:border-red-400"
          }`}
        >
          <div className={`p-6 ${selectedPlan === tier.name ? "bg-red-50" : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-red-800">{tier.name}</h3>
                <p className="text-red-600 font-medium text-lg mt-1">{tier.price}</p>
              </div>
              {currentTier === tier.name && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{tier.description}</p>
            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            {tier.name !== "Free" && (
              <div className="mt-6">
                {selectedPlan === tier.name ? (
                  paymentButton
                ) : (
                  <Button
                    className={`w-full ${
                      currentTier === tier.name
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                    disabled={currentTier === tier.name}
                    onClick={() => onSelectPlan(tier.name)}
                  >
                    {currentTier === tier.name ? "Current Plan" : `Select ${tier.name} Plan`}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

