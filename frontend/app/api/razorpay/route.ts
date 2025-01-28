import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(request: Request) {
  console.log("Razorpay API route called")
  try {
    const { amount } = await request.json()
    console.log("Received amount:", amount)

    if (!amount || isNaN(amount)) {
      console.error("Invalid amount:", amount)
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    console.log("Fetching Razorpay credentials...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rzp-3DWQINOeqYSe3LjCYnxLU73IXpBhw7.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch Razorpay credentials. Status: ${response.status}`)
    }

    const csvData = await response.text()
    console.log("CSV data fetched:", csvData)

    const [header, dataRow] = csvData.trim().split("\n")
    const [key_id, key_secret] = dataRow.split(",")

    if (!key_id || !key_secret) {
      throw new Error("Invalid Razorpay credentials")
    }

    console.log("Razorpay credentials fetched successfully")

    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    })

    const payment_capture = 1
    const currency = "INR"

    const options = {
      amount: amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture,
    }

    console.log("Creating Razorpay order with options:", options)

    const order = await razorpay.orders.create(options)

    console.log("Razorpay order created:", order)

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    })
  } catch (error) {
    console.error("Error in Razorpay API route:", error)
    let errorMessage = "Failed to create Razorpay order"
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === "string") {
      errorMessage = error
    } else {
      errorMessage = JSON.stringify(error)
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

