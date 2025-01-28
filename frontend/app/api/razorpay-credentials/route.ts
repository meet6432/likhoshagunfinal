import { NextResponse } from "next/server"

export async function GET() {
  try {
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

    console.log("Razorpay key_id fetched successfully")

    return NextResponse.json({ key_id })
  } catch (error) {
    console.error("Error fetching Razorpay credentials:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch Razorpay credentials" }, { status: 500 })
  }
}

