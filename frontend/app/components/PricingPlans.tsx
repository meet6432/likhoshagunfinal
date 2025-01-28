import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "For small events and testing",
      features: [
        { name: "Up to 50 gifts", included: true },
        { name: "Basic analytics", included: true },
        { name: "CSV export", included: true },
        { name: "1 event", included: true },
        { name: "Email support", included: false },
        { name: "Custom branding", included: false },
      ],
    },
    {
      name: "Freemium",
      price: "₹999",
      description: "For medium-sized events",
      features: [
        { name: "Up to 200 gifts", included: true },
        { name: "Advanced analytics", included: true },
        { name: "CSV & PDF export", included: true },
        { name: "Up to 3 events", included: true },
        { name: "Email support", included: true },
        { name: "Custom branding", included: false },
      ],
    },
    {
      name: "Premium",
      price: "₹2,999",
      description: "For large events and professionals",
      features: [
        { name: "Unlimited gifts", included: true },
        { name: "Advanced analytics with insights", included: true },
        { name: "All export options", included: true },
        { name: "Unlimited events", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: true },
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
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="border-2 border-red-200 hover:border-red-400 transition-colors duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-red-800">{plan.name}</CardTitle>
                <CardDescription className="text-red-600 font-medium text-lg">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  {plan.name === "Free" ? "Get Started" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPlans

