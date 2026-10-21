import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminLogin: React.FC = () => {
  const { login, currentUser } = useCMS();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@baligroupsilos.com');
  const [password, setPassword] = useState('BaliAdmin2025!');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to overview
  if (currentUser) {
    navigate('/admin/overview');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/admin/overview');
    } else {
      setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-grey flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="Bali Group"
              className="h-12 w-auto mx-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-heading font-extrabold text-2xl tracking-tight uppercase text-brand-black">
              BALI <span className="text-brand-yellow-hover">GROUP</span>
            </span>
          </Link>
          <h2 className="mt-4 text-2xl font-heading font-extrabold text-brand-black tracking-tight">
            Corporate CMS Administration
          </h2>
          <p className="mt-1 text-xs text-brand-text-grey">
            Protected management portal for Bali Group corporate assets and content.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 shadow-premium border-2 border-brand-border-grey sm:px-10">
          
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  placeholder="admin@baligroupsilos.com"
                />
                <Mail className="w-4 h-4 text-brand-text-grey absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  placeholder="••••••••••••"
                />
                <Lock className="w-4 h-4 text-brand-text-grey absolute left-3 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3.5 text-xs uppercase tracking-wider font-heading font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  'Verifying Security Tokens...'
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Secure Admin Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Reminder Box */}
          <div className="mt-6 pt-4 border-t border-brand-light-grey bg-brand-light-grey p-3 border-l-2 border-brand-yellow text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-black">
              <Info className="w-3.5 h-3.5 text-brand-yellow-hover" /> Initial Bootstrap Admin Credentials:
            </div>
            <p className="text-[11px] text-brand-text-grey">
              <strong>Super Admin:</strong> <code className="bg-white px-1">admin@baligroupsilos.com</code> / <code className="bg-white px-1">BaliAdmin2025!</code>
            </p>
            <p className="text-[11px] text-brand-text-grey">
              <strong>Editor:</strong> <code className="bg-white px-1">editor@baligroupsilos.com</code> / <code className="bg-white px-1">BaliEditor2025!</code>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-brand-text-grey hover:text-brand-black font-medium">
              ← Return to Public Website
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
