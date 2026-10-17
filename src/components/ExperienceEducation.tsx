import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, GraduationCap, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface ExperienceEducationProps {
  onOpenCvModal: () => void;
  lang: 'en' | 'bn';
}

export default function ExperienceEducation({ onOpenCvModal, lang }: ExperienceEducationProps) {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');

  return (
    <section id="experience" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Verified Background' : 'যোগ্যতা ও অভিজ্ঞতা'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              {lang === 'en' 
                ? 'Practical Experience, Formal Training & Academic Record' 
                : 'বাস্তব কাজের অভিজ্ঞতা, প্রফেশনাল ট্রেনিং ও একাডেমিক রেকর্ড'}
            </h2>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'Experience & Training' : 'অভিজ্ঞতা ও ট্রেনিং'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'Skill Proficiency' : 'দক্ষতার বিবরণ'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'Education Matrix' : 'শিক্ষাগত যোগ্যতা'}
            </button>
          </div>
        </div>

        {/* Tab 1: Experience & Training */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase text-blue-700 font-mono">
                        {exp.organization}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex sm:flex-col sm:items-end gap-2 text-xs">
                    <span className="font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {exp.duration}
                    </span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {exp.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">
                    Core Curriculum & Practical Modules:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-800">Key Outcomes:</span>
                  {exp.highlights.map((hl, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-2xs font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Skill Proficiency Matrix */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Social Media Marketing */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Social Media Marketing</h3>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.skills.socialMedia.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{s.name}</span>
                      <span className="font-mono text-slate-500 tabular-nums">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Marketing & Lead Gen */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Award className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Digital Marketing & Leads</h3>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.skills.digitalMarketing.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{s.name}</span>
                      <span className="font-mono text-slate-500 tabular-nums">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO & Web Optimization */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">SEO & Web Design</h3>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.skills.seoAndWeb.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{s.name}</span>
                      <span className="font-mono text-slate-500 tabular-nums">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Formal Education Matrix */}
        {activeTab === 'education' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Qualifications</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Verified Academic Credentials
                </h3>
              </div>
              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                <span>View Full CV Document</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 uppercase">
                    <th className="py-4 px-6">Examination</th>
                    <th className="py-4 px-6">Group / Discipline</th>
                    <th className="py-4 px-6">Board / University</th>
                    <th className="py-4 px-6">Passing Year</th>
                    <th className="py-4 px-6 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {PORTFOLIO_DATA.education.map((edu, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                        {edu.exam}
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {edu.group}
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {edu.institution}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-600 tabular-nums">
                        {edu.year}
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-blue-600 tabular-nums">
                        {edu.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>HSC Computer Operation distinction from Bangladesh Technical Education Board</span>
              <span className="font-medium text-emerald-700">✓ All records verified</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
