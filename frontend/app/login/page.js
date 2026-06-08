"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/components/ui/Toast";
import { loginAdmin } from "@/app/services/auth.service";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading, setUser } = useAuth();
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast.error("Warning", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginAdmin(formData);

      if (response?.success) {
        // AuthContext এ user set করা হবে
        setUser(response.user);
        showToast.success("Login Successful", "You are being redirected to the home page");
        router.push("/");
      } else {
        showToast.error(
          "Login Failed",
          response?.message || "Please check your credentials and try again",
        );
      }
    } catch (error) {
      showToast.error(
        "Error",
        error?.message || "Internal Server Error, Please try again later",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#212428]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="bg-[#212428] text-primary">
      <section className="container flex items-center justify-center py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1f2125] p-6 shadow-2xl sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary">Login</h1>
            <p className="mt-3 text-sm text-secondary">
              Sign in to access the admin dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-primary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="admin@example.com"
                disabled={isLoading}
                className="w-full rounded-xl border border-white/10 bg-[#191b1f] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-secondary focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-primary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full rounded-xl border border-white/10 bg-[#191b1f] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-secondary focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold cursor-pointer text-white shadow-lg shadow-brand/20 transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
