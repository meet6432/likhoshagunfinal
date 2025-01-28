import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { HeaderDecoration, FooterDecoration } from "../components/HinduWeddingDecorations"

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-festive-pattern">
      <HeaderDecoration />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-800">Terms of Service</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the LikhoShagun
            website and mobile application (the "Service") operated by LikhoShagun ("us", "we", or "our").
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">2. Description of Service</h2>
          <p>
            LikhoShagun provides a platform for users to track and manage wedding gifts, including offline
            functionality.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. Failure to
            do so constitutes a breach of the Terms, which may result in immediate termination of your account on our
            Service.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of LikhoShagun and its licensors.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">5. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">6. Limitation of Liability</h2>
          <p>
            In no event shall LikhoShagun, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Service.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">7. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes
            a material change will be determined at our sole discretion.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-red-700">8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at terms@likhoshagun.com.</p>
        </div>
      </main>
      <FooterDecoration />
      <Footer />
    </div>
  )
}

