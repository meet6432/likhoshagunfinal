import type React from "react"

const Diya = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8L24 20H16L20 8Z" fill="#FFA500" />
    <circle cx="20" cy="24" r="8" fill="#8B4513" />
    <circle cx="20" cy="22" r="2" fill="#FFD700" />
  </svg>
)

const Swastik = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5V15H5V25H15V35H25V25H35V15H25V5H15Z" fill="#FF0000" />
  </svg>
)

export const HeaderDecoration: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full py-2 px-4 bg-red-100">
      <Diya />
      <Swastik />
      <Diya />
    </div>
  )
}

export const FooterDecoration: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full py-2 px-4 bg-red-100">
      <Swastik />
      <Diya />
      <Swastik />
    </div>
  )
}

