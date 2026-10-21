import React, { useState } from 'react';
import { 
  Upload, 
  Trash2, 
  Search, 
  Copy, 
  Check, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Image as ImageIcon,
  FileCheck,
  Eye,
  X
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { MediaAsset } from '../../types';

export const AdminMediaLibrary: React.FC = () => {
  const { 
    mediaAssets, 
    uploadMediaAsset, 
    deleteMediaAsset, 
    replaceMediaAsset, 
    checkMediaUsage,
    currentUser 
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletionWarning, setDeletionWarning] = useState<string | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [replacementUrl, setReplacementUrl] = useState('');

  // Filtering
  const filteredAssets = mediaAssets
    .filter(a => selectedCategory === 'all' || a.category === selectedCategory)
    .filter(a => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return a.filename.toLowerCase().includes(q) || a.title.toLowerCase().includes(q);
    });

  // Upload simulation / client-side handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate file extension
      const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
      if (!validExtensions.includes(file.type)) {
        alert(`File ${file.name} is not an allowed image format (JPG, PNG, WebP, AVIF).`);
        return;
      }

      // Create a local blob URL for immediate preview and testing
      const url = URL.createObjectURL(file);
      uploadMediaAsset({
        filename: file.name,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        alt_text: `Bali Group ${file.name}`,
        url,
        size_bytes: file.size,
        mime_type: file.type,
        category: 'general',
      });
    });

    e.target.value = '';
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = (asset: MediaAsset) => {
    setDeletionWarning(null);
    const result = deleteMediaAsset(asset.id);
    if (!result.success) {
      setDeletionWarning(result.message || 'Unable to delete image.');
    } else {
      setSelectedAsset(null);
    }
  };

  const handleExecuteReplacement = () => {
    if (!selectedAsset || !replacementUrl.trim()) return;
    replaceMediaAsset(selectedAsset.url, replacementUrl.trim());
    setIsReplacing(false);
    setReplacementUrl('');
    alert(`Successfully replaced references to ${selectedAsset.filename} with ${replacementUrl}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Asset Storage & Management
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Corporate Media Library
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Safe Supabase Storage pipeline with automatic reference tracking and safe deletion locks.
          </p>
        </div>

        <div>
          <label className="btn-primary text-xs uppercase tracking-wider font-bold py-2.5 px-4 cursor-pointer flex items-center gap-2 shadow-sm">
            <Upload className="w-4 h-4" /> Upload Images
            <input 
              type="file" 
              multiple 
              accept=".jpg,.jpeg,.png,.webp,.avif"
              onChange={handleFileUpload}
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {/* Safety Alert if Deletion Blocked */}
      {deletionWarning && (
        <div className="bg-amber-50 border-2 border-amber-400 p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-heading font-bold text-sm text-amber-900">Protected Reference Detected!</h4>
            <p className="mt-1 leading-relaxed">{deletionWarning}</p>
          </div>
          <button onClick={() => setDeletionWarning(null)} className="text-amber-700 hover:text-amber-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Category Filter Strip */}
      <div className="bg-white p-4 border border-brand-border-grey flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['all', 'silo', 'project', 'facility', 'general'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-black text-brand-yellow'
                  : 'bg-brand-light-grey text-brand-black hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Files' : `${cat}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename or title..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
          />
          <Search className="w-4 h-4 text-brand-text-grey absolute left-3 top-2" />
        </div>

      </div>

      {/* Media Grid & Inspector Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Thumbnails Grid (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 border border-brand-border-grey shadow-sm">
          <p className="text-xs font-heading font-bold uppercase tracking-wider text-brand-text-grey mb-4">
            Showing {filteredAssets.length} Media Assets
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => {
              const isSelected = selectedAsset?.id === asset.id;
              const usages = checkMediaUsage(asset.url);

              return (
                <div
                  key={asset.id}
                  onClick={() => { setSelectedAsset(asset); setDeletionWarning(null); setIsReplacing(false); }}
                  className={`group relative border-2 cursor-pointer transition-all overflow-hidden ${
                    isSelected ? 'border-brand-yellow shadow-md scale-102' : 'border-gray-200 hover:border-brand-black'
                  }`}
                >
                  <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={asset.url} 
                      alt={asset.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                      }}
                    />
                  </div>

                  <div className="p-2 bg-white">
                    <p className="text-xs font-heading font-bold text-brand-black truncate" title={asset.filename}>
                      {asset.filename}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-brand-text-grey mt-0.5">
                      <span>{(asset.size_bytes / 1024).toFixed(0)} KB</span>
                      {usages.length > 0 && (
                        <span className="font-bold text-amber-600 bg-amber-50 px-1 border border-amber-200" title={`Referenced in: ${usages.join(', ')}`}>
                          {usages.length} uses
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Asset Details / Inspector Pane (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 border border-brand-border-grey shadow-sm">
          {selectedAsset ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-brand-light-grey">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-black">
                  Asset Details
                </h3>
                <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Large Image Preview */}
              <div className="border border-brand-border-grey overflow-hidden h-44 bg-gray-50 flex items-center justify-center">
                <img 
                  src={selectedAsset.url} 
                  alt={selectedAsset.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-brand-text-grey font-semibold">Filename:</span>
                  <p className="font-bold text-brand-black truncate">{selectedAsset.filename}</p>
                </div>
                <div>
                  <span className="text-brand-text-grey font-semibold">MIME Type:</span>
                  <p className="text-brand-black">{selectedAsset.mime_type}</p>
                </div>
                <div>
                  <span className="text-brand-text-grey font-semibold">File Size:</span>
                  <p className="text-brand-black">{(selectedAsset.size_bytes / 1024).toFixed(1)} KB</p>
                </div>
                <div>
                  <span className="text-brand-text-grey font-semibold">Category:</span>
                  <p className="text-brand-black uppercase font-bold text-[10px]">{selectedAsset.category}</p>
                </div>
              </div>

              {/* URL with Copy Button */}
              <div>
                <label className="block text-[11px] font-bold text-brand-black mb-1">
                  Public Resource URL:
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    readOnly
                    value={selectedAsset.url}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-brand-light-grey border border-brand-border-grey truncate"
                  />
                  <button
                    onClick={() => handleCopyUrl(selectedAsset.url)}
                    className="px-2.5 py-1.5 bg-brand-black text-white hover:bg-neutral-800 text-xs font-heading font-bold"
                  >
                    {copiedUrl === selectedAsset.url ? <Check className="w-3.5 h-3.5 text-brand-yellow" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Reference Check */}
              <div className="p-3 bg-brand-light-grey border-l-2 border-brand-yellow text-xs">
                <span className="font-heading font-bold text-brand-black block">Active References:</span>
                {checkMediaUsage(selectedAsset.url).length > 0 ? (
                  <ul className="mt-1 space-y-0.5 text-[11px] text-brand-text-grey">
                    {checkMediaUsage(selectedAsset.url).map((ref, idx) => (
                      <li key={idx} className="flex items-center gap-1 text-amber-800">
                        • {ref}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-green-700 mt-1">
                    ✓ No active references found. Safe to delete.
                  </p>
                )}
              </div>

              {/* Replacement Workflow */}
              {isReplacing ? (
                <div className="p-3 bg-yellow-50 border border-brand-yellow text-xs space-y-2">
                  <span className="font-heading font-bold text-brand-black">Replace Asset Globally</span>
                  <p className="text-[11px] text-brand-text-grey">
                    Enter replacement image URL to substitute everywhere this image is referenced:
                  </p>
                  <input
                    type="text"
                    value={replacementUrl}
                    onChange={(e) => setReplacementUrl(e.target.value)}
                    placeholder="/images/silos/flat-bottom2.jpg"
                    className="w-full px-2.5 py-1 text-xs bg-white border border-brand-border-grey"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleExecuteReplacement}
                      className="btn-primary text-[10px] py-1 px-3 uppercase font-bold"
                    >
                      Confirm Replacement
                    </button>
                    <button
                      onClick={() => setIsReplacing(false)}
                      className="btn-secondary text-[10px] py-1 px-3 uppercase font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setIsReplacing(true)}
                    className="btn-secondary w-full py-2 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Replace References
                  </button>

                  <button
                    onClick={() => handleDelete(selectedAsset)}
                    className="w-full py-2 text-xs uppercase tracking-wider font-bold border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Asset Safely
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center text-brand-text-grey">
              <ImageIcon className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-xs font-heading font-bold text-brand-black">No Asset Selected</p>
              <p className="text-[11px] text-gray-400 mt-1">Click any thumbnail on the left to inspect file metadata, copy permitted URLs, or replace references.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
