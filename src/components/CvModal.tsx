import { Printer, X, Download, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-6">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-blue-400">Curriculum Vitae</span>
            <span className="text-slate-500">|</span>
            <span className="text-sm font-semibold text-white">{PORTFOLIO_DATA.personal.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content (Replicates exact CV layout) */}
        <div className="p-8 sm:p-12 text-slate-800 max-h-[85vh] overflow-y-auto bg-white font-sans">
          
          {/* CV Header: Two-tone or split banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b-2 border-slate-200">
            <div className="md:col-span-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <div className="text-sm sm:text-base font-bold text-blue-700 tracking-wider uppercase mt-1">
                DIGITAL MARKETER
              </div>

              {/* Contact Icons Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{PORTFOLIO_DATA.personal.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{PORTFOLIO_DATA.personal.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Kaligonj, Gazipur</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end">
              <img
                src="/src/assets/images/shamsun_portrait_pro_1792121184000.jpg"
                alt={PORTFOLIO_DATA.personal.name}
                className="w-28 h-32 object-cover object-top rounded-lg border-2 border-slate-200 shadow-xs"
              />
            </div>
          </div>

          {/* 2-Column CV Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
            
            {/* Left Sidebar (Skills & Personal Info) */}
            <div className="md:col-span-4 space-y-6 md:pr-4 md:border-r border-slate-200">
              
              {/* Professional Skills */}
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3">
                  Professional Skills
                </h2>

                <div className="space-y-4 text-xs">
                  <div>
                    <h3 className="font-bold text-blue-900 mb-1.5">Social Media Marketing</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>Facebook Page Optimization</li>
                      <li>Facebook Ads & Post Boosting</li>
                      <li>Instagram Marketing</li>
                      <li>YouTube Marketing</li>
                      <li>LinkedIn Marketing</li>
                      <li>AI Video Ads & Promotions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-900 mb-1.5">Digital Marketing</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>Lead Generation</li>
                      <li>Email Marketing</li>
                      <li>Google Ads & Analytics</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-900 mb-1.5">SEO & Website</h3>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>On-Page, Local & Technical SEO</li>
                      <li>GBP (GMB) Optimization</li>
                      <li>Website Design</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3">
                  Personal Info
                </h2>
                <div className="space-y-2 text-2xs sm:text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">Father's Name:</span>
                    <span>{PORTFOLIO_DATA.personal.fatherName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Mother's Name:</span>
                    <span>{PORTFOLIO_DATA.personal.motherName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Date of Birth:</span>
                    <span>{PORTFOLIO_DATA.personal.dob}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Nationality:</span>
                    <span>{PORTFOLIO_DATA.personal.nationality}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Present Address:</span>
                    <span>{PORTFOLIO_DATA.personal.location}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Permanent Address:</span>
                    <span>{PORTFOLIO_DATA.personal.permanentLocation}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Main Body (Career Objective, Experience, Education, Declaration) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Career Objective */}
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 mb-2">
                  Career Objective
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  {PORTFOLIO_DATA.personal.objectiveEn}
                </p>
              </div>

              {/* Experience / Freelancing Training */}
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3">
                  Experience & Certified Training
                </h2>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Freelancing Training — E-learning & Earning Ltd.
                    </h3>
                  </div>
                  <div className="text-xs font-semibold text-blue-700 mb-3">
                    Digital Marketing Course | Completed
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    <li>
                      <strong className="text-slate-800">Social Media Marketing:</strong> Planned and managed marketing on Facebook, Instagram, YouTube and LinkedIn, and optimized Facebook Pages for better reach and engagement.
                    </li>
                    <li>
                      <strong className="text-slate-800">Paid Advertising:</strong> Ran Facebook Ads, post boosting and ad campaigns, and managed Google Ads.
                    </li>
                    <li>
                      <strong className="text-slate-800">AI Content Creation:</strong> Created AI-generated video ads and promotional videos for social media.
                    </li>
                    <li>
                      <strong className="text-slate-800">Lead Generation & Email Marketing:</strong> Generated leads through targeted campaigns and email marketing.
                    </li>
                    <li>
                      <strong className="text-slate-800">Analytics & SEO:</strong> Tracked performance with Google Analytics; applied On-Page, Local and Technical SEO and optimized Google Business Profile (GMB).
                    </li>
                    <li>
                      <strong className="text-slate-800">Website Design:</strong> Designed websites with a focus on layout and responsiveness.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education Matrix Table */}
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3">
                  Education
                </h2>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 font-semibold text-slate-800 border-b border-slate-200">
                        <th className="p-2.5">Exam</th>
                        <th className="p-2.5">Group / Subject</th>
                        <th className="p-2.5">Board / University</th>
                        <th className="p-2.5">Year</th>
                        <th className="p-2.5 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold">SSC</td>
                        <td className="p-2.5">Humanities</td>
                        <td className="p-2.5">Dhaka Board</td>
                        <td className="p-2.5 font-mono">2019</td>
                        <td className="p-2.5 text-right font-mono font-semibold">GPA 2.72</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">HSC</td>
                        <td className="p-2.5">Business Management (Computer Operation)</td>
                        <td className="p-2.5">Bangladesh Technical Education Board</td>
                        <td className="p-2.5 font-mono">2021</td>
                        <td className="p-2.5 text-right font-mono font-semibold text-blue-700">GPA 4.67</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">BA</td>
                        <td className="p-2.5">Humanities</td>
                        <td className="p-2.5">National University</td>
                        <td className="p-2.5 font-mono">Running</td>
                        <td className="p-2.5 text-right font-mono font-semibold">3rd Year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Declaration & Signature */}
              <div className="pt-4 border-t border-slate-200">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Declaration
                </h2>
                <p className="text-xs text-slate-600 italic">
                  I hereby declare that the information given above is true and correct to the best of my knowledge.
                </p>

                <div className="mt-8 flex justify-end">
                  <div className="text-right">
                    <div className="w-48 border-b border-slate-400 mb-1" />
                    <div className="text-xs font-bold text-slate-900">
                      Mst. Shamsun Akter Shahida
                    </div>
                    <div className="text-2xs text-slate-500">Signature</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Click 'Print / Save PDF' to print or export as PDF directly.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-medium text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
