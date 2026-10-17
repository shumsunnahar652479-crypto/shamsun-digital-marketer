import { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import ToolkitProcessCta from './components/ToolkitProcessCta';
import RoiCalculator from './components/RoiCalculator';
import ContactFooter from './components/ContactFooter';
import CvModal from './components/CvModal';
import AdminPanelModal from './components/AdminPanelModal';
import { Settings, Sparkles } from 'lucide-react';

function PortfolioApp() {
  const { setIsAdminOpen } = usePortfolio();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledBudgetSummary, setPrefilledBudgetSummary] = useState<string>('');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
  };

  const handleSelectBudget = (summary: string) => {
    setPrefilledBudgetSummary(summary);
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
      {/* 1. Header with subtle top bar and CMS trigger */}
      <Navbar
        onOpenCvModal={() => setIsCvModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section: Giant Condensed Title, Script Portfolio, Portrait & Rotating Badge, 4 Stats */}
        <Hero
          onOpenCvModal={() => setIsCvModalOpen(true)}
          lang={lang}
        />

        {/* 3. WHAT I DO Section with 01-06 Numbered Dark Cards */}
        <Services
          onSelectService={handleSelectService}
          lang={lang}
        />

        {/* 4. FEATURED PROJECTS: 01, 02, 03 Side-by-Side Cards */}
        <Projects
          lang={lang}
        />

        {/* 5. 3-Column Block: MY TOOLKIT, WORK PROCESS Stepper & Vibrant Purple CTA */}
        <ToolkitProcessCta
          onOpenContact={handleOpenContact}
          lang={lang}
        />

        {/* 6. Growth & ROI Forecaster */}
        <RoiCalculator
          onSelectBudget={handleSelectBudget}
          lang={lang}
        />
      </main>

      {/* 7. Bottom Section: Arched Portrait Cutout, Contact, Socials & Slogan */}
      <ContactFooter
        prefilledService={prefilledService}
        prefilledBudgetSummary={prefilledBudgetSummary}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        lang={lang}
      />

      {/* 8. Full Official Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* 9. Full Admin & CMS Panel Modal */}
      <AdminPanelModal />

      {/* 10. Persistent Floating Admin Panel Pill in Bottom Corner */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#161624]/90 backdrop-blur-md border border-purple-500/50 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:bg-purple-900/90 transition-all group"
          title="Open Website Admin & CMS Panel"
        >
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
            <Settings className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <span className="text-purple-200">Admin Panel</span>
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
