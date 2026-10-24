import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  RotateCcw, 
  Check, 
  FolderOpen, 
  ExternalLink, 
  X, 
  Search,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export interface AdminImagePickerProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  description?: string;
  defaultFallback?: string;
  category?: 'all' | 'silo' | 'project' | 'facility' | 'general';
  aspectRatioLabel?: string;
  allowEmpty?: boolean;
}

export const AdminImagePicker: React.FC<AdminImagePickerProps> = ({
  label,
  value,
  onChange,
  description,
  defaultFallback,
  category = 'all',
  aspectRatioLabel,
  allowEmpty = true,
}) => {
  const { mediaAssets, uploadMediaAsset } = useCMS();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [manualInputOpen, setManualInputOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState(value);

  // Sync manual input when value changes externally
  React.useEffect(() => {
    setCustomUrl(value);
  }, [value]);

  const showTemporaryNotice = (msg: string) => {
    setUploadNotice(msg);
    setTimeout(() => setUploadNotice(null), 3000);
  };

  // 1. Direct File Upload via FileReader (Permanent Base64 in LocalStorage)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG, AVIF).');
      return;
    }

    // Limit to reasonable size for local storage (max 3MB per image)
    if (file.size > 3.5 * 1024 * 1024) {
      alert('Image file is larger than 3.5MB. For best performance, please upload an image under 3.5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        // Register in media assets library so it is reusable
        uploadMediaAsset({
          filename: file.name,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          alt_text: `Bali Group ${file.name}`,
          url: dataUrl,
          size_bytes: file.size,
          mime_type: file.type,
          category: category === 'all' ? 'general' : category,
        });

        // Set value on target field
        onChange(dataUrl);
        showTemporaryNotice('Image uploaded and applied!');
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  // 2. Remove / Clear Image
  const handleRemove = () => {
    onChange('');
    setCustomUrl('');
    showTemporaryNotice('Image removed.');
  };

  // 3. Reset to default fallback
  const handleResetToDefault = () => {
    if (defaultFallback) {
      onChange(defaultFallback);
      setCustomUrl(defaultFallback);
      showTemporaryNotice('Reset to default image.');
    }
  };

  // 4. Manual URL Apply
  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(customUrl.trim());
    setManualInputOpen(false);
    showTemporaryNotice('URL applied.');
  };

  const [modalCategory, setModalCategory] = useState<string>('all');

  // Filter media library
  const filteredLibrary = mediaAssets
    .filter(a => modalCategory === 'all' || a.category === modalCategory)
    .filter(a => {
      if (!librarySearch.trim()) return true;
      const q = librarySearch.toLowerCase();
      return a.filename.toLowerCase().includes(q) || a.title.toLowerCase().includes(q);
    });

  const hasImage = Boolean(value && value.trim() !== '');
  const isDefault = Boolean(defaultFallback && value === defaultFallback);

  return (
    <div className="space-y-2 p-3.5 bg-[#FAFBFD] border border-brand-border-grey rounded-sm">
      {/* Header / Label */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-brand-text-grey mt-0.5">{description}</p>
          )}
        </div>

        {aspectRatioLabel && (
          <span className="text-[10px] font-mono-tech px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200">
            {aspectRatioLabel}
          </span>
        )}
      </div>

      {/* Main Preview & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-2.5 border border-brand-border-grey">
        {/* Thumbnail Preview Area */}
        <div className="relative w-24 h-20 sm:w-28 sm:h-20 bg-gray-100 border border-brand-border-grey overflow-hidden flex items-center justify-center shrink-0 group">
          {hasImage ? (
            <>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultFallback || '/images/silos/flat-bottom1.jpg';
                }}
              />
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                title="View original image"
                className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
              >
                <ExternalLink className="w-4 h-4 text-brand-yellow" />
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 p-1 text-center">
              <ImageIcon className="w-6 h-6 mb-1 text-gray-300" />
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold">No Image</span>
            </div>
          )}
        </div>

        {/* Info & Action Buttons */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* File path or status description */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 truncate">
            <span className="truncate max-w-[280px]" title={value || 'No image set'}>
              {hasImage ? (
                value.startsWith('data:') ? 'Custom Uploaded Image (Base64)' : value
              ) : (
                <span className="text-red-500 font-semibold italic">Image removed / No image assigned</span>
              )}
            </span>

            {isDefault && hasImage && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                Default
              </span>
            )}
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-brand-yellow text-brand-black hover:bg-yellow-400 border border-brand-yellow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* 2. Choose from Media Library */}
            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="px-2.5 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider bg-brand-light-grey hover:bg-gray-200 text-brand-black border border-brand-border-grey flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-gray-600" />
              <span>Media Library</span>
            </button>

            {/* 3. Enter Custom URL */}
            <button
              type="button"
              onClick={() => setManualInputOpen(!manualInputOpen)}
              className="px-2.5 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider bg-white hover:bg-gray-100 text-brand-black border border-brand-border-grey transition-colors cursor-pointer"
            >
              <span>{manualInputOpen ? 'Close URL' : 'Paste URL'}</span>
            </button>

            {/* 4. REMOVE / CLEAR BUTTON */}
            {hasImage && allowEmpty && (
              <button
                type="button"
                onClick={handleRemove}
                title="Remove this image completely"
                className="px-2.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 hover:border-red-600 flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}

            {/* 5. Reset to default (if applicable) */}
            {defaultFallback && !isDefault && (
              <button
                type="button"
                onClick={handleResetToDefault}
                title="Restore default image"
                className="px-2 py-1 text-xs text-gray-500 hover:text-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[10px]">Restore Default</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Temporary Notification */}
      {uploadNotice && (
        <div className="flex items-center gap-2 p-1.5 px-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium">
          <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* Manual URL Input Bar (Collapsible) */}
      {manualInputOpen && (
        <form onSubmit={handleApplyCustomUrl} className="flex gap-2 pt-1 animate-in fade-in">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="e.g. /images/silos/flat-bottom1.jpg or https://..."
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-brand-border-grey focus:border-brand-black font-mono"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold uppercase bg-brand-black text-white hover:bg-neutral-800 cursor-pointer"
          >
            Apply
          </button>
        </form>
      )}

      {/* Modal / Overlay: Select from Media Library */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-brand-yellow shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-light-grey">
              <div>
                <h3 className="font-heading font-extrabold text-sm uppercase text-brand-black">
                  Select Image from Media Assets
                </h3>
                <p className="text-[11px] text-brand-text-grey">
                  Click any image below to apply it to "{label}".
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="p-1.5 text-gray-400 hover:text-brand-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar & Category Filters */}
            <div className="p-3 bg-brand-light-grey border-b border-brand-border-grey space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-2 shrink-0" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search media files by name..."
                    className="w-full bg-white pl-8 pr-2.5 py-1.5 text-xs border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-brand-yellow text-brand-black hover:bg-yellow-400 border border-brand-yellow flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {[
                  { id: 'all', label: 'All Images' },
                  { id: 'silo', label: 'Silos' },
                  { id: 'project', label: 'Projects' },
                  { id: 'facility', label: 'Facilities' },
                  { id: 'general', label: 'Brand & General' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setModalCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                      modalCategory === cat.id
                        ? 'bg-brand-black text-white font-bold'
                        : 'bg-white text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredLibrary.length > 0 ? (
                filteredLibrary.map((asset) => {
                  const isSelected = value === asset.url;
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        onChange(asset.url);
                        setCustomUrl(asset.url);
                        setIsLibraryOpen(false);
                        showTemporaryNotice(`Selected ${asset.filename}`);
                      }}
                      className={`group relative text-left border-2 transition-all p-1.5 flex flex-col justify-between bg-white cursor-pointer ${
                        isSelected 
                          ? 'border-brand-yellow shadow-md ring-2 ring-brand-yellow/30' 
                          : 'border-gray-200 hover:border-brand-black hover:shadow-sm'
                      }`}
                    >
                      <div className="w-full h-24 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={asset.url}
                          alt={asset.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="mt-1.5 truncate">
                        <p className="text-[11px] font-semibold text-brand-black truncate">
                          {asset.title || asset.filename}
                        </p>
                        <p className="text-[9px] font-mono text-gray-400 truncate">
                          {asset.filename}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-brand-yellow text-brand-black p-0.5 rounded-full shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-gray-400 text-xs">
                  No matching images found in media library.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-brand-light-grey border-t border-brand-border-grey flex justify-between items-center text-xs">
              <span className="text-[11px] text-gray-500 font-mono">
                {filteredLibrary.length} images available
              </span>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="px-4 py-1.5 bg-brand-black text-white text-xs font-heading font-bold uppercase hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
