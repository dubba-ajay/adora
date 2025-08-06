import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Terms of Service
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using Vyapari.AI ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Vyapari.AI is a SaaS platform that provides AI-powered marketing tools for businesses, including content generation, social media management, WhatsApp campaigns, and advertising solutions.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. Service Description
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Vyapari.AI provides the following services:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>AI-powered content generation for social media and marketing</li>
                      <li>WhatsApp campaign management and automation</li>
                      <li>Google and Facebook advertising tools</li>
                      <li>Festival and seasonal campaign templates</li>
                      <li>Business profile creation and management</li>
                      <li>Analytics and performance tracking</li>
                      <li>SEO tools and website optimization</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. User Registration and Account Security
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      To access certain features of our service, you must register for an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Provide accurate, current, and complete information during registration</li>
                      <li>Maintain and promptly update your account information</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. Subscription Plans and Billing
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Subscription Plans</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We offer multiple subscription plans (Starter, Professional, Enterprise) with different features and usage limits. Plan details and pricing are available on our pricing page.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Billing and Payments</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Subscriptions are billed monthly or annually in advance</li>
                        <li>All fees are non-refundable except as expressly stated</li>
                        <li>We use secure payment processors (Stripe and Razorpay)</li>
                        <li>Prices may change with 30 days' notice</li>
                        <li>Failed payments may result in service suspension</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Refund Policy</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We offer a 30-day money-back guarantee for new subscribers. Refund requests must be made within 30 days of the initial purchase. Refunds are processed within 5-10 business days.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. Acceptable Use Policy
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      You agree not to use our service to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Violate any laws or regulations</li>
                      <li>Send spam, unsolicited messages, or malicious content</li>
                      <li>Infringe intellectual property rights</li>
                      <li>Upload harmful code, viruses, or malware</li>
                      <li>Harass, abuse, or harm others</li>
                      <li>Create fake or misleading content</li>
                      <li>Attempt to reverse engineer our software</li>
                      <li>Exceed usage limits or attempt to circumvent restrictions</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. Content and Intellectual Property
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Your Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You retain ownership of content you create using our service. You grant us a license to use, store, and process your content to provide our services.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Our Intellectual Property</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Vyapari.AI, our logo, and our service are protected by intellectual property laws. You may not copy, modify, or create derivative works based on our service.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">6.3 AI-Generated Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Content generated by our AI tools is provided as-is. You are responsible for reviewing and ensuring the accuracy and appropriateness of AI-generated content before use.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    7. Privacy and Data Protection
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We are committed to protecting your privacy. Our Privacy Policy describes how we collect, use, and protect your information. By using our service, you agree to our data practices as described in our Privacy Policy.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    We comply with applicable data protection laws, including GDPR and Indian data protection regulations.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    8. Service Availability and Support
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      We strive to maintain 99.9% service uptime but cannot guarantee uninterrupted service. We provide support through:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Email support for all users</li>
                      <li>Priority support for Professional and Enterprise users</li>
                      <li>Knowledge base and documentation</li>
                      <li>Community forums</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    To the maximum extent permitted by law, Vyapari.AI shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our service. Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    10. Termination
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Either party may terminate this agreement at any time:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>You may cancel your subscription at any time</li>
                      <li>We may suspend or terminate accounts for policy violations</li>
                      <li>We may discontinue the service with 30 days' notice</li>
                      <li>Upon termination, your access to the service will cease</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    11. Governing Law and Disputes
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms are governed by the laws of India. Any disputes arising from these terms or your use of our service shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    We encourage resolving disputes through good faith negotiations before pursuing legal action.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    12. Changes to Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our service. Continued use of our service after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    13. Contact Information
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700">
                        <strong>Email:</strong> legal@vyapari.ai
                      </p>
                      <p className="text-gray-700">
                        <strong>Support:</strong> support@vyapari.ai
                      </p>
                      <p className="text-gray-700">
                        <strong>Address:</strong> [Your Business Address]
                      </p>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> +91 [Your Contact Number]
                      </p>
                    </div>
                  </div>
                </section>

                <div className="mt-12 text-center text-sm text-gray-500">
                  <p>
                    By using Vyapari.AI, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
