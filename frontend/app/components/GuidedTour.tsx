"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GuidedTourProps {
  onComplete: () => void
}

export function GuidedTour({ onComplete }: GuidedTourProps) {
  const [step, setStep] = useState(0)
  const steps = [
    "Welcome to LikhoShagun! Let's get you started.",
    "First, you'll need to choose a plan that suits your needs.",
    "Click on the 'Choose Plan' button to select your plan.",
  ]

  useEffect(() => {
    if (step === steps.length) {
      onComplete()
    }
  }, [step, steps.length, onComplete])

  return (
    <AnimatePresence>
      {step < steps.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-red-800">Step {step + 1}</h2>
            <p className="mb-4 text-gray-700">{steps[step]}</p>
            <Button onClick={() => setStep(step + 1)} className="bg-red-600 hover:bg-red-700 text-white">
              {step === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

