"use client";

import { useEffect, useRef, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getProfile, upsertProfile } from "@/app/services/portfolio.service";
import { FiUpload } from "react-icons/fi";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", title: "", bio: "", roles: "", resumeUrl: "" });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    getProfile()
      .then((res) => {
        const p = res?.data?.profile;
        if (p) {
          setForm({
            name: p.name ?? "",
            title: p.title ?? "",
            bio: p.bio ?? "",
            roles: (p.roles ?? []).join(", "),
            resumeUrl: p.resumeUrl ?? "",
          });
          setAvatarPreview(p.avatarUrl ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("title", form.title);
      fd.append("bio", form.bio);
      fd.append("resumeUrl", form.resumeUrl);
      const rolesArr = form.roles.split(",").map((r) => r.trim()).filter(Boolean);
      fd.append("roles", JSON.stringify(rolesArr));
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await upsertProfile(fd);
      if (res?.success) showToast.success("Saved", "Profile updated successfully");
      else showToast.error("Error", res?.message || "Failed to save");
    } catch (err) {
      showToast.error("Error", err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff014f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-[#878e99] text-sm mt-1">Manage your public profile information.</p>
      </div>

      <div className="rounded-2xl bg-[#1a1d21] border border-white/5 p-6 sm:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-2xl bg-[#212428] border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ff014f]/50 transition"
            >
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                : <FiUpload className="text-2xl text-[#878e99]" />
              }
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-sm text-[#ff014f] hover:underline cursor-pointer"
              >
                {avatarPreview ? "Change avatar" : "Upload avatar"}
              </button>
              <p className="text-xs text-[#878e99] mt-1">PNG, JPG, WEBP — max 5MB</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Fields */}
          {[
            { label: "Full Name",   key: "name",      type: "text",  placeholder: "Shimanto Sarkar" },
            { label: "Title",       key: "title",     type: "text",  placeholder: "Full Stack Developer" },
            { label: "Resume URL",  key: "resumeUrl", type: "url",   placeholder: "https://..." },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-2">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-2">Animated Roles</label>
            <input
              type="text"
              value={form.roles}
              onChange={(e) => setForm((p) => ({ ...p, roles: e.target.value }))}
              placeholder="Developer, Designer, Freelancer"
              className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50"
            />
            <p className="text-xs text-[#878e99] mt-1">Comma separated — shown in the animated hero text</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#878e99] mb-2">Bio</label>
            <textarea
              value={form.bio}
              rows={4}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Write a short bio about yourself..."
              className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-[#ff014f] text-white text-sm font-semibold hover:bg-[#ff014f]/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
