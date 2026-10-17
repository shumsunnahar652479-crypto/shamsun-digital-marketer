import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, Sparkles, Phone, Mail, Copy, Check, Edit3 } from 'lucide-react';

interface HeroProps {
  onOpenCvModal: () => void;
  lang: 'en' | 'bn';
}

export default function Hero({ onOpenCvModal, lang }: HeroProps) {
  const { data, setIsAdminOpen } = usePortfolio();
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);
  const [activePhoto, setActivePhoto] = useState<'purple' | 'corporate'>('purple');

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const currentPortrait = activePhoto === 'purple' 
    ? (data.personal.portraitImage || '/src/assets/images/shamsun_purple_portrait_1792125845025.jpg')
    : (data.personal.corporateImage || '/src/assets/images/shamsun_portrait_pro_1792121184000.jpg');

  return (
    <section className="relative pt-6 pb-14 md:pt-10 md:pb-20 bg-[#0a0a0e] text-white overflow-hidden border-b border-[#1c1c27]">
      
      {/* Ambient Violet Neon Radial Glow in Background */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          
          {/* Left Column: Massive Title & Slogan */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Massive Condensed Headline with Overlaid Script 'Portfolio' */}
            <div className="relative mb-6 select-none">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-bebas font-extrabold uppercase tracking-tight text-white leading-[0.88] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <span className="block text-slate-100">DIGITAL</span>
                <span className="block text-slate-200">MARKETER</span>
              </h1>

              {/* Overlaid Elegant Cursive Script matching reference "Portfolio" in lavender */}
              <div className="absolute left-10 sm:left-24 bottom-[-18px] sm:bottom-[-26px] z-20 pointer-events-none">
                <span className="font-script text-4xl sm:text-5xl md:text-6xl text-purple-400 font-bold drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
                  Portfolio
                </span>
              </div>
            </div>

            {/* Slogan and Code-Style Tagline directly below */}
            <div className="mt-4 sm:mt-6 max-w-xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-purple-200/90 leading-relaxed mb-3">
                {lang === 'en'
                  ? data.personal.tagline
                  : 'আমি এমন ডিজিটাল মার্কেটিং ক্যাম্পেইন ডিজাইন ও স্কেল করি যা সেলস ও ব্যবসার ধারাবাহিক প্রবৃদ্ধি নিশ্চিত করে।'}
              </p>

              <div className="font-mono text-2xs sm:text-xs text-purple-400 tracking-widest uppercase mb-6 flex items-center gap-2">
                <span>{data.personal.codeSlogan}</span>
                <Sparkles className="w-3 h-3 text-purple-400 inline" />
              </div>

              {/* Dynamic Core Specializations List */}
              <div className="p-3.5 rounded-xl bg-[#13131c] border border-purple-500/20 mb-8 max-w-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xs font-mono uppercase text-purple-300 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Core Expertise & Focus:</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(true)}
                    className="text-3xs font-mono text-purple-400 hover:text-white flex items-center gap-1"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit in CMS</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 text-2xs text-slate-300">
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">FB Marketplace Listing</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">Facebook Ads & Boosting</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">FB Group Marketing</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">Google Ads & GA4</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">Email Marketing</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">Lead Generation</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">Data Entry</span>
                  <span className="bg-[#1b1b28] px-2 py-0.5 rounded text-purple-200 border border-purple-500/10">AI Video Ads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
                >
                  <span>{lang === 'en' ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenCvModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-[#14141d] hover:bg-[#1a1a26] border border-[#262638] rounded-xl transition-colors"
                >
                  <span>{lang === 'en' ? 'View Resume / CV' : 'সিভি দেখুন'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Portrait Card with Ambient Purple Rim Light & Rotating Stamp Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              
              {/* Top Right "AVAILABLE FOR PROJECTS" Pill with Pulsing Purple Dot */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121b]/90 backdrop-blur-md border border-purple-500/30 text-2xs font-semibold text-purple-200 tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
                <span>AVAILABLE FOR PROJECTS</span>
              </div>

              {/* Portrait Frame with Soft Arched Top & Violet Rim Glow */}
              <div className="relative rounded-[28px] overflow-hidden border border-purple-500/30 bg-[#12121b] shadow-[0_10px_40px_rgba(168,85,247,0.2)] group">
                <img
                  src={currentPortrait}
                  alt={data.personal.name}
                  className="w-full h-[460px] sm:h-[490px] object-cover object-top transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Gradient Scrim at Bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/70 to-transparent pointer-events-none" />

                {/* Name & Credentials Card at Bottom of Portrait */}
                <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-[#14141f]/90 backdrop-blur-md border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">
                        {data.personal.name}
                      </h2>
                      <p className="text-2xs font-mono text-purple-400">
                        {data.personal.displayTitle} · E-learning & Earning Ltd.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActivePhoto(activePhoto === 'purple' ? 'corporate' : 'purple')}
                        className="text-3xs font-mono text-purple-300 bg-purple-950/80 px-2 py-1 rounded border border-purple-500/30 hover:bg-purple-900 transition-colors"
                        title="Toggle Photo Style"
                      >
                        {activePhoto === 'purple' ? 'Photo 2' : 'Photo 1'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsAdminOpen(true)}
                        className="p-1 rounded bg-[#252538] text-purple-300 hover:text-white"
                        title="Upload New Photo in CMS"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating Circular Emblem Badge (Exact replica of the circular badge in reference image) */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-30 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#111119] border border-purple-500/40 p-1 shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center justify-center">
                
                {/* SVG Rotating Text Ring */}
                <svg
                  className="w-full h-full animate-[spin_16s_linear_infinite]"
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <path
                      id="circleTextPath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                    />
                  </defs>
                  <text className="text-[10.5px] fill-purple-300 font-mono font-bold tracking-[2.2px] uppercase">
                    <textPath href="#circleTextPath" startOffset="0%">
                      ✦ DIGITAL MARKETER ✦ ROI ✦ ADS ✦ GROWTH ✦
                    </textPath>
                  </text>
                </svg>

                {/* Center Monogram */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-950/80 border border-purple-500/50 flex flex-col items-center justify-center text-white">
                  <span className="font-bebas text-lg tracking-wider text-purple-200">SS</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4-Column Stats Row Directly Below Hero (Synced with Context State) */}
        <div className="mt-14 pt-8 border-t border-[#1c1c27]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#111118] border border-[#1d1d2b] hover:border-purple-500/30 transition-colors relative group">
                <div className="font-bebas text-4xl sm:text-5xl text-white tracking-wider">
                  {stat.value}
                </div>
                <div className="text-2xs sm:text-xs font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                  {stat.label}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="absolute top-2 right-2 p-1 text-slate-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Edit Stat in CMS"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
