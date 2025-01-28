import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { HeaderDecoration, FooterDecoration } from "../components/HinduWeddingDecorations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-festive-pattern">
      <HeaderDecoration />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-800">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <p className="mb-6 text-gray-700">
            We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this regarding?" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message here..." required className="h-32" />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Send Message
            </Button>
          </form>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-red-700">Other Ways to Reach Us</h2>
            <p className="mb-2">
              <strong>Email:</strong> support@likhoshagun.com
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +91 123-456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 Wedding Street, Celebration City, India 110001
            </p>
          </div>
        </div>
      </main>
      <FooterDecoration />
      <Footer />
    </div>
  )
}

