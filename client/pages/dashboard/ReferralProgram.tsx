import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Gift,
  Share2,
  Users,
  TrendingUp,
  Copy,
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Globe,
  Star,
  Award,
  Crown,
} from "lucide-react";
import { getCTA } from "@/lib/regionalLanguage";

interface Referral {
  id: number;
  referrerName: string;
  refereeName: string;
  language: string;
  status: "pending" | "completed" | "rewarded";
  reward: string;
  date: string;
  marketTier: string;
}

const mockReferrals: Referral[] = [];

const rewardTiers = [
  {
    id: "bronze",
    name: "Bronze",
    minReferrals: 1,
    reward: "₹0",
    icon: Award,
  },
  {
    id: "silver",
    name: "Silver",
    minReferrals: 5,
    reward: "₹0",
    icon: Star,
  },
  { id: "gold", name: "Gold", minReferrals: 10, reward: "₹0", icon: Crown },
];

const shareTemplates = {
  en: {
    social:
      "🚀 Transform your business with Vyapari.AI!\n\nJoin me and get exclusive discounts on digital marketing services.\n\nUse my referral link: {referralLink}\n\n#DigitalMarketing #BusinessGrowth #Vyapari",
    whatsapp:
      "Hey! 👋\n\nI've been using Vyapari.AI for my business marketing and it's amazing! You should check it out.\n\nGet started with my referral link: {referralLink}\n\nYou'll get a special discount and I'll get some rewards too! 🎁",
    email:
      "I wanted to share something that's been really helpful for my business - Vyapari.AI's digital marketing platform.\n\nThey offer services in multiple Indian languages and have helped me reach more customers.\n\nYou can get started with a discount using my referral link: {referralLink}\n\nHope it helps your business too!",
  },
  hi: {
    social:
      "🚀 Vyapari.AI के साथ अपना व्यापार बदलें!\n\nमेरे साथ जुड़ें और ड��जिटल मार्केटिंग सेवाओं पर विशेष छूट पाएं।\n\nमेरा रेफरल लिंक: {referralLink}\n\n#डिज���टलमार्केटिंग #व्यापारवृद्धि #व्यापारी",
    whatsapp:
      "नमस्ते! 👋\n\nमै�� अपने व्यापार के लिए Vyapari.AI का उपयोग कर रहा हूं और यह बहुत अच्छा है! आपको भी इसे देखना चाहिए।\n\nमेरे रेफरल लिंक से शुरुआत करें: {referralLink}\n\nआपको विशेष छूट मिलेगी और मुझे भी कुछ रिवार्ड मिलेंगे! 🎁",
    email:
      "मैं आपके साथ कुछ साझा करना चाहता था जो मेरे व्यापार के लिए बहुत उपयोगी रहा है - Vyapari.AI का डिजिटल मार्केटिंग प्लेटफॉर्म।\n\nवे कई भारतीय भाषाओं में सेवाएं प्रदान करते हैं और मुझे अधिक ग��राहकों तक पहुंचने में मदद की है।\n\nआप मेरे रेफरल लिंक से छूट के साथ शुरुआत कर सकते हैं: {referralLink}\n\nउम्मीद है यह आपके व्यापार के लिए भी उपयोगी होग��!",
  },
  te: {
    social:
      "🚀 Vyapari.AI తో మీ వ్యాపారాన్ని మార్చండి!\n\nనాతో చేరండి మరియు డిజిటల్ మార్కెటింగ్ సేవలపై ప్రత్యేక తగ్గింపులు పొందండి।\n\nనా రెఫరల్ లింక్: {referralLink}\n\n#డిజిటల్మార్కెటింగ్ #వ్యాపారవృద్ధి #వ్యాపారి",
    whatsapp:
      "హాయ్! 👋\n\nనేను నా వ్యాపారం కోసం Vyapari.AI ఉపయోగిస్తున్నాను మరియు అది అద్భుతంగా ఉంది! మీరు కూడా చూడాలి।\n\nనా రెఫరల్ లింక్‌తో ప్రారంభించండి: {referralLink}\n\nమీకు ప్రత్యేక త���్గింపు లభిస్తుంది మరియు నాకు కూడా కొన్ని రివార్డ్‌లు లభిస్తాయి! 🎁",
    email:
      "నా వ్యాపార���నికి చాలా ఉపయోగకరంగా ఉన్న విషయాన్ని మీతో పం���ుకోవాలని అనిపించి��ది - Vyapari.AI యొక్క డిజిటల్ మార్కెటింగ్ ప్లాట్‌ఫామ్।\n\nవారు అనేక భారతీయ భాషలలో సేవలు అందిస్తారు మరియు మరిన్ని కస్టమర్‌లను చేరుకోవడంలో నాకు సహాయపడింది।\n\nమీరు నా రెఫరల్ లింక్‌తో తగ్గింపుతో ప్రారంభించవచ్చు: {referralLink}\n\nఇది మీ వ్యాపారానికి కూడా ఉపయోగపడుతుందని ఆశిస్తున్నాను!",
  },
};

export default function ReferralProgram() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [shareMethod, setShareMethod] = useState("whatsapp");
  const [customMessage, setCustomMessage] = useState("");
  const [referralLink] = useState("https://vyapari.ai/ref/abc123");

  const getShareTemplate = (method: string) => {
    const templates =
      shareTemplates[currentLanguage.code as keyof typeof shareTemplates] ||
      shareTemplates.en;
    return templates[method as keyof typeof templates] || templates.whatsapp;
  };

  const generateShareContent = () => {
    const template = getShareTemplate(shareMethod);
    return template.replace("{referralLink}", referralLink);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareOnPlatform = (platform: string) => {
    const content = generateShareContent();
    const encodedContent = encodeURIComponent(content);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedContent}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}&quote=${encodedContent}`,
      whatsapp: `https://wa.me/?text=${encodedContent}`,
    };

    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Referral Program
            </h1>
            <p className="text-muted-foreground">
              Earn rewards by referring friends in {currentLanguage.nativeName}
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <Globe className="h-4 w-4" />
            {selectedMarketTier.name}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="share">Share & Earn</TabsTrigger>
            <TabsTrigger value="referrals">My Referrals</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Referrals
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+4 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Earnings
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹0</div>
                  <p className="text-xs text-muted-foreground">
                    Start referring to earn rewards
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Success Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    Start referring to earn rewards
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Link</CardTitle>
                  <CardDescription>
                    Share this link to earn rewards when friends sign up
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input value={referralLink} readOnly className="flex-1" />
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(referralLink)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your friends get special discounts, and you earn
                    rewards for each successful referral!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reward Tiers</CardTitle>
                  <CardDescription>
                    Unlock higher rewards as you refer more friends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rewardTiers.map((tier) => {
                      const IconComponent = tier.icon;
                      const isUnlocked = 24 >= tier.minReferrals; // Using mock data

                      return (
                        <div
                          key={tier.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            isUnlocked
                              ? "bg-primary/5 border-primary"
                              : "border-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent
                              className={`h-5 w-5 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`}
                            />
                            <div>
                              <p className="font-medium">{tier.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {tier.minReferrals}+ referrals
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{tier.reward}</p>
                            <p className="text-xs text-muted-foreground">
                              per referral
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Share Content Generator</CardTitle>
                  <CardDescription>
                    Generate personalized referral messages in{" "}
                    {currentLanguage.nativeName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="share-method">Share Method</Label>
                    <Select value={shareMethod} onValueChange={setShareMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="generated-content">Generated Content</Label>
                    <Textarea
                      id="generated-content"
                      value={generateShareContent()}
                      readOnly
                      rows={8}
                      className={currentLanguage.rtl ? "text-right" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-message">Add Custom Message</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Add your personal touch..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={3}
                      className={currentLanguage.rtl ? "text-right" : ""}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share Now</CardTitle>
                  <CardDescription>
                    Share your referral link across different platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button
                      onClick={() => shareOnPlatform("whatsapp")}
                      className="justify-start gap-3 h-12"
                      variant="outline"
                    >
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <div className="text-left">
                        <p className="font-medium">Share on WhatsApp</p>
                        <p className="text-xs text-muted-foreground">
                          Personal messaging with friends
                        </p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => shareOnPlatform("facebook")}
                      className="justify-start gap-3 h-12"
                      variant="outline"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium">Share on Facebook</p>
                        <p className="text-xs text-muted-foreground">
                          Reach your social network
                        </p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => shareOnPlatform("twitter")}
                      className="justify-start gap-3 h-12"
                      variant="outline"
                    >
                      <Twitter className="h-5 w-5 text-black" />
                      <div className="text-left">
                        <p className="font-medium">Share on Twitter</p>
                        <p className="text-xs text-muted-foreground">
                          Public social sharing
                        </p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => copyToClipboard(generateShareContent())}
                      className="justify-start gap-3 h-12"
                      variant="outline"
                    >
                      <Copy className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">Copy Message</p>
                        <p className="text-xs text-muted-foreground">
                          Copy to share anywhere
                        </p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral History</CardTitle>
                <CardDescription>
                  Track all your referrals and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Referrer</TableHead>
                      <TableHead>Referee</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Market</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reward</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReferrals.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">
                          {referral.referrerName}
                        </TableCell>
                        <TableCell>{referral.refereeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {referral.language.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{referral.marketTier}</TableCell>
                        <TableCell>{referral.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              referral.status === "rewarded"
                                ? "default"
                                : referral.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {referral.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {referral.reward}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>
                    Your earned rewards ready to be claimed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <Gift className="h-12 w-12 mx-auto text-primary mb-4" />
                    <div className="text-3xl font-bold text-primary">₹0</div>
                    <p className="text-muted-foreground">
                      Available to withdraw
                    </p>
                    <Button className="mt-4">Withdraw Rewards</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reward History</CardTitle>
                  <CardDescription>
                    Track your reward earnings and withdrawals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[].map((reward, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{reward.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {reward.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              reward.type === "earned"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            {reward.type === "earned" ? "+" : "-"}
                            {reward.amount}
                          </p>
                          <Badge variant="outline" size="sm">
                            {reward.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
