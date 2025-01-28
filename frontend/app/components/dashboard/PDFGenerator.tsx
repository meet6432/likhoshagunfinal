"use client"

import { useEffect } from "react"
import { convertToINR, formatINR } from "../../utils/currencyUtils"
import { downloadHTML } from "../../utils/downloadUtils"

export function PDFGenerator({ event, onComplete }: { event: any; onComplete: () => void }) {
  useEffect(() => {
    const generatePDF = () => {
      try {
        // Create a simple HTML structure for the PDF
        const content = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${event.name} - Gift Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                h1 { color: #dc2626; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #dc2626; padding: 10px; text-align: left; }
                th { background-color: #fee2e2; color: #dc2626; }
              </style>
            </head>
            <body>
              <h1>${event.name} - Gift Report</h1>
              <table>
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Amount (INR)</th>
                    <th>Payment Mode</th>
                    <th>Thank You Sent</th>
                    <th>Mobile Number</th>
                    <th>Village Name</th>
                  </tr>
                </thead>
                <tbody>
                  ${event.gifts
                    .map(
                      (gift: any) => `
                    <tr>
                      <td>${gift.guestName}</td>
                      <td>${formatINR(convertToINR(gift.amount))}</td>
                      <td>${gift.paymentMode}</td>
                      <td>${gift.thankYouSent ? "Yes" : "No"}</td>
                      <td>${gift.mobileNumber || "-"}</td>
                      <td>${gift.villageName || "-"}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            </body>
          </html>
        `

        downloadHTML(content, `${event.name}_gift_report.html`)
      } catch (error) {
        console.error("Error generating report:", error)
      } finally {
        onComplete()
      }
    }

    generatePDF()
  }, [event, onComplete])

  return null
}

