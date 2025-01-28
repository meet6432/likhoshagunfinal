import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { HeaderDecoration, FooterDecoration } from "../components/HinduWeddingDecorations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gift, Database, FileText, Wifi, Heart } from "lucide-react"
import CreateEventButton from "../components/CreateEventButton"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-festive-pattern">
      <HeaderDecoration />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-800 text-center">About LikhoShagun</h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Our Story</h2>
            <p className="text-gray-700">
              LikhoShagun was born out of a desire to simplify the traditional Indian wedding gift-giving process. We
              understand the importance of shagun in our culture and the need for a modern solution to track these
              precious gifts. Our team of passionate developers and wedding enthusiasts came together to create a
              platform that honors tradition while embracing technology.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Our Mission</h2>
            <p className="text-gray-700">
              At LikhoShagun, our mission is to provide couples with a seamless, stress-free way to manage their wedding
              gifts. We aim to blend the warmth of tradition with the convenience of technology, ensuring that every
              gift is recorded, appreciated, and remembered.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Key Features</h2>
            <ul className="list-none space-y-4">
              <li className="flex items-start">
                <Gift className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  <strong>Effortless Gift Tracking:</strong> Record gifts quickly and easily, even in offline mode.
                </span>
              </li>
              <li className="flex items-start">
                <Database className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  <strong>Organized Database:</strong> All your gift information in one place, synced across devices.
                </span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  <strong>Detailed Reports:</strong> Generate comprehensive reports in various formats for easy
                  reference.
                </span>
              </li>
              <li className="flex items-start">
                <Wifi className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  <strong>Offline Functionality:</strong> Use the app anytime, anywhere, even without an internet
                  connection.
                </span>
              </li>
              <li className="flex items-start">
                <Heart className="mr-2 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  <strong>Thank You Tracker:</strong> Keep track of sent thank you notes to show your appreciation.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Why Choose LikhoShagun?</h2>
            <p className="text-gray-700">
              LikhoShagun is more than just a gift tracker. It's a comprehensive wedding companion that respects your
              traditions while offering modern convenience. With our user-friendly interface, robust features, and
              commitment to privacy, we ensure that your wedding gift management is as joyous as your celebration.
            </p>
          </section>

          <div className="text-center mt-8">
            <CreateEventButton />
          </div>
        </div>
      </main>
      <FooterDecoration />
      <Footer />
    </div>
  )
}

