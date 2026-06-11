"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects, getAllServices, getAllTechs, getAllSocials } from "@/app/services/portfolio.service";
import { getContacts } from "@/app/services/contact.service";
import { FiBriefcase, FiLayers, FiCpu, FiShare2, FiMail, FiArrowRight } from "react-icons/fi";

const statCards = [
  { label: "Projects", icon: FiBriefcase, href: "/admin/projects", key: "projects", color: "from-[#ff014f]/20 to-[#ff014f]/5",   iconColor: "text-[#ff014f]" },
  { label: "Services", icon: FiLayers,    href: "/admin/services", key: "services", color: "from-[#6366f1]/20 to-[#6366f1]/5",   iconColor: "text-[#6366f1]" },
  { label: "Tech",     icon: FiCpu,       href: "/admin/tech",     key: "techs",    color: "from-[#22c55e]/20 to-[#22c55e]/5",   iconColor: "text-[#22c55e]" },
  { label: "Socials",  icon: FiShare2,    href: "/admin/socials",  key: "socials",  color: "from-[#f59e0b]/20 to-[#f59e0b]/5",   iconColor: "text-[#f59e0b]" },
  { label: "Contacts", icon: FiMail,      href: "/admin/contacts", key: "contacts", color: "from-[#06b6d4]/20 to-[#06b6d4]/5",   iconColor: "text-[#06b6d4]" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, sv, t, so, c] = await Promise.allSettled([
          getAllProjects(),
          getAllServices(),
          getAllTechs(),
          getAllSocials(),
          getContacts(1, 5),
        ]);
        setCounts({
          projects: p.status  === "fulfilled" ? p.value?.data?.projects?.length ?? 0  : 0,
          services: sv.status === "fulfilled" ? sv.value?.data?.services?.length ?? 0 : 0,
          techs:    t.status  === "fulfilled" ? t.value?.data?.techs?.length ?? 0     : 0,
          socials:  so.status === "fulfilled" ? so.value?.data?.socials?.length ?? 0  : 0,
          contacts: c.status  === "fulfilled" ? c.value?.data?.total ?? 0             : 0,
        });
        if (c.status === "fulfilled") setRecentContacts(c.value?.data?.contacts ?? []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-[#878e99] text-sm mt-1">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {statCards.map(({ label, icon: Icon, href, key, color, iconColor }) => (
          <Link
            key={key}
            href={href}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} border border-white/5 p-5 flex flex-col gap-3 hover:border-white/10 transition-all duration-300`}
          >
            <div className={`${iconColor} text-2xl`}><Icon /></div>
            <div>
              <p className="text-[#878e99] text-xs uppercase tracking-widest">{label}</p>
              <p className="text-white text-2xl font-bold mt-0.5">
                {loading
                  ? <span className="inline-block w-8 h-6 bg-white/10 rounded animate-pulse" />
                  : counts[key] ?? 0}
              </p>
            </div>
            <FiArrowRight className="absolute bottom-4 right-4 text-white/20 group-hover:text-white/50 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      {/* Recent contacts */}
      <div className="rounded-2xl bg-[#1a1d21] border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold">Recent Contacts</h2>
          <Link href="/admin/contacts" className="text-xs text-[#ff014f] hover:underline flex items-center gap-1">
            View all <FiArrowRight />
          </Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentContacts.length === 0 ? (
          <p className="text-[#878e99] text-sm p-6">No contacts yet.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {recentContacts.map((c) => (
              <Link
                key={c.id}
                href="/admin/contacts"
                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-all duration-150"
              >
                <div>
                  <p className="text-[#c4cfde] text-sm font-medium">{c.name}</p>
                  <p className="text-[#878e99] text-xs">{c.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  {!c.isRead && (
                    <span className="text-[10px] font-semibold bg-[#ff014f]/20 text-[#ff014f] px-2 py-0.5 rounded-full uppercase tracking-widest">
                      New
                    </span>
                  )}
                  <p className="text-[#878e99] text-xs hidden sm:block">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
