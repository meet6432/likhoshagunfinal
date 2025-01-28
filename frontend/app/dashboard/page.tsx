"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import {
  createEvent,
  getEvents,
  updateEvent,
  setupOnlineListener,
  getInitialEvents,
  deleteEvent,
} from "../utils/eventStorage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { convertToUSD, convertToINR, formatINR } from "../utils/currencyUtils"
import Link from "next/link"
import { PlanSelectionModal } from "../components/PlanSelectionModal"
import { BackToDashboardButton } from "../components/BackToDashboardButton"
import { getUserTier } from "../utils/userUtils"
import { CustomBranding } from "../components/dashboard/CustomBranding"
import { useToast } from "@/components/ui/use-toast"
import { getEventLimit, getGiftLimit } from "../utils/planUtils"
import { GuidedTour } from "../components/GuidedTour"
import { signOut } from "../utils/userUtils"
import LikhoShaguLogo from "../components/LikhoShaguLogo"
import axios from 'axios'

const EventOverview = lazy(() => import("../components/dashboard/EventOverview"))
const GiftList = lazy(() => import("../components/dashboard/GiftList"))
const GuestManagement = lazy(() => import("../components/dashboard/GuestManagement"))
const ThankYouTracker = lazy(() => import("../components/dashboard/ThankYouTracker"))
const GiftAnalytics = lazy(() => import("../components/dashboard/GiftAnalytics"))
const ExportOptions = lazy(() => import("../components/dashboard/ExportOptions"))
const DashboardSettings = lazy(() => import("../components/dashboard/DashboardSettings"))

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>(getInitialEvents())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [newEventName, setNewEventName] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [newGift, setNewGift] = useState({
    guestName: "",
    amountINR: "",
    paymentMode: "cash",
    mobileNumber: "",
    villageName: "",
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [customBranding, setCustomBranding] = useState({
    logo: "",
    primaryColor: "#FF0000",
    secondaryColor: "#0000FF",
  })
  const [showGuidedTour, setShowGuidedTour] = useState(false)
  const [hasSelectedPlan, setHasSelectedPlan] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchEvents = async () => {
      if (typeof window !== "undefined") {
        // Simulating getting the user's email from authentication
        const email = localStorage.getItem("userEmail") || "default@example.com"
        setUserEmail(email)
        const fetchedEvents = await getEvents(email)
        setEvents(fetchedEvents)
        if (fetchedEvents.length > 0) {
          setSelectedEvent(fetchedEvents[0])
        }
      }
    }

    fetchEvents()

    const fetchUserTier = async () => {
      const tier = await getUserTier()
      setCurrentPlan(tier)
      setHasSelectedPlan(tier !== "Free")
      setShowGuidedTour(tier === "Free")
    }

    fetchUserTier()

    if (typeof window !== "undefined") {
      setupOnlineListener()
    }
  }, [])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    const eventLimit = currentPlan === "Free" ? 1 : getEventLimit(currentPlan || "Free")
    if (events.length >= eventLimit) {
      toast({
        title: "Event limit reached",
        description: `You've reached the maximum number of events (${eventLimit}) for your current plan. Please upgrade to create more events.`,
        variant: "destructive",
      })
      console.log("in the handle event")
    const response = await axios.post('http://localhost:8800/api/',{newEventName})
    console.log(response)
    console.log("hii")
      return
    }

    const similarEvent = events.find(
      (event) => event.name.toLowerCase().replace(/\s+/g, "") === newEventName.toLowerCase().replace(/\s+/g, ""),
    )
    if (similarEvent) {
      toast({
        title: "Similar event name exists",
        description: "An event with a similar name already exists. Please choose a different name.",
        variant: "destructive",
      })
      return
    }

    const newEvent = { id: Date.now(), name: newEventName, gifts: [], email: userEmail }
    await createEvent(newEvent)
    setEvents([...events, newEvent])
    setIsCreateEventOpen(false)
    setNewEventName("")
    if (!selectedEvent) {
      setSelectedEvent(newEvent)
    }
  }

  const handleAddGift = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEvent) {
      const giftLimit = getGiftLimit(currentPlan || "Free")
      if (selectedEvent.gifts.length >= giftLimit) {
        toast({
          title: "Gift limit reached",
          description: `You've reached the maximum number of gifts (${giftLimit}) for your current plan. Please upgrade to add more gifts.`,
          variant: "destructive",
        })
        return
      }
      const amountUSD = convertToUSD(Number(newGift.amountINR))
      const giftData = {
        id: Date.now(),
        guestName: newGift.guestName,
        amount: amountUSD,
        paymentMode: newGift.paymentMode,
        mobileNumber: newGift.mobileNumber,
        villageName: newGift.villageName,
        thankYouSent: false,
      }
      const updatedEvent = {
        ...selectedEvent,
        gifts: [...selectedEvent.gifts, giftData],
        guests: selectedEvent.guests.includes(newGift.guestName)
          ? selectedEvent.guests
          : [...selectedEvent.guests, newGift.guestName],
        email: userEmail,
      }
      await updateEvent(updatedEvent)
      setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
      setSelectedEvent(updatedEvent)
      setNewGift({ guestName: "", amountINR: "", paymentMode: "cash", mobileNumber: "", villageName: "" })
    }
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const renderTabContent = () => {
    const quickAddGiftForm = (
      <Card className="bg-white border-red-300 mb-6">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-800 text-lg">
            Quick Add Gift ({getGiftLimit(currentPlan || "Free")} gifts allowed)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGift} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName" className="text-red-800">
                  Guest Name
                </Label>
                <Input
                  id="guestName"
                  value={newGift.guestName}
                  onChange={(e) => setNewGift({ ...newGift, guestName: e.target.value })}
                  required
                  className="border-red-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-red-800">
                  Amount (INR)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newGift.amountINR}
                  onChange={(e) => setNewGift({ ...newGift, amountINR: e.target.value })}
                  required
                  className="border-red-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-red-800">
                  Mobile Number (Optional)
                </Label>
                <Input
                  id="mobileNumber"
                  value={newGift.mobileNumber}
                  onChange={(e) => setNewGift({ ...newGift, mobileNumber: e.target.value })}
                  className="border-red-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="villageName" className="text-red-800">
                  Village Name (Optional)
                </Label>
                <Input
                  id="villageName"
                  value={newGift.villageName}
                  onChange={(e) => setNewGift({ ...newGift, villageName: e.target.value })}
                  className="border-red-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-red-800">Mode of Payment</Label>
                <RadioGroup
                  value={newGift.paymentMode}
                  onValueChange={(value) => setNewGift({ ...newGift, paymentMode: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Add Gift
            </Button>
          </form>
        </CardContent>
      </Card>
    )

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {(() => {
          switch (activeTab) {
            case "overview":
              return (
                <>
                  {quickAddGiftForm}
                  <EventOverview event={selectedEvent} />
                </>
              )
            case "gifts":
              return (
                <>
                  {quickAddGiftForm}
                  <GiftList
                    event={selectedEvent}
                    onAddGift={(giftData) => {
                      const updatedEvent = {
                        ...selectedEvent,
                        gifts: [...selectedEvent.gifts, giftData],
                        guests: selectedEvent.guests.includes(giftData.guestName)
                          ? selectedEvent.guests
                          : [...selectedEvent.guests, giftData.guestName],
                        email: userEmail,
                      }
                      updateEvent(updatedEvent)
                      setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
                      setSelectedEvent(updatedEvent)
                    }}
                    userPlan={currentPlan || "Free"}
                  />
                </>
              )
            case "guests":
              return (
                <GuestManagement
                  event={selectedEvent}
                  onUpdateEvent={(updatedEvent) => {
                    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
                    setSelectedEvent(updatedEvent)
                  }}
                />
              )
            case "thankyou":
              return (
                <ThankYouTracker
                  event={selectedEvent}
                  onUpdateEvent={(updatedEvent) => {
                    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
                    setSelectedEvent(updatedEvent)
                  }}
                  userPlan={currentPlan || "Free"}
                />
              )
            case "analytics":
              return <GiftAnalytics event={selectedEvent} />
            case "export":
              return <ExportOptions event={selectedEvent} userPlan={currentPlan || "Free"} />
            case "settings":
              return (
                <DashboardSettings
                  event={selectedEvent}
                  onUpdateEvent={(updatedEvent) => {
                    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
                    setSelectedEvent(updatedEvent)
                  }}
                  userPlan={currentPlan || "Free"}
                  customBranding={customBranding}
                  onUpdateCustomBranding={setCustomBranding}
                />
              )
            case "customBranding":
              return (
                <CustomBranding
                  branding={customBranding}
                  onUpdate={(newBranding) => {
                    setCustomBranding(newBranding)
                  }}
                />
              )
            default:
              return null
          }
        })()}
      </Suspense>
    )
  }

  const handlePlanChange = (newPlan: string) => {
    setCurrentPlan(newPlan)
    setHasSelectedPlan(true)
    localStorage.setItem("userPlan", newPlan)
    toast({
      title: "Plan Updated",
      description: `Your plan has been successfully updated to ${newPlan}.`,
    })
    setIsPlanModalOpen(false)
  }

  const handleSignOut = () => {
    signOut()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 p-4">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold">Updating your plan...</p>
          </div>
        </div>
      )}
      {showGuidedTour && <GuidedTour onComplete={() => setShowGuidedTour(false)} />}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            {currentPlan === "Premium" && customBranding.logo ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-red-100 shadow-lg">
                <Image
                  src={customBranding.logo || "/placeholder.svg"}
                  alt="Custom logo"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <LikhoShaguLogo className="w-16 h-16" />
            )}
            <h1 className="text-2xl md:text-4xl font-bold text-red-800 font-rozha">LikhoShagun Dashboard</h1>
            {currentPlan && <span className="text-red-600 font-medium">Current Plan: {currentPlan}</span>}
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] bg-white">
              <nav className="flex flex-col space-y-4">
                <Link href="/" passHref>
                  <Button variant="ghost" className="justify-start w-full text-left" onClick={closeMobileMenu}>
                    Go to Home
                  </Button>
                </Link>
                {["overview", "gifts", "guests", "thankyou", "analytics", "export", "settings"].map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setActiveTab(tab)
                      closeMobileMenu()
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="justify-start text-red-600 hover:text-red-800 hover:bg-red-100"
                  onClick={() => {
                    setIsPlanModalOpen(true)
                    closeMobileMenu()
                  }}
                >
                  Choose Plan
                </Button>
                {(currentPlan === "Premium" || currentPlan === "Basic") && (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start text-red-600 hover:text-red-800 hover:bg-red-100"
                      onClick={() => {
                        setActiveTab("customBranding")
                        closeMobileMenu()
                      }}
                    >
                      Custom Branding
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            className="p-2 border border-red-300 rounded-md bg-white text-red-800 flex-grow md:max-w-xs"
            value={selectedEvent?.id || ""}
            onChange={(e) => setSelectedEvent(events.find((event) => event.id === Number.parseInt(e.target.value)))}
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() => setIsCreateEventOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={
              currentPlan === "Free" ? events.length >= 1 : events.length >= getEventLimit(currentPlan || "Free")
            }
          >
            Create New Event
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setIsPlanModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              {currentPlan === "Free" ? "Choose Plan" : "Upgrade Plan"}
            </Button>
            <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white">
              Sign Out
            </Button>
          </div>
        </div>

        {selectedEvent && (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-red-200 justify-start overflow-x-auto">
                <Link href="/" passHref>
                  <Button variant="ghost" className="data-[state=active]:bg-white">
                    Go to Home
                  </Button>
                </Link>
                {["overview", "gifts", "guests", "thankyou", "analytics", "export", "settings"].map((tab) => (
                  <TabsTrigger key={tab} value={tab} className="data-[state=active]:bg-white">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
                {(currentPlan === "Premium" || currentPlan === "Basic") && (
                  <TabsTrigger value="customBranding" className="data-[state=active]:bg-white">
                    Custom Branding
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value={activeTab}>{renderTabContent()}</TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="bg-gradient-to-br from-red-100 to-orange-100 border-red-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-800">Create New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-red-800">
                Event Name
              </Label>
              <Input
                id="eventName"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                required
                className="border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Button type="submit" onClick={handleCreateEvent} className="w-full bg-red-600 hover:bg-red-700 text-white">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <PlanSelectionModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        currentPlan={currentPlan}
        onPlanChange={handlePlanChange}
      />
    </div>
  )
}

