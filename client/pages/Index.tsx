import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import {
  Play,
  Store,
  MessageSquare,
  Megaphone,
  BarChart3,
  Calendar,
  Globe,
  QrCode,
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-blue-50 to-brand-orange-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-brand-orange-100 text-brand-orange-800 hover:bg-brand-orange-200">
                  🚀 AI-Powered Marketing for Local Stores
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Marketing for Every{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                    Local Store
                  </span>{" "}
                  in India
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  No website? No problem. Sell more with AI-generated posts,
                  WhatsApp campaigns, and ads that bring customers to your door.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/get-started">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Zap className="w-5 h-5 mr-2" />
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>7-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-orange-50 rounded-lg p-4">
                      <Store className="w-8 h-8 text-brand-orange-600 mb-2" />
                      <h3 className="font-semibold text-sm mb-1">
                        Beauty Salon
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        +40% customers this month
                      </p>
                    </div>
                    <div className="bg-brand-blue-50 rounded-lg p-4">
                      <Store className="w-8 h-8 text-brand-blue-600 mb-2" />
                      <h3 className="font-semibold text-sm mb-1">Food Joint</h3>
                      <p className="text-xs text-muted-foreground">
                        +25% online orders
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <Store className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-sm mb-1">
                        Retail Shop
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        +60% foot traffic
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <Store className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-sm mb-1">Gym</h3>
                      <p className="text-xs text-muted-foreground">
                        +35% memberships
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-orange-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-blue-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Challenge Every Local Business Faces
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Traditional marketing is expensive, digital marketing is
                complex, and hiring agencies is out of budget for most local
                stores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  😞 The Problem
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        No Digital Presence
                      </h4>
                      <p className="text-muted-foreground">
                        Most local stores don't have websites or social media
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Limited Marketing Budget
                      </h4>
                      <p className="text-muted-foreground">
                        Can't afford expensive agencies or marketing tools
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Lack of Technical Skills
                      </h4>
                      <p className="text-muted-foreground">
                        Don't know how to create content or run digital
                        campaigns
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  🚀 Our Solution
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        AI-Generated Marketing
                      </h4>
                      <p className="text-muted-foreground">
                        Create professional posts, ads, and campaigns in minutes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Affordable Pricing
                      </h4>
                      <p className="text-muted-foreground">
                        Starting at just ₹5,999/month - less than a freelancer
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        No Technical Skills Needed
                      </h4>
                      <p className="text-muted-foreground">
                        Simple interface designed for local business owners
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Adora is Better Than Freelancers & Agencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Freelancers
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          ₹20,000-30,000/month
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          Inconsistent quality
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          May disappear anytime
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          Limited to their skills
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      Recommended
                    </Badge>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Adora
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-sm text-muted-foreground">
                          ₹5,999-14,999/month only
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-sm text-muted-foreground">
                          AI-powered consistency
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-sm text-muted-foreground">
                          24/7 available platform
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-sm text-muted-foreground">
                          Complete marketing suite
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Agencies
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          ₹50,000+ per month
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          Long-term contracts
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          Don't understand local market
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        <span className="text-sm text-muted-foreground">
                          Too expensive for SMBs
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Everything You Need to Grow Your Local Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From AI content creation to customer analytics - all the tools a
                local business needs in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageSquare className="w-10 h-10 text-brand-blue-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    AI Content Generator
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create posts, captions, and marketing copy instantly
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageSquare className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    WhatsApp Campaigns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Send targeted messages to your customer list
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Megaphone className="w-10 h-10 text-brand-orange-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Google & Facebook Ads
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate ad copy and campaigns automatically
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <BarChart3 className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Track performance and customer insights
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Calendar className="w-10 h-10 text-pink-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Festival Campaign Packs
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ready campaigns for Diwali, Holi, and more
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Globe className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Business Profile
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No website needed - we host your business page
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <QrCode className="w-10 h-10 text-indigo-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Digital Business Card
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    QR code cards for easy sharing
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Search className="w-10 h-10 text-teal-500 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Local SEO Tips
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get discovered by nearby customers
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Explore All Features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                What Local Business Owners Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Adora helped me get 40% more customers in just 2
                    months. The AI creates beautiful posts for my salon that I
                    could never make myself!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-semibold">P</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Priya Sharma
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Beauty Salon Owner, Mumbai
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "I was spending ₹8000/month on a freelancer. Now I pay only
                    ₹999 and get better results. The WhatsApp campaigns are
                    amazing!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">R</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Rajesh Kumar
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Electronics Store, Delhi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Finally a tool made for people like us! No technical
                    jargon, just simple tools that work. My restaurant has never
                    been busier."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Anjali Verma
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Restaurant Owner, Bangalore
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Local Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of local businesses already using AI to attract
              more customers and increase sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-started">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Free Trial
                </Button>
              </Link>
              <Link to="/subscription">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-foreground"
                >
                  View Pricing
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
