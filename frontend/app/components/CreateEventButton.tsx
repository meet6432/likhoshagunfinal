"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import AuthModal from "./AuthModal"
import { Button } from "@/components/ui/button"

export default function CreateEventButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleCreateEvent = () => {
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <Button
        className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform ${
          isHovered ? "scale-105" : ""
        } flex items-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCreateEvent}
      >
        <Sparkles className={`mr-2 ${isHovered ? "animate-spin" : ""}`} />
        Start Tracking Your Gifts
      </Button>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

