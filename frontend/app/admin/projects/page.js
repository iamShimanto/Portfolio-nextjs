"use client";

import { useEffect, useRef, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getAllProjects, createProject, updateProject, deleteProject } from "@/app/services/portfolio.service";
import ConfirmModal from "../components/ConfirmModal";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiEye, FiEyeOff } from "react-icons/fi";

const emptyForm = { title: "", description: "", liveUrl: "", githubUrl: "", order: "0", isVisible: true };

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAllProjects();
      setProjects(res?.data?.projects ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(null); setShowForm(true); };

  const openEdit = (p) => {
    setForm({ title: p.title, description: p.description, liveUrl: p.liveUrl ?? "", githubUrl: p.githubUrl ?? "", order: String(p.order), isVisible: p.isVisible });
    setEditId(p.id);
    setImagePreview(p.imageUrl);
    setImageFile(null);
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !imageFile) { showToast.error("Error", "Project image is required"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (imageFile) fd.append("image", imageFile);

      const res = editId ? await updateProject(editId, fd) : await createProject(fd);
      if (res?.success) {
        showToast.success("Saved", editId ? "Project updated" : "Project created");
        setShowForm(false);
        load();
      } else {
        showToast.error("Error", res?.message || "Failed");
      }
    } catch (err) {
      showToast.error("Error", err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await deleteProject(deleteTarget);
      if (res?.success) { showToast.success("Deleted", "Project removed"); setDeleteTarget(null); load(); }
      else showToast.error("Error", res?.message || "Failed");
    } catch (err) {
      showToast.error("Error", err?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-[#878e99] text-sm mt-1">Manage your portfolio projects.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#ff014f] hover:bg-[#ff014f]/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-[#1a1d21] rounded-2xl animate-pulse" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-[#878e99]">No projects yet. Add your first one!</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl bg-[#1a1d21] border border-white/5 overflow-hidden group">
              <div className="relative h-44 overflow-hidden">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                {!p.isVisible && (
                  <span className="absolute top-3 left-3 text-[10px] bg-black/60 text-[#878e99] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FiEyeOff className="text-xs" /> Hidden
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                    <p className="text-[#878e99] text-xs mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(p)} className="text-[#878e99] hover:text-white transition cursor-pointer">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => setDeleteTarget(p.id)} className="text-[#878e99] hover:text-[#ff014f] transition cursor-pointer">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] bg-white/5 text-[#878e99] px-2 py-0.5 rounded-full">Order: {p.order}</span>
                  <span className="text-[10px] bg-white/5 text-[#878e99] px-2 py-0.5 rounded-full">❤ {p.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a1d21] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-semibold">{editId ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#878e99] hover:text-white transition cursor-pointer"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image upload */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-2">Project Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative h-36 rounded-xl border border-dashed border-white/20 bg-[#212428] flex items-center justify-center cursor-pointer hover:border-[#ff014f]/50 overflow-hidden transition"
                >
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    : <div className="flex flex-col items-center gap-2 text-[#878e99]"><FiUpload className="text-2xl" /><span className="text-xs">Click to upload</span></div>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {[
                { label: "Title",       key: "title",       type: "text", placeholder: "Fashion Shop" },
                { label: "Description", key: "description", type: "text", placeholder: "A short description..." },
                { label: "Live URL",    key: "liveUrl",     type: "url",  placeholder: "https://..." },
                { label: "GitHub URL",  key: "githubUrl",   type: "url",  placeholder: "https://github.com/..." },
                { label: "Order",       key: "order",       type: "number", placeholder: "0" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50"
                  />
                </div>
              ))}

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setForm((p) => ({ ...p, isVisible: !p.isVisible }))}
                  className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 ${form.isVisible ? "bg-[#ff014f]" : "bg-white/10"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isVisible ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-[#c4cfde]">Visible on site</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-[#ff014f] text-white text-sm font-semibold hover:bg-[#ff014f]/90 transition disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : editId ? "Update Project" : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        message="Delete this project? This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
