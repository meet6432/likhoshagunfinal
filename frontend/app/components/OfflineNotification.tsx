"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export default function OfflineNotification() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false)
    }

    function handleOffline() {
      setIsOffline(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="bg-yellow-500 text-white p-2 text-center">
      <WifiOff className="inline-block mr-2" />
      You are currently offline. Don't worry, Chandla still works!
    </div>
  )
}

