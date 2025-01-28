import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { convertToINR, formatINR } from "../../utils/currencyUtils"

export default function EventOverview({ event }: { event: any }) {
  const totalGifts = event.gifts.length
  const totalAmount = event.gifts.reduce((sum: number, gift: any) => sum + gift.amount, 0)
  const uniqueGuests = new Set(event.gifts.map((gift: any) => gift.guestName)).size

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-white border-red-300">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Total Gifts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl md:text-3xl font-bold text-red-600">{totalGifts}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-red-300">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Total Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl md:text-3xl font-bold text-red-600">{formatINR(convertToINR(totalAmount))}</p>
        </CardContent>
      </Card>
      <Card className="bg-white border-red-300 sm:col-span-2 lg:col-span-1">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Unique Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl md:text-3xl font-bold text-red-600">{uniqueGuests}</p>
        </CardContent>
      </Card>
    </div>
  )
}

