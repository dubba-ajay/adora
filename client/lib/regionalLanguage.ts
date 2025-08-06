export interface Language {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  rtl: boolean;
}

export interface MarketTier {
  id: string;
  name: string;
  description: string;
  cities: string[];
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    script: "Latin",
    rtl: false,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    script: "Devanagari",
    rtl: false,
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu",
    rtl: false,
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    script: "Bengali",
    rtl: false,
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil",
    rtl: false,
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    script: "Devanagari",
    rtl: false,
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    script: "Gujarati",
    rtl: false,
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    script: "Kannada",
    rtl: false,
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    script: "Malayalam",
    rtl: false,
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    rtl: false,
  },
  {
    code: "or",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    script: "Odia",
    rtl: false,
  },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    script: "Bengali",
    rtl: false,
  },
];

export const MARKET_TIERS: MarketTier[] = [
  {
    id: "metro",
    name: "Metro Cities",
    description: "Major metropolitan areas",
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"],
  },
  {
    id: "tier1",
    name: "Tier 1 Cities",
    description: "Major urban centers",
    cities: ["Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"],
  },
  {
    id: "tier2",
    name: "Tier 2 Cities",
    description: "Emerging urban areas",
    cities: ["Agra", "Meerut", "Varanasi", "Allahabad", "Amritsar", "Rajkot"],
  },
  {
    id: "tier3",
    name: "Tier 3 Cities",
    description: "Smaller urban centers",
    cities: ["Dehradun", "Jammu", "Mangalore", "Guwahati", "Shillong"],
  },
  {
    id: "rural",
    name: "Rural Areas",
    description: "Villages and small towns",
    cities: ["Villages", "Small Towns", "Rural Centers"],
  },
];

// Content templates for different languages
export const CONTENT_TEMPLATES = {
  social_post: {
    en: {
      business_promotion:
        "🚀 Transform your business with our services!\n\nWe guarantee quality services, expert solutions, and customer satisfaction.\n\n✅ Expert team\n✅ Proven results\n✅ Customer focused\n\nContact us today! 📞\n\n#business #quality #local",
      festival_greeting:
        "🎉 Wishing you and your loved ones a very happy {festival}!\n\nMay this festival bring prosperity and joy to your business.\n\n✨ Special festival offers available!\n\nContact us today! 📞\n\n#{festival} #celebration #business",
    },
    hi: {
      business_promotion:
        "🚀 हमारी सेवाओं के स��थ अपने व्यापार को बदलें!\n\nहम गुणवत्तापूर्ण सेवाएं, विशेषज्ञ समाधान और ग्राहक संतुष्टि की गारंटी देते हैं।\n\n✅ विशेषज्ञ टीम\n✅ सिद्ध परिणाम\n✅ ग्राहक केंद्रित\n\nआज ही संपर्क करें! 📞\n\n#व्यापार #गुणवत्ता #स्थानीय",
      festival_greeting:
        "🎉 आपको और आपके प्रियजनों को {festival} की हार्दिक शुभकामनाएं!\n\nयह त्योहार आपके व्यापार में समृद्धि और खुशी लाए।\n\n✨ विशेष त्योहारी ऑफर उपलब्ध!\n\nआज ही संपर्क करें! 📞\n\n#{festival} #त्योहार #व्यापार",
    },
    te: {
      business_promotion:
        "🚀 మా సేవలతో మీ వ్యాపారాన్ని మార్చండి!\n\nమేము నాణ్యమైన సేవలు, నిపుణుల పరిష్కారాలు మరియు ���స్టమర్ సంతృప్తికి హామీ ఇస్తాము।\n\n✅ నిపుణుల బృందం\n✅ నిరూపితమైన ఫలితాలు\n✅ కస్టమర్ దృష్టి\n\nఈరోజే సంప్రదించండి! 📞\n\n#వ్యాపారం #నాణ్యత #స్థానిక",
      festival_greeting:
        "🎉 మీకు మరియు మీ ప్రియమైనవారికి {festival} శుభాకాంక్షలు!\n\nఈ పండుగ మీ వ్యాపారంలో అభివృద్ధి మరియు ఆనందం తెచ్చనిస్తుంది।\n\n✨ ప్రత్యేక పండుగ ఆఫర్లు అందుబాటులో!\n\nఈరోజే సంప్రదించండి! 📞\n\n#{festival} #పండుగ #వ్యాపారం",
    },
  },
  whatsapp_message: {
    en: {
      welcome:
        "🙏 Welcome to {businessName}!\n\nThank you for choosing us. We're excited to serve you with our quality services.\n\nReply 'HELP' for assistance or 'STOP' to unsubscribe.",
      promotional:
        "🎯 Special offer just for you!\n\nGet {discount}% off on our services.\nValid till {date}\n\nCall now: {phone}\nVisit: {website}",
    },
    hi: {
      welcome:
        "🙏 {businessName} में आपका स्वागत है!\n\nहमें चुनने के लिए धन्यवाद। हम आपको अपनी गुणवत्तापूर्ण सेवाएं प्रदान करने के लिए उत्साहित हैं।\n\nसहायता के लिए 'HELP' या सदस्यता रद्द करने के लिए 'STOP' का उत्तर दें।",
      promotional:
        "🎯 आपके लिए विशेष ऑफर!\n\nहमारी सेवाओं पर {discount}% छूट पाएं।\n{date} तक वैध\n\nअभी कॉल करें: {phone}\nविजिट करें: {website}",
    },
    te: {
      welcome:
        "🙏 {businessName}కి స్వాగతం!\n\nమమ్మల్ని ఎంచుకున్నందుకు ధన్యవాదాలు. మా నాణ్యమైన సేవలతో మీకు సేవ చేయడానికి మేము సిద్ధంగా ఉన్నాము।\n\nసహాయం కోసం 'HELP' లేదా అనుమతి రద్దు చేయడానికి 'STOP' అని రిప్లై చేయండి।",
      promotional:
        "🎯 మీ కోసం ప్రత్యేక ఆఫర్!\n\nమా సేవలపై {discount}% తగ్గింపు పొందండి।\n{date} వరకు చెల్లుబాటు\n\nఇప్పుడే కాల్ చేయండి: {phone}\nసందర్శించండి: {website}",
    },
  },
  email: {
    en: {
      subject: "Welcome to {businessName}!",
      body: "Dear Customer,\n\nWelcome to {businessName}! We're delighted that you've joined our community.\n\nAs a new member, you'll receive:\n• Exclusive discounts and offers\n• Priority customer support\n• First access to new products\n\nContact us today! 📞\n\nBest regards,\n{businessName} Team",
    },
    hi: {
      subject: "आपका स्वागत है! {businessName} में",
      body: "प्रिय ग्राहक,\n\n{businessName} में आपका स्वागत है! हमें खुशी है कि आप हमारे समुदाय में शामिल हुए हैं।\n\nएक नए सदस्य के रूप में, आप प्राप्त करेंगे:\n• विशेष छूट और ऑफर\n• प्राथमिकता ग्राहक सहायता\n• नए उत्पादों तक पहली पहुंच\n\nआज ही संपर्क करें! 📞\n\nसादर,\n{businessName} टीम",
    },
    te: {
      subject: "{businessName}కి స్వాగతం!",
      body: "ప్రియమైన కస్టమర్,\n\n{businessName}కి స్వాగతం! మీరు మా కమ్యూనిటీలో చేరినందుకు మేము సంతోషిస్తున్నాము।\n\nకొత్త సభ్యునిగా, మీరు పొందుతారు:\n• ప్రత్యేక తగ్గింపులు మరియు ఆఫర్లు\n• ప్రాధాన్యత కస్టమర్ సపోర్ట్\n• కొత్త ఉత్పత్తులకు మొదటి యాక్సెస్\n\nఈరోజే సంప్రదించండి! 📞\n\nభవదీయులు,\n{businessName} టీం",
    },
  },
};

// Regional CTAs and hashtags
export const REGIONAL_CTAS = {
  en: {
    contact: "Contact us today!",
    call: "Call now!",
    visit: "Visit us!",
    order: "Order now!",
    book: "Book now!",
    learn_more: "Learn more!",
  },
  hi: {
    contact: "आज ही संपर��क करें!",
    call: "अभी कॉल करें!",
    visit: "हमसे मिलें!",
    order: "अभी ऑर्डर करें!",
    book: "अभी बुक करें!",
    learn_more: "और जानें!",
  },
  te: {
    contact: "ఈరోజే సంప్రదించండి!",
    call: "ఇప్పుడే కాల్ చేయండి!",
    visit: "మాతో కలుసుకోండి!",
    order: "ఇప్పుడే ఆర్డర్ చేయండి!",
    book: "ఇప్పుడే బుక్ చేయండి!",
    learn_more: "మరింత తెలుసుకోండి!",
  },
};

export const REGIONAL_HASHTAGS = {
  en: ["#business", "#quality", "#local", "#professional", "#service"],
  hi: ["#व्यापार", "#गुणवत्ता", "#स्थानीय", "#पेशेवर", "#सेवा"],
  te: ["#వ్యాపారం", "#నాణ్యత", "#స्थानीय", "#వృత్తిపరమైన", "#సేవ"],
  bn: ["#ব্যবসা", "#গুণমান", "#স্থানীয়", "#পেশাদার", "#সেবা"],
  ta: ["#வணிகம்", "#தரம்", "#உள்ளூர்", "#தொழில்முறை", "#சேவை"],
  mr: ["#व्यवसाय", "#गुणवत्ता", "#स्थानिक", "#व्यावसायिक", "#सेवा"],
  gu: ["#ધંધો", "#ગુણવત્તા", "#સ્થાનિક", "#વ્યાવસાયિક", "#સેવા"],
  kn: ["#ವ್ಯಾಪಾರ", "#ಗುಣಮಟ್ಟ", "#ಸ್ಥಳೀಯ", "#ವೃತ್ತಿಪರ", "#ಸೇವೆ"],
  ml: ["#ബിസിനസ്", "#ഗുണനിലവാരം", "#പ്രാദേശിക", "#പ്രൊഫഷണൽ", "#സേവനം"],
  pa: ["#ਕਾਰੋਬਾਰ", "#ਗੁਣਵੱਤਾ", "#ਸਥਾਨਕ", "#ਪੇਸ਼ੇਵਰ", "#ਸੇਵਾ"],
  or: ["#ବ୍ୟବସାୟ", "#ଗୁଣବତ୍ତା", "#ସ୍ଥାନୀୟ", "#ବୃତ୍ତିଗତ", "#ସେବା"],
  as: ["#ব্যৱসায়", "#গুণমান", "#স্থানীয়", "#পেশাদাৰী", "#সেৱা"],
};

// Indian festivals with regional relevance
export const INDIAN_FESTIVALS = [
  {
    id: "diwali",
    name: { en: "Diwali", hi: "दीवाली", te: "దీపావళి" },
    type: "national",
    season: "autumn",
    relevantRegions: ["all"],
  },
  {
    id: "holi",
    name: { en: "Holi", hi: "होली", te: "హోలీ" },
    type: "national",
    season: "spring",
    relevantRegions: ["all"],
  },
  {
    id: "eid",
    name: { en: "Eid", hi: "ईद", te: "ఈద్" },
    type: "national",
    season: "variable",
    relevantRegions: ["all"],
  },
  {
    id: "onam",
    name: { en: "Onam", ml: "ഓണം" },
    type: "regional",
    season: "autumn",
    relevantRegions: ["kerala"],
  },
  {
    id: "durga_puja",
    name: { en: "Durga Puja", bn: "দুর্গা পূজা" },
    type: "regional",
    season: "autumn",
    relevantRegions: ["west_bengal"],
  },
];

// Utility functions
export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

export function getContentTemplate(
  type: keyof typeof CONTENT_TEMPLATES,
  language: string,
  template: string,
): string {
  return (
    CONTENT_TEMPLATES[type]?.[
      language as keyof (typeof CONTENT_TEMPLATES)[typeof type]
    ]?.[
      template as keyof (typeof CONTENT_TEMPLATES)[typeof type][typeof language]
    ] ||
    CONTENT_TEMPLATES[type]?.en?.[
      template as keyof (typeof CONTENT_TEMPLATES)[typeof type]["en"]
    ] ||
    ""
  );
}

export function getCTA(
  language: string,
  type: keyof (typeof REGIONAL_CTAS)["en"],
): string {
  return (
    REGIONAL_CTAS[language as keyof typeof REGIONAL_CTAS]?.[type] ||
    REGIONAL_CTAS.en[type]
  );
}

export function getHashtags(language: string): string[] {
  return (
    REGIONAL_HASHTAGS[language as keyof typeof REGIONAL_HASHTAGS] ||
    REGIONAL_HASHTAGS.en
  );
}

export function translateBusinessTerms(
  text: string,
  fromLang: string,
  toLang: string,
): string {
  // This would typically integrate with a translation API
  // For now, return the original text with a note
  if (fromLang === toLang) return text;
  return text; // Placeholder for translation logic
}

export function formatContent(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (match, key) => variables[key] || match,
  );
}
