import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Zap,
  MessageSquare,
  Target,
  BarChart3,
  Calendar,
  Globe,
  Search,
  Users,
  Smartphone,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  const mainFeatures = [
    {
      icon: Zap,
      title: "AI Content Generator",
      description:
        "Generate professional marketing content in seconds for social media, WhatsApp, and ads.",
      features: [
        "100+ content templates",
        "Multi-language support",
        "Industry-specific content",
        "Custom brand voice",
      ],
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Campaigns",
      description:
        "Send targeted WhatsApp messages to your customers with personalized content and scheduling.",
      features: [
        "Bulk messaging",
        "Contact management",
        "Message scheduling",
        "Delivery reports",
      ],
      color: "from-green-400 to-green-600",
    },
    {
      icon: Target,
      title: "Google & Facebook Ads",
      description:
        "Create and manage high-converting ad campaigns across Google and Facebook platforms.",
      features: [
        "Ad creation tools",
        "Audience targeting",
        "Budget optimization",
        "Performance tracking",
      ],
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track your marketing performance with detailed analytics and actionable insights.",
      features: [
        "Real-time metrics",
        "ROI tracking",
        "Competitor analysis",
        "Growth insights",
      ],
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Calendar,
      title: "Festival Campaigns",
      description:
        "Ready-made campaign templates for all major Indian festivals and occasions.",
      features: [
        "Pre-designed templates",
        "Cultural relevance",
        "Seasonal offers",
        "Event scheduling",
      ],
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Globe,
      title: "Business Profile",
      description:
        "Create and manage your online business presence with professional profiles.",
      features: [
        "Profile creation",
        "Image galleries",
        "Contact management",
        "SEO optimization",
      ],
      color: "from-cyan-400 to-cyan-600",
    },
  ];

  const additionalFeatures = [
    {
      icon: Search,
      title: "SEO Tools",
      description: "Optimize your online presence for local search",
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Organize and segment your customer database",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Access all features on any device",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor business growth with smart metrics",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security for your business data",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support assistance",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-orange-100 text-brand-orange-800">
                🚀 All-in-One Marketing Solution
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Powerful Features for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  Smart Marketing
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Everything you need to grow your business online. From
                AI-powered content creation to advanced analytics, we've got all
                the tools to help your business succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/subscription">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools designed specifically for Indian businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Additional Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need for complete business growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-brand-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Adora to grow
              their customer base and increase sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscription">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-orange-600 hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-orange-600"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
