import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Clock, 
  Users 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const { companySettings } = useCMS();

  return (
    <div className="bg-white">
      {/* Page Header Banner */}
      <section className="bg-brand-black text-white py-20 relative overflow-hidden border-b-4 border-brand-yellow">
        <div className="container-custom relative z-10">
          <div className="badge-yellow mb-4 text-brand-yellow">
            CORPORATE PROFILE & HERITAGE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            Pioneering Grain Storage Infrastructure Since 1993
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            Delivering 4.5+ million tonnes of high-capacity grain storage, material handling systems, and turnkey EPC projects across 15+ countries.
          </p>
        </div>
      </section>

      {/* Main Corporate Overview Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="badge-yellow">
                THE ROLLS ROYCE OF SILOS
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-black leading-tight">
                Three Generations of Engineering Precision & Integrity
              </h2>
              <div className="space-y-4 text-brand-text-grey text-base leading-relaxed">
                <p>
                  Founded by <strong>Anil Bali</strong> in 1999 and backed by an engineering pedigree dating back to our very first Japanese collaboration on <strong>June 9, 1993</strong>, Bali Group India has emerged as a globally acclaimed pioneer in the field of commercial grain storage silos and material handling equipment (MHE).
                </p>
                <p>
                  Today, with our third generation at the helm, we continue to lead the industry through relentless innovation, heavy-duty manufacturing standards, and uncompromised structural integrity. Having supplied over <strong>4.5 million tonnes</strong> of grain storage capacity worldwide, we specialize in high-capacity installations capable of accommodating any free-flowing grain while ensuring optimal moisture control and prolonged shelf life.
                </p>
                <p>
                  Over three decades, we have forged strategic engineering alliances with esteemed partners from America, Canada, Italy, and Japan. These alliances have elevated our structural analysis, ensuring every grain bin meets or exceeds rigorous global standards (Eurocode EN 1991-4, DIN 1055, and ASTM).
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenQuoteModal}
                  className="btn-primary uppercase text-xs tracking-wider font-bold"
                >
                  Consult an Application Engineer
                </button>
                <Link
                  to="/manufacturing"
                  className="btn-secondary uppercase text-xs tracking-wider font-bold"
                >
                  Inspect Our Factories
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <img 
                src="/images/about-hero.jpg" 
                alt="Bali Group Headquarters and Silo Manufacturing"
                className="w-full h-[450px] object-cover shadow-premium border-4 border-brand-light-grey"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-yellow text-brand-black p-6 font-heading font-extrabold shadow-xl hidden sm:block">
                <span className="text-4xl block">4.5M+</span>
                <span className="text-xs uppercase tracking-wider block font-bold mt-1">
                  Tonnes Storage Delivered
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="bg-brand-light-grey py-20 border-y border-brand-border-grey">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-yellow mb-2 inline-flex">MILESTONES</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-black">
              Decades of Uninterrupted Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey">
              <span className="text-2xl font-heading font-extrabold text-brand-black block">1993</span>
              <h4 className="font-heading font-bold text-base text-brand-black mt-2 mb-2">Japanese Alliance</h4>
              <p className="text-xs text-brand-text-grey leading-relaxed">
                June 9, 1993 marked the first formal collaboration with Japanese partners, establishing our foundational benchmark for precision fabrication.
              </p>
            </div>

            <div className="bg-white p-6 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey">
              <span className="text-2xl font-heading font-extrabold text-brand-black block">1999</span>
              <h4 className="font-heading font-bold text-base text-brand-black mt-2 mb-2">Bali Group Silos Founded</h4>
              <p className="text-xs text-brand-text-grey leading-relaxed">
                Founded by Anil Bali in Chandigarh, establishing our specialized heavy roll forming and commercial grain bin production lines.
              </p>
            </div>

            <div className="bg-white p-6 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey">
              <span className="text-2xl font-heading font-extrabold text-brand-black block">2012</span>
              <h4 className="font-heading font-bold text-base text-brand-black mt-2 mb-2">Global EPC Expansion</h4>
              <p className="text-xs text-brand-text-grey leading-relaxed">
                Expanded into full turnkey EPC delivery across Africa, the Middle East, and Southeast Asia with in-house civil and structural steel engineering.
              </p>
            </div>

            <div className="bg-white p-6 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey">
              <span className="text-2xl font-heading font-extrabold text-brand-black block">Today</span>
              <h4 className="font-heading font-bold text-base text-brand-black mt-2 mb-2">3rd Generation Leadership</h4>
              <p className="text-xs text-brand-text-grey leading-relaxed">
                Operating high-capacity roll forming lines, robotic manufacturing bays, and cloud-automated SCADA monitoring across 4.5M+ tonnes of capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Quality Philosophy */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-brand-black text-white border-b-4 border-brand-yellow">
              <ShieldCheck className="w-8 h-8 text-brand-yellow mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Our Mission</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                To engineer the world's most resilient, moisture-tight, and durable grain storage systems that protect food grain security and empower agribusinesses with true value for money.
              </p>
            </div>

            <div className="p-8 bg-brand-light-grey border border-brand-border-grey">
              <Globe2 className="w-8 h-8 text-brand-black mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2 text-brand-black">Our Global Vision</h3>
              <p className="text-sm text-brand-text-grey leading-relaxed">
                To remain the undisputed benchmark in industrial grain preservation, blending international standards from Japan, Europe, and North America with localized turnkey agility.
              </p>
            </div>

            <div className="p-8 bg-brand-light-grey border border-brand-border-grey">
              <Award className="w-8 h-8 text-brand-black mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2 text-brand-black">Integrity & Quality</h3>
              <p className="text-sm text-brand-text-grey leading-relaxed">
                We never compromise on plate gauges, corrugation depth, or zinc coating weights. Every sheet is 100% traceable by supplier, coil number, and production date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
