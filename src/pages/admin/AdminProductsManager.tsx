import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Layers, 
  Eye, 
  Check, 
  X, 
  Star, 
  Save, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SolutionItem } from '../../types';

export const AdminProductsManager: React.FC = () => {
  const { solutions, updateSolutionDraft, addSolutionDraft, deleteSolutionDraft, saveDraft, publishAllChanges } = useCMS();
  const [editingSolution, setEditingSolution] = useState<SolutionItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSolution) return;

    if (isCreating) {
      addSolutionDraft(editingSolution);
      showNotice(`Added new product: ${editingSolution.title}`);
    } else {
      updateSolutionDraft(editingSolution);
      showNotice(`Updated: ${editingSolution.title}`);
    }

    setEditingSolution(null);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingSolution({
      id: '',
      slug: 'new-product-system',
      title: 'New Silo Solution',
      category: 'Commercial Bulk Storage',
      short_description: 'Precision engineered storage bin description.',
      full_description: 'Full technical overview of the silo engineering system.',
      image_url: '/images/silos/flat-bottom1.jpg',
      gallery_images: ['/images/silos/flat-bottom1.jpg'],
      features: ['2.66" corrugation', 'Heavy galvanized steel sheets'],
      specifications: {
        'Storage Capacity': '1,000 MT to 10,000 MT',
        'Galvanization': '450 GSM',
        'Roof Pitch': '30° Slope'
      },
      is_featured: false,
      order: solutions.length + 1,
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Product Catalog & Engineering Systems
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Products & Solutions Management
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Configure silo categories, technical specifications, galleries, and homepage featured status.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-primary text-xs uppercase tracking-wider font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Solution
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {notification}
        </div>
      )}

      {/* Solutions Table */}
      <div className="bg-white border border-brand-border-grey shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
                <th className="p-4">Cover</th>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Order</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solutions
                .sort((a, b) => a.order - b.order)
                .map((sol) => (
                  <tr key={sol.id} className="hover:bg-brand-light-grey transition-colors">
                    <td className="p-4 w-20">
                      <img 
                        src={sol.image_url} 
                        alt={sol.title} 
                        className="w-16 h-12 object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-heading font-bold text-sm text-brand-black">{sol.title}</p>
                      <p className="text-xs text-brand-text-grey font-mono">/solutions/{sol.slug}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-brand-black">
                      {sol.category}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          updateSolutionDraft({ ...sol, is_featured: !sol.is_featured });
                          showNotice(`Toggled featured status for ${sol.title}`);
                        }}
                        className={`p-1.5 transition-colors ${
                          sol.is_featured ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${sol.is_featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          updateSolutionDraft({ ...sol, published: !sol.published });
                          showNotice(`Status changed for ${sol.title}`);
                        }}
                        className={`px-2 py-0.5 text-[10px] font-heading font-bold uppercase ${
                          sol.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {sol.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4 text-center font-bold text-xs text-brand-black">
                      {sol.order}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditingSolution(sol); setIsCreating(false); }}
                        className="p-1.5 text-brand-black hover:text-brand-yellow-hover"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${sol.title}?`)) {
                            deleteSolutionDraft(sol.id);
                            showNotice(`Deleted: ${sol.title}`);
                          }
                        }}
                        className="p-1.5 text-brand-text-grey hover:text-red-600"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal Dialogue */}
      {editingSolution && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-brand-yellow shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-brand-light-grey mb-4">
              <h3 className="font-heading font-extrabold text-lg text-brand-black">
                {isCreating ? 'Add New Silo Solution' : `Edit Solution: ${editingSolution.title}`}
              </h3>
              <button onClick={() => setEditingSolution(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-black mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingSolution.title}
                    onChange={(e) => setEditingSolution({ ...editingSolution, title: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">URL Slug (e.g. flat-bottom-silos) *</label>
                  <input
                    type="text"
                    required
                    value={editingSolution.slug}
                    onChange={(e) => setEditingSolution({ ...editingSolution, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-black mb-1">Category</label>
                  <input
                    type="text"
                    value={editingSolution.category}
                    onChange={(e) => setEditingSolution({ ...editingSolution, category: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingSolution.order}
                    onChange={(e) => setEditingSolution({ ...editingSolution, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-black mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  value={editingSolution.short_description}
                  onChange={(e) => setEditingSolution({ ...editingSolution, short_description: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-black mb-1">Full Engineering Overview</label>
                <textarea
                  rows={4}
                  value={editingSolution.full_description}
                  onChange={(e) => setEditingSolution({ ...editingSolution, full_description: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-black mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingSolution.image_url}
                  onChange={(e) => setEditingSolution({ ...editingSolution, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSolution.is_featured}
                    onChange={(e) => setEditingSolution({ ...editingSolution, is_featured: e.target.checked })}
                    className="accent-brand-yellow w-4 h-4"
                  />
                  <span className="font-bold text-brand-black">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSolution.published}
                    onChange={(e) => setEditingSolution({ ...editingSolution, published: e.target.checked })}
                    className="accent-brand-yellow w-4 h-4"
                  />
                  <span className="font-bold text-brand-black">Published Live</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-light-grey flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSolution(null)}
                  className="btn-secondary text-xs uppercase font-bold py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs uppercase font-bold py-2 px-5"
                >
                  {isCreating ? 'Create Solution' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
