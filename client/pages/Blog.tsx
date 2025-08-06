import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  TrendingUp,
  MessageSquare,
  Target,
  Zap,
  Users,
  BarChart3
} from "lucide-react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Digital Marketing", "AI & Automation", "WhatsApp Marketing", "Social Media", "Business Growth", "Case Studies"];

  const featuredPost = {
    title: "How Indian SMBs Can Use AI to 10x Their Marketing ROI",
    excerpt: "Discover the practical strategies and tools that successful Indian businesses are using to leverage AI for unprecedented marketing growth.",
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "AI & Automation",
    image: "/placeholder.svg",
    featured: true
  };

  const blogPosts = [
    {
      title: "WhatsApp Marketing: Complete Guide for Indian Businesses",
      excerpt: "Learn how to build effective WhatsApp marketing campaigns that drive real results for your business.",
      author: "Rajesh Kumar",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "WhatsApp Marketing",
      image: "/placeholder.svg"
    },
    {
      title: "Festival Marketing Calendar 2024: Plan Your Campaigns",
      excerpt: "Never miss a festival marketing opportunity with our comprehensive calendar and campaign ideas.",
      author: "Sneha Gupta",
      date: "2024-01-10",
      readTime: "5 min read", 
      category: "Digital Marketing",
      image: "/placeholder.svg"
    },
    {
      title: "Case Study: How a Mumbai Restaurant Grew 300% Using Adora",
      excerpt: "Real results from a local restaurant that transformed their marketing with AI-powered automation.",
      author: "Amit Patel",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Case Studies",
      image: "/placeholder.svg"
    },
    {
      title: "Social Media Analytics: Metrics That Actually Matter",
      excerpt: "Stop vanity metrics and focus on data that drives real business growth for Indian SMBs.",
      author: "Kavya Singh",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Social Media",
      image: "/placeholder.svg"
    },
    {
      title: "Local SEO for Indian Businesses: Complete 2024 Guide",
      excerpt: "Dominate local search results and attract more customers to your physical business location.",
      author: "Vikram Sharma",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Digital Marketing",
      image: "/placeholder.svg"
    },
    {
      title: "Email Marketing vs WhatsApp: Which Works Better in India?",
      excerpt: "Data-driven comparison of email and WhatsApp marketing effectiveness for Indian audiences.",
      author: "Pooja Reddy",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Digital Marketing",
      image: "/placeholder.svg"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI & Automation": return Zap;
      case "WhatsApp Marketing": return MessageSquare;
      case "Social Media": return Users;
      case "Digital Marketing": return Target;
      case "Business Growth": return TrendingUp;
      case "Case Studies": return BarChart3;
      default: return Target;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-green-100 text-green-800">
                📝 Marketing Insights & Tips
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Learn. Grow. Succeed.
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Practical marketing strategies, AI insights, and success stories from Indian businesses 
                using smart marketing automation.
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
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

        {/* Featured Post */}
        {selectedCategory === "All" && !searchTerm && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Badge className="mb-6 bg-blue-100 text-blue-800">
                  ⭐ Featured Article
                </Badge>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge variant="outline" className="mb-4">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-4">{featuredPost.author}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="mr-4">{featuredPost.date}</span>
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <Button>
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                  <Button 
                    onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                    className="mt-4"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => {
                    const CategoryIcon = getCategoryIcon(post.category);
                    return (
                      <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                        <div className="relative">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/90">
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <User className="w-4 h-4 mr-2" />
                            <span className="mr-4">{post.author}</span>
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{post.date}</span>
                            <Button variant="ghost" size="sm">
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
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

        {/* Newsletter Signup */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get the latest marketing insights and tips delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email"
                  type="email"
                  className="flex-1"
                />
                <Button>
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Join 5,000+ business owners getting our weekly newsletter.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Apply What You've Learned?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Turn insights into action with Adora's comprehensive marketing automation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscription">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  Get Expert Help
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
