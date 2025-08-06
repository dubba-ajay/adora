import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Mail,
  Share2,
  ArrowRight,
  CheckCircle,
  Play,
  Settings,
  TrendingUp,
  Gift,
  User,
  Building2,
} from "lucide-react";

export default function ServicesOverview() {
  const [activeService, setActiveService] = useState("ai-content");

  const services = [
    {
      id: "ai-content",
      icon: Zap,
      title: "AI Content Studio",
      subtitle: "Generate Regional Content",
      description: "AI-powered content generation for social media, WhatsApp, and advertising campaigns in multiple Indian languages.",
      color: "from-yellow-400 to-orange-500",
      workflow: [
        {
          step: 1,
          title: "Select Content Type",
          description: "Choose from social media posts, WhatsApp messages, ad copies, or blog content."
        },
        {
          step: 2,
          title: "Input Your Requirements", 
          description: "Provide business details, target audience, occasion, and key message points."
        },
        {
          step: 3,
          title: "AI Generation",
          description: "Our AI creates multiple content variations optimized for your business and platform."
        },
        {
          step: 4,
          title: "Customize & Use",
          description: "Edit, approve, and directly publish or save content for later use."
        }
      ],
      features: [
        "100+ content templates for different industries",
        "Support for Hindi, English, and 10+ regional languages",
        "Platform-specific optimization (Instagram, Facebook, WhatsApp)",
        "Festival and occasion-based content suggestions",
        "Brand voice customization",
        "Instant content variations",
        "SEO-optimized blog content",
        "Image suggestion for visual content"
      ],
      benefits: [
        "Save 80% time on content creation",
        "Consistent brand messaging",
        "Higher engagement rates",
        "Cultural relevance for Indian market"
      ]
    },
    {
      id: "social-media",
      icon: Share2,
      title: "Social Media Management",
      subtitle: "Automate Social Posts",
      description: "Complete social media automation with scheduling, posting, and engagement tracking across all platforms.",
      color: "from-pink-400 to-purple-600",
      workflow: [
        {
          step: 1,
          title: "Connect Accounts",
          description: "Link your Facebook, Instagram, Twitter, and LinkedIn business accounts."
        },
        {
          step: 2,
          title: "Create Content Calendar",
          description: "Plan and schedule posts for optimal engagement times using our calendar interface."
        },
        {
          step: 3,
          title: "Auto-Publishing",
          description: "Posts are automatically published across platforms at scheduled times."
        },
        {
          step: 4,
          title: "Monitor & Engage",
          description: "Track performance metrics and respond to comments from unified dashboard."
        }
      ],
      features: [
        "Multi-platform posting (Facebook, Instagram, Twitter, LinkedIn)",
        "Visual content calendar with drag-drop scheduling",
        "Best time suggestions based on audience activity",
        "Hashtag research and recommendations",
        "Automated story posting",
        "Comment management and auto-replies",
        "Performance analytics for each platform",
        "Content recycling and reposting"
      ],
      benefits: [
        "Maintain consistent social presence",
        "Increase follower engagement by 60%",
        "Save 5+ hours weekly on social media",
        "Better reach and visibility"
      ]
    },
    {
      id: "whatsapp",
      icon: MessageSquare,
      title: "WhatsApp Campaigns",
      subtitle: "Send Bulk Messages",
      description: "Professional WhatsApp marketing with bulk messaging, contact management, and campaign automation.",
      color: "from-green-400 to-green-600",
      workflow: [
        {
          step: 1,
          title: "Import Contacts",
          description: "Upload contact lists or sync from your CRM and organize into targeted groups."
        },
        {
          step: 2,
          title: "Create Message",
          description: "Design personalized messages with images, documents, and call-to-action buttons."
        },
        {
          step: 3,
          title: "Schedule Campaign",
          description: "Set timing, target groups, and delivery preferences for maximum impact."
        },
        {
          step: 4,
          title: "Track Results",
          description: "Monitor delivery rates, read receipts, and response metrics in real-time."
        }
      ],
      features: [
        "Bulk messaging up to 10,000 contacts",
        "Contact list management and segmentation",
        "Message personalization with customer data",
        "Media sharing (images, videos, documents)",
        "Message scheduling and automation",
        "Delivery and read receipt tracking",
        "Auto-reply and chatbot integration",
        "WhatsApp Business API integration"
      ],
      benefits: [
        "98% message open rates",
        "Direct customer communication",
        "Higher conversion than email",
        "Instant customer support"
      ]
    },
    {
      id: "email-marketing",
      icon: Mail,
      title: "Email Marketing",
      subtitle: "Email Automation",
      description: "Professional email campaigns with automation, segmentation, and detailed analytics.",
      color: "from-blue-400 to-cyan-500",
      workflow: [
        {
          step: 1,
          title: "Build Email List",
          description: "Import contacts and create signup forms to grow your subscriber base."
        },
        {
          step: 2,
          title: "Design Campaigns",
          description: "Use professional templates or create custom emails with drag-drop editor."
        },
        {
          step: 3,
          title: "Set Automation",
          description: "Create automated sequences for welcome series, promotions, and follow-ups."
        },
        {
          step: 4,
          title: "Analyze Performance",
          description: "Track open rates, clicks, conversions, and optimize future campaigns."
        }
      ],
      features: [
        "Professional email templates library",
        "Drag-and-drop email builder",
        "Advanced segmentation and targeting",
        "Automated email sequences",
        "A/B testing for subject lines and content",
        "Detailed analytics and reporting",
        "Integration with e-commerce platforms",
        "Mobile-responsive email designs"
      ],
      benefits: [
        "Average 25% open rates",
        "4x higher ROI than social media",
        "Automated customer nurturing",
        "Increased repeat purchases"
      ]
    },
    {
      id: "ads",
      icon: Target,
      title: "Google & Facebook Ads",
      subtitle: "Create Ad Campaigns",
      description: "Professional ad campaign creation and management across Google, Facebook, Instagram, and Twitter platforms.",
      color: "from-blue-400 to-blue-600",
      workflow: [
        {
          step: 1,
          title: "Campaign Setup",
          description: "Select platform, define objectives, target audience, and set budget parameters."
        },
        {
          step: 2,
          title: "Creative Development",
          description: "Use AI to generate ad copy, select images, and create compelling ad creatives."
        },
        {
          step: 3,
          title: "Launch & Monitor",
          description: "Deploy campaigns across platforms and monitor performance in real-time."
        },
        {
          step: 4,
          title: "Optimize Results",
          description: "Automatically adjust bidding, audiences, and creatives for better ROI."
        }
      ],
      features: [
        "Multi-platform campaign management",
        "AI-generated ad copy and creatives",
        "Advanced audience targeting",
        "Budget optimization across platforms",
        "Real-time performance tracking",
        "A/B testing for ad variations",
        "Conversion tracking and attribution",
        "Automated bid management"
      ],
      benefits: [
        "50% lower cost per acquisition",
        "Reach qualified customers",
        "Measurable ROI tracking",
        "Professional ad management"
      ]
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Advanced Analytics",
      subtitle: "Multi-channel Insights",
      description: "Comprehensive analytics dashboard tracking performance across all marketing channels and business metrics.",
      color: "from-purple-400 to-purple-600",
      workflow: [
        {
          step: 1,
          title: "Data Integration",
          description: "Connect all your marketing platforms and business tools for unified tracking."
        },
        {
          step: 2,
          title: "Dashboard Setup",
          description: "Customize dashboards to display the metrics most important to your business."
        },
        {
          step: 3,
          title: "Automated Reporting",
          description: "Receive regular reports via email with key insights and recommendations."
        },
        {
          step: 4,
          title: "Strategic Insights",
          description: "Use AI-powered insights to make data-driven decisions for business growth."
        }
      ],
      features: [
        "Multi-channel performance tracking",
        "Real-time dashboard with custom widgets",
        "ROI calculation for all marketing activities",
        "Customer lifetime value analysis",
        "Conversion funnel tracking",
        "Competitor analysis and benchmarking",
        "Automated alert system for important metrics",
        "Export reports in multiple formats"
      ],
      benefits: [
        "Complete visibility into marketing ROI",
        "Data-driven decision making",
        "Identify best performing channels",
        "Optimize marketing spend"
      ]
    },
    {
      id: "lead-management",
      icon: Users,
      title: "Lead Management CRM",
      subtitle: "CRM with 1-click Campaigns",
      description: "Complete customer relationship management with lead tracking, follow-up automation, and integrated campaigns.",
      color: "from-emerald-400 to-emerald-600",
      workflow: [
        {
          step: 1,
          title: "Capture Leads",
          description: "Automatically collect leads from website forms, social media, and ad campaigns."
        },
        {
          step: 2,
          title: "Lead Scoring",
          description: "AI-powered lead scoring based on engagement and business potential."
        },
        {
          step: 3,
          title: "Automated Follow-up",
          description: "Set up automated email and WhatsApp sequences for lead nurturing."
        },
        {
          step: 4,
          title: "Convert to Sales",
          description: "Track lead journey and convert qualified leads into paying customers."
        }
      ],
      features: [
        "Lead capture from multiple sources",
        "Contact management and organization",
        "Lead scoring and qualification",
        "Automated follow-up sequences",
        "Pipeline management and tracking",
        "Integration with email and WhatsApp",
        "Customer communication history",
        "Sales reporting and forecasting"
      ],
      benefits: [
        "Never lose a potential customer",
        "Automated lead nurturing",
        "Higher conversion rates",
        "Organized customer database"
      ]
    },
    {
      id: "festivals",
      icon: Calendar,
      title: "Festival Campaigns",
      subtitle: "Regional Festival Templates",
      description: "Ready-made marketing campaigns for all major Indian festivals with culturally relevant content and designs.",
      color: "from-pink-400 to-pink-600",
      workflow: [
        {
          step: 1,
          title: "Select Festival",
          description: "Choose from 50+ Indian festivals including Diwali, Holi, Eid, Christmas, and regional celebrations."
        },
        {
          step: 2,
          title: "Customize Campaign",
          description: "Personalize templates with your business details, offers, and brand colors."
        },
        {
          step: 3,
          title: "Multi-channel Launch",
          description: "Deploy across social media, WhatsApp, email, and ads simultaneously."
        },
        {
          step: 4,
          title: "Track Performance",
          description: "Monitor engagement and sales generated from festival campaigns."
        }
      ],
      features: [
        "50+ pre-designed festival templates",
        "Culturally relevant content in local languages",
        "Ready-made offer and discount templates",
        "Social media post designs and videos",
        "WhatsApp and email campaign templates",
        "Festival calendar with planning reminders",
        "Industry-specific festival campaigns",
        "Automated campaign scheduling"
      ],
      benefits: [
        "Tap into festival shopping seasons",
        "Culturally relevant marketing",
        "Ready-to-use professional designs",
        "Increase seasonal sales"
      ]
    },
    {
      id: "seo",
      icon: Search,
      title: "SEO Management",
      subtitle: "Multi-language SEO",
      description: "Complete SEO optimization for local and national search visibility with multi-language support.",
      color: "from-indigo-400 to-indigo-600",
      workflow: [
        {
          step: 1,
          title: "SEO Audit",
          description: "Comprehensive analysis of your website's current SEO performance and opportunities."
        },
        {
          step: 2,
          title: "Keyword Research",
          description: "Identify high-value keywords in Hindi, English, and regional languages."
        },
        {
          step: 3,
          title: "Content Optimization",
          description: "Optimize existing content and create new SEO-friendly content."
        },
        {
          step: 4,
          title: "Track Rankings",
          description: "Monitor search rankings and adjust strategy for continuous improvement."
        }
      ],
      features: [
        "Multi-language keyword research",
        "Local SEO optimization for Indian cities",
        "Content optimization recommendations",
        "Backlink building and analysis",
        "Technical SEO audit and fixes",
        "Google My Business optimization",
        "Rank tracking for target keywords",
        "Competitor SEO analysis"
      ],
      benefits: [
        "Higher Google search rankings",
        "Increased organic website traffic",
        "Better local business visibility",
        "Long-term sustainable growth"
      ]
    },
    {
      id: "business-profile",
      icon: Building2,
      title: "Business Profile",
      subtitle: "Multi-language Profile",
      description: "Professional online business profiles optimized for search engines and customer engagement.",
      color: "from-cyan-400 to-cyan-600",
      workflow: [
        {
          step: 1,
          title: "Profile Creation",
          description: "Set up comprehensive business profile with photos, contact details, and services."
        },
        {
          step: 2,
          title: "Content Addition",
          description: "Add product galleries, customer reviews, and business information in multiple languages."
        },
        {
          step: 3,
          title: "SEO Optimization",
          description: "Optimize profile for local search and Google My Business integration."
        },
        {
          step: 4,
          title: "Customer Engagement",
          description: "Enable customer reviews, inquiries, and direct contact through the profile."
        }
      ],
      features: [
        "Multi-language business profiles",
        "Photo and video galleries",
        "Customer review management",
        "Contact form integration",
        "Service and product catalogs",
        "Business hours and location mapping",
        "Social media integration",
        "Mobile-optimized design"
      ],
      benefits: [
        "Professional online presence",
        "Better customer trust and credibility",
        "Increased local search visibility",
        "Direct customer inquiries"
      ]
    },
    {
      id: "referral",
      icon: Gift,
      title: "Referral Program",
      subtitle: "Earn Rewards",
      description: "Customer referral program to grow your business through word-of-mouth marketing and rewards.",
      color: "from-amber-400 to-amber-600",
      workflow: [
        {
          step: 1,
          title: "Program Setup",
          description: "Configure referral rewards, terms, and tracking mechanisms for your business."
        },
        {
          step: 2,
          title: "Customer Enrollment",
          description: "Existing customers sign up and receive unique referral codes or links."
        },
        {
          step: 3,
          title: "Referral Tracking",
          description: "Track referrals, new customer acquisitions, and reward distributions."
        },
        {
          step: 4,
          title: "Reward Distribution",
          description: "Automatically distribute rewards to customers who successfully refer new business."
        }
      ],
      features: [
        "Customizable referral program structure",
        "Unique referral codes and links",
        "Automated reward calculation",
        "Referral tracking dashboard",
        "Multiple reward types (cash, discounts, products)",
        "Email and WhatsApp referral invitations",
        "Performance analytics and reporting",
        "Integration with customer database"
      ],
      benefits: [
        "Acquire customers at lower cost",
        "Increase customer loyalty",
        "Word-of-mouth marketing",
        "Higher customer lifetime value"
      ]
    }
  ];

  const selectedService = services.find(service => service.id === activeService);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-brand-orange-100 text-brand-orange-800">
                🎯 Complete Service Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                How Our Services{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  Actually Work
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Detailed breakdown of each service, step-by-step workflows, features, and benefits to help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
                  >
                    Try Services Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing-new">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Selection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    activeService === service.id
                      ? 'border-brand-orange-500 bg-brand-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mx-auto mb-3`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-center text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    {service.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Service Details */}
            {selectedService && (
              <div className="max-w-6xl mx-auto">
                <Card className="mb-8 border-0 shadow-xl">
                  <CardHeader className="text-center pb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedService.color} flex items-center justify-center mx-auto mb-6`}>
                      <selectedService.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl mb-4">{selectedService.title}</CardTitle>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      {selectedService.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="workflow" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="workflow">How It Works</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      </TabsList>

                      <TabsContent value="workflow" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {selectedService.workflow.map((step, index) => (
                            <div key={index} className="flex space-x-4">
                              <div className="flex-shrink-0">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedService.color} flex items-center justify-center text-white font-bold text-lg`}>
                                  {step.step}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                  {step.title}
                                </h3>
                                <p className="text-gray-600">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="features" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="benefits" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedService.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                              <TrendingUp className="w-6 h-6 text-green-600 mt-0.5" />
                              <span className="text-gray-800 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-8 pt-8 border-t text-center">
                      <Link to="/dashboard">
                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${selectedService.color} text-white`}
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Try {selectedService.title} Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started with All Services?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Choose from our flexible pricing plans and start growing your business with all these powerful tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-orange-600 hover:bg-gray-100"
                >
                  Start Using Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing-new">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-orange-600"
                >
                  View All Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
