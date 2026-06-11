"use client";

export default function ConfirmModal({ open, message, onConfirm, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1d21] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <p className="text-[#c4cfde] text-base mb-6">{message || "Are you sure?"}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm text-[#878e99] hover:text-white border border-white/10 hover:border-white/20 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm bg-[#ff014f] text-white hover:bg-[#ff014f]/80 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
