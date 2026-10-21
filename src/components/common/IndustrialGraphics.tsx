import React from 'react';

/**
 * Editorial Section Label:
 * Standardized architectural numbering (e.g., 01 / SOLUTIONS) with fine yellow details
 */
export interface SectionEditorialTagProps {
  number: string;
  category: string;
  spec?: string;
  light?: boolean;
  className?: string;
}

export const SectionEditorialTag: React.FC<SectionEditorialTagProps> = ({
  number,
  category,
  spec,
  light = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 font-mono-tech select-none mb-3 ${className}`}>
      {/* Category Pill with Yellow Edge */}
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${
          light
            ? 'bg-white/10 text-brand-yellow border-l-2 border-brand-yellow'
            : 'bg-brand-yellow/15 text-brand-black border-l-2 border-brand-yellow'
        }`}
      >
        <span className="text-brand-yellow font-black">{number}</span>
        <span className="opacity-40">/</span>
        <span className={light ? 'text-white' : 'text-brand-black'}>{category}</span>
      </div>

      {/* Hairline Divider with Center Accent */}
      <div className="flex-1 max-w-[48px] h-px bg-brand-border-grey hidden sm:block opacity-70" />

      {/* Optional Technical Specification Readout */}
      {spec && (
        <span
          className={`text-[10px] uppercase tracking-wider hidden md:inline-block ${
            light ? 'text-gray-400' : 'text-brand-text-grey'
          }`}
        >
          // {spec}
        </span>
      )}
    </div>
  );
};

/**
 * Architectural Drafting Corner Registration Marks:
 * Adds subtle technical crosshairs/corner brackets to engineering cards
 */
export interface CornerMarksProps {
  size?: number;
  className?: string;
  variant?: 'corners' | 'crosshair';
  color?: string;
}

export const CornerMarks: React.FC<CornerMarksProps> = ({
  className = '',
  color = 'border-brand-border-grey group-hover:border-brand-yellow transition-colors',
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      {/* Top-Left */}
      <span className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${color}`} />
      {/* Top-Right */}
      <span className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r ${color}`} />
      {/* Bottom-Left */}
      <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l ${color}`} />
      {/* Bottom-Right */}
      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${color}`} />
    </div>
  );
};

/**
 * Measurement Tick Ruler:
 * Fine industrial millimeter-style ticks across horizontal divisions
 */
export const MeasurementRuler: React.FC<{ className?: string; ticks?: number }> = ({
  className = '',
  ticks = 24,
}) => {
  return (
    <div className={`w-full flex items-center justify-between overflow-hidden opacity-30 select-none py-1 ${className}`}>
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          className={`bg-brand-black/60 inline-block ${
            i % 4 === 0 ? 'h-2 w-0.5 bg-brand-black' : 'h-1 w-px'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * Technical Specification Badge:
 * Brushed galvanized metal appearance for engineering callouts
 */
export const TechnicalSpecBadge: React.FC<{
  label: string;
  value: string;
  className?: string;
}> = ({ label, value, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 border border-brand-border-grey rounded-none text-[11px] font-mono-tech ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
      <span className="text-gray-500 uppercase">{label}:</span>
      <span className="font-bold text-brand-black">{value}</span>
    </div>
  );
};
