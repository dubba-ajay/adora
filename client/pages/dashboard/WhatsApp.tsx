import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  MessageSquare,
  Send,
  Users,
  CheckCircle,
  Clock,
  Globe,
  Target,
  Sparkles,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  Building,
  User,
  Heart,
  RefreshCw,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  getContentTemplate,
  formatContent,
  getCTA,
} from "@/lib/regionalLanguage";
import { advancedAI, ContentRequest } from "@/lib/advancedAI";

const messageTypes = [
  {
    id: "welcome",
    name: "Welcome Message",
    description: "Greet new customers",
    icon: Heart,
    color: "bg-green-500",
  },
  {
    id: "promotional",
    name: "Promotional",
    description: "Special offers and discounts",
    icon: Star,
    color: "bg-orange-500",
  },
  {
    id: "festival",
    name: "Festival Greetings",
    description: "Regional festival wishes",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    id: "business_update",
    name: "Business Update",
    description: "Important announcements",
    icon: Building,
    color: "bg-blue-500",
  },
  {
    id: "follow_up",
    name: "Follow-up",
    description: "Post-purchase follow-up",
    icon: RefreshCw,
    color: "bg-teal-500",
  },
  {
    id: "support",
    name: "Customer Support",
    description: "Help and assistance",
    icon: MessageSquare,
    color: "bg-indigo-500",
  },
];

const customerLists = [
  {
    id: "all",
    name: "All Customers",
    count: 0,
    icon: Users,
    color: "bg-gray-500",
  },
  {
    id: "vip",
    name: "VIP Customers",
    count: 0,
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    id: "regular",
    name: "Regular Customers",
    count: 0,
    icon: User,
    color: "bg-blue-500",
  },
  {
    id: "new",
    name: "New Customers",
    count: 0,
    icon: Sparkles,
    color: "bg-green-500",
  },
];

export default function WhatsAppNew() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [messageType, setMessageType] = useState("welcome");
  const [customerList, setCustomerList] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productService, setProductService] = useState("");
  const [specialOffer, setSpecialOffer] = useState("");
  const [priceContact, setPriceContact] = useState("");
  const [location, setLocation] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [salesGoal, setSalesGoal] = useState<'sales' | 'engagement' | 'awareness' | 'leads'>('sales');
  const [aiVariations, setAiVariations] = useState<any[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emojiIntensity, setEmojiIntensity] = useState(50);
  const [personalizedMessages, setPersonalizedMessages] = useState(true);

  // Helper function to detect industry from product
  const detectIndustryFromProduct = (product: string): string => {
    const text = product.toLowerCase();
    if (text.includes('food') || text.includes('restaurant') || text.includes('cafe')) return 'food';
    if (text.includes('fashion') || text.includes('clothing') || text.includes('dress')) return 'fashion';
    if (text.includes('beauty') || text.includes('salon') || text.includes('spa')) return 'beauty';
    if (text.includes('tech') || text.includes('software') || text.includes('app')) return 'tech';
    if (text.includes('health') || text.includes('medical') || text.includes('fitness')) return 'health';
    return 'general';
  };

  // Helper function to format content for WhatsApp
  const formatContentForWhatsApp = (params: any): string => {
    const { businessName, productService, offer, location, priceContact, headline, description, cta, messageType, isHindi } = params;
    
    let content = '';
    
    // Add greeting based on message type
    if (messageType === 'welcome') {
      content += isHindi ? '🙏 नमस्कार और स्वागत है!\n\n' : '🙏 Hello and Welcome!\n\n';
    } else if (messageType === 'promotional') {
      content += isHindi ? '🎉 विशेष ऑफर! 🎉\n\n' : '🎉 Special Offer! 🎉\n\n';
    } else if (messageType === 'festival') {
      content += isHindi ? '🪔 त्योहारी शुभकामनाएं! 🪔\n\n' : '🪔 Festival Greetings! 🪔\n\n';
    }
    
    // Add business name
    content += `*${businessName}*\n\n`;
    
    // Add main content (headline + description)
    content += `${headline}\n\n${description}\n\n`;
    
    // Add offer if available
    if (offer) {
      content += isHindi ? `🎁 *विशेष ऑफर:* ${offer}\n\n` : `🎁 *Special Offer:* ${offer}\n\n`;
    }
    
    // Add location if available
    if (location) {
      content += isHindi ? `📍 स्थान: ${location}\n` : `📍 Location: ${location}\n`;
    }
    
    // Add price/contact if available
    if (priceContact) {
      content += isHindi ? `💰 मूल्य: ${priceContact}\n` : `💰 Price: ${priceContact}\n`;
    }
    
    // Add call to action
    content += `\n${cta}`;
    
    // Add urgency for sales messages
    if (messageType === 'promotional') {
      content += isHindi ? '\n\n*जल्दी करें - सीमित समय!* ⏰' : '\n\n*Act Fast - Limited Time!* ⏰';
    }
    
    return content;
  };

  // Helper function to enhance with emojis
  const enhanceWithEmojis = (content: string, intensity: number): string => {
    if (intensity > 80) {
      content = content.replace(/!/g, '! 🔥').replace(/\?/g, '? 💭').replace(/\./g, '. ✨');
    } else if (intensity > 60) {
      content = content.replace(/!/g, '! 🔥').replace(/\?/g, '? 💭');
    }
    return content;
  };

  const generateMessage = useCallback(async () => {
    if (!messageType || !customerList || !productService) {
      alert('Please fill in business name, product/service, and select audience');
      return;
    }

    setIsGenerating(true);

    try {
      // Create advanced AI content request
      const contentRequest: ContentRequest = {
        businessName: businessName || 'Your Business',
        productService: productService,
        benefits: `High quality ${productService} with excellent service and customer satisfaction`,
        offer: specialOffer,
        targetAudience: targetAudience || customerLists.find(list => list.id === customerList)?.name || 'customers',
        tone: messageType === 'business_update' ? 'professional' : messageType === 'festival' ? 'festive' : 'friendly',
        platform: 'whatsapp',
        contentType: messageType === 'promotional' ? 'promotion' : messageType === 'welcome' ? 'announcement' : 'showcase',
        language: currentLanguage.code,
        region: location || 'India',
        goal: salesGoal,
        budget: priceContact,
        industry: detectIndustryFromProduct(productService),
        festivalContext: messageType === 'festival' ? 'Festival Special' : undefined
      };

      // Generate AI content with variations
      const aiResponse = await advancedAI.generateContent(contentRequest);
      
      // Set variations for user to choose from
      setAiVariations(aiResponse.variations);
      setSelectedVariation(0);
      
      // Use the best variation as default
      const selectedVar = aiResponse.variations[0];
      let content = '';
      
      // Format content for WhatsApp
      if (currentLanguage.code === 'hi') {
        content = formatContentForWhatsApp({
          businessName: businessName || 'आपका व्यापार',
          productService: productService,
          offer: specialOffer,
          location: location,
          priceContact: priceContact,
          headline: selectedVar.headline,
          description: selectedVar.description,
          cta: selectedVar.cta,
          messageType: messageType,
          isHindi: true
        });
      } else {
        content = formatContentForWhatsApp({
          businessName: businessName || 'Your Business',
          productService: productService,
          offer: specialOffer,
          location: location,
          priceContact: priceContact,
          headline: selectedVar.headline,
          description: selectedVar.description,
          cta: selectedVar.cta,
          messageType: messageType,
          isHindi: false
        });
      }

      // Apply emoji intensity
      if (emojiIntensity > 70) {
        content = enhanceWithEmojis(content, emojiIntensity);
      }

      setMessageContent(content);
      
      // Show performance prediction in console for now
      console.log('Performance Prediction:', aiResponse.performance_prediction);
      console.log('Recommendations:', aiResponse.recommendations);
      
    } catch (error) {
      console.error('Error generating AI content:', error);
      setMessageContent('Error generating content. Please try again.');
    }

    setIsGenerating(false);
  }, [
    messageType,
    customerList,
    currentLanguage.code,
    businessName,
    productService,
    specialOffer,
    location,
    priceContact,
    targetAudience,
    salesGoal,
    emojiIntensity,
    personalizedMessages,
  ]);

  // Function to select different AI variation
  const selectVariation = useCallback((index: number) => {
    if (aiVariations[index]) {
      setSelectedVariation(index);
      const selectedVar = aiVariations[index];
      
      const content = formatContentForWhatsApp({
        businessName: businessName || (currentLanguage.code === 'hi' ? 'आपका व्यापार' : 'Your Business'),
        productService: productService,
        offer: specialOffer,
        location: location,
        priceContact: priceContact,
        headline: selectedVar.headline,
        description: selectedVar.description,
        cta: selectedVar.cta,
        messageType: messageType,
        isHindi: currentLanguage.code === 'hi'
      });
      
      setMessageContent(enhanceWithEmojis(content, emojiIntensity));
    }
  }, [aiVariations, businessName, productService, specialOffer, location, priceContact, messageType, currentLanguage.code, emojiIntensity]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              WhatsApp Business Messages - Enhanced AI
            </h1>
            <p className="text-muted-foreground">
              Create sales-focused WhatsApp campaigns with advanced AI content generation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-2">
              <Sparkles className="w-4 h-4" />
              Advanced AI
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Message Creator */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  Advanced AI Message Generator
                </CardTitle>
                <CardDescription>
                  Create intelligent, sales-focused WhatsApp campaigns with AI variations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Information */}
                <div className="space-y-4 p-4 border-2 border-dashed border-green-200 bg-green-50/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <Label className="text-green-800 font-medium">Product Information</Label>
                    <Badge variant="outline" className="text-xs">Required for AI</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Business Name</Label>
                      <Input
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Product/Service</Label>
                      <Input
                        placeholder="Hair Oil, Restaurant, Mobile Repair, etc."
                        value={productService}
                        onChange={(e) => setProductService(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Special Offer</Label>
                    <Input
                      placeholder="30% Off, Buy 1 Get 1 Free, Festival Special, etc."
                      value={specialOffer}
                      onChange={(e) => setSpecialOffer(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Price/Contact</Label>
                      <Input
                        placeholder="₹999 or +91 98765 43210"
                        value={priceContact}
                        onChange={(e) => setPriceContact(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Location</Label>
                      <Input
                        placeholder="Delhi, Mumbai, etc."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Target Audience</Label>
                      <Input
                        placeholder="Young professionals, families, etc."
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Sales Goal</Label>
                      <Select value={salesGoal} onValueChange={(value: any) => setSalesGoal(value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Direct Sales</SelectItem>
                          <SelectItem value="leads">Generate Leads</SelectItem>
                          <SelectItem value="engagement">Build Engagement</SelectItem>
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Message Type Selection */}
                <div className="space-y-3">
                  <Label>Message Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {messageTypes.map((type) => {
                      const IconComponent = type.icon;
                      const isSelected = messageType === type.id;
                      return (
                        <Button
                          key={type.id}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => setMessageType(type.id)}
                          className="justify-start gap-3 h-auto py-4"
                        >
                          <IconComponent className="h-4 w-4" />
                          <div className="text-left">
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs opacity-70">
                              {type.description}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Customer List Selection */}
                <div className="space-y-3">
                  <Label>Target Audience</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {customerLists.map((list) => {
                      const IconComponent = list.icon;
                      const isSelected = customerList === list.id;
                      return (
                        <Button
                          key={list.id}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => setCustomerList(list.id)}
                          className="justify-start gap-3 h-auto py-4"
                        >
                          <div
                            className={`p-2 rounded ${list.color} text-white`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{list.name}</div>
                            <div className="text-xs opacity-70">
                              {list.count.toLocaleString()} contacts
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* AI Settings */}
                <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                  <Label className="text-sm font-medium">
                    AI Message Settings
                  </Label>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Emoji Intensity</Label>
                      <span className="text-sm text-muted-foreground">
                        {emojiIntensity}%
                      </span>
                    </div>
                    <Slider
                      value={[emojiIntensity]}
                      onValueChange={(value) => setEmojiIntensity(value[0])}
                      max={100}
                      step={25}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="personalized"
                      checked={personalizedMessages}
                      onCheckedChange={setPersonalizedMessages}
                    />
                    <Label htmlFor="personalized" className="text-sm">
                      Personalized Content
                    </Label>
                  </div>
                </div>

                {/* AI Variations */}
                {aiVariations.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      AI Variations ({aiVariations.length} options)
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {aiVariations.map((variation, index) => (
                        <Button
                          key={index}
                          variant={selectedVariation === index ? "default" : "outline"}
                          onClick={() => selectVariation(index)}
                          className="text-xs h-auto py-2 px-3 text-left"
                          size="sm"
                        >
                          <div>
                            <div className="font-medium">
                              Variation {index + 1}
                            </div>
                            <div className="text-xs opacity-70">
                              Score: {variation.engagement_score}% | {variation.style}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Content */}
                <div className="space-y-3">
                  <Label htmlFor="message-content">Generated Message</Label>
                  <Textarea
                    id="message-content"
                    placeholder="Your AI-generated WhatsApp message will appear here..."
                    rows={8}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className={`resize-none ${currentLanguage.rtl ? "text-right" : ""}`}
                    style={{
                      direction: currentLanguage.rtl ? "rtl" : "ltr",
                    }}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateMessage}
                  disabled={isGenerating || !messageType || !customerList || !productService}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Generating AI Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Advanced Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">
                  WhatsApp Preview
                </CardTitle>
                <CardDescription>
                  Real-time preview with AI-enhanced content
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {businessName?.charAt(0)?.toUpperCase() || "B"}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {businessName || "Your Business"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Business Account
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-100 rounded-lg p-3">
                        {messageContent ? (
                          <p
                            className={`text-sm text-gray-800 ${currentLanguage.rtl ? "text-right" : ""}`}
                          >
                            {messageContent}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            {currentLanguage.code === "hi"
                              ? "AI-generated content will appear here..."
                              : "AI-generated content will appear here..."}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-2 text-right flex items-center justify-end gap-1">
                        <span>Just now</span>
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            {aiVariations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    AI Performance Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-xl font-bold text-green-600">
                        {aiVariations[selectedVariation]?.engagement_score || 0}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Engagement Score
                      </p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-xl font-bold text-blue-600">
                        {aiVariations[selectedVariation]?.length || 'medium'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Content Length
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Message Quality</span>
                      <span className="text-green-600">AI Optimized</span>
                    </div>
                    <Progress value={aiVariations[selectedVariation]?.engagement_score || 0} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Sales Focus</span>
                      <span className="text-blue-600">High</span>
                    </div>
                    <Progress value={salesGoal === 'sales' ? 95 : 75} className="h-2" />
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>💡 AI Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Content optimized for {salesGoal} goal</li>
                      <li>Industry-specific keywords included</li>
                      <li>Emotional triggers added for engagement</li>
                      <li>Regional language preferences applied</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
