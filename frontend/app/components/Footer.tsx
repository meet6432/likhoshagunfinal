"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Diya } from "./HinduWeddingDecorations"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025)

  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear())
    }

    updateYear()
    const interval = setInterval(updateYear, 1000 * 60 * 60 * 24) // Update every day

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-red-800 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <Diya />
          <p className="ml-2">&copy; {currentYear} LikhoShagun. All rights reserved.</p>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
            <li>
              <Link href="/privacy" className="hover:text-orange-200 transition duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-200 transition duration-300">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-200 transition duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

