import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, Database, Globe, Users } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-brand-blue-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Privacy Policy
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Eye className="w-6 h-6 mr-2 text-brand-blue-500" />
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Vyapari.AI ("we," "our," or "us"), we are committed to
                    protecting your privacy and personal information. This
                    Privacy Policy explains how we collect, use, disclose, and
                    safeguard your information when you use our AI-powered
                    marketing platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    We comply with applicable data protection laws, including
                    the General Data Protection Regulation (GDPR), Indian
                    Personal Data Protection Bill, and other relevant privacy
                    regulations.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      We collect information you provide directly to us,
                      including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>
                        Account information (name, email, business details)
                      </li>
                      <li>Content you create using our AI tools</li>
                      <li>Payment and billing information</li>
                      <li>Communication preferences and support requests</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      We use your information to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Provide and maintain our services</li>
                      <li>Process payments and manage subscriptions</li>
                      <li>Improve our AI algorithms and platform features</li>
                      <li>Communicate with you about updates and support</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction.
                  </p>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. Your Rights
                  </h2>
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your data</li>
                      <li>Withdraw consent for data processing</li>
                      <li>Data portability</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. Contact Us
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you have questions about this Privacy Policy, please
                      contact us:
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Email:</strong> privacy@vyapari.ai
                      </p>
                      <p className="text-gray-700">
                        <strong>Support:</strong> support@vyapari.ai
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
