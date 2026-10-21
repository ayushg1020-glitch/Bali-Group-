import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Layers, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ManufacturingPageProps {
  onOpenQuoteModal: () => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();
  const mfg = homePageContent.manufacturing;

  const manufacturingSteps = [
    {
      title: 'Heavy Cold-Roll Forming & 2.66" Corrugation',
      desc: 'Our specialized continuous roll-forming lines corrugate high-tensile structural steel plates from 1.5mm to 5.5mm thickness with zero micro-fracturing of the protective zinc crystal structure.',
      image: '/images/silos/detail-1.jpg',
      specs: ['2.66" (6.76 cm) corrugation pitch', '1.5mm to 5.5mm plate gauges', 'High-tensile Grade 350/450 MPa steel'],
    },
    {
      title: 'Precision CNC Punching & Hole Alignment',
      desc: 'Every sidewall sheet is punched with exact 7/16" holes on computer-controlled multi-station punch presses to ensure effortless 3/8" Grade 8.8 bolt alignment during field erection.',
      image: '/images/silos/detail-2.jpg',
      specs: ['7/16" precision hole punching', 'Computer-controlled center distances', 'Zero torch cutting or field reaming required'],
    },
    {
      title: '30° Pre-Assembled Roof Systems & Rafters',
      desc: 'Bali Group roofs are engineered with a 30° weather-shedding slope. Every roof rafter design is 100% pre-assembled and test-fitted in our Chandigarh factory before customer shipment.',
      image: '/images/silos/detail-3.jpg',
      specs: ['30° roof slope voids snow and rain', 'Factory pre-fit rafter validation', 'Tested for catwalk and conveyor live loads'],
    },
    {
      title: 'Bolt-On Base Angle Foundation Engineering',
      desc: 'Unlike competitors who roll the angle directly into the sheet, Bali Group utilizes heavy bolt-on structural base angles with industrial foundation sealers to provide an impenetrable hermetic barrier.',
      image: '/images/silos/detail-4.jpg',
      specs: ['Heavy structural base angle steel', 'Impenetrable foundation weather-seal', 'Seismic anchoring compliance'],
    },
    {
      title: 'MHE Fabrication, Conveyors & Bucket Elevators',
      desc: 'Dedicated fabrication facility for material handling equipment. Heavy-gauge elevator heads, boot pulleys with self-cleaning wing pulleys, and drag chain conveyors with UHMW wear flights.',
      image: '/images/silos/detail-5.jpg',
      specs: ['Up to 1,000 TPH continuous throughput', 'Heavy UHMW replaceable liners', 'Shaft-mounted industrial geared drives'],
    },
    {
      title: 'Cleaners, Aeration Fans & Electrical Automation',
      desc: 'Integrated manufacturing of rotary drum cleaners, high-static centrifugal aeration fans, and motorized transition valves for automated grain routing.',
      image: '/images/silos/detail-6.jpg',
      specs: ['High-static backward curved centrifugal fans', 'Perforated galvanized floor systems', 'PLC / SCADA automated batch routing'],
    },
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-brand-black text-white py-20 relative overflow-hidden border-b-4 border-brand-yellow">
        <div className="container-custom relative z-10">
          <div className="badge-yellow mb-4 text-brand-yellow">
            STATE-OF-THE-ART PRODUCTION
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            Industrial Manufacturing Capabilities
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            Uncompromising structural fabrication backed by automated CNC lines, heavy roll forming, and 100% pre-assembly factory verification.
          </p>
        </div>
      </section>

      {/* Intro Overview */}
      <section className="py-16 border-b border-brand-border-grey">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-heading font-extrabold text-brand-black">
              Engineering Excellence Built On Heavy Galvanized Steel
            </h2>
            <p className="text-brand-text-grey text-base mt-4 leading-relaxed">
              At Bali Group, manufacturing is not merely assembly — it is the continuous application of strict metallurgy, certified zinc coating weights (350–600 GSM), and computer-monitored tolerances. Every single steel coil is tested for tensile strength, yield point, and elongation prior to roll forming.
            </p>
          </div>
        </div>
      </section>

      {/* Production Facilities Walkthrough */}
      <section className="py-16 bg-brand-light-grey">
        <div className="container-custom space-y-16">
          {manufacturingSteps.map((step, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div 
                key={step.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 border border-brand-border-grey shadow-sm"
              >
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative overflow-hidden border border-brand-border-grey">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-[320px] object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-brand-black text-brand-yellow text-xs font-heading font-bold uppercase px-3 py-1 border-l-2 border-brand-yellow">
                      PROCESS 0{idx + 1}
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h3 className="font-heading font-extrabold text-2xl text-brand-black">
                    {step.title}
                  </h3>
                  <p className="text-brand-text-grey text-sm sm:text-base leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {step.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-yellow-hover shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-brand-black">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Factory Inspection CTA */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-brand-black text-white p-10 border-t-4 border-brand-yellow flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold">
                Schedule an In-Person Factory Audit
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                We welcome prospective clients, consulting engineers, and procurement delegations to inspect our manufacturing lines in Industrial Area Phase-2, Chandigarh.
              </p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="btn-primary uppercase text-xs tracking-wider font-bold shrink-0 px-8 py-4"
            >
              Request Plant Tour & RFQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
