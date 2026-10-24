import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Briefcase, 
  Star, 
  MapPin, 
  Check, 
  X, 
  ExternalLink 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ProjectItem } from '../../types';
import { AdminImagePicker } from '../../components/admin/AdminImagePicker';
import { AdminGalleryPicker } from '../../components/admin/AdminGalleryPicker';

export const AdminProjectsManager: React.FC = () => {
  const { projects, updateProjectDraft, addProjectDraft, deleteProjectDraft } = useCMS();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notice, setNotice] = useState('');

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isCreating) {
      addProjectDraft(editingProject);
      showNotice(`Added project: ${editingProject.title}`);
    } else {
      updateProjectDraft(editingProject);
      showNotice(`Updated: ${editingProject.title}`);
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProject({
      id: '',
      slug: 'new-grain-silo-project',
      title: 'New Commercial Grain Complex',
      category: 'Commercial Wheat Storage',
      location: 'Punjab, India',
      client_name: 'Agribusiness Client',
      capacity: '10,000 Metric Tonnes',
      commodity: 'Wheat Grain',
      year_completed: '2024',
      cover_image: '/images/projects/project-5.jpg',
      gallery_images: [
        '/images/projects/project-5.jpg',
        '/images/projects/project-6.jpg'
      ],
      description: 'Turnkey grain preservation and handling project description.',
      technical_specs: {
        'Total Capacity': '10,000 Tonnes',
        'Commodity': 'Wheat Grain',
        'Throughput': '150 TPH'
      },
      is_featured: true,
      order: projects.length + 1,
      published: true,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Project Showcase Manager
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Manage verified industrial installations, capacities, commodities, photography, and slugs.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="btn-primary text-xs uppercase tracking-wider font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white border border-brand-border-grey shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
                <th className="p-4">Cover</th>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Location</th>
                <th className="p-4">Capacity</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects
                .sort((a, b) => a.order - b.order)
                .map((proj) => (
                  <tr key={proj.id} className="hover:bg-brand-light-grey transition-colors">
                    <td className="p-4 w-20">
                      <img 
                        src={proj.cover_image} 
                        alt={proj.title} 
                        className="w-16 h-12 object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-heading font-bold text-sm text-brand-black">{proj.title}</p>
                      <p className="text-xs text-brand-text-grey font-mono">/projects/{proj.slug}</p>
                    </td>
                    <td className="p-4 text-xs font-medium text-brand-black">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-yellow-hover shrink-0" />
                        <span>{proj.location}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-brand-black">
                      {proj.capacity}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          updateProjectDraft({ ...proj, is_featured: !proj.is_featured });
                          showNotice(`Toggled featured for ${proj.title}`);
                        }}
                        className={`p-1.5 transition-colors ${
                          proj.is_featured ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${proj.is_featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          updateProjectDraft({ ...proj, published: !proj.published });
                          showNotice(`Status changed for ${proj.title}`);
                        }}
                        className={`px-2 py-0.5 text-[10px] font-heading font-bold uppercase ${
                          proj.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {proj.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditingProject(proj); setIsCreating(false); }}
                        className="p-1.5 text-brand-black hover:text-brand-yellow-hover"
                        title="Edit project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project ${proj.title}?`)) {
                            deleteProjectDraft(proj.id);
                            showNotice(`Deleted: ${proj.title}`);
                          }
                        }}
                        className="p-1.5 text-brand-text-grey hover:text-red-600"
                        title="Delete project"
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

      {/* Edit / Create Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-brand-yellow shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-brand-light-grey mb-4">
              <h3 className="font-heading font-extrabold text-lg text-brand-black">
                {isCreating ? 'Add Verified Project' : `Edit Project: ${editingProject.title}`}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-black mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">Slug (e.g. 10000-tonnes-wheat-silo) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-brand-black mb-1">Capacity *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.capacity}
                    onChange={(e) => setEditingProject({ ...editingProject, capacity: e.target.value })}
                    placeholder="10,000 Metric Tonnes"
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">Commodity Stored *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.commodity}
                    onChange={(e) => setEditingProject({ ...editingProject, commodity: e.target.value })}
                    placeholder="Wheat Grain"
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">Commission Year</label>
                  <input
                    type="text"
                    value={editingProject.year_completed}
                    onChange={(e) => setEditingProject({ ...editingProject, year_completed: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-black mb-1">Project Site Location *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="Punjab, India"
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-black mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                  />
                </div>
              </div>

              {/* Project Cover Photograph (Changeable & Removable) */}
              <AdminImagePicker
                label="Project Cover Photograph"
                description="Primary verified project installation photograph shown on the portfolio and project detail pages."
                value={editingProject.cover_image}
                onChange={(newUrl) => setEditingProject({ ...editingProject, cover_image: newUrl })}
                defaultFallback="/images/silos/flat-bottom1.jpg"
                category="project"
                aspectRatioLabel="16:9 Landscape"
              />

              {/* Project Gallery Images (Add / Remove Any) */}
              <AdminGalleryPicker
                label="Site Installation & Inspection Gallery"
                description="Additional on-site commissioning and aerial drone photographs."
                images={editingProject.gallery_images || []}
                onChange={(newImages) => setEditingProject({ ...editingProject, gallery_images: newImages })}
              />

              <div>
                <label className="block font-bold text-brand-black mb-1">Project Description & Engineering Narrative</label>
                <textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                    className="accent-brand-yellow w-4 h-4"
                  />
                  <span className="font-bold text-brand-black">Feature on Homepage Gallery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="accent-brand-yellow w-4 h-4"
                  />
                  <span className="font-bold text-brand-black">Published Live</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-light-grey flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="btn-secondary text-xs uppercase font-bold py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs uppercase font-bold py-2 px-5"
                >
                  {isCreating ? 'Add Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
