import { useState, useEffect } from 'react';
import { usePortfolio, OperationType, handleFirestoreError } from '../context/PortfolioContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  ArrowUp, 
  Share2,
  Edit3
} from 'lucide-react';

interface ContactFooterProps {
  prefilledService?: string;
  prefilledBudgetSummary?: string;
  onOpenCvModal: () => void;
  lang: 'en' | 'bn';
}

export default function ContactFooter({ 
  prefilledService, 
  prefilledBudgetSummary, 
  onOpenCvModal,
  lang 
}: ContactFooterProps) {
  const { data, setIsAdminOpen } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Facebook Ads & Boosting',
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
          ? `${prev.message}\n\n[Budget Plan: ${prefilledBudgetSummary}]`
          : `Hello Shamsun, I would like to consult about: ${prefilledBudgetSummary}`
      }));
    }
  }, [prefilledBudgetSummary]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Save inquiry to Firebase Firestore
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        service: formData.service,
        budget: formData.budget,
        message: formData.message || 'Direct Consultation Inquiry',
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Inquiry Firestore note:', error);
    }

    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${data.personal.email}?subject=${subject}&body=${body}`;
  };

  const rawPhone = data.personal.phone.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('880') ? rawPhone : `880${rawPhone.replace(/^0+/, '')}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${data.personal.name}, I reviewed your digital marketing portfolio and would like to consult with you.`
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPortrait = data.personal.portraitImage || '/src/assets/images/shamsun_purple_portrait_1792125845025.jpg';

  return (
    <footer id="contact" className="bg-[#08080c] text-white pt-16 pb-12 border-t border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split: Inquiry Form and WhatsApp Fast-Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 pb-16 border-b border-[#1c1c28]">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wider uppercase text-white leading-none">
              READY TO SCALE<br />
              <span className="text-purple-400">YOUR BUSINESS?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {lang === 'en'
                ? "Whether you need Facebook Marketplace product listings, high-ROAS Meta Ads, Google Ads setup, or viral AI promo video commercials, let's discuss your project."
                : "ফেসবুক মার্কেটপ্লেস লিস্টিং, মেটা অ্যাডস, গুগল অ্যাডস রান অথবা এআই ভিডিও বিজ্ঞাপনের জন্য আজই আলোচনা করুন।"}
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="p-5 rounded-2xl bg-[#12121c] border border-purple-500/20 space-y-4">
              <div className="flex items-center gap-2 text-2xs font-mono uppercase text-purple-400 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Consultation</span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-2xs font-mono text-slate-400 pt-1">
                <span>Direct: {data.personal.phone}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(data.personal.phone, 'phone-fast')}
                  className="text-purple-400 hover:text-white"
                >
                  {copiedKey === 'phone-fast' ? 'Copied!' : 'Copy Phone'}
                </button>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#12121b] border border-[#1e1e2d] shadow-xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
              Send a Project Message
            </h3>
            <p className="text-2xs font-mono text-slate-400 mb-6">
              REPLY GUARANTEED WITHIN 4 HOURS
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-purple-400 mx-auto" />
                <h4 className="text-sm font-bold text-white uppercase">Inquiry Prepared!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, {formData.name}. Your email client was opened. You can also message directly on WhatsApp for faster execution.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / করিম আহমেদ"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181825] border border-[#2a2a3c] text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181825] border border-[#2a2a3c] text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181825] border border-[#2a2a3c] text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181825] border border-[#2a2a3c] text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Facebook Marketplace Product Listing">Facebook Marketplace Product Listing</option>
                      <option value="Facebook Ads & Boosting">Facebook Ads & Boosting</option>
                      <option value="Facebook Group Marketing">Facebook Group Marketing</option>
                      <option value="Google Ads & GA4 Analytics">Google Ads & GA4 Analytics</option>
                      <option value="Email Marketing & Leads Generation">Email Marketing & Leads Gen</option>
                      <option value="Data Entry & Excel Management">Data Entry & Excel Management</option>
                      <option value="AI Promotional Video Ads">AI Promotional Video Ads</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Message & Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Tell me about your product, current marketing challenges, or goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181825] border border-[#2a2a3c] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Campaign Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* BOTTOM EXACT REPLICA OF THE REFERENCE IMAGE:
            Left: CONTACT Info
            Center: Arched Portrait Cutout with purple glow
            Right: LET'S CONNECT and code slogan
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 pb-10">
          
          {/* Left: CONTACT */}
          <div className="md:col-span-4 space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bebas text-2xl tracking-wider uppercase text-white mb-2">
                CONTACT
              </h3>
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="text-3xs font-mono text-purple-400 hover:text-white flex items-center gap-1"
                title="Edit Contact in CMS"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-[#151520] border border-[#222232] flex items-center justify-center text-purple-400 shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href={`mailto:${data.personal.email}`} className="hover:text-purple-300 truncate">
                {data.personal.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-[#151520] border border-[#222232] flex items-center justify-center text-purple-400 shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a href={`tel:${data.personal.phone}`} className="hover:text-purple-300 font-mono">
                {data.personal.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-[#151520] border border-[#222232] flex items-center justify-center text-purple-400 shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-slate-400">shamsun-portfolio.com</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-[#151520] border border-[#222232] flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span>{data.personal.location}</span>
            </div>
          </div>

          {/* Center: Arched Portrait Cut-out (Exact Match to Reference Image) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center py-4">
            <div className="relative group">
              {/* Arched Top Frame */}
              <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-purple-500/50 bg-[#12121d] shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <img
                  src={currentPortrait}
                  alt={data.personal.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sparkle Accent */}
              <div className="absolute -top-2 -right-2 text-purple-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>

              {/* Quick Change Photo in CMS */}
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Change Photo in CMS"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center mt-3">
              <div className="text-xs font-bold text-white tracking-wider">
                {data.personal.name}
              </div>
              <div className="text-3xs font-mono text-purple-400 uppercase tracking-widest mt-0.5">
                {data.personal.displayTitle}
              </div>
            </div>
          </div>

          {/* Right: LET'S CONNECT and Slogan */}
          <div className="md:col-span-4 space-y-4 md:text-right">
            <h3 className="font-bebas text-2xl tracking-wider uppercase text-white mb-2">
              LET'S CONNECT
            </h3>

            {/* Social Icon Buttons */}
            <div className="flex items-center md:justify-end gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141420] border border-[#242436] hover:border-purple-500 hover:bg-purple-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </a>

              <a
                href={`mailto:${data.personal.email}`}
                className="w-9 h-9 rounded-xl bg-[#141420] border border-[#242436] hover:border-purple-500 hover:bg-purple-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4 text-purple-400" />
              </a>

              <button
                type="button"
                onClick={onOpenCvModal}
                className="w-9 h-9 rounded-xl bg-[#141420] border border-[#242436] hover:border-purple-500 hover:bg-purple-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                title="View CV"
              >
                <Share2 className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Exact Code Slogan matching reference image */}
            <div className="pt-2 font-mono text-2xs text-purple-400 tracking-wider">
              <div>&lt;/ STRATEGY IS MY CRAFT</div>
              <div>ROI IS MY VOICE /&gt;</div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-3xs font-mono uppercase text-slate-500 hover:text-slate-300 transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#141420] flex flex-col sm:flex-row items-center justify-between gap-2 text-3xs font-mono text-slate-500">
          <span>© {new Date().getFullYear()} {data.personal.name}. All Rights Reserved.</span>
          <span>E-learning & Earning Ltd. Certified · National University (3rd Yr)</span>
        </div>

      </div>
    </footer>
  );
}
