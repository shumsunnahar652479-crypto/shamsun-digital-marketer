import { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Save, 
  Upload, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Download, 
  FileUp, 
  Sparkles, 
  Check, 
  User, 
  Layers, 
  FolderGit2, 
  Wrench, 
  Phone,
  BarChart2
} from 'lucide-react';
import { Project, ServiceItem } from '../data/portfolioData';

export default function AdminPanelModal() {
  const {
    data,
    isAdminOpen,
    setIsAdminOpen,
    updatePersonal,
    updateStats,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    addTool,
    deleteTool,
    updateProcessSteps,
    resetToDefault,
    importConfig
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'services' | 'projects' | 'toolkit' | 'contact' | 'backup'>('profile');
  const [saveToast, setSaveToast] = useState(false);

  // Profile Form state
  const [personalForm, setPersonalForm] = useState(data.personal);
  
  // Stats Form state
  const [statsForm, setStatsForm] = useState(data.stats);

  // New Service state
  const [newService, setNewService] = useState<ServiceItem>({
    number: `0${data.services.length + 1}`,
    title: '',
    description: '',
    details: ['High conversion setup', 'Targeted execution'],
    icon: 'Megaphone'
  });
  const [showAddService, setShowAddService] = useState(false);

  // New Project state
  const [newProject, setNewProject] = useState<Project>({
    id: `project-${Date.now()}`,
    number: `0${data.projects.length + 1}`,
    title: '',
    category: 'ads',
    categoryLabel: 'Marketing Campaign',
    summary: '',
    image: '/src/assets/images/project_meta_purple_1792125845645.jpg',
    metrics: [
      { label: 'ROAS', value: '5.2x' },
      { label: 'Revenue', value: '$45,000+' }
    ],
    deliverables: ['Campaign Strategy', 'Ad Creatives'],
    tools: ['Meta Ads', 'Canva'],
    clientIndustry: 'E-Commerce'
  });
  const [showAddProject, setShowAddProject] = useState(false);

  // New Tool state
  const [newToolName, setNewToolName] = useState('');
  const [newToolCat, setNewToolCat] = useState('Marketing');

  // Hidden File input refs
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const bottomImageInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(personalForm);
    triggerToast();
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(statsForm);
    triggerToast();
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPersonalForm(prev => ({ ...prev, portraitImage: result }));
        updatePersonal({ portraitImage: result });
        triggerToast();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBottomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPersonalForm(prev => ({ ...prev, corporateImage: result }));
        updatePersonal({ corporateImage: result });
        triggerToast();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setNewProject(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;
    addService({
      ...newService,
      number: newService.number || `0${data.services.length + 1}`
    });
    setNewService({
      number: `0${data.services.length + 2}`,
      title: '',
      description: '',
      details: ['High conversion setup', 'Targeted execution'],
      icon: 'Megaphone'
    });
    setShowAddService(false);
    triggerToast();
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    addProject({
      ...newProject,
      id: `project-${Date.now()}`
    });
    setShowAddProject(false);
    triggerToast();
  };

  const handleAddToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName) return;
    addTool({
      name: newToolName,
      icon: 'Share2',
      category: newToolCat
    });
    setNewToolName('');
    triggerToast();
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shamsun_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const success = importConfig(content);
        if (success) {
          alert('Portfolio data successfully restored!');
          setPersonalForm(data.personal);
          setStatsForm(data.stats);
        } else {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto text-white font-sans">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-60 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>Saved to Live Website!</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-[#101018] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#141420] border-b border-[#202030] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-[0_0_12px_#a855f7]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                WEBSITE ADMIN & CMS PANEL
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-3xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Firebase Connected (digital-marketer-64d6d)</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-3xs font-mono text-purple-300">
                  Cloud Firestore Real-Time Sync
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#202030] rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#0c0c12] border-b border-[#1c1c28] overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile & Photos', icon: User },
            { id: 'stats', label: 'Stats Counters', icon: BarChart2 },
            { id: 'services', label: 'Services (What I Do)', icon: Layers },
            { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
            { id: 'toolkit', label: 'Toolkit & Process', icon: Wrench },
            { id: 'contact', label: 'Contact Info', icon: Phone },
            { id: 'backup', label: 'Backup & Reset', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-[#161622]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#101018] space-y-6">
          
          {/* TAB 1: PROFILE & PHOTOS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Photo Upload Section */}
              <div className="p-5 rounded-xl bg-[#141420] border border-purple-500/20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Website Portrait & Images</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  {/* Hero Portrait */}
                  <div className="flex items-center gap-4">
                    <img
                      src={personalForm.portraitImage}
                      alt="Hero Portrait Preview"
                      className="w-20 h-24 object-cover object-top rounded-xl border-2 border-purple-500/40"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Hero Portrait</span>
                      <span className="text-3xs text-slate-400 block mb-2">Upload any photo from your computer</span>
                      
                      <input
                        type="file"
                        ref={heroImageInputRef}
                        onChange={handleHeroImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroImageInputRef.current?.click()}
                        className="px-3 py-1.5 text-2xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Change Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Arched Portrait */}
                  <div className="flex items-center gap-4">
                    <img
                      src={personalForm.corporateImage}
                      alt="Bottom Arched Preview"
                      className="w-20 h-24 object-cover object-top rounded-t-full rounded-b-lg border-2 border-purple-500/40"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Secondary / Formal Photo</span>
                      <span className="text-3xs text-slate-400 block mb-2">Used in CV & switcher</span>
                      
                      <input
                        type="file"
                        ref={bottomImageInputRef}
                        onChange={handleBottomImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => bottomImageInputRef.current?.click()}
                        className="px-3 py-1.5 text-2xs font-bold uppercase tracking-wider bg-[#1d1d2c] hover:bg-[#252538] text-white border border-[#303046] rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Change Secondary</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalForm.name}
                    onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Display Title</label>
                  <input
                    type="text"
                    value={personalForm.displayTitle}
                    onChange={(e) => setPersonalForm({ ...personalForm, displayTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Hero Sub-Slogan</label>
                  <input
                    type="text"
                    value={personalForm.tagline}
                    onChange={(e) => setPersonalForm({ ...personalForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Code Style Slogan</label>
                  <input
                    type="text"
                    value={personalForm.codeSlogan}
                    onChange={(e) => setPersonalForm({ ...personalForm, codeSlogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Years Experience Badge</label>
                  <input
                    type="text"
                    value={personalForm.experienceYears}
                    onChange={(e) => setPersonalForm({ ...personalForm, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Career Objective / Bio (English)</label>
                  <textarea
                    rows={3}
                    value={personalForm.objectiveEn}
                    onChange={(e) => setPersonalForm({ ...personalForm, objectiveEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-mono text-3xs uppercase mb-1">Career Objective / Bio (বাংলা)</label>
                  <textarea
                    rows={3}
                    value={personalForm.objectiveBn}
                    onChange={(e) => setPersonalForm({ ...personalForm, objectiveBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#181824] border border-[#262638] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-[#1e1e2d]">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: STATS COUNTERS */}
          {activeTab === 'stats' && (
            <form onSubmit={handleSaveStats} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsForm.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#141420] border border-[#202032] space-y-2">
                    <span className="text-3xs font-mono text-purple-400 uppercase">Stat Counter #{idx + 1}</span>
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Number / Value (e.g. 4+, 150+)</label>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].value = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#191926] border border-[#28283a] text-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Label</label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].label = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#191926] border border-[#28283a] text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-[#1e1e2d]">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Stats</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Services List ({data.services.length} Total)
                  </h3>
                  <p className="text-3xs text-slate-400 font-mono">
                    Edit existing services, delete unwanted ones, or add a brand new service
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddService(!showAddService)}
                  className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Add New Service Form */}
              {showAddService && (
                <form onSubmit={handleCreateService} className="p-5 rounded-xl bg-[#151522] border border-purple-500/40 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-purple-300">New Service Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Index (e.g. 07)</label>
                      <input
                        type="text"
                        value={newService.number}
                        onChange={(e) => setNewService({ ...newService, number: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TikTok Ads & Viral Hook Strategy"
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-3xs text-slate-400 mb-1">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Brief overview of how this service helps clients grow..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddService(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white text-xs font-bold uppercase rounded-lg"
                    >
                      Create Service
                    </button>
                  </div>
                </form>
              )}

              {/* Service Cards List */}
              <div className="space-y-3">
                {data.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#141420] border border-[#222232] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-400">{srv.number}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase">{srv.title}</h4>
                      </div>
                      <p className="text-2xs sm:text-xs text-slate-400 line-clamp-2">{srv.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const newTitle = prompt('Edit Service Title:', srv.title);
                          if (newTitle) {
                            const newDesc = prompt('Edit Service Description:', srv.description) || srv.description;
                            updateService(idx, { ...srv, title: newTitle, description: newDesc });
                            triggerToast();
                          }
                        }}
                        className="px-3 py-1.5 text-2xs font-bold uppercase bg-[#1d1d2b] hover:bg-[#252538] text-purple-300 border border-[#303045] rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${srv.title}"?`)) {
                            deleteService(idx);
                            triggerToast();
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FEATURED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Featured Projects ({data.projects.length} Total)
                  </h3>
                  <p className="text-3xs text-slate-400 font-mono">
                    Upload new campaign case studies, replace images, change metrics or delete
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add Project Form */}
              {showAddProject && (
                <form onSubmit={handleCreateProject} className="p-5 rounded-xl bg-[#151522] border border-purple-500/40 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-purple-300">Add New Case Study</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Project Number (e.g. 04)</label>
                      <input
                        type="text"
                        value={newProject.number}
                        onChange={(e) => setNewProject({ ...newProject, number: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Real Estate WhatsApp Lead Funnel"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Client Industry</label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury Real Estate"
                        value={newProject.clientIndustry}
                        onChange={(e) => setNewProject({ ...newProject, clientIndustry: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-3xs text-slate-400 mb-1">Key Metric (e.g. 6.8x ROAS / 240+ Leads)</label>
                      <input
                        type="text"
                        placeholder="6.8x ROAS"
                        value={newProject.metrics[0]?.value || ''}
                        onChange={(e) => {
                          const updatedMetrics = [...newProject.metrics];
                          updatedMetrics[0] = { label: 'ROAS', value: e.target.value };
                          setNewProject({ ...newProject, metrics: updatedMetrics });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-3xs text-slate-400 mb-1">Summary *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Brief summary of strategy and outcomes..."
                        value={newProject.summary}
                        onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1c1c2a] border border-[#2e2e42] text-white"
                      />
                    </div>

                    {/* Image Upload for Project */}
                    <div className="sm:col-span-2 p-3 rounded-lg bg-[#191926] border border-[#2a2a3c] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={newProject.image}
                          alt="Project Preview"
                          className="w-16 h-10 object-cover rounded border border-white/20"
                        />
                        <span className="text-2xs text-slate-300">Project Screenshot / Visual</span>
                      </div>
                      <input
                        type="file"
                        ref={projectImageInputRef}
                        onChange={handleProjectImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => projectImageInputRef.current?.click()}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-2xs font-bold rounded-lg"
                      >
                        Upload Project Image
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white text-xs font-bold uppercase rounded-lg"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-[#141420] border border-[#222232] space-y-3 relative group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-20 h-14 object-cover rounded-lg border border-purple-500/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-2xs text-purple-400 font-bold">{proj.number}</span>
                          <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                        </div>
                        <div className="text-3xs font-mono text-slate-400">{proj.clientIndustry}</div>
                        <div className="text-2xs font-mono text-emerald-400 font-bold mt-1">
                          {proj.metrics[0]?.label}: {proj.metrics[0]?.value}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1e1e2d] text-2xs">
                      <button
                        type="button"
                        onClick={() => {
                          const newTitle = prompt('Edit Project Title:', proj.title);
                          if (newTitle) {
                            updateProject(idx, { ...proj, title: newTitle });
                            triggerToast();
                          }
                        }}
                        className="text-purple-300 hover:text-white font-mono"
                      >
                        [Edit Title]
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(idx);
                            triggerToast();
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TOOLKIT & PROCESS */}
          {activeTab === 'toolkit' && (
            <div className="space-y-6">
              
              {/* Toolkit Management */}
              <div className="p-5 rounded-xl bg-[#141420] border border-[#202030] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Manage "My Toolkit" Icons & Tags
                </h3>

                <form onSubmit={handleAddToolSubmit} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="New Tool Name (e.g. TikTok Ads, Zapier)"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Ads, CRM)"
                    value={newToolCat}
                    onChange={(e) => setNewToolCat(e.target.value)}
                    className="w-32 px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-xs text-white font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase rounded-lg"
                  >
                    Add Tool
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {data.toolkit.map((tool, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#1a1a28] border border-[#28283e] flex items-center gap-2 text-xs"
                    >
                      <span className="font-semibold text-white">{tool.name}</span>
                      <span className="text-3xs font-mono text-purple-400">({tool.category})</span>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTool(idx);
                          triggerToast();
                        }}
                        className="text-slate-500 hover:text-rose-400 ml-1"
                        title="Remove tool"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Process Steps */}
              <div className="p-5 rounded-xl bg-[#141420] border border-[#202030] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Work Process 4 Steps
                </h3>

                <div className="space-y-3">
                  {data.workProcess.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#181826] border border-[#26263a] text-xs space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-400 font-bold">{step.step}</span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...data.workProcess];
                            updated[idx].title = e.target.value;
                            updateProcessSteps(updated);
                          }}
                          className="px-2 py-1 bg-[#202032] border border-[#303048] rounded text-white font-bold uppercase text-2xs flex-1"
                        />
                      </div>
                      <input
                        type="text"
                        value={step.desc}
                        onChange={(e) => {
                          const updated = [...data.workProcess];
                          updated[idx].desc = e.target.value;
                          updateProcessSteps(updated);
                        }}
                        className="w-full px-2 py-1 bg-[#202032] border border-[#303048] rounded text-slate-300 text-2xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: CONTACT INFO */}
          {activeTab === 'contact' && (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-xl bg-[#141420] border border-[#202030] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Update Official Contact Channels
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-3xs font-mono text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={personalForm.phone}
                      onChange={(e) => {
                        setPersonalForm({ ...personalForm, phone: e.target.value });
                        updatePersonal({ phone: e.target.value });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-3xs font-mono text-slate-400 mb-1">Primary Email Address</label>
                    <input
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => {
                        setPersonalForm({ ...personalForm, email: e.target.value });
                        updatePersonal({ email: e.target.value });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-3xs font-mono text-slate-400 mb-1">Present Location</label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => {
                        setPersonalForm({ ...personalForm, location: e.target.value });
                        updatePersonal({ location: e.target.value });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-3xs font-mono text-slate-400 mb-1">Permanent Location</label>
                    <input
                      type="text"
                      value={personalForm.permanentLocation}
                      onChange={(e) => {
                        setPersonalForm({ ...personalForm, permanentLocation: e.target.value });
                        updatePersonal({ permanentLocation: e.target.value });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#181826] border border-[#2a2a3e] text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 text-3xs font-mono text-emerald-400">
                  ✓ Contact information updates immediately on the live website and WhatsApp links.
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="p-6 rounded-xl bg-[#141420] border border-[#202030] space-y-6 text-xs">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Backup, Restore & Reset Website Data
                </h3>
                <p className="text-slate-400 text-2xs">
                  Export your entire configured portfolio to a JSON file on your computer, or import a saved backup.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Export */}
                <div className="p-4 rounded-xl bg-[#191926] border border-[#28283c] flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-white block mb-1">Export Backup</span>
                    <p className="text-3xs text-slate-400 mb-4">Download a .json file with all your custom text, projects, and images.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON</span>
                  </button>
                </div>

                {/* Import */}
                <div className="p-4 rounded-xl bg-[#191926] border border-[#28283c] flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-white block mb-1">Restore Backup</span>
                    <p className="text-3xs text-slate-400 mb-4">Upload a previously saved .json backup to restore all your edits.</p>
                  </div>
                  <input
                    type="file"
                    ref={jsonFileInputRef}
                    onChange={handleImportJsonFile}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => jsonFileInputRef.current?.click()}
                    className="w-full py-2 bg-[#252538] hover:bg-[#2e2e46] text-white font-bold rounded-lg border border-[#3b3b54] flex items-center justify-center gap-1.5"
                  >
                    <FileUp className="w-4 h-4" />
                    <span>Import JSON</span>
                  </button>
                </div>

                {/* Reset to Factory Original */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-rose-300 block mb-1">Factory Reset</span>
                    <p className="text-3xs text-rose-300/70 mb-4">Erase custom local edits and revert to the original Shamsun Shahida portfolio.</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Default</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-[#141420] border-t border-[#202030] flex items-center justify-between text-2xs font-mono">
          <span className="text-slate-400">
            Current Profile: <strong className="text-white">{data.personal.name}</strong> ({data.services.length} Services, {data.projects.length} Projects)
          </span>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-2 font-bold uppercase bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-sm"
          >
            Done & Return to Site
          </button>
        </div>

      </div>
    </div>
  );
}
