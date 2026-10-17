import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onOpenCvModal: () => void;
  lang: 'en' | 'bn';
}

export default function Footer({ onOpenCvModal, lang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-lg font-bold text-white tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Certified Digital Marketer specializing in Meta Ads, Google Ads, AI Video Commercials, Lead Generation, and Local SEO.
            </p>
            <div className="text-2xs text-slate-500 font-mono">
              E-learning & Earning Ltd. Certified · National University (3rd Yr)
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Navigation
            </div>
            <div>
              <a href="#services" className="hover:text-white transition-colors">Services & Solutions</a>
            </div>
            <div>
              <a href="#calculator" className="hover:text-white transition-colors">Growth & ROI Forecaster</a>
            </div>
            <div>
              <a href="#case-studies" className="hover:text-white transition-colors">Client Case Studies</a>
            </div>
            <div>
              <a href="#experience" className="hover:text-white transition-colors">Credentials & Academic Record</a>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenCvModal}
                className="hover:text-white transition-colors text-left text-blue-400"
              >
                Official CV & Credentials
              </button>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Get In Touch
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="hover:text-white font-mono">
                {PORTFOLIO_DATA.personal.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-white">
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
            <div className="text-2xs text-slate-500 mt-2">
              Present: {PORTFOLIO_DATA.personal.location}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="hover:text-slate-300 transition-colors"
            >
              Curriculum Vitae
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
