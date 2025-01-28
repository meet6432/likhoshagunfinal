import type React from "react"

interface LogoProps {
  className?: string
}

const LikhoShaguLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <defs>
        <path id="circlePath" d="M40,40 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
      </defs>

      {/* Main revolving circle */}
      <circle r="3" fill="#FFD700">
        <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#circlePath" />
        </animateMotion>
        <animate attributeName="r" values="3;4;3;2;3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Trailing effect */}
      {[...Array(5)].map((_, index) => (
        <circle key={index} r={3 - index * 0.5} fill="#FFD700" opacity={1 - index * 0.2}>
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" begin={`${index * 0.1}s`}>
            <mpath xlinkHref="#circlePath" />
          </animateMotion>
        </circle>
      ))}

      {/* Sparks */}
      {[...Array(3)].map((_, index) => (
        <circle key={`spark-${index}`} r="1" fill="#FFD700">
          <animateMotion dur="1s" repeatCount="indefinite" rotate="auto" begin={`${index * 0.3}s`}>
            <mpath xlinkHref="#circlePath" />
          </animateMotion>
          <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" begin={`${index * 0.3}s`} />
        </circle>
      ))}

      {/* Static Kalash */}
      <g>
        {/* Kalash body */}
        <path d="M30 60 C30 40, 50 40, 50 60" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />

        {/* Kalash neck */}
        <rect x="35" y="30" width="10" height="10" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />

        {/* Kalash top */}
        <path d="M32 30 Q40 25 48 30" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />

        {/* Kalash base */}
        <path d="M30 60 Q40 65 50 60" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />

        {/* Decorative elements */}
        <circle cx="40" cy="45" r="5" fill="#FFD700" />
        <path d="M36 52 L44 52" stroke="#FFD700" strokeWidth="2" />
        <path d="M34 56 L46 56" stroke="#FFD700" strokeWidth="2" />

        {/* Mango leaves */}
        <path d="M30 30 Q35 25 40 30" stroke="#FFD700" strokeWidth="2" fill="none" />
        <path d="M40 30 Q45 25 50 30" stroke="#FFD700" strokeWidth="2" fill="none" />

        {/* Coconut */}
        <circle cx="40" cy="22" r="6" fill="#8B4513" stroke="#FFD700" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default LikhoShaguLogo

