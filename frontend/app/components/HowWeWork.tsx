import { Gift, Database, FileText } from "lucide-react"

export default function HowWeWork() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-800">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <Gift className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-semibold mb-2">Record Gifts</h3>
            <p className="text-gray-600">Guests can easily enter their gift amounts, even when offline</p>
          </div>
          <div className="text-center md:text-left">
            <Database className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-semibold mb-2">Create Database</h3>
            <p className="text-gray-600">An organized database of all gifts is created and synced when online</p>
          </div>
          <div className="text-center md:text-left">
            <FileText className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
            <p className="text-gray-600">Generate detailed CSV or HTML reports of all gifts received</p>
          </div>
        </div>
      </div>
    </section>
  )
}

