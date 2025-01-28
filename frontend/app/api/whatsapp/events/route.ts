import { NextResponse } from "next/server"

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Simulating QR code generation and connection events
      setTimeout(() => {
        sendEvent({ type: "qr", qr: "simulated-qr-code-data" })
      }, 2000)

      setTimeout(() => {
        sendEvent({ type: "connected" })
        controller.close()
      }, 10000)
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

