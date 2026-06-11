"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getAllSocials, createSocial, updateSocial, deleteSocial } from "@/app/services/portfolio.service";
import ConfirmModal from "../components/ConfirmModal";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const emptyForm = { icon: "", name: "", url: "", order: "0", isVisible: true };

export default function SocialsPage() {
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
    try { const res = await getAllSocials(); setItems(res?.data?.socials ?? []); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (s) => {
    setForm({ icon: s.icon, name: s.name, url: s.url, order: String(s.order), isVisible: s.isVisible });
    setEditId(s.id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order), isVisible: form.isVisible };
      const res = editId ? await updateSocial(editId, payload) : await createSocial(payload);
      if (res?.success) { showToast.success("Saved", editId ? "Social updated" : "Social created"); setShowForm(false); load(); }
      else showToast.error("Error", res?.message || "Failed");
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteSocial(deleteTarget);
      if (res?.success) { showToast.success("Deleted", "Social link removed"); setDeleteTarget(null); load(); }
      else showToast.error("Error", res?.message);
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Social Links</h1>
          <p className="text-[#878e99] text-sm mt-1">Manage your social media links.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#ff014f] hover:bg-[#ff014f]/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer">
          <FiPlus /> Add Social
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-[#1a1d21] rounded-2xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-[#878e99]">No social links yet.</div>
      ) : (
        <div className="rounded-2xl bg-[#1a1d21] border border-white/5 divide-y divide-white/5 overflow-hidden">
          {items.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="text-xl text-[#ff014f] font-mono w-8 text-center">{s.icon}</span>
                <div>
                  <p className="text-[#c4cfde] text-sm font-medium">{s.name}</p>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#878e99] text-xs hover:text-[#ff014f] transition line-clamp-1 max-w-[200px] sm:max-w-sm">{s.url}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {!s.isVisible && <span className="text-[10px] bg-white/5 text-[#878e99] px-2 py-0.5 rounded-full">Hidden</span>}
                <button onClick={() => openEdit(s)} className="text-[#878e99] hover:text-white transition cursor-pointer"><FiEdit2 /></button>
                <button onClick={() => setDeleteTarget(s.id)} className="text-[#878e99] hover:text-[#ff014f] transition cursor-pointer"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a1d21] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-semibold">{editId ? "Edit Social" : "New Social Link"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#878e99] hover:text-white cursor-pointer"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                { label: "Icon (e.g. FaGithub)", key: "icon",  placeholder: "FaGithub" },
                { label: "Platform Name",        key: "name",  placeholder: "GitHub" },
                { label: "URL",                  key: "url",   placeholder: "https://github.com/...", type: "url" },
                { label: "Order",                key: "order", placeholder: "0", type: "number" },
              ].map(({ label, key, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                    className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50" />
                </div>
              ))}
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

      <ConfirmModal open={!!deleteTarget} message="Delete this social link?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
