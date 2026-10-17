import { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe, Sparkles, FileText, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenCvModal: () => void;
  lang: 'en' | 'bn';
  onToggleLang: () => void;
}

export default function Navbar({ onOpenCvModal, lang, onToggleLang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, setIsAdminOpen } = usePortfolio();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c11]/90 backdrop-blur-md border-b border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top subtle bar matching reference: "— DIGITAL MARKETER" on left, "AVAILABLE FOR FREELANCE ✦" on right */}
        <div className="flex items-center justify-between py-2 text-2xs tracking-widest uppercase text-slate-400 border-b border-[#171722]/80">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-purple-500" />
            <span className="text-purple-300 font-mono font-medium">DIGITAL MARKETER</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-purple-300 font-medium">
              <span>AVAILABLE FOR FREELANCE</span>
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            </div>

            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-purple-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            <span className="font-mono tracking-wider uppercase">{data.personal.name}</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase text-slate-300">
            <a href="#services" className="hover:text-purple-400 transition-colors whitespace-nowrap">
              {lang === 'en' ? 'What I Do' : 'কাজের বিবরণ'}
            </a>
            <a href="#projects" className="hover:text-purple-400 transition-colors whitespace-nowrap">
              {lang === 'en' ? 'Featured Projects' : 'সফল প্রজেক্ট'}
            </a>
            <a href="#toolkit" className="hover:text-purple-400 transition-colors whitespace-nowrap">
              {lang === 'en' ? 'Toolkit & Process' : 'টুলস ও প্রসেস'}
            </a>
            <a href="#calculator" className="hover:text-purple-400 transition-colors whitespace-nowrap">
              {lang === 'en' ? 'ROI Forecaster' : 'আরওআই ক্যালকুলেটর'}
            </a>
            <a href="#contact" className="hover:text-purple-400 transition-colors whitespace-nowrap">
              {lang === 'en' ? 'Contact' : 'যোগাযোগ'}
            </a>
          </nav>

          {/* Action Buttons: Admin CMS + View CV + Hire Me */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Admin CMS Trigger Button */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-200 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 rounded-lg transition-all shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              title="Open Admin CMS Panel to edit text, photos, services, and projects"
            >
              <Settings className="w-3.5 h-3.5 text-purple-400 animate-[spin_8s_linear_infinite]" />
              <span className="hidden sm:inline">Admin CMS</span>
            </button>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#141420] hover:bg-[#1a1a28] border border-[#26263a] rounded-lg transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'en' ? 'CV' : 'সিভি'}</span>
              <ArrowUpRight className="w-3 h-3 text-purple-400" />
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all whitespace-nowrap"
            >
              {lang === 'en' ? 'Hire Me' : 'হায়ার করুন'}
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1c1c27] bg-[#0c0c11] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-[#14141d] rounded-md"
            >
              {lang === 'en' ? 'What I Do' : 'কাজের বিবরণ'}
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-[#14141d] rounded-md"
            >
              {lang === 'en' ? 'Featured Projects' : 'সফল প্রজেক্ট'}
            </a>
            <a
              href="#toolkit"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-[#14141d] rounded-md"
            >
              {lang === 'en' ? 'Toolkit & Process' : 'টুলস ও প্রসেস'}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-[#14141d] rounded-md"
            >
              {lang === 'en' ? 'ROI Forecaster' : 'আরওআই ক্যালকুলেটর'}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-[#14141d] rounded-md"
            >
              {lang === 'en' ? 'Contact' : 'যোগাযোগ'}
            </a>
          </div>

          <div className="pt-2 border-t border-[#1c1c27] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider text-purple-200 bg-purple-950 border border-purple-500/40 rounded-lg text-center flex items-center justify-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin CMS</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="flex-1 py-2 px-3 text-xs font-semibold text-slate-300 bg-[#141420] border border-[#28283a] rounded-lg text-center"
            >
              {lang === 'en' ? 'View CV' : 'সিভি দেখুন'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
