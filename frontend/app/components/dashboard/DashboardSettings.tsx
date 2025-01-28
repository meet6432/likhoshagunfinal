import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CustomBranding } from "./CustomBranding"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface DashboardSettingsProps {
  event: any
  onUpdateEvent: (updatedEvent: any) => void
  userPlan: string
  customBranding: {
    logo: string
    primaryColor: string
    secondaryColor: string
  }
  onUpdateCustomBranding: (branding: { logo: string; primaryColor: string; secondaryColor: string }) => void
}

export default function DashboardSettings({
  event,
  onUpdateEvent,
  userPlan,
  customBranding,
  onUpdateCustomBranding,
}: DashboardSettingsProps) {
  const [eventName, setEventName] = useState(event.name)
  const { toast } = useToast()

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedEvent = { ...event, name: eventName }
    onUpdateEvent(updatedEvent)
    toast({
      title: "Event Updated",
      description: "Your event details have been successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-red-300">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">Event Settings</CardTitle>
          <CardDescription>Update your event details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-red-800">
                Event Name
              </Label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Update Event
            </Button>
          </form>
        </CardContent>
      </Card>
      {userPlan === "Premium" && <CustomBranding branding={customBranding} onUpdate={onUpdateCustomBranding} />}
    </div>
  )
}

