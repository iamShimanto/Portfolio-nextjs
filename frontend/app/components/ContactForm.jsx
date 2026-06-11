"use client";

import { useState } from "react";
import { showToast } from "@/app/components/ui/Toast";
import { createContact } from "@/app/services/contact.service";

export default function ContactForm() {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createContact({
        name: form.fullName,
        email: form.email,
        message: form.message,
        phone: form.phone,
      });
      if (result?.success) {
        showToast.success("Message sent", result.message || "Thank you for contacting");
        setForm({ fullName: "", phone: "", email: "", message: "" });
      } else {
        showToast.error("Send failed", result?.message || "Unable to send message");
      }
    } catch (error) {
      showToast.error("Error", error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">Your Name</p>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            className="w-full h-13.75 bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">Phone Number</p>
          <input
            type="number"
            value={form.phone}
            required
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full h-13.75 bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
          />
        </div>
      </div>

      <div className="mt-10">
        <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">Email</p>
        <input
          type="email"
          value={form.email}
          required
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="w-full h-13.75 bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
        />
      </div>

      <div className="mt-10">
        <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">Your Message</p>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full h-58.75 bg-[#191B1E] text-primary p-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-10 w-full py-4 flex justify-center items-center gap-2 text-brand uppercase text-sm font-medium font-poppins rounded-lg bg-linear-to-br from-[#1e2024] to-[#23272b] shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          "Send Message →"
        )}
      </button>
    </form>
  );
}
