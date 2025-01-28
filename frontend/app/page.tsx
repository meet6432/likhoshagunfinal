import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HowWeWork from "./components/HowWeWork"
import CreateEventButton from "./components/CreateEventButton"
import OfflineNotification from "./components/OfflineNotification"
import { HeaderDecoration, FooterDecoration } from "./components/HinduWeddingDecorations"
import { PricingShowcase } from "./components/PricingShowcase"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-festive-pattern">
      <HeaderDecoration />
      <Navbar />
      <OfflineNotification />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-red-800">
            LikhoShagun: Wedding Gift Tracker
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-700">
            Easily track gifts for your wedding celebration - even offline!
          </p>
          <CreateEventButton />
        </section>
        <HowWeWork />
        <PricingShowcase />
      </main>
      <FooterDecoration />
      <Footer />
    </div>
  )
}

