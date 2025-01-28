"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { convertToINR, formatINR } from "../../utils/currencyUtils"
import { useToast } from "@/components/ui/use-toast"
import { downloadCSV } from "../../utils/downloadUtils"
import { PDFGenerator } from "./PDFGenerator"

interface ExportOptionsProps {
  event: any
  userPlan: string
}

export default function ExportOptions({ event, userPlan }: ExportOptionsProps) {
  const [isReportGenerating, setIsReportGenerating] = useState(false)
  const { toast } = useToast()
  const canExport = userPlan === "Basic" || userPlan === "Premium"
  //const isFreeUser = userPlan === "Free"
  //const canExport = !isFreeUser

  const handleExportCSV = () => {
    try {
      const headers = ["Guest Name", "Amount (INR)", "Payment Mode", "Thank You Sent", "Mobile Number", "Village Name"]
      const csvContent = [
        headers.join(","),
        ...event.gifts.map((gift: any) =>
          [
            `"${gift.guestName}"`,
            `"${formatINR(convertToINR(gift.amount))}"`,
            `"${gift.paymentMode}"`,
            `"${gift.thankYouSent ? "Yes" : "No"}"`,
            `"${gift.mobileNumber || ""}"`,
            `"${gift.villageName || ""}"`,
          ].join(","),
        ),
      ].join("\n")

      downloadCSV(csvContent, `${event.name}_gifts.csv`)
      toast({
        title: "CSV Export Successful",
        description: "Your CSV file has been generated and should start downloading.",
      })
    } catch (error) {
      console.error("Error exporting CSV:", error)
      toast({
        title: "CSV Export Failed",
        description: "There was an error generating your CSV file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGenerateReport = () => {
    setIsReportGenerating(true)
  }

  const handleReportGenerationComplete = () => {
    setIsReportGenerating(false)
    toast({
      title: "Report Generation Complete",
      description: "Your report has been generated and should start downloading.",
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className={`bg-white border-red-300 ${!canExport ? "opacity-50" : ""}`}>
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Export as CSV</CardTitle>
          <CardDescription>Download a spreadsheet of all gifts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleExportCSV}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={!canExport}
          >
            Download CSV
          </Button>
          {!canExport && (
            <p className="text-sm text-red-600 mt-2">Upgrade to Basic or Premium plan to enable CSV export.</p>
          )}
        </CardContent>
      </Card>
      <Card className={`bg-white border-red-300 ${!canExport ? "opacity-50" : ""}`}>
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Generate HTML Report</CardTitle>
          <CardDescription>Create a detailed HTML report of all gifts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGenerateReport}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isReportGenerating || !canExport}
          >
            {isReportGenerating ? "Generating Report..." : "Generate Report"}
          </Button>
          {!canExport && (
            <p className="text-sm text-red-600 mt-2">Upgrade to Basic or Premium plan to enable HTML export.</p>
          )}
          {isReportGenerating && <PDFGenerator event={event} onComplete={handleReportGenerationComplete} />}
        </CardContent>
      </Card>
    </div>
  )
}

