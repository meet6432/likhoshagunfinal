import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { convertToINR, formatINR } from "../../utils/currencyUtils"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function GiftAnalytics({ event }: { event: any }) {
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar")

  const totalGifts = event.gifts.length
  const totalAmount = event.gifts.reduce((sum: number, gift: any) => sum + gift.amount, 0)
  const averageGift = totalAmount / totalGifts

  const giftDistribution = event.gifts.reduce((acc: any, gift: any) => {
    const inrAmount = convertToINR(gift.amount)
    const range = Math.floor(inrAmount / 5000) * 5000
    const key = `₹${range} - ₹${range + 4999}`
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(giftDistribution).map(([range, count]) => ({
    range,
    count,
  }))

  const paymentModeData = event.gifts.reduce((acc: any, gift: any) => {
    acc[gift.paymentMode] = (acc[gift.paymentMode] || 0) + 1
    return acc
  }, {})

  const pieChartData = Object.entries(paymentModeData).map(([mode, count]) => ({
    name: mode,
    value: count,
  }))

  const giftTimeline = event.gifts.map((gift: any) => ({
    date: new Date(gift.id).toLocaleDateString(),
    amount: convertToINR(gift.amount),
  }))

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={giftTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <div className="space-y-6">
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
            <CardTitle className="text-red-800 text-lg">Average Gift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold text-red-600">{formatINR(convertToINR(averageGift))}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border-red-300">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Gift Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "bar" | "pie" | "line")}
              className="p-2 border border-red-300 rounded-md"
            >
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="line">Line Chart</option>
            </select>
          </div>
          <div className="h-[400px]">{renderChart()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

