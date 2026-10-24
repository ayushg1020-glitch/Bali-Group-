import React, { useRef } from 'react';
import { Plus, Trash2, Upload, FolderOpen, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export interface AdminGalleryPickerProps {
  label: string;
  images: string[];
  onChange: (newImages: string[]) => void;
  description?: string;
}

export const AdminGalleryPicker: React.FC<AdminGalleryPickerProps> = ({
  label,
  images = [],
  onChange,
  description,
}) => {
  const { uploadMediaAsset } = useCMS();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload handler for adding a new image to gallery
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          uploadMediaAsset({
            filename: file.name,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            alt_text: `Bali Group ${file.name}`,
            url: dataUrl,
            size_bytes: file.size,
            mime_type: file.type,
            category: 'general',
          });
          onChange([...images, dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Remove individual image from gallery
  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  // Clear all images
  const handleClearAll = () => {
    if (images.length === 0) return;
    if (confirm('Are you sure you want to remove all gallery images?')) {
      onChange([]);
    }
  };

  return (
    <div className="space-y-3 p-3.5 bg-[#FAFBFD] border border-brand-border-grey rounded-sm">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-brand-text-grey mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 text-xs font-heading font-bold uppercase bg-brand-yellow text-brand-black hover:bg-yellow-400 border border-brand-yellow flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Images
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

          {images.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2 py-1 text-[11px] text-red-600 hover:text-white hover:bg-red-600 border border-red-200 transition-colors cursor-pointer"
            >
              Clear All ({images.length})
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-1">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-brand-border-grey overflow-hidden shadow-2xs h-24 flex items-center justify-center"
            >
              <img
                src={imgUrl}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                }}
              />

              {/* Hover Overlay with Delete & View */}
              <div className="absolute inset-0 bg-brand-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                <a
                  href={imgUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white text-black hover:bg-brand-yellow rounded-xs"
                  title="View full"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 bg-red-600 text-white hover:bg-red-700 rounded-xs cursor-pointer"
                  title="Remove this image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute bottom-1 left-1 bg-brand-black/80 text-white text-[9px] font-mono px-1">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 border border-dashed border-gray-300 text-center text-gray-400 text-xs">
          No gallery images added yet. Click "+ Add Images" to upload photographs.
        </div>
      )}
    </div>
  );
};
