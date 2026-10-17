import { useState, useId } from 'react';
import { Calculator, ArrowRight, Check, TrendingUp, Users, Target } from 'lucide-react';

interface RoiCalculatorProps {
  onSelectBudget: (summary: string) => void;
  lang: 'en' | 'bn';
}

export default function RoiCalculator({ onSelectBudget, lang }: RoiCalculatorProps) {
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const [budgetIndex, setBudgetIndex] = useState<number>(2);
  const [niche, setNiche] = useState<'marketplace' | 'ecommerce' | 'local' | 'b2b'>('marketplace');
  const [platform, setPlatform] = useState<'meta' | 'google' | 'hybrid'>('hybrid');
  const budgetInputId = useId();

  const usdBudgets = [200, 350, 500, 800, 1200, 2000, 3500];
  const bdtBudgets = [20000, 35000, 50000, 80000, 120000, 200000, 350000];

  const currentBudget = currency === 'USD' ? usdBudgets[budgetIndex] : bdtBudgets[budgetIndex];
  const formattedBudget = currency === 'USD' 
    ? `$${currentBudget.toLocaleString()}` 
    : `৳${currentBudget.toLocaleString()}`;

  const industryFactors = {
    marketplace: { cpc: currency === 'USD' ? 0.22 : 22, convRate: 0.052, roas: '5.5x - 7.8x', leadType: 'Marketplace Inquiries & Orders' },
    ecommerce: { cpc: currency === 'USD' ? 0.28 : 28, convRate: 0.038, roas: '4.8x - 6.5x', leadType: 'Online Store Purchases' },
    local: { cpc: currency === 'USD' ? 0.40 : 42, convRate: 0.070, roas: '5.0x - 7.0x', leadType: 'Calls & Direct Messages' },
    b2b: { cpc: currency === 'USD' ? 0.55 : 55, convRate: 0.042, roas: '6.0x - 9.0x', leadType: 'Verified B2B Leads' }
  };

  const factor = industryFactors[niche];
  const estimatedClicks = Math.round(currentBudget / factor.cpc);
  const estimatedImpressions = Math.round(estimatedClicks * (platform === 'meta' ? 48 : 34));
  const estimatedLeads = Math.round(estimatedClicks * factor.convRate);

  const handleApplyStrategy = () => {
    const summaryText = `Budget: ${formattedBudget}/mo | Niche: ${niche.toUpperCase()} | Channel: ${platform.toUpperCase()}`;
    onSelectBudget(summaryText);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#0a0a0e] text-white border-b border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-2xs font-mono uppercase tracking-widest text-purple-400 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'CAMPAIGN GROWTH FORECASTER' : 'ক্যাম্পেইন গ্রোথ ফোরকাস্টার'}</span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white uppercase leading-none">
            CALCULATE PROJECTED REACH, LEADS & ROAS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            {lang === 'en'
              ? 'Forecast your campaign returns across Facebook Marketplace listings, Meta Ads, and Google Ads before launching.'
              : 'ফেসবুক মার্কেটপ্লেস, মেটা অ্যাডস ও গুগল অ্যাডসের বাজেট অনুযায়ী সম্ভাব্য সেলস ও লিড রেজাল্ট হিসাব করুন।'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#12121b] border border-[#1e1e2d]">
            
            {/* Currency */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1c1c2b]">
              <span className="text-2xs font-mono uppercase text-slate-400">
                Currency:
              </span>
              <div className="flex items-center gap-1 bg-[#191926] p-1 rounded-lg border border-[#262638]">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 text-2xs font-bold rounded-md transition-colors ${
                    currency === 'USD' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('BDT')}
                  className={`px-3 py-1 text-2xs font-bold rounded-md transition-colors ${
                    currency === 'BDT' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  BDT (৳)
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={budgetInputId} className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Monthly Ad / Promotion Budget
                </label>
                <span className="text-xl font-bebas tracking-wider text-purple-400">
                  {formattedBudget}
                </span>
              </div>
              <input
                id={budgetInputId}
                type="range"
                min={0}
                max={currency === 'USD' ? usdBudgets.length - 1 : bdtBudgets.length - 1}
                step={1}
                value={budgetIndex}
                onChange={(e) => setBudgetIndex(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#1f1f2e] rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-3xs text-slate-500 mt-2 font-mono">
                <span>{currency === 'USD' ? '$200' : '৳20,000'}</span>
                <span>{currency === 'USD' ? '$1,200' : '৳120,000'}</span>
                <span>{currency === 'USD' ? '$3,500+' : '৳350,000+'}</span>
              </div>
            </div>

            {/* Niche */}
            <div className="mb-6">
              <label className="block text-2xs font-mono uppercase text-slate-400 mb-2">
                Business Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'marketplace', label: 'FB Marketplace Retail' },
                  { id: 'ecommerce', label: 'E-Commerce Website' },
                  { id: 'local', label: 'Local Store / Service' },
                  { id: 'b2b', label: 'B2B & Leads' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNiche(item.id as any)}
                    className={`p-3 text-left rounded-xl border text-2xs font-bold uppercase tracking-wider transition-all ${
                      niche === item.id 
                        ? 'border-purple-500 bg-purple-950/40 text-purple-200 shadow-sm' 
                        : 'border-[#222233] bg-[#161622] text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-2xs font-mono uppercase text-slate-400 mb-2">
                Marketing Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'meta', label: 'Meta & FB' },
                  { id: 'google', label: 'Google Ads' },
                  { id: 'hybrid', label: 'Omni Growth' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatform(item.id as any)}
                    className={`py-2 px-3 text-center rounded-xl border text-2xs font-bold uppercase tracking-wider transition-all ${
                      platform === item.id 
                        ? 'border-purple-500 bg-purple-600 text-white' 
                        : 'border-[#222233] bg-[#161622] text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Forecast Output Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#141420] border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#222235]">
              <div>
                <span className="text-3xs font-mono uppercase tracking-widest text-purple-400">
                  PROJECTED MONTHLY OUTCOME
                </span>
                <h3 className="font-bebas text-2xl text-white tracking-wider mt-0.5">
                  {formattedBudget} / MONTH FORECAST
                </h3>
              </div>
              <div className="px-3 py-1 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/40 text-2xs font-mono">
                {factor.roas}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3.5 rounded-xl bg-[#1b1b2a] border border-[#28283c]">
                <div className="flex items-center gap-1.5 text-slate-400 text-3xs uppercase font-mono mb-1">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span>Est. Impressions</span>
                </div>
                <div className="text-xl sm:text-2xl font-bebas tracking-wider text-white">
                  {estimatedImpressions.toLocaleString()}+
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1b1b2a] border border-[#28283c]">
                <div className="flex items-center gap-1.5 text-slate-400 text-3xs uppercase font-mono mb-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>Est. High-Intent Clicks</span>
                </div>
                <div className="text-xl sm:text-2xl font-bebas tracking-wider text-white">
                  {estimatedClicks.toLocaleString()}
                </div>
              </div>

              <div className="col-span-2 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <div className="flex items-center justify-between text-2xs font-mono text-purple-300 mb-1">
                  <span>PROJECTED {factor.leadType.toUpperCase()}</span>
                  <span>Conversion ~{(factor.convRate * 100).toFixed(1)}%</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bebas tracking-wider text-purple-200">
                  {Math.max(1, Math.round(estimatedLeads * 0.85))} – {Math.round(estimatedLeads * 1.25)} {factor.leadType}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-2xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Facebook Marketplace keyword ranking & product description optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>AI promo video commercials & Meta ad boosting for instant visibility</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Transparent GA4 tracking & daily/weekly performance spreadsheets</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyStrategy}
              className="w-full py-3 px-5 text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
            >
              <span>Apply This Strategy with Shamsun</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
