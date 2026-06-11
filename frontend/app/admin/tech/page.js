"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getAllTechs, createTech, updateTech, deleteTech } from "@/app/services/portfolio.service";
import ConfirmModal from "../components/ConfirmModal";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { renderIcon } from "@/app/lib/iconRenderer";

const emptyForm = { icon: "", iconColor: "#ffffff", name: "", description: "", order: "0", isVisible: true };

export default function TechPage() {
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
    try { const res = await getAllTechs(); setItems(res?.data?.techs ?? []); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (t) => {
    setForm({ icon: t.icon, iconColor: t.iconColor ?? "#ffffff", name: t.name, description: t.description, order: String(t.order), isVisible: t.isVisible });
    setEditId(t.id); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.icon) { showToast.error("Error", "Icon name is required"); return; }
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      const res = editId ? await updateTech(editId, payload) : await createTech(payload);
      if (res?.success) { showToast.success("Saved", editId ? "Tech updated" : "Tech created"); setShowForm(false); load(); }
      else showToast.error("Error", res?.message || "Failed");
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteTech(deleteTarget);
      if (res?.success) { showToast.success("Deleted", "Tech removed"); setDeleteTarget(null); load(); }
      else showToast.error("Error", res?.message);
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
          <p className="text-[#878e99] text-sm mt-1">Manage the technologies section.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#ff014f] hover:bg-[#ff014f]/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer">
          <FiPlus /> Add Tech
        </button>
      </div>

      {/* Icon reference hint */}
      <div className="mb-5 p-4 rounded-xl bg-[#1a1d21] border border-white/5 text-xs text-[#878e99]">
        Icon names from <span className="text-[#ff014f]">react-icons</span> — e.g.{" "}
        <code className="bg-white/5 px-1 rounded">FaNodeJs</code>,{" "}
        <code className="bg-white/5 px-1 rounded">SiDocker</code>,{" "}
        <code className="bg-white/5 px-1 rounded">SiPostgresql</code>.
        Full list: <span className="text-[#ff014f]">react-icons.github.io/react-icons</span>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-[#1a1d21] rounded-2xl animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-[#878e99]">No tech items yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl bg-[#1a1d21] border border-white/5 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#212428] flex items-center justify-center text-2xl shrink-0" style={{ color: t.iconColor }}>
                {renderIcon(t.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">{t.name}</h3>
                <p className="text-[#878e99] text-xs line-clamp-1">{t.description}</p>
                {!t.isVisible && <span className="text-[10px] text-[#878e99]">Hidden</span>}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => openEdit(t)} className="text-[#878e99] hover:text-white transition cursor-pointer"><FiEdit2 /></button>
                <button onClick={() => setDeleteTarget(t.id)} className="text-[#878e99] hover:text-[#ff014f] transition cursor-pointer"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a1d21] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white font-semibold">{editId ? "Edit Tech" : "New Tech"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#878e99] hover:text-white cursor-pointer"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Icon preview */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#212428] flex items-center justify-center text-3xl shrink-0" style={{ color: form.iconColor || "#ffffff" }}>
                  {form.icon ? renderIcon(form.icon) : <span className="text-[#878e99] text-xs">Icon</span>}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">Icon Name</label>
                    <input type="text" value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} placeholder="FaNodeJs"
                      className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-1">Icon Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.iconColor} onChange={(e) => setForm((p) => ({ ...p, iconColor: e.target.value }))}
                        className="w-9 h-9 rounded-lg border border-white/10 bg-[#212428] cursor-pointer p-0.5" />
                      <input type="text" value={form.iconColor} onChange={(e) => setForm((p) => ({ ...p, iconColor: e.target.value }))} placeholder="#ffffff"
                        className="flex-1 bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff014f]/50 transition placeholder:text-[#878e99]/50" />
                    </div>
                  </div>
                </div>
              </div>

              {[
                { label: "Name",        key: "name",        placeholder: "Node.js" },
                { label: "Description", key: "description", placeholder: "Server-side JavaScript runtime." },
                { label: "Order",       key: "order",       placeholder: "0", type: "number" },
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
                {saving ? "Saving..." : editId ? "Update Tech" : "Create Tech"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal open={!!deleteTarget} message="Delete this tech item?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
