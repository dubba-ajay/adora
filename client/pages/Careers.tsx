import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Trophy,
  Coffee,
  Laptop,
  ArrowRight,
  Mail
} from "lucide-react";

export default function Careers() {
  const openings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Bangalore / Remote", 
      type: "Full-time",
      experience: "2-4 years",
      skills: ["Python", "TensorFlow", "NLP", "Machine Learning"]
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Mumbai / Remote",
      type: "Full-time", 
      experience: "4-6 years",
      skills: ["Product Marketing", "Go-to-Market", "Analytics", "Content Strategy"]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Delhi / Remote",
      type: "Full-time",
      experience: "2-4 years", 
      skills: ["Customer Success", "Account Management", "SaaS", "Communication"]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "3-5 years",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
    },
    {
      title: "Business Development Executive",
      department: "Sales",
      location: "Pan India / Remote",
      type: "Full-time",
      experience: "1-3 years",
      skills: ["B2B Sales", "Lead Generation", "CRM", "Communication"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family, mental health support, and wellness programs."
    },
    {
      icon: Laptop,
      title: "Remote-First Culture",
      description: "Work from anywhere in India with flexible hours and home office setup allowance."
    },
    {
      icon: Trophy,
      title: "Learning & Growth",
      description: "Annual learning budget, conference attendance, and mentorship programs."
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible PTO, no-meeting Fridays, and team retreats to recharge and bond."
    },
    {
      icon: Users,
      title: "Equity & Ownership",
      description: "Employee stock ownership plan - grow with the company you're building."
    },
    {
      icon: Zap,
      title: "Impact & Innovation",
      description: "Work on products that directly impact thousands of Indian businesses."
    }
  ];

  const values = [
    "Customer-first mindset",
    "Continuous learning and improvement",
    "Transparency and open communication", 
    "Innovation and creative problem-solving",
    "Diversity and inclusion",
    "Results-driven approach"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-100 text-purple-800">
                🚀 Join Our Mission
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Build the Future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Indian Business
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Join our team of passionate individuals working to democratize digital marketing 
                for millions of Indian businesses. Make an impact while growing your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  View Open Positions
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Work With Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We believe in creating an environment where you can do your best work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Values
                </h2>
                <p className="text-xl text-gray-600">
                  The principles that guide how we work together
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find your next opportunity to make a meaningful impact
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {openings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                          <Badge variant="outline">{job.experience}</Badge>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Don't see a role that fits? We're always looking for talented people.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Us Your Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Hiring Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Designed to be transparent, fair, and efficient
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Application</h3>
                  <p className="text-gray-600 text-sm">Submit your application and we'll review it within 48 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Screen</h3>
                  <p className="text-gray-600 text-sm">30-minute call to discuss your background and interests</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Round</h3>
                  <p className="text-gray-600 text-sm">Role-specific assessment to evaluate your skills</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Final Interview</h3>
                  <p className="text-gray-600 text-sm">Meet the team and discuss culture fit and goals</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take the next step in your career and help us build the future of Indian business marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Browse Open Roles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
