import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Star,
  ArrowRight,
  Zap,
  Crown,
  Users,
  Info,
  MessageSquare,
  Mail,
  Target,
  BarChart3,
  Calendar,
  Search,
  Building2,
  Gift,
  Phone,
  HeadphonesIcon,
  CircleCheckBig,
} from "lucide-react";

export default function PricingDetailed() {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (monthlyPrice: number) => {
    if (isYearly) {
      const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
      return Math.round(yearlyPrice);
    }
    return monthlyPrice;
  };

  const getMonthlyPrice = (monthlyPrice: number) => {
    if (isYearly) {
      return Math.round(monthlyPrice * 0.8); // 20% discount per month
    }
    return monthlyPrice;
  };

  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      badge: "For Startups",
      monthlyPrice: 5999,
      description: "Great for getting started",
      color: "gray",
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      features: [
        { name: "AI Content Studio", value: "100 posts/month", included: true },
        { name: "Social Media Management", value: "3 accounts", included: true },
        { name: "Email Marketing", value: "2,000 emails/month", included: true },
        { name: "WhatsApp Campaigns", value: "500 messages/month", included: true, tooltip: "Meta charges apply" },
        { name: "Business Profile Setup", value: "One-time", included: true },
        { name: "Lead Management CRM", value: "", included: false },
        { name: "SEO Management", value: "", included: false },
        { name: "Festival Campaigns", value: "", included: false },
        { name: "Advanced Analytics Dashboard", value: "", included: false },
        { name: "Google & Facebook Ads Management", value: "", included: false },
        { name: "Referral Program Setup & Automation", value: "", included: false },
        { name: "Priority Support & Advanced Reporting", value: "", included: false },
      ],
      extras: [
        "Extra WhatsApp: ₹299/1,000 messages",
        "Extra Emails: ₹199/1,000 emails"
      ]
    },
    {
      id: "growth",
      name: "Growth Plan",
      badge: "Most Popular",
      monthlyPrice: 9999,
      description: "Save 30% vs Starter",
      color: "blue",
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true,
      features: [
        { name: "AI Content Studio", value: "Everything in Starter +", included: true },
        { name: "Social Media Management", value: "Everything in Starter +", included: true },
        { name: "Email Marketing", value: "Everything in Starter +", included: true },
        { name: "WhatsApp Campaigns", value: "Everything in Starter +", included: true, tooltip: "Meta charges apply" },
        { name: "Business Profile Setup", value: "Everything in Starter +", included: true },
        { name: "Lead Management CRM", value: "1,000 leads", included: true },
        { name: "SEO Management", value: "5 keywords", included: true },
        { name: "Festival Campaigns", value: "2/month", included: true },
        { name: "Advanced Analytics Dashboard", value: "Full dashboard", included: true },
        { name: "Google & Facebook Ads Management", value: "Ad spend direct to platform", included: true, tooltip: "Ad spend billed by platform" },
        { name: "Referral Program Setup & Automation", value: "", included: false },
        { name: "Priority Support & Advanced Reporting", value: "", included: false },
      ],
      extras: [
        "Google & Facebook Ads (ad spend direct to platform)",
        "Extra campaigns available"
      ]
    },
    {
      id: "premium",
      name: "Premium Plan",
      badge: "All-in-One",
      monthlyPrice: 14999,
      description: "Best for complete automation",
      color: "gold",
      buttonText: "Go Premium",
      buttonVariant: "default" as const,
      features: [
        { name: "AI Content Studio", value: "Everything in Growth +", included: true },
        { name: "Social Media Management", value: "Everything in Growth +", included: true },
        { name: "Email Marketing", value: "Everything in Growth +", included: true },
        { name: "WhatsApp Campaigns", value: "Everything in Growth +", included: true, tooltip: "Meta charges apply" },
        { name: "Business Profile Setup", value: "Everything in Growth +", included: true },
        { name: "Lead Management CRM", value: "Everything in Growth +", included: true },
        { name: "SEO Management", value: "Everything in Growth +", included: true },
        { name: "Festival Campaigns", value: "Everything in Growth +", included: true },
        { name: "Advanced Analytics Dashboard", value: "Everything in Growth +", included: true },
        { name: "Google & Facebook Ads Management", value: "Spend paid directly", included: true, tooltip: "Ad spend billed by platform" },
        { name: "Referral Program Setup & Automation", value: "Full automation", included: true },
        { name: "Priority Support & Advanced Reporting", value: "24/7 priority support", included: true },
      ],
      extras: [
        "Unlimited Campaign Scheduling",
        "All features included",
        "Priority support included"
      ]
    }
  ];

  const addOns = [
    {
      name: "Extra WhatsApp messages",
      price: "₹299/1,000",
      description: "Additional WhatsApp marketing capacity",
      icon: MessageSquare
    },
    {
      name: "Extra Emails",
      price: "₹199/1,000",
      description: "Expand your email marketing reach",
      icon: Mail
    },
    {
      name: "Extra Festival Campaign",
      price: "₹999 each",
      description: "Additional seasonal campaign templates",
      icon: Calendar
    },
    {
      name: "Premium Support",
      price: "₹1,000/month",
      description: "Dedicated account manager and priority support",
      icon: HeadphonesIcon
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30">
        {/* Header Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-orange-100 text-blue-800 border-0">
                💰 Choose Your Growth Plan
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Choose the Right Plan for Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  Business Growth
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Flexible plans with everything you need to grow online. Upgrade anytime.
              </p>
              
              {/* Monthly/Yearly Toggle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className={`text-lg font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={`text-lg font-medium ${isYearly ? 'text-green-600' : 'text-gray-500'}`}>
                  Yearly
                </span>
                {isYearly && (
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    Save 20%
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3-Column Pricing Table (Main Section) */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className={`relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'border-2 border-blue-500 shadow-2xl scale-105 lg:scale-110 bg-gradient-to-b from-blue-50 to-white' 
                      : plan.color === 'gold'
                        ? 'border border-yellow-300 shadow-lg bg-gradient-to-b from-yellow-50 to-white'
                        : 'border border-gray-200 shadow-lg bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 text-sm font-semibold">
                        <Star className="w-4 h-4 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8">
                    {!plan.popular && (
                      <Badge 
                        variant="outline" 
                        className={`mb-4 mx-auto w-fit ${
                          plan.color === 'gold' 
                            ? 'border-yellow-400 text-yellow-700 bg-yellow-50' 
                            : 'border-gray-300 text-gray-600 bg-gray-50'
                        }`}
                      >
                        {plan.badge}
                      </Badge>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                        : plan.color === 'gold' 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}>
                      {plan.id === 'starter' && <Users className="w-8 h-8 text-white" />}
                      {plan.id === 'growth' && <Zap className="w-8 h-8 text-white" />}
                      {plan.id === 'premium' && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{getMonthlyPrice(plan.monthlyPrice).toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      {isYearly && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500 line-through">
                            ₹{plan.monthlyPrice.toLocaleString('en-IN')}/month
                          </span>
                          <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                            Save 20%
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium text-blue-600 mb-2">
                        {plan.description}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features List */}
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {feature.included ? (
                              <CircleCheckBig className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                                {feature.name}
                              </span>
                              {feature.tooltip && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-4 h-4 text-blue-500" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                            {feature.value && feature.included && (
                              <span className="text-xs text-gray-500">
                                {feature.value}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Extras */}
                    <div className="pt-6 border-t">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Extras:
                      </h4>
                      <div className="space-y-2">
                        {plan.extras.map((extra, extraIndex) => (
                          <div key={extraIndex} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{extra}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                      <Link to="/dashboard" className="block">
                        <Button
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600' 
                              : plan.color === 'gold'
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          variant={plan.buttonVariant}
                          size="lg"
                        >
                          {plan.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        7-day free trial
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Add-Ons Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Optional Add-Ons Section
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enhance your plan with additional services as your business grows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {addOns.map((addon, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <addon.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                    <p className="text-lg font-bold text-blue-600 mb-2">{addon.price}</p>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Notes Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Quick Notes Section
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          "Your subscription covers all platform features and management fees."
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                        <Info className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          "Ad spend and WhatsApp message charges are billed separately by platforms."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call-to-Action Footer */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start with a free trial. Upgrade anytime as your business grows!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of local businesses already growing with Adora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-4">
              Free trial • Starts 7-day free trial • Directs to app subscription flow
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
