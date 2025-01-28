import type React from "react"
import { styled } from "@stitches/react"

export const Diya = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="diya-container"
  >
    <defs>
      <filter id="flame-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
    </defs>
    <path d="M20 8L24 20H16L20 8Z" fill="#FFA500" />
    <circle cx="20" cy="24" r="8" fill="#8B4513" />
    <path
      className="flame"
      d="M20 14C20 14 22 18 22 20C22 22 20 24 18 24C16 24 14 22 14 20C14 18 16 14 16 14C16 14 18 16 20 14Z"
      fill="#FFD700"
      filter="url(#flame-blur)"
    />
  </svg>
)

const AnimatedDiya = styled(Diya, {
  "& .flame": {
    transformOrigin: "center bottom",
    transition: "all 0.3s ease",
  },
  "&:hover .flame": {
    animation: "flameWave 1s ease-in-out infinite alternate",
  },
  "@keyframes flameWave": {
    "0%": { transform: "scaleY(1) translateY(0)" },
    "50%": { transform: "scaleY(1.1) translateY(-1px)" },
    "100%": { transform: "scaleY(0.9) translateY(1px)" },
  },
})

export const HeaderDecoration: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full py-2 px-4 bg-red-100">
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
    </div>
  )
}

export const FooterDecoration: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full py-2 px-4 bg-red-100">
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
      <AnimatedDiya />
    </div>
  )
}

