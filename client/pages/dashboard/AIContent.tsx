import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Copy,
  Download,
  Share,
  Sparkles,
  Globe,
  Clock,
  History,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Target,
} from "lucide-react";
import { advancedAI, ContentRequest, AIContentResponse } from "@/lib/advancedAI";

const contentTypes = [
  { id: "ad_copy", name: "Ad Copy", maxLength: 100 },
  { id: "social_media_post", name: "Social Media Post", maxLength: 150 },
  { id: "email_copy", name: "Email Copy", maxLength: 200 },
  { id: "festival_promo", name: "Festival Promo", maxLength: 150 },
];

const tones = [
  { id: "friendly", name: "Friendly" },
  { id: "professional", name: "Professional" },
  { id: "fun", name: "Fun" },
  { id: "sales_driven", name: "Sales-Driven" },
];

interface GeneratedVariation {
  id: number;
  mainContent: string;
  ctaLine: string;
  hashtags?: string;
}

export default function AIContent() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  
  // Input fields
  const [businessName, setBusinessName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [contentType, setContentType] = useState("ad_copy");
  const [tone, setTone] = useState("professional");
  const [discountPercent, setDiscountPercent] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  
  const [generatedVariations, setGeneratedVariations] = useState<GeneratedVariation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentHistory, setContentHistory] = useState<Array<{
    id: number;
    businessName: string;
    productDetails: string;
    contentType: string;
    tone: string;
    variations: GeneratedVariation[];
    timestamp: string;
  }>>([]);
  const [aiResponse, setAiResponse] = useState<AIContentResponse | null>(null);

  const generateSampleContent = (business: string, product: string, type: string, currentTone: string, discount?: string) => {
    const variations: GeneratedVariation[] = [];
    const isFriendlyOrFun = currentTone === "friendly" || currentTone === "fun";
    const isFestive = type === "festival_promo";
    
    // Common CTAs
    const ctas = ["Shop Now!", "Grab the Offer!", "Visit Us Today!", "Call Now!", "Don't Miss Out!"];
    
    // Generate 4 variations
    for (let i = 0; i < 4; i++) {
      let mainContent = "";
      let ctaLine = "";
      let hashtags = "";
      
      if (type === "ad_copy") {
        const discountText = discount ? `${discount}% OFF ` : "";
        const emoji = isFriendlyOrFun ? "�� " : "";
        
        switch (i) {
          case 0:
            mainContent = `${emoji}${discountText}${product}${discount ? " + Free Delivery!" : "!"} Refresh your experience today.`;
            ctaLine = `🛍 ${ctas[0]} – Limited time offer!`;
            break;
          case 1:
            mainContent = `Upgrade your lifestyle with ${discountText}${product}.`;
            ctaLine = `🚚 ${discount ? "Free delivery this week only" : "Call now"} – ${ctas[1]}`;
            break;
          case 2:
            mainContent = `Limited Offer! ${discountText}${product}${discount ? " + Free Delivery" : ""}.`;
            ctaLine = `📞 Call ${phoneNumber || "+91 98765 43210"} or visit our store today!`;
            break;
          case 3:
            mainContent = `${emoji}Best deals on ${product}! ${discountText}savings await you.`;
            ctaLine = `✨ ${ctas[2]} Limited stock available!`;
            break;
        }
        hashtags = `#SaleAlert #LocalShopping #${business.replace(/\s+/g, '')}`;
        
      } else if (type === "social_media_post") {
        const emoji = isFriendlyOrFun ? "✨ " : "";
        
        switch (i) {
          case 0:
            mainContent = `${emoji}Discover amazing ${product} at ${business}! Quality you can trust.`;
            ctaLine = `💫 ${ctas[0]} Experience the difference!`;
            break;
          case 1:
            mainContent = `${business} brings you premium ${product}. Excellence in every detail.`;
            ctaLine = `🌟 ${ctas[3]} Let's connect!`;
            break;
          case 2:
            mainContent = `${emoji}New arrival alert! Fresh ${product} now available at ${business}.`;
            ctaLine = `🎯 ${ctas[2]} Be the first to try!`;
            break;
          case 3:
            mainContent = `Transform your experience with our ${product}. ${business} - where quality meets affordability.`;
            ctaLine = `🔥 ${ctas[1]} Tagged friends get discounts!`;
            break;
        }
        hashtags = `#${business.replace(/\s+/g, '')} #Quality #LocalBusiness #${product.split(' ')[0]}`;
        
      } else if (type === "email_copy") {
        switch (i) {
          case 0:
            mainContent = `Exclusive for you! Premium ${product} with ${discount || "special"}% savings. Limited time offer from ${business}.`;
            ctaLine = `📧 ${ctas[0]} Reply to this email for instant booking!`;
            break;
          case 1:
            mainContent = `Dear valued customer, discover our latest ${product} collection. Quality guaranteed by ${business}.`;
            ctaLine = `📞 ${ctas[3]} or visit our website for more details.`;
            break;
          case 2:
            mainContent = `Don't miss out! ${product} with exclusive member pricing. ${business} rewards your loyalty.`;
            ctaLine = `🎁 ${ctas[2]} Show this email for extra 5% off!`;
            break;
          case 3:
            mainContent = `New arrival notification: Premium ${product} now in stock. First 50 customers get special pricing!`;
            ctaLine = `⚡ ${ctas[1]} Forward to friends for group discounts!`;
            break;
        }
        hashtags = "";
        
      } else if (type === "festival_promo") {
        const festivalEmoji = "🎊 ";
        
        switch (i) {
          case 0:
            mainContent = `${festivalEmoji}Festival Special! Celebrate with ${discount || "20"}% OFF on ${product}. ${business} wishes you joy & prosperity!`;
            ctaLine = `🎁 ${ctas[0]} Festival offer ends soon!`;
            break;
          case 1:
            mainContent = `${festivalEmoji}Make this festival memorable with premium ${product} from ${business}. Special festive pricing inside!`;
            ctaLine = `🪔 ${ctas[2]} Bring home the celebration!`;
            break;
          case 2:
            mainContent = `${festivalEmoji}Festival Dhamaka! ${product} at unbeatable prices. ${business} - spreading festival joy!`;
            ctaLine = `🎆 ${ctas[1]} Festival shopping made easy!`;
            break;
          case 3:
            mainContent = `${festivalEmoji}Celebrate the festival of lights with our special ${product} collection. Exclusive festive offers!`;
            ctaLine = `✨ ${ctas[3]} Festival bookings open now!`;
            break;
        }
        hashtags = `#FestivalSale #Celebration #${business.replace(/\s+/g, '')} #FestivalOffers`;
      }
      
      variations.push({
        id: i + 1,
        mainContent,
        ctaLine,
        hashtags: hashtags || undefined,
      });
    }
    
    return variations;
  };

  const handleGenerate = async () => {
    if (!businessName.trim() || !productDetails.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Create advanced AI request
      const aiRequest: ContentRequest = {
        businessName,
        productService: productDetails,
        benefits: "",
        offer: discountPercent ? `${discountPercent}% OFF` : "",
        targetAudience: "",
        tone: tone === "sales_driven" ? "professional" : tone as any,
        platform: contentType.includes("email") ? "email" :
                 contentType.includes("social") ? "social" : "ads",
        contentType: contentType.includes("festival") ? "announcement" : "promotion",
        language: currentLanguage.code,
        region: selectedMarketTier.name,
        goal: "sales"
      };

      // Generate advanced AI content
      const aiResult = await advancedAI.generateContent(aiRequest);
      setAiResponse(aiResult);

      // Convert AI variations to our format for backward compatibility
      const variations: GeneratedVariation[] = aiResult.variations.map((v, index) => ({
        id: v.id,
        mainContent: `${v.hook}\n\n${v.headline}`,
        ctaLine: v.cta,
        hashtags: v.hashtags.join(" ")
      }));

      setGeneratedVariations(variations);

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        businessName,
        productDetails,
        contentType,
        tone,
        variations,
        timestamp: new Date().toLocaleString(),
      };
      setContentHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);

    } catch (error) {
      console.error("Error generating content:", error);
    }

    setIsGenerating(false);
  };

  const copyVariation = (variation: GeneratedVariation) => {
    const fullContent = `${variation.mainContent}\n${variation.ctaLine}${variation.hashtags ? `\n\n${variation.hashtags}` : ''}`;
    navigator.clipboard.writeText(fullContent);
  };

  const getCurrentContentType = () => {
    return contentTypes.find(type => type.id === contentType);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Content Studio</h1>
            <p className="text-muted-foreground">
              Advanced AI engine with performance predictions, engagement optimization, and multiple content variations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {currentLanguage.nativeName}
            </Badge>
            <Badge className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 text-white gap-2">
              <Sparkles className="w-4 h-4" />
              AI Powered
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Content Input Fields</CardTitle>
                    <CardDescription>
                      Fill in your business details to generate professional content variations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Required Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="text-sm font-semibold">
                          1. Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          placeholder="Enter your business name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="border-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productDetails" className="text-sm font-semibold">
                          2. Product/Service or Offer Details *
                        </Label>
                        <Textarea
                          id="productDetails"
                          placeholder="Describe your product or service"
                          value={productDetails}
                          onChange={(e) => setProductDetails(e.target.value)}
                          rows={3}
                          className="border-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contentType" className="text-sm font-semibold">
                            3. Content Type *
                          </Label>
                          <Select value={contentType} onValueChange={setContentType}>
                            <SelectTrigger className="border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {contentTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  <div>
                                    <div className="font-medium">{type.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Max {type.maxLength} chars
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tone" className="text-sm font-semibold">
                            4. Tone *
                          </Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger className="border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {tones.map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Optional Fields */}
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        5. Optional Details
                      </Label>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discount">Discount %</Label>
                          <Input
                            id="discount"
                            placeholder="Enter discount percentage"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Enter your location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input
                          id="website"
                          placeholder="Enter website URL"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerate}
                      disabled={!businessName.trim() || !productDetails.trim() || isGenerating}
                      className="w-full bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 hover:opacity-90"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Generating 4 Variations...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate 4 Content Variations
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Generated Variations */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Generated Variations
                      {generatedVariations.length > 0 && (
                        <Badge variant="secondary">
                          {generatedVariations.length} variations
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {getCurrentContentType() ? 
                        `${getCurrentContentType()?.name} variations (max ${getCurrentContentType()?.maxLength} chars each)` :
                        "AI-generated content variations will appear here"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedVariations.length > 0 ? (
                      <div className="space-y-4">
                        {generatedVariations.map((variation) => (
                          <div key={variation.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Variation {variation.id}</Badge>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyVariation(variation)}
                                >
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div>
                                <Label className="text-xs text-muted-foreground">Main Content:</Label>
                                <p className="font-medium">{variation.mainContent}</p>
                              </div>
                              
                              <div>
                                <Label className="text-xs text-muted-foreground">CTA Line:</Label>
                                <p className="text-brand-orange-600 font-medium">{variation.ctaLine}</p>
                              </div>
                              
                              {variation.hashtags && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Hashtags:</Label>
                                  <p className="text-brand-blue-600">{variation.hashtags}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              Length: {(variation.mainContent + variation.ctaLine + (variation.hashtags || '')).length} characters
                            </div>
                          </div>
                        ))}
                        
                        {/* Advanced AI Insights */}
                        {aiResponse && (
                          <div className="border-t pt-4 space-y-4">
                            {/* Performance Prediction */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                              <Label className="text-sm font-semibold text-green-700 mb-3 block flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                AI Performance Prediction
                              </Label>
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-white/70 rounded p-3">
                                  <p className="text-xl font-bold text-green-600">{aiResponse.performance_prediction.engagement_rate}%</p>
                                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                                </div>
                                <div className="bg-white/70 rounded p-3">
                                  <p className="text-xl font-bold text-blue-600">{aiResponse.performance_prediction.reach_estimate}</p>
                                  <p className="text-xs text-muted-foreground">Est. Reach</p>
                                </div>
                                <div className="bg-white/70 rounded p-3">
                                  <p className="text-xl font-bold text-purple-600">{aiResponse.performance_prediction.conversion_probability.toFixed(1)}%</p>
                                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                                </div>
                              </div>
                            </div>

                            {/* AI Recommendations */}
                            {aiResponse.recommendations.length > 0 && (
                              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                                <Label className="text-sm font-semibold text-orange-700 mb-3 block flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  AI Optimization Recommendations
                                </Label>
                                <ul className="space-y-2">
                                  {aiResponse.recommendations.slice(0, 4).map((rec, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <Sparkles className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* A/B Test Suggestions */}
                            {aiResponse.ab_test_suggestions.length > 0 && (
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                                <Label className="text-sm font-semibold text-purple-700 mb-3 block">
                                  A/B Testing Suggestions
                                </Label>
                                <div className="space-y-2">
                                  {aiResponse.ab_test_suggestions.slice(0, 2).map((test, idx) => (
                                    <div key={idx} className="text-sm">
                                      <p className="font-medium text-purple-600">Test: {test.test_elements.join(" vs ")}</p>
                                      <p className="text-xs text-muted-foreground mt-1">{test.hypothesis}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Save All Variations
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Generate New Set
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">Fill in your business details and click "Generate"</p>
                        <p className="text-sm">You'll get 4 professional content variations with:</p>
                        <ul className="text-xs mt-2 space-y-1">
                          <li>• Strong hooks with emojis (if friendly/fun tone)</li>
                          <li>• Clear offer and product highlights</li>
                          <li>• Compelling call-to-action phrases</li>
                          <li>• Relevant hashtags (for social content)</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Content Generation History
                </CardTitle>
                <CardDescription>
                  Previously generated content variations for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contentHistory.length > 0 ? (
                  <div className="space-y-6">
                    {contentHistory.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.businessName}</Badge>
                            <Badge variant="secondary">
                              {contentTypes.find(t => t.id === item.contentType)?.name}
                            </Badge>
                            <Badge variant="outline">{item.tone}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          Product: {item.productDetails}
                        </p>
                        
                        <div className="grid gap-3">
                          {item.variations.slice(0, 2).map((variation) => (
                            <div key={variation.id} className="bg-muted/30 p-3 rounded text-sm">
                              <div className="font-medium mb-1">{variation.mainContent}</div>
                              <div className="text-brand-orange-600">{variation.ctaLine}</div>
                              {variation.hashtags && (
                                <div className="text-brand-blue-600 text-xs mt-1">{variation.hashtags}</div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => {
                            setBusinessName(item.businessName);
                            setProductDetails(item.productDetails);
                            setContentType(item.contentType);
                            setTone(item.tone);
                            setGeneratedVariations(item.variations);
                          }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Load This Setup
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No content generated yet. Create your first set of variations!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
