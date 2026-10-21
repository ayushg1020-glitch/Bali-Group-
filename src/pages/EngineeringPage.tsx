import React from 'react';
import { ShieldCheck, Layers, Award, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

interface EngineeringPageProps {
  onOpenQuoteModal: () => void;
}

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white bg-paper-grain">
      {/* Banner */}
      <section className="bg-brand-black text-white py-20 relative overflow-hidden border-b-4 border-brand-yellow">
        {/* Blueprint CAD Grid Overlay with Radial Fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle at 60% 50%, black 20%, transparent 80%)' }}
        />
        <div className="container-custom relative z-10">
          <SectionEditorialTag
            number="04"
            category="STRUCTURAL ENGINEERING & FEA"
            spec="EUROCODE EN 1991-4 • DIN 1055 • ASTM A653 • SEISMIC ZONE IV"
            light={true}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            World-Class Silo Engineering & Standards
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            Rigorous Finite Element Analysis (FEA), international collaboration history with Japan, USA, Canada, and Italy, and uncompromising structural integrity.
          </p>
        </div>
      </section>

      {/* Engineering Comparison Table */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mb-12">
            <div className="badge-yellow mb-2">BENCHMARK COMPARISON</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-black">
              Why Bali Group 2.66" Corrugation Outperforms Industry Standard
            </h2>
            <p className="text-brand-text-grey text-base mt-2">
              Commercial grain storage is no place for compromise. Narrow 2.66" corrugation packs more steel per vertical meter, preventing bin wall buckling under grain dynamic discharge forces.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-brand-border-grey shadow-premium">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
                  <th className="p-4 border-b border-neutral-700">Engineering Parameter</th>
                  <th className="p-4 border-b border-brand-yellow bg-brand-yellow text-brand-black font-extrabold">
                    Bali Group Standard
                  </th>
                  <th className="p-4 border-b border-neutral-700 text-gray-300">
                    Typical Industry Competitor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Sidewall Corrugation Pitch</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    2.66" (67.6 mm) Narrow Deep Pitch
                  </td>
                  <td className="p-4 text-brand-text-grey">4.0" (101.6 mm) Wide Pitch</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Steel Density per Sq. Inch</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    22% Higher Steel Volume per Sq. Inch
                  </td>
                  <td className="p-4 text-brand-text-grey">Lower steel density, vulnerable to hoop bulging</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Galvanization Weight</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    350 GSM to 600 GSM (27% longer life)
                  </td>
                  <td className="p-4 text-brand-text-grey">275 GSM standard (prone to early rust)</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Sidewall Gauge Range</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    1.5 mm to 5.5 mm Heavy Plate
                  </td>
                  <td className="p-4 text-brand-text-grey">Limited to 1.0 mm – 3.5 mm</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Roof Slope & Design</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    30° Slope, Factory Pre-Assembled & Tested
                  </td>
                  <td className="p-4 text-brand-text-grey">Flat or 25° slope, prototype field fitting</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Foundation Base Angle</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    Heavy Bolt-On Base Angle with Moisture Seal
                  </td>
                  <td className="p-4 text-brand-text-grey">Pre-rolled lip (prone to moisture ingress)</td>
                </tr>
                <tr className="hover:bg-brand-light-grey">
                  <td className="p-4 font-bold text-brand-black">Bolt Hole Precision</td>
                  <td className="p-4 font-extrabold text-brand-black bg-brand-yellow/10">
                    7/16" CNC Punched for 3/8" Grade 8.8 Hardware
                  </td>
                  <td className="p-4 text-brand-text-grey">Manual or loose tolerance punching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* International Standards Compliance */}
      <section className="py-20 bg-brand-light-grey border-y border-brand-border-grey">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-yellow mb-2 inline-flex">GLOBAL COMPLIANCE</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-black">
              Certified Structural Design Codes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey shadow-sm">
              <ShieldCheck className="w-10 h-10 text-brand-yellow-hover mb-4" />
              <h3 className="font-heading font-bold text-xl text-brand-black mb-2">Eurocode EN 1991-4</h3>
              <p className="text-sm text-brand-text-grey leading-relaxed">
                Actions on structures: Silos and tanks. Evaluates eccentric discharge loads, patch loads, and dynamic pressures during grain discharge.
              </p>
            </div>

            <div className="bg-white p-8 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey shadow-sm">
              <Award className="w-10 h-10 text-brand-yellow-hover mb-4" />
              <h3 className="font-heading font-bold text-xl text-brand-black mb-2">DIN 1055 & ASTM A653</h3>
              <p className="text-sm text-brand-text-grey leading-relaxed">
                German industrial and American steel specifications governing hot-dip zinc adherence, structural yield strength, and seismic anchoring.
              </p>
            </div>

            <div className="bg-white p-8 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey shadow-sm">
              <Cpu className="w-10 h-10 text-brand-yellow-hover mb-4" />
              <h3 className="font-heading font-bold text-xl text-brand-black mb-2">Indian Standard IS 9178</h3>
              <p className="text-sm text-brand-text-grey leading-relaxed">
                Criteria for design of steel bins for storage of bulk materials, customized for local agricultural climatic temperatures and wind speed zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Consultation Callout */}
      <section className="py-20 bg-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-heading font-extrabold text-brand-black">
            Have Specific Geotechnical or Wind Load Requirements?
          </h3>
          <p className="text-brand-text-grey text-base mt-3">
            Our structural engineering team produces certified CAD layouts, foundation load reaction calculations, and structural steel schedules.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="btn-primary uppercase text-xs tracking-wider font-bold px-8 py-4"
            >
              Consult Silo Engineering Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
