import { usePortfolio } from '../context/PortfolioContext';
import { 
  Share2, 
  ShoppingBag, 
  Search, 
  BarChart3, 
  Video, 
  Target, 
  Mail, 
  Database, 
  FileSpreadsheet, 
  MapPin, 
  Palette, 
  Film,
  Sparkles,
  ArrowUpRight,
  Plus,
  Trash2
} from 'lucide-react';

interface ToolkitProcessCtaProps {
  onOpenContact: () => void;
  lang: 'en' | 'bn';
}

export default function ToolkitProcessCta({ onOpenContact, lang }: ToolkitProcessCtaProps) {
  const { data, setIsAdminOpen, deleteTool } = usePortfolio();

  const iconMap: Record<string, any> = {
    Share2,
    ShoppingBag,
    Search,
    BarChart3,
    Video,
    Target,
    Mail,
    Database,
    FileSpreadsheet,
    MapPin,
    Palette,
    Film
  };

  return (
    <section id="toolkit" className="py-16 md:py-24 bg-[#0a0a0e] text-white border-b border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Grid Matching Reference Image Exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: MY TOOLKIT (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#12121b] border border-[#1e1e2d] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bebas text-2xl sm:text-3xl tracking-wider text-white uppercase">
                  MY TOOLKIT
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="text-3xs font-mono text-purple-400 hover:text-white uppercase flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Manage</span>
                </button>
              </div>

              {/* Grid of Tools with Icons & Clean Subtitles */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {data.toolkit.map((item, idx) => {
                  const Icon = iconMap[item.icon] || Share2;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#171723] border border-[#232334] hover:border-purple-500/40 hover:bg-[#1b1b2a] transition-all flex flex-col items-center justify-center text-center group relative"
                    >
                      {/* Delete Tool Shortcut */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTool(idx);
                        }}
                        className="absolute top-1 right-1 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                        title="Delete tool"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>

                      <div className="w-8 h-8 rounded-lg bg-[#202030] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-2xs font-bold text-slate-200 tracking-tight leading-tight line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-3xs font-mono text-slate-500 uppercase mt-0.5">
                        {item.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1c1c2b] text-2xs font-mono text-slate-400 flex items-center justify-between">
              <span>PLATFORMS & STACK</span>
              <span className="text-purple-400">{data.toolkit.length} ACTIVE TOOLS</span>
            </div>
          </div>

          {/* Column 2: WORK PROCESS (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#12121b] border border-[#1e1e2d] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bebas text-2xl sm:text-3xl tracking-wider text-white uppercase">
                  WORK PROCESS
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="text-3xs font-mono text-purple-400 hover:text-white uppercase flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Vertical Stepper with Circular Badges & Dotted Line */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-purple-500 before:via-purple-500/50 before:to-purple-900">
                {data.workProcess.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Pin */}
                    <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-[#12121b] border-2 border-purple-500 text-purple-300 text-3xs font-mono font-bold flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                      {step.step}
                    </div>

                    <div className="text-xs font-bold tracking-wider uppercase text-white mb-1">
                      {step.title}
                    </div>
                    <p className="text-2xs sm:text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1c1c2b] text-2xs font-mono text-slate-400">
              <span>AGILE EXECUTION · RAPID RESULTS</span>
            </div>
          </div>

          {/* Column 3: VIBRANT PURPLE CTA CARD (lg:col-span-4) */}
          <div className="lg:col-span-4 p-7 rounded-2xl bg-gradient-to-br from-[#c084fc] via-[#a855f7] to-[#7e22ce] text-slate-950 flex flex-col justify-between shadow-[0_0_35px_rgba(168,85,247,0.35)] relative overflow-hidden">
            
            {/* Background Glow Accents */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="font-bebas text-4xl sm:text-5xl text-slate-950 tracking-wider uppercase leading-[0.95] mb-4">
                LET'S BUILD<br />
                SOMETHING<br />
                AMAZING<br />
                TOGETHER. <Sparkles className="w-6 h-6 inline text-slate-900" />
              </h3>

              <p className="text-xs sm:text-sm font-medium text-purple-950/90 leading-relaxed max-w-xs mb-8">
                {lang === 'en'
                  ? "I'm open to new opportunities, freelance campaigns, and exciting business collaborations."
                  : "নতুন প্রজেক্ট, ফেসবুক মার্কেটপ্লেস সেলস স্কেলিং ও পেইড অ্যাডস রান করার জন্য আমি উন্মুক্ত।"}
              </p>
            </div>

            {/* Inverted Dark CTA Button matching reference */}
            <div>
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-between py-3.5 px-6 rounded-xl bg-[#0f0f16] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-2xl group"
              >
                <span>GET IN TOUCH</span>
                <div className="w-7 h-7 rounded-full bg-purple-600/80 flex items-center justify-center text-white group-hover:bg-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>

              <div className="mt-3 text-center text-3xs font-mono text-purple-950/80 uppercase tracking-widest">
                FAST RESPONSE WITHIN 4 HOURS
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
