import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Globe,
  Zap,
  Heart,
  Award,
  ArrowRight,
  Building2,
  TrendingUp,
  Shield
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Customer First",
      description: "Every decision we make starts with how it will benefit our customers and their business growth."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge marketing solutions for modern businesses."
    },
    {
      icon: Heart,
      title: "Simplicity",
      description: "We believe complex marketing should be made simple and accessible to businesses of all sizes."
    },
    {
      icon: Globe,
      title: "Local Impact",
      description: "Focused on empowering Indian businesses with culturally relevant marketing solutions."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "15+ years in digital marketing and business automation"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Former lead engineer at top tech companies, AI/ML expert"
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      description: "Product strategist with expertise in SMB marketing tools"
    },
    {
      name: "Sneha Gupta",
      role: "Head of Marketing",
      description: "Digital marketing specialist focused on Indian market dynamics"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Businesses" },
    { number: "50M+", label: "Messages Sent" },
    { number: "₹2Cr+", label: "Revenue Generated" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                🏢 About Adora
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Empowering Indian Businesses with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Smart Marketing
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                We're on a mission to democratize digital marketing for Indian businesses by providing 
                AI-powered tools that are simple, effective, and culturally relevant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button variant="outline" size="lg">
                    Join Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-xl text-gray-600">
                  Born from the need to bridge the digital marketing gap for Indian SMBs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    The Challenge We Saw
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Most Indian small and medium businesses struggled with digital marketing. 
                    Existing tools were either too complex, too expensive, or didn't understand 
                    the unique needs of the Indian market.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Business owners were spending hours trying to manage social media, create content, 
                    and run ads across multiple platforms - time that could be better spent growing their business.
                  </p>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700 font-medium">Founded in 2023 in Bangalore</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Our Solution
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We built Adora to be the all-in-one marketing platform specifically 
                    designed for Indian businesses. Our AI understands local languages, 
                    cultural nuances, and market dynamics.
                  </p>
                  <p className="text-gray-600 mb-6">
                    From WhatsApp marketing to festival campaigns, from local SEO to social media management - 
                    we've created tools that actually work for Indian businesses.
                  </p>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <span className="text-gray-700 font-medium">Helping 10,000+ businesses grow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate individuals working to revolutionize Indian business marketing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of Indian businesses already growing with Adora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscription">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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
