import { Check } from "lucide-react"

export function PricingShowcase() {
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
    <div className="py-12 bg-gradient-to-br from-red-100 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-red-800 sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-600">Choose the perfect plan for your needs</p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="border-2 border-red-200 rounded-lg shadow-sm divide-y divide-red-200 bg-white"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-red-800">{tier.name}</h2>
                <p className="mt-4 text-red-600 font-medium text-lg">{tier.price}</p>
                <p className="mt-2 text-gray-600">{tier.description}</p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

