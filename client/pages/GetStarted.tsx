import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  Image,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    workingHours: "",
    website: "",
    goals: [] as string[],
  });
  const navigate = useNavigate();

  const businessTypes = [
    "Beauty Salon",
    "Restaurant/Food Joint",
    "Retail Store",
    "Gym/Fitness Center",
    "Medical Clinic",
    "Electronics Store",
    "Clothing Store",
    "Jewelry Store",
    "Auto Services",
    "Education/Coaching",
    "Real Estate",
    "Photography",
    "Other",
  ];

  const marketingGoals = [
    "Get more customers",
    "Increase social media presence",
    "Improve online reviews",
    "Launch festival campaigns",
    "Boost WhatsApp marketing",
    "Create professional content",
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log("Form submitted:", formData);
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-brand-orange-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div
                className={`w-20 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <div
                className={`w-20 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                {step === 1 && "Tell Us About Your Business"}
                {step === 2 && "Business Details & Contact"}
                {step === 3 && "Your Marketing Goals"}
              </CardTitle>
              <p className="text-muted-foreground">
                {step === 1 &&
                  "Let's start with the basics about your business"}
                {step === 2 && "Help customers find and contact you"}
                {step === 3 && "What do you want to achieve with AI marketing?"}
              </p>
            </CardHeader>

            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="e.g., Sharma Beauty Salon"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            businessName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            businessType: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="e.g., Rajesh Sharma"
                        value={formData.ownerName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            ownerName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell customers about your business, services, and what makes you special..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@yourbusiness.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Full business address including area, city, state, pincode"
                      rows={3}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="workingHours">Working Hours</Label>
                      <Input
                        id="workingHours"
                        placeholder="e.g., Mon-Sat: 9 AM - 8 PM"
                        value={formData.workingHours}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            workingHours: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (if any)</Label>
                      <Input
                        id="website"
                        placeholder="www.yourbusiness.com"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            website: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      What are your main marketing goals? (Select all that
                      apply)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {marketingGoals.map((goal) => (
                        <div
                          key={goal}
                          className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={goal}
                            checked={formData.goals.includes(goal)}
                            onCheckedChange={() => handleGoalToggle(goal)}
                          />
                          <Label
                            htmlFor={goal}
                            className="cursor-pointer flex-1"
                          >
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.goals.length > 0 && (
                    <div className="bg-brand-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3">
                        Your Selected Goals:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.goals.map((goal) => (
                          <Badge
                            key={goal}
                            variant="secondary"
                            className="bg-brand-blue-100 text-brand-blue-800"
                          >
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 3 ? (
                  <Button
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={
                      (step === 1 &&
                        (!formData.businessName ||
                          !formData.businessType ||
                          !formData.ownerName ||
                          !formData.phone)) ||
                      (step === 2 && !formData.address)
                    }
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 hover:opacity-90"
                    disabled={formData.goals.length === 0}
                  >
                    Launch My Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Preview */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              What you'll get after setup:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg">
                <div className="w-10 h-10 bg-brand-blue-100 rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-brand-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Business Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    Your online presence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg">
                <div className="w-10 h-10 bg-brand-orange-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-brand-orange-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">AI Marketing Tools</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate content instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Analytics Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
