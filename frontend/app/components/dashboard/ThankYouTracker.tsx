import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { convertToINR, formatINR } from "../../utils/currencyUtils"
import { ThankYouTemplates } from "./ThankYouTemplates"

interface ThankYouTrackerProps {
  event: any
  onUpdateEvent: (updatedEvent: any) => void
  userPlan: string
}

export default function ThankYouTracker({ event, onUpdateEvent, userPlan }: ThankYouTrackerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGifts = event.gifts.filter((gift: any) =>
    gift.guestName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleThankYouToggle = (giftId: number) => {
    const updatedGifts = event.gifts.map((gift: any) => {
      if (gift.id === giftId) {
        const thankYouSent = !gift.thankYouSent
        let thankYouMessage = ""
        if (thankYouSent && userPlan === "Premium" && event.thankYouTemplates?.length > 0) {
          const randomTemplate = event.thankYouTemplates[Math.floor(Math.random() * event.thankYouTemplates.length)]
          thankYouMessage = randomTemplate
            .replace("{guestName}", gift.guestName)
            .replace("{amount}", formatINR(convertToINR(gift.amount)))
        }
        return { ...gift, thankYouSent, thankYouMessage }
      }
      return gift
    })
    const updatedEvent = { ...event, gifts: updatedGifts }
    onUpdateEvent(updatedEvent)
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search guests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm border-red-300 focus:border-red-500 focus:ring-red-500"
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-800">Guest Name</TableHead>
              <TableHead className="text-red-800">Amount (INR)</TableHead>
              <TableHead className="text-red-800">Payment Mode</TableHead>
              <TableHead className="text-red-800">Thank You Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGifts.map((gift: any) => (
              <TableRow key={gift.id}>
                <TableCell>{gift.guestName}</TableCell>
                <TableCell>{formatINR(convertToINR(gift.amount))}</TableCell>
                <TableCell className="capitalize">{gift.paymentMode}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={gift.thankYouSent}
                    onCheckedChange={() => handleThankYouToggle(gift.id)}
                    className="border-red-300 text-red-600 focus:ring-red-500"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredGifts.map((gift: any) => (
          <Card key={gift.id} className="bg-white border-red-300">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-red-800">{gift.guestName}</p>
                <p className="text-sm text-gray-600">
                  {formatINR(convertToINR(gift.amount))} - {gift.paymentMode}
                </p>
              </div>
              <Checkbox
                checked={gift.thankYouSent}
                onCheckedChange={() => handleThankYouToggle(gift.id)}
                className="border-red-300 text-red-600 focus:ring-red-500"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {userPlan === "Premium" && (
        <ThankYouTemplates
          templates={event.thankYouTemplates || []}
          onUpdate={(newTemplates) => {
            const updatedEvent = { ...event, thankYouTemplates: newTemplates }
            onUpdateEvent(updatedEvent)
          }}
        />
      )}
    </div>
  )
}

