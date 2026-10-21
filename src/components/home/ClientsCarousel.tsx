import React from 'react';

export const ClientsCarousel: React.FC = () => {
  const clients = [
    { name: 'Client 1', logo: '/images/clients/c1.png' },
    { name: 'Client 2', logo: '/images/clients/c2.png' },
    { name: 'Client 3', logo: '/images/clients/c3.png' },
    { name: 'Client 4', logo: '/images/clients/c4.png' },
    { name: 'Client 5', logo: '/images/clients/c5.png' },
    { name: 'Client 6', logo: '/images/clients/c6.png' },
  ];

  return (
    <div className="bg-white py-10 border-b border-brand-border-grey">
      <div className="container-custom">
        <p className="text-center text-xs font-heading font-extrabold uppercase tracking-widest text-brand-text-grey mb-6">
          Trusted By Major Grain Processors, Port Terminals & Distilleries
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center justify-items-center opacity-75 hover:opacity-100 transition-opacity">
          {clients.map((c, idx) => (
            <div key={idx} className="h-12 flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all">
              <img 
                src={c.logo} 
                alt={c.name}
                className="max-h-8 sm:max-h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
