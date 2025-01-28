import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { convertToINR, formatINR } from "../../utils/currencyUtils"
import { useToast } from "@/components/ui/use-toast"

export default function GiftList({
  event,
  onAddGift,
  userPlan,
}: {
  event: any
  onAddGift: (giftData: any) => void
  userPlan: string
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest" | "none">("none")
  const { toast } = useToast()

  const filteredAndSortedGifts = useMemo(() => {
    const gifts = event.gifts.filter((gift: any) => gift.guestName.toLowerCase().includes(searchTerm.toLowerCase()))

    if (sortOrder === "highest") {
      gifts.sort((a: any, b: any) => b.amount - a.amount)
    } else if (sortOrder === "lowest") {
      gifts.sort((a: any, b: any) => a.amount - b.amount)
    }

    return gifts
  }, [event.gifts, searchTerm, sortOrder])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search gifts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-red-300 focus:border-red-500 focus:ring-red-500"
        />
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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-800">Guest Name</TableHead>
              <TableHead className="text-red-800">Amount (INR)</TableHead>
              <TableHead className="text-red-800">Payment Mode</TableHead>
              <TableHead className="text-red-800">Mobile Number</TableHead>
              <TableHead className="text-red-800">Village Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedGifts.map((gift: any) => (
              <TableRow key={gift.id}>
                <TableCell>{gift.guestName}</TableCell>
                <TableCell>{formatINR(convertToINR(gift.amount))}</TableCell>
                <TableCell className="capitalize">{gift.paymentMode}</TableCell>
                <TableCell>{gift.mobileNumber || "-"}</TableCell>
                <TableCell>{gift.villageName || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredAndSortedGifts.map((gift: any) => (
          <Card key={gift.id} className="bg-white border-red-300">
            <CardContent className="p-4">
              <p className="font-bold text-red-800">{gift.guestName}</p>
              <p className="text-sm text-gray-600">{formatINR(convertToINR(gift.amount))}</p>
              <p className="text-sm text-gray-600 capitalize">{gift.paymentMode}</p>
              <p className="text-sm text-gray-600">{gift.mobileNumber || "No mobile number"}</p>
              <p className="text-sm text-gray-600">{gift.villageName || "No village name"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

