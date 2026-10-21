import React, { useState } from 'react';
import { Users, Shield, ShieldCheck, UserCheck, Check, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { UserRole } from '../../types';

export const AdminUsers: React.FC = () => {
  const { currentUser, setUserRole } = useCMS();
  const [success, setSuccess] = useState('');

  const usersList = [
    {
      id: 'usr-admin-1',
      name: 'Bali Corporate Administrator',
      email: 'admin@baligroupsilos.com',
      role: currentUser?.email === 'admin@baligroupsilos.com' ? currentUser.role : 'super_admin',
      lastLogin: 'Active Now',
    },
    {
      id: 'usr-editor-1',
      name: 'Content & Engineering Editor',
      email: 'editor@baligroupsilos.com',
      role: currentUser?.email === 'editor@baligroupsilos.com' ? currentUser.role : 'editor',
      lastLogin: '1 hour ago',
    },
    {
      id: 'usr-viewer-1',
      name: 'Auditor & Technical Viewer',
      email: 'viewer@baligroupsilos.com',
      role: 'viewer',
      lastLogin: 'Yesterday',
    },
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    setSuccess(`Current active role switched to: ${newRole.toUpperCase()}`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Access Control & Governance
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Users & Role-Based Permissions
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Manage administrative privilege tiers (Super Admin, Editor, Viewer).
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {success}
        </div>
      )}

      {/* Role Switching for Live Demonstration & Testing */}
      <div className="bg-white p-6 border-2 border-brand-yellow shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-yellow-hover" />
          <h3 className="font-heading font-bold text-sm uppercase text-brand-black">
            Active Session Role Simulator
          </h3>
        </div>
        <p className="text-xs text-brand-text-grey">
          Toggle your current active session role to test permission enforcement across the CMS:
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          {(['super_admin', 'editor', 'viewer'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider border transition-all ${
                currentUser?.role === r
                  ? 'bg-brand-black text-brand-yellow border-brand-yellow shadow-sm'
                  : 'bg-white border-brand-border-grey text-brand-black hover:bg-brand-light-grey'
              }`}
            >
              {r.replace('_', ' ')} {currentUser?.role === r ? '(Active)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-brand-border-grey shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
              <th className="p-4">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Assigned Role</th>
              <th className="p-4">Activity Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {usersList.map((u) => (
              <tr key={u.id} className="hover:bg-brand-light-grey">
                <td className="p-4 font-bold text-brand-black">{u.name}</td>
                <td className="p-4 text-brand-text-grey font-mono">{u.email}</td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 font-heading font-bold text-[10px] uppercase ${
                    u.role === 'super_admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                    u.role === 'editor' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                    'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}>
                    {u.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-brand-text-grey">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Matrix */}
      <div className="bg-white p-6 border border-brand-border-grey shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-black border-b border-brand-light-grey pb-2">
          Security Role Privileges Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-brand-light-grey border-l-4 border-brand-yellow space-y-2">
            <h4 className="font-heading font-bold text-sm text-brand-black">Super Admin</h4>
            <ul className="space-y-1 text-brand-text-grey">
              <li>✓ Full read, create, edit, delete access</li>
              <li>✓ Publish changes to live site</li>
              <li>✓ Manage users and role memberships</li>
              <li>✓ Media deletion and permanent replacement</li>
              <li>✓ Access private customer enquiries</li>
            </ul>
          </div>

          <div className="p-4 bg-brand-light-grey border-l-4 border-blue-400 space-y-2">
            <h4 className="font-heading font-bold text-sm text-brand-black">Editor</h4>
            <ul className="space-y-1 text-brand-text-grey">
              <li>✓ Edit pages, text, and products</li>
              <li>✓ Upload images to media library</li>
              <li>✓ Save drafts and publish live</li>
              <li>✓ View and update customer enquiries</li>
              <li>✗ Cannot delete other administrative users</li>
            </ul>
          </div>

          <div className="p-4 bg-brand-light-grey border-l-4 border-gray-400 space-y-2">
            <h4 className="font-heading font-bold text-sm text-brand-black">Viewer</h4>
            <ul className="space-y-1 text-brand-text-grey">
              <li>✓ Read-only administrative access</li>
              <li>✓ Preview drafts and inspect content</li>
              <li>✗ Cannot publish changes</li>
              <li>✗ Cannot modify media or delete files</li>
              <li>✗ Cannot view private customer leads</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
