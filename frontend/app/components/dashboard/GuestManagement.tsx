import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { convertToINR, formatINR } from "../../utils/currencyUtils"

export default function GuestManagement({
  event,
  onUpdateEvent,
}: { event: any; onUpdateEvent: (updatedEvent: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest" | "none">("none")

  const filteredAndSortedGuests = useMemo(() => {
    const guests = event.guests.filter((guest: string) => guest.toLowerCase().includes(searchTerm.toLowerCase()))

    const guestTotals = guests.map((guest: string) => {
      const guestGifts = event.gifts.filter((gift: any) => gift.guestName === guest)
      const totalAmount = guestGifts.reduce((sum: number, gift: any) => sum + gift.amount, 0)
      const paymentModes = [...new Set(guestGifts.map((gift: any) => gift.paymentMode))]
      return { guest, totalAmount, paymentModes }
    })

    if (sortOrder === "highest") {
      guestTotals.sort((a, b) => b.totalAmount - a.totalAmount)
    } else if (sortOrder === "lowest") {
      guestTotals.sort((a, b) => a.totalAmount - b.totalAmount)
    }

    return guestTotals
  }, [event.guests, event.gifts, searchTerm, sortOrder])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search guests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-red-300 focus:border-red-500 focus:ring-red-500"
        />
        <div className="flex gap-2">
          <Select value={sortOrder} onValueChange={(value: "highest" | "lowest" | "none") => setSortOrder(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="highest">Highest amount</SelectItem>
              <SelectItem value="lowest">Lowest amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-800">Guest Name</TableHead>
              <TableHead className="text-red-800">Total Gifts</TableHead>
              <TableHead className="text-red-800">Total Amount (INR)</TableHead>
              <TableHead className="text-red-800">Payment Modes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedGuests.map(({ guest, totalAmount, paymentModes }) => {
              const guestGifts = event.gifts.filter((gift: any) => gift.guestName === guest)
              return (
                <TableRow key={guest}>
                  <TableCell>{guest}</TableCell>
                  <TableCell>{guestGifts.length}</TableCell>
                  <TableCell>{formatINR(convertToINR(totalAmount))}</TableCell>
                  <TableCell className="capitalize">{paymentModes.join(", ")}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredAndSortedGuests.map(({ guest, totalAmount, paymentModes }) => {
          const guestGifts = event.gifts.filter((gift: any) => gift.guestName === guest)
          return (
            <Card key={guest} className="bg-white border-red-300">
              <CardContent className="p-4">
                <p className="font-bold text-red-800">{guest}</p>
                <p className="text-sm text-gray-600">Total Gifts: {guestGifts.length}</p>
                <p className="text-sm text-gray-600">Total Amount: {formatINR(convertToINR(totalAmount))}</p>
                <p className="text-sm text-gray-600 capitalize">Payment Modes: {paymentModes.join(", ")}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

