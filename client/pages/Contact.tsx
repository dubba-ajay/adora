import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Headphones,
  CheckCircle,
  Send,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(
        "Thank you for your message! We'll get back to you within 24 hours.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@vyapari.ai",
      available: "24/7 Response",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+91 98765 43210",
      available: "Mon-Fri, 9 AM - 8 PM IST",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant assistance",
      contact: "Chat with us",
      available: "Mon-Fri, 9 AM - 9 PM IST",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Headphones,
      title: "WhatsApp Support",
      description: "Quick help via WhatsApp",
      contact: "+91 98765 43210",
      available: "Mon-Fri, 9 AM - 8 PM IST",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const officeLocations = [
    {
      city: "Mumbai",
      address: "Tech Hub, Andheri East, Mumbai, Maharashtra 400069",
      primary: true,
    },
    {
      city: "Bangalore",
      address: "Innovation Center, Koramangala, Bangalore, Karnataka 560034",
      primary: false,
    },
    {
      city: "Delhi",
      address: "Business District, Connaught Place, New Delhi 110001",
      primary: false,
    },
  ];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer:
        "You can set up your account and start creating content within 5 minutes of signing up.",
    },
    {
      question: "Do you offer custom solutions?",
      answer:
        "Yes, we provide custom solutions for enterprises and agencies with specific requirements.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 email support, phone support during business hours, and live chat assistance.",
    },
    {
      question: "Can I integrate with my existing tools?",
      answer:
        "Yes, we support integrations with popular tools like Google Analytics, Facebook Business, and more.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-green-100 text-brand-green-800">
                💬 We're Here to Help
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Have questions about Vyapari.AI? Need help getting started? Our
                team is ready to assist you. Reach out through any of the
                channels below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    <p className="font-semibold text-gray-900 mb-2">
                      {method.contact}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {method.available}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <select
                        id="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) =>
                          handleInputChange("inquiryType", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="partnership">Partnership</option>
                        <option value="demo">Schedule Demo</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us more about what you need help with..."
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info & FAQs */}
              <div className="space-y-8">
                {/* Office Locations */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-brand-blue-500" />
                      Office Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {officeLocations.map((office, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${office.primary ? "bg-brand-blue-50 border border-brand-blue-200" : "bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {office.city}
                          </h3>
                          {office.primary && (
                            <Badge className="bg-brand-blue-500 text-white">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {office.address}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick FAQs */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Quick Answers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 text-white border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">
                      Need Immediate Help?
                    </h3>
                    <p className="text-white/90 mb-4">
                      Join our WhatsApp support group for instant assistance
                      from our team and community.
                    </p>
                    <Button
                      variant="secondary"
                      className="bg-white text-brand-orange-600 hover:bg-gray-100"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Join WhatsApp Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't wait. Start your free trial today and see the difference
              AI-powered marketing can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
