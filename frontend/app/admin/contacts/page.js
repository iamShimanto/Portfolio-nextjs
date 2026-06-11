"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { getContacts, deleteContact, replyContact, markContactAsRead } from "@/app/services/contact.service";
import ConfirmModal from "../components/ConfirmModal";
import { FiTrash2, FiX, FiMail, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [replyMsg, setReplyMsg] = useState("");
  const [replying, setReplying] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const limit = 10;

  const load = async () => {
    setLoading(true);
    try {
      const res = await getContacts(page, limit, search);
      setContacts(res?.data?.contacts ?? []);
      setTotal(res?.data?.total ?? 0);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [page, search]);

  const openContact = async (c) => {
    setSelected(c);
    setReplyMsg("");
    if (!c.isRead) {
      try {
        await markContactAsRead(c.id);
        setContacts((prev) => prev.map((x) => x.id === c.id ? { ...x, isRead: true } : x));
      } catch {}
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMsg.trim()) return;
    setReplying(true);
    try {
      const res = await replyContact(selected.id, replyMsg);
      if (res?.success) { showToast.success("Sent", "Reply sent successfully"); setReplyMsg(""); }
      else showToast.error("Error", res?.message || "Failed to send");
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setReplying(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteContact(deleteTarget);
      if (res?.success) {
        showToast.success("Deleted", "Contact removed");
        setDeleteTarget(null);
        if (selected?.id === deleteTarget) setSelected(null);
        load();
      } else showToast.error("Error", res?.message);
    } catch (err) { showToast.error("Error", err?.message); }
    finally { setDeleting(false); }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Contacts</h1>
        <p className="text-[#878e99] text-sm mt-1">{total} total messages</p>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#878e99]" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { setSearch(searchInput); setPage(1); } }}
          placeholder="Search by name or email..."
          className="w-full bg-[#1a1d21] border border-white/10 text-[#c4cfde] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#1a1d21] border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-[#878e99]">No contacts found.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {contacts.map((c) => (
              <div
                key={c.id}
                onClick={() => openContact(c)}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!c.isRead && <span className="w-2 h-2 rounded-full bg-[#ff014f] shrink-0" />}
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${c.isRead ? "text-[#c4cfde]" : "text-white"}`}>{c.name}</p>
                    <p className="text-[#878e99] text-xs truncate">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <p className="text-[#878e99] text-xs hidden md:block">{new Date(c.createdAt).toLocaleDateString()}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(c.id); }}
                    className="text-[#878e99] hover:text-[#ff014f] transition opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <p className="text-[#878e99] text-xs">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg text-[#878e99] hover:text-white hover:bg-white/5 disabled:opacity-30 transition cursor-pointer">
                <FiChevronLeft />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg text-[#878e99] hover:text-white hover:bg-white/5 disabled:opacity-30 transition cursor-pointer">
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#1a1d21] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
              <h2 className="text-white font-semibold">Message from {selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-[#878e99] hover:text-white transition cursor-pointer"><FiX className="text-xl" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#878e99] mb-1">Name</p>
                  <p className="text-[#c4cfde]">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#878e99] mb-1">Email</p>
                  <p className="text-[#c4cfde] break-all">{selected.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#878e99] mb-1">Phone</p>
                  <p className="text-[#c4cfde]">{selected.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#878e99] mb-1">Date</p>
                  <p className="text-[#c4cfde]">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#878e99] mb-2">Message</p>
                <p className="text-[#c4cfde] text-sm leading-relaxed bg-[#212428] rounded-xl p-4">{selected.message}</p>
              </div>

              {/* Reply form */}
              <form onSubmit={handleReply} className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#878e99]">Reply</p>
                <textarea
                  value={replyMsg}
                  onChange={(e) => setReplyMsg(e.target.value)}
                  rows={4}
                  placeholder="Type your reply..."
                  className="w-full bg-[#212428] border border-white/10 text-[#c4cfde] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ff014f]/50 focus:ring-2 focus:ring-[#ff014f]/10 transition placeholder:text-[#878e99]/50 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={replying || !replyMsg.trim()}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#ff014f] text-white text-sm font-semibold hover:bg-[#ff014f]/90 transition disabled:opacity-50 cursor-pointer"
                  >
                    <FiMail /> {replying ? "Sending..." : "Send Reply"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDeleteTarget(selected.id); setSelected(null); }}
                    className="px-4 py-2.5 rounded-xl border border-white/10 text-[#878e99] hover:text-[#ff014f] hover:border-[#ff014f]/30 transition text-sm cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal open={!!deleteTarget} message="Delete this contact message?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
