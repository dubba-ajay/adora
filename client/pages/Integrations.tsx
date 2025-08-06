import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Link2,
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  MessageSquare,
  Mail,
  Target,
  BarChart3,
  Search,
  Building2,
  Calendar,
  Users,
  Settings,
  ExternalLink,
} from "lucide-react";

export default function Integrations() {
  const integrations = [
    {
      name: "Google Ads",
      description: "Connect your Google Ads account for automated campaign management",
      icon: Target,
      status: "available",
      category: "Advertising",
      features: ["Campaign management", "Keyword optimization", "Performance tracking"],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Facebook Business",
      description: "Integrate with Facebook and Instagram for social media advertising",
      icon: MessageSquare,
      status: "available",
      category: "Social Media",
      features: ["Ad campaign creation", "Audience targeting", "Social media management"],
      color: "from-blue-600 to-purple-600"
    },
    {
      name: "WhatsApp Business API",
      description: "Connect WhatsApp Business API for bulk messaging and automation",
      icon: MessageSquare,
      status: "available",
      category: "Messaging",
      features: ["Bulk messaging", "Automated responses", "Contact management"],
      color: "from-green-500 to-green-600"
    },
    {
      name: "Google Analytics",
      description: "Track website performance and customer behavior insights",
      icon: BarChart3,
      status: "available",
      category: "Analytics",
      features: ["Website tracking", "Conversion analysis", "Audience insights"],
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Mailchimp",
      description: "Sync email marketing campaigns with your existing Mailchimp account",
      icon: Mail,
      status: "coming-soon",
      category: "Email Marketing",
      features: ["Email campaigns", "List management", "Automation workflows"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Shopify",
      description: "Connect your Shopify store for e-commerce marketing automation",
      icon: Building2,
      status: "coming-soon",
      category: "E-commerce",
      features: ["Product sync", "Order tracking", "Customer data"],
      color: "from-green-600 to-blue-600"
    },
    {
      name: "WordPress",
      description: "Integrate with WordPress for content management and SEO",
      icon: Globe,
      status: "coming-soon",
      category: "Website",
      features: ["Content publishing", "SEO optimization", "Blog management"],
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Zapier",
      description: "Connect with 5000+ apps through Zapier automation",
      icon: Zap,
      status: "coming-soon",
      category: "Automation",
      features: ["Workflow automation", "App connections", "Trigger actions"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const categories = ["All", "Advertising", "Social Media", "Messaging", "Analytics", "Email Marketing", "E-commerce", "Website", "Automation"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredIntegrations = selectedCategory === "All" 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                🔗 Connect Your Tools
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Powerful{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Integrations
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Connect Adora with your favorite tools and platforms to create a seamless marketing workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Request Integration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline" size="lg">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredIntegrations.map((integration, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-xl transition-all duration-300 ${
                    integration.status === 'available' ? 'hover:scale-105' : 'opacity-75'
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${integration.color} flex items-center justify-center`}>
                        <integration.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant={integration.status === 'available' ? 'default' : 'secondary'}
                        className={integration.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {integration.status === 'available' ? 'Available' : 'Coming Soon'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">
                      {integration.category}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      {integration.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {integration.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      variant={integration.status === 'available' ? 'default' : 'outline'}
                      disabled={integration.status !== 'available'}
                    >
                      {integration.status === 'available' ? (
                        <>
                          <Link2 className="w-4 h-4 mr-2" />
                          Connect Now
                        </>
                      ) : (
                        <>
                          <Settings className="w-4 h-4 mr-2" />
                          Notify When Ready
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Use Integrations?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Streamline your workflow and get more done with connected tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Save Time
                </h3>
                <p className="text-gray-600">
                  Automate repetitive tasks and sync data across all your tools seamlessly.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Better Insights
                </h3>
                <p className="text-gray-600">
                  Get unified analytics and reporting across all your marketing channels.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Unified Experience
                </h3>
                <p className="text-gray-600">
                  Manage all your marketing activities from one central dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need a Custom Integration?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't see the tool you need? Let us know and we'll consider adding it to our roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Integration
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
