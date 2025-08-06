import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Play,
  Clock,
  Users,
  BookOpen,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Download,
  Video,
  FileText,
  Headphones
} from "lucide-react";

export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Getting Started", "AI Content", "WhatsApp Marketing", "Social Media", "Analytics", "Advanced Features"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const tutorials = [
    {
      title: "Getting Started with Adora - Complete Setup Guide",
      description: "Learn how to set up your account, connect your business profiles, and start your first campaign in under 30 minutes.",
      category: "Getting Started",
      level: "Beginner",
      duration: "25 min",
      type: "video",
      views: "12.5K",
      rating: 4.9,
      thumbnail: "/placeholder.svg",
      featured: true
    },
    {
      title: "Creating Your First AI-Generated Content Campaign",
      description: "Step-by-step guide to creating engaging social media content using our AI content studio.",
      category: "AI Content",
      level: "Beginner", 
      duration: "18 min",
      type: "video",
      views: "8.2K",
      rating: 4.8,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "WhatsApp Marketing Automation: From Setup to Success",
      description: "Master WhatsApp marketing with automated campaigns, contact management, and performance tracking.",
      category: "WhatsApp Marketing",
      level: "Intermediate",
      duration: "35 min",
      type: "video",
      views: "15.3K",
      rating: 4.9,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Social Media Scheduling & Analytics Deep Dive",
      description: "Advanced strategies for social media management including optimal posting times and analytics interpretation.",
      category: "Social Media",
      level: "Intermediate",
      duration: "28 min",
      type: "video",
      views: "6.7K",
      rating: 4.7,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Festival Campaign Templates: Maximize Seasonal Sales",
      description: "How to use our festival campaign templates to create culturally relevant marketing campaigns.",
      category: "Getting Started",
      level: "Beginner",
      duration: "22 min",
      type: "video",
      views: "9.1K",
      rating: 4.8,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Advanced Analytics: ROI Tracking & Performance Optimization",
      description: "Learn to interpret analytics data and optimize your campaigns for maximum ROI.",
      category: "Analytics",
      level: "Advanced",
      duration: "42 min",
      type: "video",
      views: "4.2K",
      rating: 4.6,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "API Integration Guide for Developers",
      description: "Technical guide for integrating Adora APIs with your existing business systems.",
      category: "Advanced Features",
      level: "Advanced",
      duration: "45 min",
      type: "article",
      views: "2.8K",
      rating: 4.7,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Lead Management & CRM Best Practices",
      description: "Comprehensive guide to managing leads effectively and converting them into customers.",
      category: "Advanced Features",
      level: "Intermediate",
      duration: "32 min",
      type: "video",
      views: "5.9K",
      rating: 4.8,
      thumbnail: "/placeholder.svg"
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || tutorial.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "article": return FileText;
      case "audio": return Headphones;
      default: return Play;
    }
  };

  const quickStartGuides = [
    {
      title: "5-Minute Quick Start",
      description: "Get your first campaign running in 5 minutes",
      icon: Play,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Setup Checklist",
      description: "Complete setup checklist for new users",
      icon: CheckCircle,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Best Practices Guide",
      description: "Essential tips for marketing success",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Template Library",
      description: "Ready-to-use campaign templates",
      icon: Download,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                📚 Learn & Master
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Video Tutorials &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Guides
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Master Adora with our comprehensive tutorials, step-by-step guides, 
                and expert tips to grow your business faster.
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Start Guides
              </h2>
              <p className="text-xl text-gray-600">
                Get up and running quickly with these essential resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {quickStartGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${guide.color} flex items-center justify-center mx-auto mb-4`}>
                      <guide.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {guide.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      onClick={() => setSelectedLevel(level)}
                      size="sm"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tutorial */}
        {selectedCategory === "All" && selectedLevel === "All" && !searchTerm && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Badge className="mb-6 bg-purple-100 text-purple-800">
                  ⭐ Featured Tutorial
                </Badge>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative">
                      <img 
                        src={tutorials[0].thumbnail} 
                        alt={tutorials[0].title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                          <Play className="w-6 h-6 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">{tutorials[0].category}</Badge>
                        <Badge variant="secondary">{tutorials[0].level}</Badge>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {tutorials[0].title}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {tutorials[0].description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="mr-4">{tutorials[0].duration}</span>
                        <Users className="w-4 h-4 mr-2" />
                        <span className="mr-4">{tutorials[0].views} views</span>
                        <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                        <span>{tutorials[0].rating}</span>
                      </div>
                      <Button>
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Tutorials Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {selectedCategory === "All" ? "All Tutorials" : `${selectedCategory} Tutorials`}
              </h2>
              
              {filteredTutorials.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No tutorials found matching your criteria.</p>
                  <Button 
                    onClick={() => {setSearchTerm(""); setSelectedCategory("All"); setSelectedLevel("All");}}
                    className="mt-4"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTutorials.slice(1).map((tutorial, index) => {
                    const TypeIcon = getTypeIcon(tutorial.type);
                    return (
                      <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                        <div className="relative">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              <Play className="w-4 h-4 mr-2" />
                              Watch
                            </Button>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/90">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {tutorial.type}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="outline" className="bg-white/90">
                              {tutorial.level}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                            {tutorial.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mb-4">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="mr-3">{tutorial.duration}</span>
                            <Users className="w-3 h-3 mr-1" />
                            <span className="mr-3">{tutorial.views}</span>
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>{tutorial.rating}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {tutorial.category}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              Start
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need More Help?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/help">
                  <Button variant="outline" size="lg">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Help Center
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg">
                    Contact Support
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Put Your Knowledge to Work?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start applying what you've learned with Adora's powerful marketing platform.
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
