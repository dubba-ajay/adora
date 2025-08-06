import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  HeadphonesIcon,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Search,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Video,
  Send
} from "lucide-react";

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "Available 9 AM - 9 PM IST",
      responseTime: "< 2 minutes",
      color: "from-green-500 to-green-600",
      action: "Start Chat"
    },
    {
      title: "Email Support",
      description: "Send us detailed questions and get comprehensive answers",
      icon: Mail,
      availability: "24/7",
      responseTime: "< 4 hours",
      color: "from-blue-500 to-blue-600",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our experts",
      icon: Phone,
      availability: "Mon-Fri 9 AM - 6 PM IST",
      responseTime: "< 5 minutes",
      color: "from-purple-500 to-purple-600",
      action: "Call Now"
    },
    {
      title: "Help Center",
      description: "Find answers in our comprehensive knowledge base",
      icon: BookOpen,
      availability: "Always available",
      responseTime: "Instant",
      color: "from-orange-500 to-orange-600",
      action: "Browse Articles"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I set up my account?",
      answer: "Setting up your account is simple. After signing up, you'll be guided through a setup wizard that helps you connect your business profiles and configure your first campaign."
    },
    {
      category: "Billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through Razorpay."
    },
    {
      category: "Features",
      question: "Can I schedule WhatsApp messages in advance?",
      answer: "Yes! You can schedule WhatsApp messages for any date and time. Our system will automatically send them when scheduled, even if you're offline."
    },
    {
      category: "Technical",
      question: "Why isn't my AI content generating?",
      answer: "Check if you've filled in your business information completely. AI content generation requires basic business details like industry, target audience, and brand voice to work effectively."
    },
    {
      category: "Billing",
      question: "Can I change my plan anytime?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
    },
    {
      category: "Features",
      question: "How many social media accounts can I connect?",
      answer: "The number of accounts depends on your plan. Starter allows 3 accounts, Growth allows 5 accounts, and Premium offers unlimited connections."
    },
    {
      category: "Technical",
      question: "Is my data secure?",
      answer: "Yes, we use bank-grade encryption and security measures. Your data is stored securely and never shared with third parties without your explicit consent."
    },
    {
      category: "Getting Started",
      question: "Do you offer training or onboarding?",
      answer: "Yes! All plans include access to our video tutorials, and Premium plan users get a dedicated onboarding call with our success team."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                🆘 We're Here to Help
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Support You Need
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Our dedicated support team is here to help you succeed. Choose how you'd like to get help.
              </p>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Support Channel
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Multiple ways to get help, so you can choose what works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto mb-6`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {option.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {option.availability}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Response: {option.responseTime}
                      </div>
                    </div>
                    <Button className="w-full">
                      {option.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-xl text-gray-600">
                  Can't find what you're looking for? Send us a detailed message and we'll get back to you soon.
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input placeholder="Your full name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Category *
                        </label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing & Plans</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="integration">Integration Help</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input placeholder="Brief description of your issue" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea 
                        placeholder="Please describe your issue in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Quick answers to common questions about Adora
              </p>
              
              {/* Search & Filter */}
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-4">No FAQs found matching your search.</p>
                  <Button 
                    onClick={() => {setSearchTerm(""); setSelectedCategory("");}}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2">
                              {faq.category}
                            </Badge>
                            <CardTitle className="text-lg text-left">
                              {faq.question}
                            </CardTitle>
                          </div>
                          <HelpCircle className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Status & Resources */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Additional Resources
                </h2>
                <p className="text-xl text-gray-600">
                  More ways to get help and stay informed
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      System Status
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Check our system status and uptime information.
                    </p>
                    <Badge className="bg-green-100 text-green-800 mb-4">
                      All Systems Operational
                    </Badge>
                    <br />
                    <Button variant="outline" size="sm">
                      View Status Page
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Video Tutorials
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Step-by-step video guides for all features.
                    </p>
                    <Link to="/tutorials">
                      <Button variant="outline" size="sm">
                        Watch Tutorials
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Documentation
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Comprehensive guides and API documentation.
                    </p>
                    <Link to="/help">
                      <Button variant="outline" size="sm">
                        Read Docs
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is standing by to help you succeed with Adora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
