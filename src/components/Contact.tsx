import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';

interface ContactProps {
  prefilledService?: string;
  prefilledBudgetSummary?: string;
  lang: 'en' | 'bn';
}

export default function Contact({ prefilledService, prefilledBudgetSummary, lang }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Facebook & Instagram Ads',
    budget: '$500 - $1,500',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledBudgetSummary) {
      setFormData(prev => ({
        ...prev,
        message: prev.message 
          ? `${prev.message}\n\n[Auto-Calculated Budget Plan: ${prefilledBudgetSummary}]`
          : `Hello Shamsun, I would like to discuss a campaign plan for my business.\n\n[Growth Forecaster: ${prefilledBudgetSummary}]`
      }));
    }
  }, [prefilledBudgetSummary]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prepare mailto link to open client's default email client as backup
    const subject = encodeURIComponent(`Growth Inquiry from ${formData.name}: ${formData.service}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  const whatsappUrl = `https://wa.me/8801326821781?text=${encodeURIComponent(
    "Hello Shamsun, I reviewed your digital marketing portfolio and would like to consult with you about scaling my business."
  )}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'Start Growing Today' : 'যোগাযোগ ও কনসাল্টেশন'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {lang === 'en' 
              ? 'Ready to Scale Your Ad Performance & Customer Acquisition?' 
              : 'আপনার ব্যবসার সেলস ও ব্র্যান্ড ভ্যালু বাড়াতে প্রস্তুত?'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {lang === 'en'
              ? 'Reach out directly via WhatsApp, phone, or email to schedule a 30-minute campaign audit and custom growth proposal.'
              : 'সরাসরি হোয়াটসঅ্যাপ, কল বা ইমেইল পাঠিয়ে ফ্রি অডিট ও মার্কেটিং প্ল্যান বুঝে নিন।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xs text-slate-400 font-medium">Direct Phone & WhatsApp</div>
                      <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="font-bold text-slate-900 hover:text-blue-600 font-mono">
                        {PORTFOLIO_DATA.personal.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PORTFOLIO_DATA.personal.phone, 'phone')}
                    className="p-2 text-slate-400 hover:text-slate-800"
                    title="Copy phone"
                  >
                    {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xs text-slate-400 font-medium">Primary Business Email</div>
                      <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="font-bold text-slate-900 hover:text-blue-600 truncate block max-w-[190px] sm:max-w-xs">
                        {PORTFOLIO_DATA.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                    className="p-2 text-slate-400 hover:text-slate-800"
                    title="Copy email"
                  >
                    {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Instant WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Chat Directly on WhatsApp' : 'সরাসরি হোয়াটসঅ্যাপে কথা বলুন'}</span>
                </a>
              </div>
            </div>

            {/* Address & Verified Location Details from CV */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Office & Presence</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800 block">Present Address:</span>
                  <p>{PORTFOLIO_DATA.personal.location}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">Permanent Address:</span>
                  <p>{PORTFOLIO_DATA.personal.permanentLocation}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-2xs text-slate-400">
                  Serving clients in Bangladesh, USA, UK, UAE, and worldwide via remote campaign setup.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {lang === 'en' ? 'Send a Project Inquiry' : 'ক্যাম্পেইন অনুসন্ধানের বিবরণ দিন'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'en'
                ? 'Fill out the details below and Shamsun will respond within 4 business hours with an action plan.'
                : 'আপনার প্রয়োজনীয় তথ্য পূরণ করুন, দ্রুততম সময়ের মধ্যে রিপ্লাই দেওয়া হবে।'}
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. Shamsun has received your request and will review your campaign objectives. You can also message directly on WhatsApp for faster response.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / করিম আহমেদ"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Facebook & Instagram Ads">Facebook & Instagram Ads</option>
                      <option value="Google Ads & GA4 Tracking">Google Ads & GA4 Tracking</option>
                      <option value="AI Video Ads & Viral Clips">AI Video Ads & Content</option>
                      <option value="Lead Generation & Email Marketing">Lead Gen & Email Marketing</option>
                      <option value="Local SEO & Google Business Profile">Local SEO & Google Business</option>
                      <option value="Landing Page & Web Design">Landing Page & Web Design</option>
                      <option value="Complete Growth Strategy">Complete Multi-Channel Growth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Monthly Ad Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="$200 - $500 / ৳20k - ৳50k">$200 - $500 / ৳20k - ৳50k</option>
                    <option value="$500 - $1,500 / ৳50k - ৳150k">$500 - $1,500 / ৳50k - ৳150k</option>
                    <option value="$1,500 - $3,500 / ৳150k - ৳350k">$1,500 - $3,500 / ৳150k - ৳350k</option>
                    <option value="$3,500+ / ৳350k+">$3,500+ / ৳350k+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Campaign Objectives & Current Challenges
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current marketing goals, website URL, or target audience..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Submit Inquiry & Request Proposal' : 'ইনকোয়ারি ও প্রপোজাল রিকোয়েস্ট পাঠান'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
