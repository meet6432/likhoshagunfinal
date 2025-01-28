'use client'
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import LikhoShaguLogo from "./LikhoShaguLogo"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-red-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <LikhoShaguLogo className="w-12 h-12" />
          <span className="text-2xl font-bold font-rozha">
            <span className="text-3xl">L</span>ikhoShagun
          </span>
        </Link>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`${isMenuOpen ? "block" : "hidden"} md:flex md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}>
          <li className="mb-2 md:mb-0">
            <Link href="/" className="hover:text-orange-200 transition duration-300 block">
              Home
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link href="/about" className="hover:text-orange-200 transition duration-300 block">
              About
            </Link>
          </li>
          <li className="mb-2 md:mb-0">
            <Link href="/contact" className="hover:text-orange-200 transition duration-300 block">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

