import type React from "react"

const Diya = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-flicker"
  >
    <path d="M25 10L30 25H20L25 10Z" fill="#FFA500" />
    <circle cx="25" cy="30" r="10" fill="#8B4513" />
    <circle cx="25" cy="28" r="3" fill="#FFD700" className="animate-flame" />
  </svg>
)

const Shehnai = () => (
  <svg
    width="100"
    height="30"
    viewBox="0 0 100 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-sway"
  >
    <rect x="5" y="10" width="90" height="10" rx="5" fill="#8B4513" />
    <circle cx="10" cy="15" r="5" fill="#FFD700" />
    <circle cx="90" cy="15" r="5" fill="#FFD700" />
  </svg>
)

const Flower = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin-slow"
  >
    <circle cx="20" cy="20" r="5" fill="#FFD700" />
    <circle cx="20" cy="10" r="5" fill="#FF69B4" />
    <circle cx="30" cy="20" r="5" fill="#FF69B4" />
    <circle cx="20" cy="30" r="5" fill="#FF69B4" />
    <circle cx="10" cy="20" r="5" fill="#FF69B4" />
  </svg>
)

export const FestiveAnimations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-10 left-10">
        <Diya />
      </div>
      <div className="absolute top-20 right-20">
        <Diya />
      </div>
      <div className="absolute bottom-10 left-1/4">
        <Diya />
      </div>
      <div className="absolute top-1/3 right-10">
        <Shehnai />
      </div>
      <div className="absolute bottom-20 right-1/4">
        <Shehnai />
      </div>
      <div className="absolute top-1/4 left-1/3">
        <Flower />
      </div>
      <div className="absolute bottom-1/3 right-1/3">
        <Flower />
      </div>
    </div>
  )
}

