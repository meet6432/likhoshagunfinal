import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { HeaderDecoration, FooterDecoration } from "../components/HinduWeddingDecorations"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-festive-pattern">
      <HeaderDecoration />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-800">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            LikhoShagun ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
            your personal information is collected, used, and disclosed by LikhoShagun.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, use our services, or
            communicate with us. This may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact information</li>
            <li>Wedding event details</li>
            <li>Gift information (giver, amount, etc.)</li>
            <li>Payment information (handled by secure third-party payment processors)</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please note that no method of transmission over the Internet or electronic storage is
            100% secure.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@likhoshagun.com.</p>
        </div>
      </main>
      <FooterDecoration />
      <Footer />
    </div>
  )
}

