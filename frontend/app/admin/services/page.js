"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getAllServices, createService, updateService, deleteService } from "@/app/services/portfolio.service";
import ConfirmModal from "../components/ConfirmModal";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const emptyForm = { icon: "", title: "", description: "", order: "0", isVisible: true };

export default function ServicesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const res = await getAllServices(); setItems(res?.data?.services ?? []); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (s) => {
    setForm({ icon: s.icon, title: s.title, description: s.description, order: String(s.order), isVisible: s.isVisible });
    setEditId(s.id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order), isVisible: form.isVisible };
      const res = editId ? await updateService(editId, payload) : await createService(payload);
      if (res?.success) { showToast.success("Saved", editId ? "Service updated" : "Service created"); setShowForm(false); load(); }
      else showToast.error("Error", res?.message || "Failed");
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteService(deleteTarget);
      if (res?.success) { showToast.success("Deleted", "Service removed"); setDeleteTarget(null); load(); }
      else showToast.error("Error", res?.message);
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-[#878e99] text-sm mt-1">Manage the "What I Do" section.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#ff014f] hover:bg-[#ff014f]/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer">
          <FiPlus /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-[#1a1d21] rounded-2xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-[#878e99]">No services yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s) => (
            <div key={s.id} className="rounded-2xl bg-[#1a1d21] border border-white/5 p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-[#ff014f] font-mono">{s.icon}</span>
                  <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(s)} className="text-[#878e99] hover:text-white transition cursor-pointer"><FiEdit2 /></button>
                  <button onClick={() => setDeleteTarget(s.id)} className="text-[#878e99] hover:text-[#ff014f] transition cursor-pointer"><FiTrash2 /></button>
                </div>
              </div>
              <p className="text-[#878e99] text-xs line-clamp-2">{s.description}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-white/5 text-[#878e99] px-2 py-0.5 rounded-full">Order: {s.order}</span>
                {!s.isVisible && <span className="text-[10px] bg-white/5 text-[#878e99] px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a1d21] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-semibold">{editId ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#878e99] hover:text-white cursor-pointer"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                { label: "Icon (react-icons name)", key: "icon",        placeholder: "FaBriefcase" },
                { label: "Title",                   key: "title",       placeholder: "Web Development" },
                { label: "Order",                   key: "order",       placeholder: "0", type: "number" },
              ].map(({ label, key, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                    className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">Description</label>
                <textarea value={form.description} rows={3} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Short description..."
                  className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50 resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => setForm((p) => ({ ...p, isVisible: !p.isVisible }))} className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 ${form.isVisible ? "bg-[#ff014f]" : "bg-white/10"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isVisible ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-[#c4cfde]">Visible on site</span>
              </label>
              <button type="submit" disabled={saving} className="w-full py-3 rounded-xl bg-[#ff014f] text-white text-sm font-semibold hover:bg-[#ff014f]/90 transition disabled:opacity-50 cursor-pointer">
                {saving ? "Saving..." : editId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal open={!!deleteTarget} message="Delete this service?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
