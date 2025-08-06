import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Sparkles,
  CheckCircle,
  Download,
  Share,
  Copy,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Festivals() {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const festivalCampaigns = [
    {
      id: "diwali",
      title: "Diwali Special",
      subtitle: "Light up sales with Diwali campaigns",
      icon: "🪔",
      color: "from-orange-400 to-red-500",
      features: [
        "✓ 10 Social Posts",
        "�� WhatsApp Templates",
        "✓ Ad Creatives",
        "��� Promotional Content",
      ],
      status: "available",
    },
    {
      id: "holi",
      title: "Holi Colors",
      subtitle: "Colorful campaigns for the festival of colors",
      icon: "🎨",
      color: "from-pink-400 to-purple-500",
      features: [
        "✓ 8 Social Posts",
        "✓ Color-themed Designs",
        "✓ Islamic Alignments",
        "✓ Promotional Content",
      ],
      status: "available",
    },
    {
      id: "eid",
      title: "Eid Mubarak",
      subtitle: "Celebrate Eid with special offers",
      icon: "🌙",
      color: "from-green-400 to-teal-500",
      features: [
        "✓ 8 Social Posts",
        "✓ Islamic Designs",
        "✓ Community Focused",
        "✓ Community Focused",
      ],
      status: "available",
    },
    {
      id: "newyear",
      title: "New Year",
      subtitle: "Start the year with fresh campaigns",
      icon: "🎊",
      color: "from-blue-400 to-indigo-500",
      features: [
        "✓ 12 Social Posts",
        "✓ Resolution Themes",
        "✓ Goal-oriented Content",
        "✓ Goal-oriented Content",
      ],
      status: "available",
    },
    {
      id: "valentine",
      title: "Valentine's Day",
      subtitle: "Spread love with special campaigns",
      icon: "❤️",
      color: "from-pink-400 to-red-400",
      features: [
        "✓ 6 Social Posts",
        "��� Romantic Themes",
        "✓ Couple Focused",
        "✓ Gift Promotions",
      ],
      status: "coming-soon",
    },
    {
      id: "independence",
      title: "Independence Day",
      subtitle: "Patriotic campaigns for August 15",
      icon: "🇮🇳",
      color: "from-orange-400 to-green-500",
      features: [
        "✓ 8 Social Posts",
        "✓ Patriotic Themes",
        "✓ Freedom Sale Ideas",
        "✓ National Pride",
      ],
      status: "coming-soon",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Festival Campaign Packs
            </h1>
            <p className="text-muted-foreground">
              Ready-made campaigns for Indian festivals
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 text-white">
            <Calendar className="w-4 h-4 mr-1" />
            Festival Ready
          </Badge>
        </div>

        {/* Featured Banner */}
        <Card className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  🎉 Festival Season is Here!
                </h2>
                <p className="text-white/90 mb-4">
                  Get ready-made campaigns for every major Indian festival.
                  Professional content, designed templates, and proven
                  strategies.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>✨ AI-generated content</span>
                  <span>📱 WhatsApp ready</span>
                  <span>🎯 High engagement</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-6xl">🎊</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Festival Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivalCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${campaign.color}`}
              ></div>

              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-3">{campaign.icon}</div>
                <CardTitle className="text-xl">{campaign.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {campaign.subtitle}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {campaign.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {campaign.status === "available" ? (
                  <Button
                    className={`w-full bg-gradient-to-r ${campaign.color} hover:opacity-90 text-white`}
                    onClick={() => handleUseCampaign(campaign)}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Use Campaign
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    <Calendar className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How Festival Campaigns Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Select the festival campaign that matches your business
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-orange-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Customize Content</h3>
                <p className="text-sm text-muted-foreground">
                  Add your business details and personalize the messages
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Launch Campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Publish across social media, WhatsApp, and ads
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Track Results</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor engagement and customer response in real-time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Content Generator */}
        {selectedCampaign && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-3">{selectedCampaign.icon}</span>
                {selectedCampaign.title} Campaign Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!generatedContent ? (
                <div className="text-center py-8">
                  <Button
                    onClick={generateCampaignContent}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 hover:opacity-90"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating Campaign...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate {selectedCampaign.title} Content
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">
                      {generatedContent}
                    </pre>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyContent}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Content
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/dashboard/whatsapp")}
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/dashboard/ai-content")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Customize Further
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGeneratedContent("")}
                    >
                      Generate New
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Campaign Tips */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              Festival Campaign Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                <div className="text-3xl mb-3">🎯</div>
                <div className="text-sm font-medium mb-1">Plan Ahead</div>
                <div className="text-xs text-muted-foreground">
                  Start campaigns 1-2 weeks before festivals
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-3xl mb-3">📱</div>
                <div className="text-sm font-medium mb-1">Multi-Channel</div>
                <div className="text-xs text-muted-foreground">
                  Use WhatsApp, social media and ads together
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <div className="text-3xl mb-3">💡</div>
                <div className="text-sm font-medium mb-1">Personal Touch</div>
                <div className="text-xs text-muted-foreground">
                  Customize templates with your business details
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );

  function handleUseCampaign(campaign) {
    setSelectedCampaign(campaign);
    setGeneratedContent("");
  }

  function generateCampaignContent() {
    setIsGenerating(true);

    setTimeout(() => {
      const campaignTemplates = {
        diwali: `�� **DIWALI SPECIAL OFFER** 🪔

Light up your celebrations with our exclusive Diwali collection!

✨ **LIMITED TIME OFFERS:**
• Special discounts on all items
• Buy 2 Get 1 FREE on selected products
• Free gift wrapping for all purchases
• Special Diwali hampers available

🎁 **BONUS:** Free home delivery within 24 hours!

📞 Order Now: +91 98765 43210
📍 Visit us: [Your Business Address]
🌐 Online: [Your Website]

🪔 May this Diwali bring prosperity and happiness to your family!

*Valid till [Date]. Terms & conditions apply.*

#HappyDiwali #DiwaliSale #FestivalOfLights #LocalBusiness

---

**WHATSAPP MESSAGE:**
🪔 Diwali Special! Great discounts + Free delivery. Order now: Contact us

**SOCIAL MEDIA POST:**
This Diwali, celebrate with style! ✨ Get special discounts on everything + FREE delivery! 🎁 #DiwaliSale #LocalBusiness

**AD COPY:**
Diwali Special Sale - Special Discounts Everything! Free Delivery | Order Now`,

        holi: `🎨 **HOLI FESTIVAL CELEBRATION** 🎨

Celebrate the festival of colors with vibrant offers!

🌈 **COLORFUL DEALS:**
• Special discounts on all products
• Special Holi combo packages
• Free organic colors with minimum purchase
• Holi party packages available

🎉 **SPECIAL:** Book your Holi celebration with us!

📞 Call: +91 98765 43210
📍 Location: [Your Business Address]
🌐 Website: [Your Website]

🎨 Let's paint the town with joy and colors!

*Offer valid till Holi. Limited stock available.*

#HappyHoli #FestivalOfColors #HoliSale #Celebrations

---

**WHATSAPP MESSAGE:**
🎨 Holi Special! Great discounts + Free colors. Celebrate with us: Contact us

**SOCIAL MEDIA POST:**
Holi hai! 🌈 Get special discounts + FREE organic colors! Let's celebrate together! 🎉 #HoliCelebration

**AD COPY:**
Holi Festival Sale - Special Discounts + Free Organic Colors | Book Now`,

        eid: `🌙 **EID MUBARAK SPECIAL** 🌙

Celebrate this blessed occasion with our exclusive Eid collection!

✨ **EID BLESSINGS:**
• Special discounts on all items
• Special Eid gift hampers
• Free personalized gift wrapping
��� Bulk orders for Eid distribution

🎁 **COMMUNITY SPECIAL:** Extra discounts for bulk orders!

📞 Contact: +91 98765 43210
📍 Visit: [Your Business Address]
🌐 Online: [Your Website]

🌙 May Allah bless you and your family with peace and prosperity!

*Valid throughout Eid celebrations.*

#EidMubarak #EidSale #BlessedOccasion #CommunityFirst

---

**WHATSAPP MESSAGE:**
🌙 Eid Mubarak! Great discounts + Special gift hampers. Order: Contact us

**SOCIAL MEDIA POST:**
Eid Mubarak! 🌙 Celebrate with special discounts on everything + beautiful gift hampers! ✨ #EidSale

**AD COPY:**
Eid Mubarak Sale - Special Discounts Everything + Gift Hampers | Order Today`,

        newyear: `🎊 **NEW YEAR, NEW BEGINNINGS** 🎊

Start the year fresh with amazing deals and resolutions!

✨ **NEW YEAR SPECIALS:**
• Special discounts on all products
• New Year resolution packages
• Free consultation for goal setting
• Special midnight delivery available

🎯 **RESOLUTION SUPPORT:** We help you achieve your goals!

📞 Call: +91 98765 43210
📍 Address: [Your Business Address]
🌐 Website: [Your Website]

🎊 Wishing you a prosperous and successful New Year!

*Offer valid till January 15th.*

#HappyNewYear #NewBeginnings #NewYearSale #Goals2024

---

**WHATSAPP MESSAGE:**
🎊 Happy New Year! Great discounts everything. Start fresh: Contact us

**SOCIAL MEDIA POST:**
New Year, New You! 🎯 Get special discounts + goal-setting support! Let's achieve together! ✨

**AD COPY:**
New Year Sale - Special Discounts Everything + Goal Support | Start Your Journey`,
      };

      const content =
        campaignTemplates[selectedCampaign.id] || campaignTemplates["diwali"];
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  }

  function handleCopyContent() {
    navigator.clipboard.writeText(generatedContent);
    // You could add a toast notification here
    alert("Content copied to clipboard!");
  }
}
