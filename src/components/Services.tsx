import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  Megaphone, 
  ShoppingBag, 
  Search, 
  MailCheck, 
  Database, 
  Video,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import { ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
  lang: 'en' | 'bn';
}

export default function Services({ onSelectService, lang }: ServicesProps) {
  const { data, setIsAdminOpen, deleteService } = usePortfolio();
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, any> = {
    Megaphone,
    ShoppingBag,
    Search,
    MailCheck,
    Database,
    Video
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0a0a0e] text-white border-b border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout matching reference: Left column with WHAT I DO ✦ and subtext, Right with cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-3">
            <div className="sticky top-28">
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-4">
                WHAT<br />
                <span className="text-purple-400 flex items-center gap-2">
                  I DO <Sparkles className="w-5 h-5 text-purple-400" />
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {lang === 'en'
                  ? 'I design, build, and scale high-converting marketing campaigns, Facebook marketplace sales, and AI video promotions that drive predictable business growth.'
                  : 'আমি ফেসবুক মার্কেটপ্লেস লিস্টিং, অ্যাড ক্যাম্পেইন, গুগল অ্যাডস ও এআই ভিডিও প্রমোশন দিয়ে ব্যবসার সেলস ও ব্র্যান্ড গ্রোথ নিশ্চিত করি।'}
              </p>

              {/* CMS Quick Trigger */}
              <div className="p-4 rounded-xl bg-[#111119] border border-purple-500/20 text-2xs text-purple-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono uppercase font-bold text-white">Full CMS Control</span>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(true)}
                    className="text-purple-400 hover:text-white font-mono flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Manage</span>
                  </button>
                </div>
                <p className="text-slate-400 text-3xs">
                  You can edit names, descriptions, or add/delete any service anytime in the Admin CMS.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Services Cards Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.services.map((service, idx) => {
                const IconComponent = iconMap[service.icon] || Megaphone;
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-6 rounded-2xl bg-[#12121b] border border-[#1e1e2d] hover:border-purple-500/50 hover:bg-[#151522] transition-all group cursor-pointer relative"
                    onClick={() => {
                      onSelectService(service.title);
                      setSelectedServiceModal(service);
                    }}
                  >
                    {/* Delete / Edit Quick Buttons on Hover */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAdminOpen(true);
                        }}
                        className="p-1 rounded bg-[#1f1f2e] text-slate-400 hover:text-purple-300"
                        title="Edit in CMS"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete service "${service.title}"?`)) {
                            deleteService(idx);
                          }
                        }}
                        className="p-1 rounded bg-[#1f1f2e] text-slate-400 hover:text-rose-400"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#1a1a26] border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 group-hover:border-purple-400 group-hover:bg-purple-950/40 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase mb-2 group-hover:text-purple-300 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Row with Number Index (01, 02, etc.) and Action */}
                    <div className="pt-4 border-t border-[#1a1a26] flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-purple-400 transition-colors">
                        {service.number || `0${idx + 1}`}
                      </span>

                      <span className="text-2xs font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Add New Service Card Shortcut */}
              <div
                onClick={() => setIsAdminOpen(true)}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#26263a] hover:border-purple-500/50 hover:bg-[#12121b]/50 transition-all cursor-pointer group text-center min-h-[220px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#1b1b28] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all mb-3">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider group-hover:text-white">
                  Add Custom Service
                </span>
                <span className="text-3xs font-mono text-slate-500 mt-1">
                  Click to open CMS Editor
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Service Details Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#12121b] border border-purple-500/30 rounded-2xl p-6 sm:p-8 text-white relative shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f1f2e] mb-4">
              <span className="font-mono text-xs text-purple-400">SERVICE {selectedServiceModal.number}</span>
              <button
                type="button"
                onClick={() => setSelectedServiceModal(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                [CLOSE ✕]
              </button>
            </div>

            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              {selectedServiceModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              {selectedServiceModal.description}
            </p>

            <h4 className="text-2xs font-mono uppercase text-purple-300 mb-3 tracking-wider">
              Included Deliverables & Strategy:
            </h4>
            <div className="space-y-2 mb-6">
              {(selectedServiceModal.details || ['High conversion strategy', 'Campaign monitoring']).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1f1f2e] flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setSelectedServiceModal(null)}
                className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Inquire For This Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
