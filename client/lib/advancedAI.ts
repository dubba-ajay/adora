import { getHashtags, getCTA } from './regionalLanguage';

export interface ContentRequest {
  businessName: string;
  productService: string;
  benefits?: string;
  offer?: string;
  targetAudience?: string;
  tone: 'friendly' | 'professional' | 'luxury' | 'trendy' | 'festive' | 'urgent' | 'casual';
  platform: 'social' | 'email' | 'whatsapp' | 'ads' | 'seo' | 'blog';
  contentType: 'promotion' | 'showcase' | 'testimonial' | 'educational' | 'announcement' | 'story' | 'comparison';
  language: string;
  region: string;
  goal: 'sales' | 'engagement' | 'awareness' | 'traffic' | 'leads';
  budget?: string;
  industry?: string;
  festivalContext?: string;
}

export interface ContentVariation {
  id: number;
  hook: string;
  headline: string;
  description: string;
  cta: string;
  hashtags: string[];
  keywords: string[];
  length: 'short' | 'medium' | 'long';
  style: string;
  engagement_score: number;
  platform_optimized: boolean;
}

export interface AIContentResponse {
  variations: ContentVariation[];
  performance_prediction: {
    engagement_rate: number;
    reach_estimate: number;
    conversion_probability: number;
    optimal_timing: string[];
  };
  recommendations: string[];
  ab_test_suggestions: {
    test_elements: string[];
    hypothesis: string;
  }[];
}

class AdvancedAIEngine {
  private contentTemplates = {
    hooks: {
      friendly: {
        social: [
          "🌟 Hey there! Ready to discover something amazing?",
          "✨ You're going to love this!",
          "💫 Guess what we have for you today?",
          "🎉 Something special is waiting for you!",
          "😍 This will make your day better!"
        ],
        email: [
          "We have exciting news to share with you!",
          "Something amazing is coming your way...",
          "You've been waiting for this moment!",
          "Great news for valued customers like you!",
          "This exclusive update is just for you!"
        ],
        whatsapp: [
          "Hi! 👋 Hope you're having a great day!",
          "Quick question - are you looking for...",
          "Hey! We have something perfect for you 😊",
          "Good news! 🎉 Your search is over!",
          "Hi there! Ready for something amazing? ✨"
        ],
        ads: [
          "Discover the secret everyone's talking about",
          "Transform your life with this simple solution",
          "Join thousands who've already experienced this",
          "The change you've been waiting for is here",
          "Finally, a solution that actually works"
        ]
      },
      professional: {
        social: [
          "Industry leaders choose quality. Here's why:",
          "Expert-approved solutions for modern challenges",
          "Professional excellence meets customer satisfaction",
          "Trusted by professionals across industries",
          "Setting new standards in quality and service"
        ],
        email: [
          "Important update for our valued business partners",
          "Professional solutions designed for your success",
          "Industry insights that drive real results",
          "Strategic advantages for forward-thinking businesses",
          "Expert recommendations for optimal outcomes"
        ],
        whatsapp: [
          "Professional consultation available",
          "Expert solutions for your business needs",
          "Schedule a consultation with our specialists",
          "Professional services tailored for you",
          "Industry expertise at your service"
        ],
        ads: [
          "Professional solutions that deliver results",
          "Industry expertise you can trust",
          "Advanced solutions for modern businesses",
          "Professional excellence, guaranteed outcomes",
          "Expert-level service, competitive pricing"
        ]
      },
      luxury: {
        social: [
          "Indulge in the finest quality available",
          "Exclusive access to premium experiences",
          "Luxury redefined for discerning customers",
          "Where elegance meets exceptional quality",
          "Premium experiences, exclusively curated"
        ],
        email: [
          "Exclusive invitation to our premium collection",
          "Luxury experiences crafted just for you",
          "VIP access to our finest offerings",
          "Premium quality, exclusively yours",
          "Elevated experiences await our valued clients"
        ],
        whatsapp: [
          "Exclusive VIP offerings available",
          "Premium consultation for select clients",
          "Luxury experiences tailored for you",
          "VIP treatment with personalized service",
          "Exclusive access to premium collections"
        ],
        ads: [
          "Luxury that speaks to your refined taste",
          "Premium quality for those who demand the best",
          "Exclusive experiences for discerning individuals",
          "Luxury redefined, quality uncompromised",
          "Elite experiences, exceptional value"
        ]
      }
    },
    
    benefits: {
      quality: [
        "Premium materials and expert craftsmanship",
        "Rigorous quality control at every step",
        "Industry-leading standards and certifications",
        "Exceptional durability and performance",
        "Trusted by thousands of satisfied customers"
      ],
      convenience: [
        "Save time with our streamlined process",
        "24/7 availability for your convenience",
        "Quick and hassle-free experience",
        "Everything you need in one place",
        "Simple, fast, and reliable service"
      ],
      value: [
        "Exceptional value for your investment",
        "Best prices without compromising quality",
        "More benefits, better pricing",
        "Smart choice for budget-conscious customers",
        "Maximum value, minimum cost"
      ],
      innovation: [
        "Cutting-edge technology and innovation",
        "Advanced features you won't find elsewhere",
        "Revolutionary approach to traditional problems",
        "Future-ready solutions for today's challenges",
        "Innovation that makes a real difference"
      ]
    },

    ctas: {
      sales: {
        urgent: [
          "Order now - Limited stock!",
          "Grab yours before it's gone!",
          "Don't miss out - Buy today!",
          "Last chance to save big!",
          "Act fast - Offer ends soon!"
        ],
        soft: [
          "Discover more about our products",
          "Learn how we can help you",
          "Explore our solutions today",
          "Find out what makes us different",
          "See why customers choose us"
        ]
      },
      engagement: [
        "Share your thoughts in the comments!",
        "Tag someone who needs to see this!",
        "What's your experience with this?",
        "Double tap if you agree!",
        "Save this for later reference!"
      ],
      awareness: [
        "Learn more about this topic",
        "Spread the word to help others",
        "Follow for more insights like this",
        "Stay updated with our latest news",
        "Join our community of informed customers"
      ]
    }
  };

  private industryKeywords = {
    'food': ['delicious', 'fresh', 'authentic', 'homemade', 'nutritious', 'tasty', 'organic'],
    'fashion': ['trendy', 'stylish', 'comfortable', 'elegant', 'fashionable', 'chic', 'modern'],
    'beauty': ['glowing', 'radiant', 'beautiful', 'healthy', 'natural', 'premium', 'effective'],
    'tech': ['innovative', 'smart', 'efficient', 'advanced', 'reliable', 'user-friendly', 'cutting-edge'],
    'health': ['healthy', 'safe', 'effective', 'natural', 'proven', 'trusted', 'beneficial'],
    'education': ['expert', 'comprehensive', 'practical', 'proven', 'effective', 'results-oriented', 'professional'],
    'finance': ['secure', 'reliable', 'profitable', 'transparent', 'trustworthy', 'expert', 'strategic'],
    'real-estate': ['prime', 'spacious', 'modern', 'luxurious', 'convenient', 'investment', 'location'],
    'automotive': ['reliable', 'efficient', 'powerful', 'safe', 'durable', 'performance', 'advanced'],
    'home': ['comfortable', 'stylish', 'durable', 'convenient', 'affordable', 'quality', 'practical']
  };

  private detectIndustry(productService: string, businessName: string): string {
    const text = `${productService} ${businessName}`.toLowerCase();
    
    const industryPatterns = {
      'food': ['restaurant', 'food', 'cafe', 'kitchen', 'dining', 'meal', 'cook', 'recipe', 'taste'],
      'fashion': ['clothing', 'fashion', 'dress', 'style', 'wear', 'apparel', 'boutique', 'design'],
      'beauty': ['beauty', 'salon', 'spa', 'cosmetic', 'skincare', 'hair', 'makeup', 'glow'],
      'tech': ['technology', 'software', 'app', 'digital', 'computer', 'mobile', 'tech', 'IT'],
      'health': ['health', 'medical', 'clinic', 'doctor', 'medicine', 'fitness', 'wellness', 'therapy'],
      'education': ['education', 'school', 'learning', 'course', 'training', 'tutorial', 'academy', 'study'],
      'finance': ['finance', 'bank', 'investment', 'money', 'loan', 'insurance', 'financial', 'credit'],
      'real-estate': ['property', 'real estate', 'home', 'house', 'apartment', 'land', 'building'],
      'automotive': ['car', 'auto', 'vehicle', 'motor', 'bike', 'transport', 'automotive', 'garage'],
      'home': ['home', 'furniture', 'decor', 'interior', 'household', 'living', 'room', 'house']
    };

    for (const [industry, patterns] of Object.entries(industryPatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        return industry;
      }
    }
    return 'general';
  }

  private generateVariation(request: ContentRequest, variationIndex: number): ContentVariation {
    const industry = this.detectIndustry(request.productService, request.businessName);
    const toneTemplates = this.contentTemplates.hooks[request.tone] || this.contentTemplates.hooks.friendly;
    const platformHooks = toneTemplates[request.platform] || toneTemplates.social;
    
    // Select hook based on variation index
    const hook = platformHooks[variationIndex % platformHooks.length];
    
    // Generate dynamic headline
    const headlines = this.generateHeadlines(request, industry, variationIndex);
    const headline = headlines[variationIndex % headlines.length];
    
    // Generate description with benefits
    const description = this.generateDescription(request, industry, variationIndex);
    
    // Generate CTA based on goal
    const cta = this.generateCTA(request, variationIndex);
    
    // Generate relevant hashtags
    const hashtags = this.generateHashtags(request, industry);
    
    // Generate keywords
    const keywords = this.generateKeywords(request, industry);
    
    // Determine content length
    const length = this.determineContentLength(request.platform, variationIndex);
    
    // Calculate engagement score
    const engagement_score = this.calculateEngagementScore(request, headline, description);
    
    return {
      id: variationIndex + 1,
      hook,
      headline,
      description,
      cta,
      hashtags,
      keywords,
      length,
      style: this.generateStyle(request, variationIndex),
      engagement_score,
      platform_optimized: true
    };
  }

  private generateHeadlines(request: ContentRequest, industry: string, index: number): string[] {
    const templates = [
      `${request.offer ? `${request.offer} - ` : ''}${request.productService} at ${request.businessName}`,
      `Transform your experience with ${request.productService}`,
      `Why ${request.targetAudience || 'customers'} choose ${request.businessName}`,
      `Discover the ${industry} solution you've been waiting for`,
      `${request.businessName}: Where quality meets ${request.productService}`,
      `Exclusive ${request.productService} deals you can't miss`,
      `The ultimate ${request.productService} experience awaits`,
      `${request.businessName} - Your trusted ${industry} partner`
    ];
    
    if (request.festivalContext) {
      templates.unshift(
        `${request.festivalContext} Special: ${request.productService} celebration`,
        `Celebrate ${request.festivalContext} with exclusive ${request.productService}`,
        `${request.festivalContext} joy with ${request.businessName}`
      );
    }
    
    return templates;
  }

  private generateDescription(request: ContentRequest, industry: string, index: number): string {
    const benefitKeywords = this.industryKeywords[industry] || this.industryKeywords['general'] || ['quality', 'excellent', 'reliable'];
    const benefits = request.benefits || `${benefitKeywords.slice(0, 3).join(', ')} ${request.productService}`;
    
    const templates = [
      `Experience ${benefits} with ${request.businessName}. ${request.offer ? `Special offer: ${request.offer}. ` : ''}Perfect for ${request.targetAudience || 'everyone'} in ${request.region}.`,
      
      `At ${request.businessName}, we specialize in ${request.productService} that delivers ${benefits}. ${request.offer ? `Don't miss our ${request.offer}! ` : ''}Join thousands of satisfied customers.`,
      
      `Looking for ${request.productService}? ${request.businessName} offers ${benefits}. ${request.targetAudience ? `Specially designed for ${request.targetAudience}. ` : ''}${request.offer ? `Limited time: ${request.offer}` : ''}`,
      
      `${request.businessName} brings you premium ${request.productService} with ${benefits}. Trusted by customers across ${request.region}. ${request.offer ? `Exclusive deal: ${request.offer}` : ''}`,
      
      `Transform your ${industry} experience with ${request.businessName}'s ${request.productService}. Featuring ${benefits}. ${request.offer ? `Save more with ${request.offer}. ` : ''}${request.targetAudience ? `Perfect for ${request.targetAudience}.` : ''}`
    ];
    
    return templates[index % templates.length];
  }

  private generateCTA(request: ContentRequest, index: number): string {
    const ctaTemplates = this.contentTemplates.ctas[request.goal] || this.contentTemplates.ctas.sales.soft;
    const platformCTAs = {
      social: ["Share your thoughts!", "Tag a friend!", "Save for later!", "Follow for more!", "Like if you agree!"],
      email: ["Learn More", "Shop Now", "Get Started", "Contact Us", "Claim Offer"],
      whatsapp: ["Message us!", "Call now!", "WhatsApp us!", "Get instant reply!", "Book appointment!"],
      ads: ["Learn More", "Shop Now", "Get Quote", "Call Today", "Visit Store"],
      seo: ["Read More", "Explore Options", "Get Information", "Contact Expert", "Learn Details"],
      blog: ["Continue Reading", "Share Article", "Leave Comment", "Subscribe", "Get Updates"]
    };
    
    const relevantCTAs = platformCTAs[request.platform] || ctaTemplates;
    return relevantCTAs[index % relevantCTAs.length];
  }

  private generateHashtags(request: ContentRequest, industry: string): string[] {
    const baseHashtags = [
      `#${request.businessName.replace(/\s+/g, '')}`,
      `#${request.productService.replace(/\s+/g, '')}`,
      `#${request.region.replace(/\s+/g, '')}`,
      '#Quality',
      '#LocalBusiness'
    ];
    
    const industryHashtags = {
      'food': ['#Food', '#Delicious', '#Restaurant', '#Tasty', '#Fresh'],
      'fashion': ['#Fashion', '#Style', '#Trendy', '#Clothing', '#Design'],
      'beauty': ['#Beauty', '#Skincare', '#Glow', '#Makeup', '#Salon'],
      'tech': ['#Technology', '#Innovation', '#Digital', '#Tech', '#Smart'],
      'health': ['#Health', '#Wellness', '#Fitness', '#Medical', '#Care'],
      'education': ['#Education', '#Learning', '#Knowledge', '#Skills', '#Training'],
      'finance': ['#Finance', '#Investment', '#Money', '#Banking', '#Financial'],
      'real-estate': ['#RealEstate', '#Property', '#Home', '#Investment', '#Location'],
      'automotive': ['#Automotive', '#Cars', '#Vehicle', '#Auto', '#Transport'],
      'home': ['#Home', '#Decor', '#Furniture', '#Interior', '#Living']
    };
    
    const relevantHashtags = industryHashtags[industry] || ['#Business', '#Service', '#Professional'];
    baseHashtags.push(...relevantHashtags);
    
    if (request.festivalContext) {
      baseHashtags.unshift(`#${request.festivalContext.replace(/\s+/g, '')}`);
    }
    
    return [...new Set(baseHashtags)].slice(0, 10);
  }

  private generateKeywords(request: ContentRequest, industry: string): string[] {
    const baseKeywords = [
      request.businessName.toLowerCase(),
      request.productService.toLowerCase(),
      request.region.toLowerCase()
    ];
    
    const industryKeywords = this.industryKeywords[industry] || ['service', 'business', 'quality'];
    baseKeywords.push(...industryKeywords);
    
    if (request.benefits) {
      baseKeywords.push(...request.benefits.toLowerCase().split(' ').filter(word => word.length > 3));
    }
    
    return [...new Set(baseKeywords)].slice(0, 15);
  }

  private determineContentLength(platform: string, index: number): 'short' | 'medium' | 'long' {
    const lengthMap = {
      social: ['short', 'medium', 'short'][index % 3],
      email: ['medium', 'long', 'medium'][index % 3],
      whatsapp: ['short', 'short', 'medium'][index % 3],
      ads: ['short', 'short', 'short'][index % 3],
      seo: ['long', 'medium', 'long'][index % 3],
      blog: ['long', 'long', 'medium'][index % 3]
    };
    
    return lengthMap[platform as keyof typeof lengthMap] || 'medium';
  }

  private generateStyle(request: ContentRequest, index: number): string {
    const styles = [
      'conversational',
      'informative',
      'persuasive',
      'storytelling',
      'direct',
      'emotional'
    ];
    
    return styles[index % styles.length];
  }

  private calculateEngagementScore(request: ContentRequest, headline: string, description: string): number {
    let score = 70; // Base score
    
    // Boost for emotional words
    const emotionalWords = ['amazing', 'incredible', 'fantastic', 'exclusive', 'limited', 'special', 'unique'];
    const content = `${headline} ${description}`.toLowerCase();
    emotionalWords.forEach(word => {
      if (content.includes(word)) score += 5;
    });
    
    // Boost for urgency
    const urgencyWords = ['now', 'today', 'limited', 'hurry', 'fast', 'quick', 'instant'];
    urgencyWords.forEach(word => {
      if (content.includes(word)) score += 3;
    });
    
    // Boost for benefits
    if (request.benefits && request.benefits.length > 50) score += 10;
    
    // Boost for offers
    if (request.offer) score += 15;
    
    // Platform-specific adjustments
    if (request.platform === 'social') score += 5;
    if (request.platform === 'whatsapp') score += 8;
    
    return Math.min(score, 95); // Cap at 95
  }

  public async generateContent(request: ContentRequest): Promise<AIContentResponse> {
    // Generate 4-6 variations
    const variationCount = request.platform === 'ads' ? 6 : 4;
    const variations: ContentVariation[] = [];
    
    for (let i = 0; i < variationCount; i++) {
      variations.push(this.generateVariation(request, i));
    }
    
    // Sort by engagement score
    variations.sort((a, b) => b.engagement_score - a.engagement_score);
    
    // Calculate performance predictions
    const avgEngagement = variations.reduce((sum, v) => sum + v.engagement_score, 0) / variations.length;
    const performance_prediction = {
      engagement_rate: Math.round(avgEngagement),
      reach_estimate: this.estimateReach(request, avgEngagement),
      conversion_probability: this.estimateConversion(request, avgEngagement),
      optimal_timing: this.getOptimalTiming(request.platform, request.region)
    };
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(request, variations);
    
    // Generate A/B test suggestions
    const ab_test_suggestions = this.generateABTestSuggestions(variations);
    
    return {
      variations,
      performance_prediction,
      recommendations,
      ab_test_suggestions
    };
  }

  private estimateReach(request: ContentRequest, engagementScore: number): number {
    let baseReach = 100;
    
    // Platform multipliers
    const platformMultipliers = {
      social: 2.5,
      whatsapp: 1.8,
      email: 1.5,
      ads: 4.0,
      seo: 3.2,
      blog: 2.0
    };
    
    baseReach *= platformMultipliers[request.platform] || 2.0;
    baseReach *= (engagementScore / 70); // Engagement boost
    
    if (request.offer) baseReach *= 1.3;
    if (request.targetAudience) baseReach *= 1.2;
    
    return Math.round(baseReach * (1 + Math.random() * 0.5));
  }

  private estimateConversion(request: ContentRequest, engagementScore: number): number {
    let conversion = 2.5; // Base 2.5%
    
    if (request.goal === 'sales') conversion *= 1.8;
    if (request.goal === 'leads') conversion *= 1.5;
    if (request.offer) conversion *= 1.6;
    if (request.platform === 'ads') conversion *= 1.4;
    if (request.platform === 'email') conversion *= 1.3;
    
    conversion *= (engagementScore / 70);
    
    return Math.min(conversion, 15); // Cap at 15%
  }

  private getOptimalTiming(platform: string, region: string): string[] {
    const timingMap = {
      social: ['9:00 AM', '1:00 PM', '7:00 PM'],
      email: ['10:00 AM', '2:00 PM', '6:00 PM'],
      whatsapp: ['11:00 AM', '4:00 PM', '8:00 PM'],
      ads: ['8:00 AM', '12:00 PM', '9:00 PM'],
      seo: ['Any time', 'Morning preferred', 'Afternoon good'],
      blog: ['10:00 AM', '3:00 PM', '7:00 PM']
    };
    
    return timingMap[platform] || ['10:00 AM', '2:00 PM', '6:00 PM'];
  }

  private generateRecommendations(request: ContentRequest, variations: ContentVariation[]): string[] {
    const recommendations = [
      `Use variation #${variations[0].id} for highest engagement (${variations[0].engagement_score}% score)`,
      `Test ${request.tone} tone variations for better audience connection`,
      `Include more emotional triggers in headlines for ${request.platform} platform`
    ];
    
    if (request.platform === 'social') {
      recommendations.push('Add visual content for 40% higher engagement');
      recommendations.push('Post during peak hours for maximum reach');
    }
    
    if (request.platform === 'ads') {
      recommendations.push('Use A/B testing with top 2 variations');
      recommendations.push('Set up conversion tracking for optimization');
    }
    
    if (request.platform === 'email') {
      recommendations.push('Personalize subject lines for 25% better open rates');
      recommendations.push('Include clear call-to-action buttons');
    }
    
    if (!request.offer) {
      recommendations.push('Consider adding limited-time offers to boost urgency');
    }
    
    return recommendations;
  }

  private generateABTestSuggestions(variations: ContentVariation[]): { test_elements: string[], hypothesis: string }[] {
    return [
      {
        test_elements: ['Headlines', 'CTAs'],
        hypothesis: 'Emotional headlines will outperform descriptive ones by 25%'
      },
      {
        test_elements: ['Content length', 'Tone'],
        hypothesis: 'Shorter, friendlier content will generate more engagement'
      },
      {
        test_elements: ['Offers', 'Urgency'],
        hypothesis: 'Time-limited offers will increase conversion rates by 40%'
      }
    ];
  }
}

export const advancedAI = new AdvancedAIEngine();
