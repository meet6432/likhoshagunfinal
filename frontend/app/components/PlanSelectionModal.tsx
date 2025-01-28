"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PricingTiers } from "./PricingTiers"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import RazorpayPayment from "./RazorpayPayment"

interface PlanSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string | null
  onPlanChange: (plan: string) => void
}

export function PlanSelectionModal({ isOpen, onClose, currentPlan, onPlanChange }: PlanSelectionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelection = (plan: string) => {
    if ((currentPlan === "Free" && plan !== "Free") || (currentPlan === "Basic" && plan === "Premium")) {
      setSelectedPlan(plan)
    } else if (plan === currentPlan) {
      toast({
        title: "Plan Change Restricted",
        description: "You are already on this plan.",
        variant: "destructive",
      })
    } else if (plan === "Free" && currentPlan !== "Free") {
      toast({
        title: "Downgrade Not Allowed",
        description: "You cannot downgrade to the Free plan once you've upgraded.",
        variant: "destructive",
      })
    }
  }

  const handlePaymentSuccess = (paymentId: string) => {
    if (selectedPlan) {
      onPlanChange(selectedPlan)
      toast({
        title: "Payment Successful",
        description: `Your payment (ID: ${paymentId}) has been processed. Your plan has been updated to ${selectedPlan}.`,
      })
      onClose()
    }
  }

  const getPlanPrice = (plan: string): number => {
    switch (plan) {
      case "Basic":
        return 119
      case "Premium":
        return 299
      default:
        return 0
    }
  }

  const paymentButton = selectedPlan && (
    <RazorpayPayment amount={getPlanPrice(selectedPlan)} onSuccess={handlePaymentSuccess} planName={selectedPlan} />
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-red-100 to-orange-100 border-b border-red-200">
          <DialogTitle className="text-2xl font-bold text-red-800">
            {currentPlan === "Free" ? "Choose Your Plan" : "Upgrade Your Plan"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 py-4 h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-600">Loading plans...</p>
            </div>
          ) : (
            <PricingTiers
              currentTier={currentPlan}
              onSelectPlan={handlePlanSelection}
              selectedPlan={selectedPlan}
              paymentButton={paymentButton}
            />
          )}
        </ScrollArea>
        <div className="p-6 flex justify-between items-center border-t border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
          <Button onClick={onClose} variant="outline" className="border-red-300 text-red-800 hover:bg-red-100">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

