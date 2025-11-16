import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, FileText, Zap, Users, Check, Globe, AlertCircle, DollarSign, Clock, Scale, Sparkles, BookOpen, MessageSquare, Download, Award, TrendingUp, Lock } from 'lucide-react';

// Multi-language support
const translations = {
  en: {
    hero: {
      title: "Owed Money? Get It Back.",
      subtitle: "File your small claims case without a lawyer. Court-ready documents in 5 minutes.",
      cta: "Start Your Claim - RM79",
      trustBadge: "1,247 claims filed, RM6.2M recovered",
      secondaryCta: "Learn How It Works"
    },
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      pricing: "Pricing",
      faq: "FAQ",
      language: "Language"
    },
    features: {
      title: "Why MatSelamat?",
      subtitle: "Designed for Malaysians who deserve justice",
      items: [
        {
          title: "No Lawyer Needed",
          desc: "Save RM800-1,500 in legal fees. Do it yourself with AI guidance."
        },
        {
          title: "5-Minute Process",
          desc: "Answer simple questions, get court-ready Form 198 instantly."
        },
        {
          title: "Court-Approved",
          desc: "Follows Order 93 of Rules of Court 2012. Accepted by all Magistrates' Courts."
        },
        {
          title: "Money-Back Guarantee",
          desc: "If your document is rejected for formatting issues, full refund."
        }
      ]
    },
    comparison: {
      title: "Compare Your Options",
      options: [
        { method: "DIY (Current)", cost: "RM10 filing fee", time: "40 hours research", success: "Low", hassle: "Very High" },
        { method: "Hire a Lawyer", cost: "RM800-1,500", time: "2-4 weeks", success: "High", hassle: "Medium" },
        { method: "MatSelamat.com", cost: "RM79 one-time", time: "5 minutes", success: "High", hassle: "Very Low", highlight: true }
      ]
    },
    process: {
      title: "How It Works",
      subtitle: "From debt to justice in 3 simple steps",
      steps: [
        {
          title: "Check Eligibility",
          desc: "Free 2-minute quiz. We'll tell you if you qualify for small claims (under RM5,000)."
        },
        {
          title: "Build Your Claim",
          desc: "Answer guided questions. Our AI transforms your story into legal language."
        },
        {
          title: "File at Court",
          desc: "Download your Form 198, pay RM10 at Magistrates' Court, and serve the defendant."
        }
      ]
    },
    testimonials: {
      title: "Real People, Real Results",
      items: [
        {
          name: "Ahmad bin Hassan",
          role: "Freelance DJ, Kuala Lumpur",
          quote: "Venue didn't pay RM3,200 for my gig. MatSelamat helped me file in 10 minutes. Got full payment + RM100 costs.",
          amount: "RM3,200",
          avatar: "A"
        },
        {
          name: "Siti Nurhaliza",
          role: "Small Business Owner, Johor",
          quote: "Client owed me RM4,500 for catering. I couldn't afford a lawyer. This saved me!",
          amount: "RM4,500",
          avatar: "S"
        },
        {
          name: "Raj Kumar",
          role: "Contractor, Penang",
          quote: "Simple, fast, and actually worked. Recovered RM2,800 from a late-paying company.",
          amount: "RM2,800",
          avatar: "R"
        }
      ]
    },
    education: {
      title: "Know Your Rights",
      subtitle: "Understanding Malaysia's Small Claims Procedure",
      cta: "Watch 3-Minute Guide"
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      amount: "RM79",
      period: "one-time payment",
      features: [
        "Court-ready Form 198 in Malay",
        "AI-powered narrative refinement",
        "Intelligent interview assistance",
        "30-day cloud editing access",
        "Step-by-step filing guide",
        "Email support"
      ],
      cta: "Get Started Now",
      guarantee: "14-day money-back guarantee"
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do I need a lawyer?",
          a: "No! Small claims procedure (Order 93) prohibits lawyers. You represent yourself, and we help you prepare the documents."
        },
        {
          q: "What if I lose?",
          a: "You only pay RM79 for the document. If the court rejects your form due to formatting issues, we refund you. Filing fee (RM10) is paid to the court separately."
        },
        {
          q: "How long does the court process take?",
          a: "Typically 3-4 months from filing to judgment, depending on court schedule and whether defendant files a defense."
        },
        {
          q: "Can companies use this?",
          a: "No, only individuals and sole proprietors. Companies cannot file small claims but can be sued as defendants."
        },
        {
          q: "What if defendant doesn't pay after judgment?",
          a: "You can file Form 208 to enforce the judgment through wage garnishment, asset seizure, or imprisonment for contempt."
        }
      ]
    },
    footer: {
      tagline: "Democratizing Access to Justice",
      disclaimer: "MatSelamat.com is a document preparation service, not a law firm. We do not provide legal advice. All documents comply with Order 93 of the Rules of Court 2012.",
      links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
      copyright: "© 2025 MatSelamat.com. All rights reserved."
    }
  },
  ms: {
    hero: {
      title: "Berhutang Wang? Dapatkan Kembali.",
      subtitle: "Failkan kes tuntutan kecil tanpa peguam. Dokumen siap mahkamah dalam 5 minit.",
      cta: "Mulakan Tuntutan - RM79",
      trustBadge: "1,247 tuntutan difailkan, RM6.2J dipulihkan",
      secondaryCta: "Ketahui Cara Ia Berfungsi"
    },
    // ... (rest would be translated similarly)
  },
  zh: {
    hero: {
      title: "欠款未还？立即追回。",
      subtitle: "无需律师，提交小额索赔。5分钟生成法庭文件。",
      cta: "开始索赔 - RM79",
      trustBadge: "已提交1,247份索赔，追回RM6.2百万",
      secondaryCta: "了解运作方式"
    },
    // ... (translation continues)
  }
};

const MatSelamat = () => {
  const [lang, setLang] = useState('en');
  const [currentStep, setCurrentStep] = useState('landing'); // landing, eligibility, claim-builder, payment
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const t = translations[lang] || translations.en;
  
  // Get video URL based on language
  const getVideoUrl = () => {
    return lang === 'ms' ? '/videos/ms-intro-bm.mp4' : '/videos/ms-intro-eng.mp4';
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MatSelamat.com</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">{t.nav.howItWorks}</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">{t.nav.pricing}</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">{t.nav.faq}</a>
            
            <div className="relative">
              <button 
                onClick={() => {/* Language selector */}}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm uppercase">{lang}</span>
              </button>
            </div>
            
            <button 
              onClick={() => setCurrentStep('eligibility')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="h-4 w-4" />
              <span>{t.hero.trustBadge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentStep('eligibility')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>{t.hero.cta}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold text-lg"
              >
                {t.hero.secondaryCta}
              </button>
            </div>
            
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <span>256-bit encryption</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Form 198 Preview</h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Court-Approved</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">DALAM MAHKAMAH MAJISTRET</div>
                  <div className="text-gray-600">No. Kes: [Auto-generated]</div>
                </div>
                
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-gray-500 text-xs mb-1">PLAINTIF</div>
                  <div className="font-semibold">[Your Name]</div>
                </div>
                
                <div className="border-l-4 border-red-600 pl-4">
                  <div className="text-gray-500 text-xs mb-1">DEFENDAN</div>
                  <div className="font-semibold">[Debtor Name]</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-900 font-semibold mb-2">KENYATAAN TUNTUTAN</div>
                  <div className="text-gray-600 text-xs leading-relaxed">
                    AI akan mengubah cerita anda menjadi naratif undang-undang yang sempurna mengikut format Mahkamah...
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                <span>✓ Order 93 compliant</span>
                <span>✓ Fillable PDF format</span>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12">
              RM79 only!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              100% Refund Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Social Proof Ticker
  const SocialProof = () => (
    <section className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span><strong>1,247</strong> claims filed</span>
          </div>
          <div className="h-4 w-px bg-gray-700"></div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span><strong>RM6.2M</strong> recovered</span>
          </div>
          <div className="h-4 w-px bg-gray-700"></div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-yellow-400" />
            <span><strong>87%</strong> success rate</span>
          </div>
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
          <p className="text-xl text-gray-600">{t.features.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Scale, title: t.features.items[0].title, desc: t.features.items[0].desc, color: "blue" },
            { icon: Zap, title: t.features.items[1].title, desc: t.features.items[1].desc, color: "yellow" },
            { icon: Shield, title: t.features.items[2].title, desc: t.features.items[2].desc, color: "green" },
            { icon: Award, title: t.features.items[3].title, desc: t.features.items[3].desc, color: "purple" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1">
              <div className={`inline-flex p-3 rounded-lg bg-${feature.color}-100 mb-4`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Comparison Table
  const ComparisonSection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.comparison.title}</h2>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Success Rate</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hassle</th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.options.map((opt, idx) => (
                <tr key={idx} className={opt.highlight ? "bg-blue-50 border-2 border-blue-600" : "border-b border-gray-200"}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{opt.method}</span>
                      {opt.highlight && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Recommended</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{opt.cost}</td>
                  <td className="px-6 py-4 text-gray-700">{opt.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      opt.success === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {opt.success}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{opt.hassle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  // How It Works
  const ProcessSection = () => (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.process.title}</h2>
          <p className="text-xl text-gray-600">{t.process.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {t.process.steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                  {idx + 1}
                </div>
                {idx < 2 && (
                  <div className="hidden md:block flex-1 h-1 bg-blue-200 mx-4">
                    <div className="h-full bg-blue-600 w-1/2"></div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
              
              {idx === 2 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                  <strong className="text-yellow-800">Note:</strong>
                  <span className="text-gray-700"> You'll need to file 4 printed copies at your nearest Magistrates' Court and pay RM10 filing fee.</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => setCurrentStep('eligibility')}
            className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Free Eligibility Check</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );

  // Educational Section (Innovation Hub)
  const EducationSection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Free Legal Education</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.education.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.education.subtitle}</p>
            
            <div className="space-y-4 mb-8">
              {[
                "What is Order 93 of the Rules of Court 2012?",
                "Who can file a small claims case?",
                "Step-by-step court filing process",
                "What happens after filing?",
                "How to enforce your judgment"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition font-bold inline-flex items-center space-x-2">
              <span>{t.education.cta}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-sm text-gray-600">Available in:</span>
              <div className="flex space-x-2">
                {['EN', 'BM', '中文', 'தமிழ்'].map(l => (
                  <span key={l} className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 border border-gray-200">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ChevronRight className="h-10 w-10 text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">3:24 Video Tutorial</p>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-4">What You'll Learn</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>When to use small claims procedure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>How to gather evidence effectively</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>What to expect at the hearing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Testimonials
  const TestimonialsSection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{t.testimonials.title}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.role}</div>
                </div>
              </div>
              
              <p className="text-gray-700 italic mb-4">"{item.quote}"</p>
              
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold text-lg">{item.amount} recovered</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Pricing Section
  const PricingSection = () => (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">{t.pricing.title}</h2>
        <p className="text-center text-gray-600 mb-12">No hidden fees. No subscriptions. Pay once, use forever.</p>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-600">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
              LIMITED TIME: 40% OFF
            </div>
            <div className="text-6xl font-bold mb-2">{t.pricing.amount}</div>
            <div className="text-blue-100 text-lg">{t.pricing.period}</div>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What's Included</h3>
            
            <div className="space-y-4 mb-8">
              {t.pricing.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentStep('eligibility')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t.pricing.cta}
            </button>
            
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="font-semibold">{t.pricing.guarantee}</span>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">RM10</div>
                  <div className="text-gray-600">Court filing fee (you pay separately)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">5 min</div>
                  <div className="text-gray-600">Total time needed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-gray-600">Money-back if rejected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Lock className="h-8 w-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
            <p className="text-sm text-gray-600">Powered by Stripe. Your data is encrypted and never stored.</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">PDPA Compliant</h4>
            <p className="text-sm text-gray-600">Your personal information is protected under Malaysian law.</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="h-8 w-8 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Court-Approved</h4>
            <p className="text-sm text-gray-600">Follows Order 93 format. Accepted by all Magistrates' Courts.</p>
          </div>
        </div>
      </div>
    </section>
  );

  // FAQ Section
  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    
    return (
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">{t.faq.title}</h2>
          <p className="text-center text-gray-600 mb-12">Everything you need to know about filing small claims in Malaysia</p>
          
          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">{item.q}</span>
                  <ChevronRight className={`h-5 w-5 text-gray-600 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`} />
                </button>
                
                {openIndex === idx && (
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our support team is here to help you navigate the small claims process.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold inline-flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </section>
    );
  };

  // CTA Section
  const CTASection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Your Money Back?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join 1,247 Malaysians who've successfully recovered their debts. It takes just 5 minutes.
        </p>
        
        <button 
          onClick={() => setCurrentStep('eligibility')}
          className="bg-white text-blue-600 px-10 py-5 rounded-lg hover:bg-gray-100 transition font-bold text-lg inline-flex items-center space-x-2 shadow-2xl transform hover:scale-105"
        >
          <span>Start Your Claim Now - RM79</span>
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-blue-100">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>No lawyer needed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>Money-back guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>5-minute process</span>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">MatSelamat.com</span>
            </div>
            <p className="text-sm mb-4">{t.footer.tagline}</p>
            <p className="text-xs leading-relaxed">{t.footer.disclaimer}</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {t.footer.links.map((link, idx) => (
                <li key={idx}><a href="#" className="hover:text-white transition">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // Eligibility Checker Component
  const EligibilityChecker = () => {
    const [answers, setAnswers] = useState({});
    const [currentQ, setCurrentQ] = useState(0);
    
    const questions = [
      {
        q: "Is the debt amount RM5,000 or less?",
        key: "amount",
        type: "boolean",
        required: true
      },
      {
        q: "Are you an individual or sole proprietor (not a company)?",
        key: "individual",
        type: "boolean",
        required: true
      },
      {
        q: "Do you have written evidence (contract, invoice, WhatsApp messages, etc.)?",
        key: "evidence",
        type: "boolean",
        required: true
      },
      {
        q: "Did the incident/breach occur within the last 6 years?",
        key: "timeline",
        type: "boolean",
        required: true
      }
    ];
    
    const handleAnswer = (value) => {
      setAnswers({...answers, [questions[currentQ].key]: value});
      if (currentQ < questions.length - 1) {
        setTimeout(() => setCurrentQ(currentQ + 1), 300);
      }
    };
    
    const isEligible = answers.amount && answers.individual && answers.evidence && answers.timeline;
    const showResult = currentQ === questions.length - 1 && answers.timeline !== undefined;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setCurrentStep('landing')}
            className="mb-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back to home</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!showResult ? (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-600">Question {currentQ + 1} of {questions.length}</span>
                    <span className="text-sm font-semibold text-blue-600">{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{width: `${((currentQ + 1) / questions.length) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-8">{questions[currentQ].q}</h2>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 bg-green-100 text-green-700 border-2 border-green-300 py-4 rounded-lg hover:bg-green-200 transition font-semibold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 bg-red-100 text-red-700 border-2 border-red-300 py-4 rounded-lg hover:bg-red-200 transition font-semibold"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                {isEligible ? (
                  <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">You're Eligible! 🎉</h2>
                    <p className="text-gray-600 mb-8">
                      Based on your answers, you can file a small claims case under Order 93. Let's build your claim now.
                    </p>
                    <button
                      onClick={() => setCurrentStep('claim-builder')}
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg inline-flex items-center space-x-2"
                    >
                      <span>Build My Claim - RM79</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="h-10 w-10 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Not Quite Yet</h2>
                    <p className="text-gray-600 mb-8">
                      Based on your answers, you may not qualify for the small claims procedure. Here are some alternative options:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4 mb-8">
                      <div className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <strong>If your claim is over RM5,000:</strong>
                          <span className="text-gray-600"> Consider filing in Sessions Court (requires a lawyer)</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <strong>If you're a company:</strong>
                          <span className="text-gray-600"> You must engage a lawyer to file claims</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <strong>If you lack evidence:</strong>
                          <span className="text-gray-600"> Gather documentation before filing</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setAnswers({});
                        setCurrentQ(0);
                      }}
                      className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Claim Builder Component (Sophisticated Multi-Step Form)
  const ClaimBuilder = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      claimantName: '',
      claimantIC: '',
      claimantAddress: '',
      claimantPhone: '',
      claimantEmail: '',
      defendantName: '',
      defendantAddress: '',
      claimType: '',
      claimAmount: '',
      claimDescription: '',
      evidenceFiles: []
    });
    const [isRefining, setIsRefining] = useState(false);
    const [showAIInterview, setShowAIInterview] = useState(false);
    
    const totalSteps = 4;
    
    const updateForm = (field, value) => {
      setFormData({...formData, [field]: value});
    };
    
    // AI Magic Wand - Refine narrative
    const refineNarrative = async () => {
      setIsRefining(true);
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const refined = `Pada ${new Date().toLocaleDateString('ms-MY')}, Plaintif dan Defendan telah bersetuju secara lisan dan bertulis (melalui WhatsApp) bahawa Defendan akan membayar sejumlah RM${formData.claimAmount} kepada Plaintif untuk perkhidmatan yang telah diberikan. Defendan telah gagal membayar jumlah tersebut walaupun Plaintif telah menghantar notis peringatan pada ${new Date(Date.now() - 14*24*60*60*1000).toLocaleDateString('ms-MY')}. Plaintif menuntut bayaran penuh berjumlah RM${formData.claimAmount} beserta kos.`;
      
      updateForm('claimDescription', refined);
      setIsRefining(false);
    };
    
    const proceedToPayment = () => {
      setCurrentStep('payment');
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentStep('eligibility')}
            className="mb-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back</span>
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {s}
                    </div>
                    {s < 4 && <div className={`h-1 w-16 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm font-semibold text-gray-600">
                Step {step} of {totalSteps}: {
                  step === 1 ? 'Your Details' :
                  step === 2 ? 'Defendant Details' :
                  step === 3 ? 'Claim Information' :
                  'Review & Refine'
                }
              </div>
            </div>
            
            {/* Step 1: Claimant Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Yourself</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name (as per IC)</label>
                  <input
                    type="text"
                    value={formData.claimantName}
                    onChange={(e) => updateForm('claimantName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Ahmad bin Hassan"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">IC Number</label>
                  <input
                    type="text"
                    value={formData.claimantIC}
                    onChange={(e) => updateForm('claimantIC', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="XXXXXX-XX-XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                  <textarea
                    value={formData.claimantAddress}
                    onChange={(e) => updateForm('claimantAddress', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="No. 123, Jalan Example, Taman Sample, 50000 Kuala Lumpur"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.claimantPhone}
                      onChange={(e) => updateForm('claimantPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="012-345 6789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.claimantEmail}
                      onChange={(e) => updateForm('claimantEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="ahmad@example.com"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Defendant Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Owes You Money?</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Defendant's Full Name/Company Name</label>
                  <input
                    type="text"
                    value={formData.defendantName}
                    onChange={(e) => updateForm('defendantName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Example Sdn Bhd or Individual Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Defendant's Address (for serving notice)</label>
                  <textarea
                    value={formData.defendantAddress}
                    onChange={(e) => updateForm('defendantAddress', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="No. 456, Jalan Defendant, 50000 Kuala Lumpur"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    💡 This must be accurate - the court will send notices to this address
                  </p>
                </div>
              </div>
            )}
            
            {/* Step 3: Claim Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About Your Claim</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Claim</label>
                  <select
                    value={formData.claimType}
                    onChange={(e) => updateForm('claimType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select claim type</option>
                    <option value="debt">Debt (money owed for services/goods)</option>
                    <option value="contract">Breach of Contract</option>
                    <option value="damages">Damages (property, negligence)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Claim Amount (RM)</label>
                  <input
                    type="number"
                    value={formData.claimAmount}
                    onChange={(e) => updateForm('claimAmount', e.target.value)}
                    max="5000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="3000"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Maximum: RM5,000 for small claims procedure
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Describe What Happened</label>
                  <textarea
                    value={formData.claimDescription}
                    onChange={(e) => updateForm('claimDescription', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Example: I performed as a DJ at their venue on 15 March 2025. We agreed on RM3,000 via WhatsApp. The event ended successfully but they haven't paid me despite multiple reminders..."
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Don't worry about perfect grammar - our AI will help you in the next step!
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Evidence (Optional - can add later)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 transition cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">Contracts, invoices, WhatsApp screenshots, emails, etc.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & AI Refinement */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Refine Your Claim</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2">AI-Powered Refinement</h3>
                      <p className="text-blue-800 text-sm mb-4">
                        Our AI will transform your description into formal legal language that follows court requirements. You can also use the interview feature for personalized guidance.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={refineNarrative}
                          disabled={isRefining}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm inline-flex items-center space-x-2 disabled:opacity-50"
                        >
                          {isRefining ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              <span>Refining...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              <span>Magic Wand - Refine Narrative</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => setShowAIInterview(true)}
                          className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold text-sm inline-flex items-center space-x-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>AI Interview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Your Narrative (in Malay - Court Language)</div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 leading-relaxed">
                      {formData.claimDescription || 'No description yet...'}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-gray-600 mb-2">PLAINTIF (You)</div>
                      <div className="text-sm text-gray-900">{formData.claimantName}</div>
                      <div className="text-xs text-gray-600 mt-1">{formData.claimantIC}</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-gray-600 mb-2">DEFENDAN (Debtor)</div>
                      <div className="text-sm text-gray-900">{formData.defendantName}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-green-900">Claim Amount</div>
                        <div className="text-2xl font-bold text-green-700">RM {formData.claimAmount}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-800">+ Court Costs</div>
                        <div className="text-sm text-green-600">(estimated RM50-100)</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-yellow-900">Before you proceed:</strong>
                      <ul className="mt-2 space-y-1 text-yellow-800">
                        <li>• Ensure all information is accurate</li>
                        <li>• Double-check defendant's address (crucial for service)</li>
                        <li>• Make sure you have supporting evidence ready</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold inline-flex items-center space-x-2"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  <span>Previous</span>
                </button>
              )}
              
              <div className="ml-auto">
                {step < totalSteps ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold inline-flex items-center space-x-2"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={proceedToPayment}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg inline-flex items-center space-x-2 shadow-lg"
                  >
                    <Lock className="h-5 w-5" />
                    <span>Proceed to Payment - RM79</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* AI Interview Modal */}
          {showAIInterview && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">AI Interview Assistant</h3>
                  <button
                    onClick={() => setShowAIInterview(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">
                          Hi! I'm here to help you build a stronger claim. Let me ask you a few questions to better understand your situation. First, when exactly did you and the defendant agree on the payment terms?
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                      <div className="text-sm text-gray-900">
                        It was on March 15, 2025 through WhatsApp messages
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <textarea
                    placeholder="Type your response..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Payment Component (Stripe Integration)
  const PaymentPage = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    
    const handlePayment = async () => {
      setIsProcessing(true);
      
      // In production, this would call your backend to create Stripe Checkout session
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimData: {
              /* form data here */
            },
            amount: 7900, // RM79.00 in cents
            currency: 'myr'
          })
        });
        
        const { sessionId } = await response.json();
        
        // Redirect to Stripe Checkout
        // In production: window.location.href = checkoutUrl;
        
        // For demo, simulate success
        setTimeout(() => {
          setCurrentStep('success');
        }, 2000);
      } catch (error) {
        console.error('Payment error:', error);
        setIsProcessing(false);
      }
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentStep('claim-builder')}
            className="mb-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back to claim builder</span>
          </button>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Small Claims Document</span>
                    <span className="font-semibold">RM79.00</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Launch Discount (40%)</span>
                    <span className="font-semibold">-RM32.00</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">RM79.00</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-xs text-gray-600 pt-6 border-t border-gray-200">
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Court-ready Form 198 in Malay</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>AI-refined legal narrative</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>30-day cloud editing access</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Step-by-step filing guide</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-green-50 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-700 text-sm">
                    <Shield className="h-4 w-4" />
                    <span className="font-semibold">14-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Secure Payment</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Card', icon: '💳' },
                      { id: 'fpx', label: 'FPX', icon: '🏦' },
                      { id: 'ewallet', label: 'E-Wallet', icon: '📱' }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg transition ${
                          paymentMethod === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-sm font-semibold text-gray-700">{method.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                
                {/* Security Badges */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Stripe Secure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>PCI Compliant</span>
                    </div>
                  </div>
                </div>
                
                {/* Terms Agreement */}
                <div className="mb-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and understand that this is a document preparation service, not legal advice. I confirm all information provided is accurate.
                    </span>
                  </label>
                </div>
                
                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Pay RM79.00 Now</span>
                    </>
                  )}
                </button>
                
                <p className="mt-4 text-center text-xs text-gray-600">
                  Your payment is secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success Page (Post-Payment)
  const SuccessPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Form 198 is ready. We've also sent a copy to your email.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-bold inline-flex items-center justify-center space-x-2 shadow-lg">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-bold inline-flex items-center justify-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Download DOCX</span>
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left mb-8">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Next Steps - How to File</span>
              </h3>
              
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <strong>Print 4 copies</strong> of your Form 198 (original + 3 photocopies)
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <strong>Go to your nearest Magistrates' Court</strong> (based on where defendant resides or where contract was made)
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <strong>Pay RM10 filing fee</strong> at the court counter (bring cash)
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <strong>Court will serve notice</strong> to the defendant (usually within 14 days)
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <div>
                    <strong>Attend hearing</strong> when scheduled (court will notify you by mail)
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Need Help Filing?</span>
                </h4>
                <p className="text-sm text-purple-800 mb-3">
                  Watch our detailed video guide on the filing process
                </p>
                <button className="text-purple-600 font-semibold text-sm hover:underline">
                  Watch Guide →
                </button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-900 mb-2 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Questions?</span>
                </h4>
                <p className="text-sm text-yellow-800 mb-3">
                  Our support team is here to help you
                </p>
                <button className="text-yellow-600 font-semibold text-sm hover:underline">
                  Contact Support →
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Help others get justice too!</p>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold inline-flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Refer a Friend - Get RM20 Credit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Render Logic
  return (
    <div className="min-h-screen">
      {currentStep === 'landing' && (
        <>
          <Navigation />
          <HeroSection />
          <SocialProof />
          <FeaturesSection />
          <ComparisonSection />
          <ProcessSection />
          <EducationSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </>
      )}
      
      {currentStep === 'eligibility' && <EligibilityChecker />}
      {currentStep === 'claim-builder' && <ClaimBuilder />}
      {currentStep === 'payment' && <PaymentPage />}
      {currentStep === 'success' && <SuccessPage />}
    </div>
  );
};

// Missing import
import { Upload } from 'lucide-react';

export default MatSelamat;