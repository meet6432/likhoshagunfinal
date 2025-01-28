import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackToDashboardButton() {
  return (
    <Link href="/dashboard" passHref>
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
    </Link>
  )
}

