import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, X, Check, Plus, Edit3, Trash2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectsProps {
  lang: 'en' | 'bn';
}

export default function Projects({ lang }: ProjectsProps) {
  const { data, setIsAdminOpen, deleteProject } = usePortfolio();
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 bg-[#0a0a0e] text-white border-b border-[#1c1c27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header row matching reference: FEATURED PROJECTS on left, VIEW ALL / MANAGE on right */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-[#1c1c27]">
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white uppercase">
            FEATURED PROJECTS
          </h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="text-xs font-mono tracking-wider uppercase text-purple-400 hover:text-white flex items-center gap-1.5 transition-colors bg-[#141420] px-3 py-1.5 rounded-lg border border-[#242436]"
            >
              <Plus className="w-3.5 h-3.5 text-purple-400" />
              <span>Add / Edit in CMS</span>
            </button>

            <a
              href="#contact"
              className="text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-400 hover:text-purple-300 hidden sm:flex items-center gap-1.5 transition-colors"
            >
              <span>{lang === 'en' ? 'VIEW ALL WORK' : 'সকল কাজ দেখুন'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Dynamic Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project, idx) => (
            <div
              key={project.id || idx}
              onClick={() => setActiveProjectModal(project)}
              className="flex flex-col justify-between rounded-2xl bg-[#12121b] border border-[#1e1e2d] hover:border-purple-500/50 overflow-hidden transition-all group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] relative"
            >
              {/* Quick Admin Actions on Hover */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAdminOpen(true);
                  }}
                  className="p-1 rounded bg-black/80 text-purple-300 hover:text-white"
                  title="Edit in CMS"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete project "${project.title}"?`)) {
                      deleteProject(idx);
                    }
                  }}
                  className="p-1 rounded bg-black/80 text-rose-400 hover:text-rose-300"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                {/* Visual Image Container with 01, 02 index badge in corner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181824]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Left Number Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white font-mono text-2xs font-bold border border-white/10">
                    {project.number || `0${idx + 1}`}
                  </div>

                  {/* Top Right Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-purple-950/80 backdrop-blur-md text-purple-300 font-mono text-3xs uppercase tracking-wider border border-purple-500/30 group-hover:opacity-0 transition-opacity">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white tracking-wide uppercase group-hover:text-purple-300 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    {project.clientIndustry}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Key Metric Preview */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#181825] border border-[#232335]">
                      <div>
                        <span className="text-3xs font-mono text-slate-500 uppercase block">{project.metrics[0]?.label || 'Metric'}</span>
                        <span className="text-xs font-bold text-purple-300 font-mono">{project.metrics[0]?.value || 'High'}</span>
                      </div>
                      <div>
                        <span className="text-3xs font-mono text-slate-500 uppercase block">{project.metrics[1]?.label || 'ROAS'}</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">{project.metrics[1]?.value || 'Scaled'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer with Arrow Icon */}
              <div className="px-5 py-3 border-t border-[#1a1a26] flex items-center justify-between text-2xs font-mono text-slate-400 group-hover:text-purple-300">
                <span>VIEW CASE STUDY</span>
                <div className="w-7 h-7 rounded-full bg-[#1c1c2a] flex items-center justify-center text-white group-hover:bg-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}

          {/* Add New Project Card Tile */}
          <div
            onClick={() => setIsAdminOpen(true)}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#26263a] hover:border-purple-500/50 hover:bg-[#12121b]/50 transition-all cursor-pointer group text-center min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#1b1b28] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-300 uppercase tracking-wider group-hover:text-white">
              Add New Project / Case Study
            </span>
            <span className="text-3xs font-mono text-slate-500 mt-1">
              Upload custom photo and metrics in CMS
            </span>
          </div>
        </div>

      </div>

      {/* Project Lightbox Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#12121b] border border-purple-500/30 rounded-2xl overflow-hidden text-white relative shadow-[0_0_50px_rgba(168,85,247,0.3)] my-8">
            
            {/* Header Image */}
            <div className="relative aspect-[16/9] w-full bg-[#181824]">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/80 text-white hover:bg-purple-600 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-2xs text-purple-400 uppercase tracking-widest mb-2">
                <span>PROJECT {activeProjectModal.number}</span>
                <span>·</span>
                <span>{activeProjectModal.categoryLabel}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                {activeProjectModal.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {activeProjectModal.summary}
              </p>

              {/* Metrics */}
              {activeProjectModal.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#181826] border border-purple-500/20 mb-6">
                  {activeProjectModal.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span className="text-3xs font-mono uppercase text-slate-400 block">{m.label}</span>
                      <span className="text-base sm:text-lg font-bold text-purple-300 font-mono mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Deliverables */}
              {activeProjectModal.deliverables && (
                <div className="mb-6">
                  <h4 className="text-2xs font-mono uppercase text-purple-300 tracking-wider mb-3">
                    Strategic Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {activeProjectModal.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {activeProjectModal.tools && (
                <div className="pt-4 border-t border-[#1e1e2d] flex flex-wrap items-center gap-2 text-2xs text-slate-400">
                  <span className="font-mono text-purple-300">Stack:</span>
                  {activeProjectModal.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="bg-[#1a1a27] text-slate-200 px-2 py-0.5 rounded font-mono border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-8 pt-4 border-t border-[#1e1e2d] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveProjectModal(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  Get Similar Results
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
