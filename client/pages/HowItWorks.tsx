import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Settings,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Sign Up & Setup",
      description:
        "Create your account and set up your business profile in just 2 minutes",
      details: [
        "Quick registration process",
        "Business information setup",
        "Choose your plan",
        "Connect your platforms",
      ],
      time: "2 minutes",
      color: "from-green-400 to-green-600",
    },
    {
      step: "02",
      icon: Settings,
      title: "Configure Your Tools",
      description:
        "Customize AI settings, import contacts, and set up your marketing preferences",
      details: [
        "AI content preferences",
        "Upload customer contacts",
        "Set business hours",
        "Configure notifications",
      ],
      time: "5 minutes",
      color: "from-blue-400 to-blue-600",
    },
    {
      step: "03",
      icon: Zap,
      title: "Generate & Launch",
      description:
        "Create AI-powered content and launch your first marketing campaigns",
      details: [
        "Generate social media posts",
        "Create WhatsApp campaigns",
        "Set up Google/Facebook ads",
        "Schedule content delivery",
      ],
      time: "10 minutes",
      color: "from-purple-400 to-purple-600",
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Track & Optimize",
      description:
        "Monitor performance, analyze results, and optimize for better outcomes",
      details: [
        "Real-time analytics",
        "Performance insights",
        "Customer engagement tracking",
        "ROI optimization",
      ],
      time: "Ongoing",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Automate 80% of your marketing tasks and focus on growing your business",
    },
    {
      icon: Target,
      title: "Better Targeting",
      description:
        "Reach the right customers with AI-powered audience insights",
    },
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Boost revenue with data-driven marketing strategies",
    },
    {
      icon: Users,
      title: "Grow Audience",
      description:
        "Expand your customer base with consistent, engaging content",
    },
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Restaurant Owner",
      scenario:
        "Raj runs a small restaurant and wants to increase customer visits",
      solution:
        "Uses AI to create daily food posts, sends WhatsApp offers to regular customers, and tracks which promotions work best",
      result: "40% increase in weekend bookings",
    },
    {
      icon: Calendar,
      title: "Fashion Boutique",
      scenario: "Priya owns a boutique and struggles with seasonal marketing",
      solution:
        "Leverages festival campaign templates, creates Instagram-ready content, and manages customer communications",
      result: "3x more sales during Diwali season",
    },
    {
      icon: Target,
      title: "Local Services",
      scenario:
        "Kumar provides home services but has limited marketing knowledge",
      solution:
        "Generates service-focused content, creates targeted Google ads, and builds customer database through WhatsApp",
      result: "5x more service bookings per month",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-blue-100 text-brand-blue-800">
                🎯 Simple 4-Step Process
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                How{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  Vyapari.AI
                </span>{" "}
                Works
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Transform your business marketing in just 4 simple steps. From
                setup to success, we guide you through every stage of your
                digital marketing journey.
              </p>
              <Link to="/subscription">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple Setup Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get up and running in less than 20 minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className="relative hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader className="text-center">
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.time}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Approach?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Designed specifically for Indian small businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-brand-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See how businesses like yours are succeeding with Vyapari.AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <useCase.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Challenge:
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {useCase.scenario}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Solution:
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {useCase.solution}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-1">
                        Result:
                      </h4>
                      <p className="text-green-700 text-sm font-medium">
                        {useCase.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses. Start your 7-day free
              trial today.
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
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="text-white/80 text-sm mt-6">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
