"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPaymentProps {
  amount: number
  onSuccess: (paymentId: string) => void
  planName: string
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ amount, onSuccess, planName }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [razorpayKey, setRazorpayKey] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        console.log("Fetching Razorpay key...")
        const response = await fetch("/api/razorpay-credentials")
        console.log("Razorpay credentials API response status:", response.status)
        const responseText = await response.text()
        console.log("Razorpay credentials API response text:", responseText)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`)
        }

        let data
        try {
          data = JSON.parse(responseText)
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError)
          throw new Error(`Invalid JSON response: ${responseText}`)
        }

        if (data.error) {
          throw new Error(data.error)
        }
        console.log("Razorpay key fetched successfully:", data.key_id)
        setRazorpayKey(data.key_id)
      } catch (error) {
        console.error("Error fetching Razorpay key:", error)
        toast({
          title: "Error",
          description: `Failed to fetch Razorpay key: ${error instanceof Error ? error.message : String(error)}`,
          variant: "destructive",
        })
      }
    }

    fetchRazorpayKey()
  }, [toast])

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        resolve(true)
      }
      script.onerror = (error) => {
        console.error("Error loading Razorpay script:", error)
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const makePayment = async () => {
    setIsLoading(true)
    try {
      console.log("Initializing Razorpay...")
      const res = await initializeRazorpay()
      if (!res) {
        throw new Error("Razorpay SDK failed to load")
      }

      console.log("Initiating Razorpay payment...")
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
        }),
      })

      console.log("Razorpay API response status:", response.status)
      const responseText = await response.text()
      console.log("Razorpay API response text:", responseText)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError)
        throw new Error(`Invalid JSON response: ${responseText}`)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      console.log("Razorpay order created:", data)

      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: "LikhoShagun",
        description: "Thank you for your purchase",
        order_id: data.id,
        handler: (response: any) => {
          console.log("Payment successful:", response)
          onSuccess(response.razorpay_payment_id)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
      }

      console.log("Initializing Razorpay payment object...")
      const paymentObject = new window.Razorpay(options)
      paymentObject.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error)
        throw new Error(`Payment failed: ${response.error.description}`)
      })
      console.log("Opening Razorpay payment dialog with options:", options)
      console.log("Opening Razorpay payment dialog...")
      paymentObject.open()
    } catch (error) {
      console.error("Error in makePayment:", error)
      let errorMessage = "An unknown error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else {
        errorMessage = JSON.stringify(error)
      }
      toast({
        title: "Error",
        description: `Failed to initiate payment: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={makePayment} disabled={isLoading || !razorpayKey} className="w-full">
      {isLoading ? "Processing..." : `Pay ₹${amount} for ${planName} Plan`}
    </Button>
  )
}

export default RazorpayPayment

