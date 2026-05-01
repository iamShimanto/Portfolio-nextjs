"use client";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="relative min-h-[calc(100vh-82px)] overflow-hidden px-6 py-16 sm:px-10">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,1,79,0.24),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(160deg,#1b1f24_0%,#111315_100%)]"
			/>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-10 top-24 h-44 w-44 rounded-full border border-white/10 blur-[1px] animate-[floatOrb_7s_ease-in-out_infinite]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-8 bottom-20 h-56 w-56 rounded-full border border-brand/30 animate-[floatOrb_9s_ease-in-out_infinite_reverse]"
			/>

			<section className="relative mx-auto flex max-w-5xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-linear-to-br from-[#1f2227]/95 to-[#17191d]/95 p-8 text-center shadow-[18px_18px_35px_#0f1114,-14px_-14px_30px_#2a2e33] backdrop-blur-sm sm:p-14 animate-[fadeUp_.7s_ease-out]">
				<p className="mb-4 inline-flex rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand animate-[fadeUp_.9s_ease-out]">
					Error 404
				</p>

				<h1 className="text-6xl font-black leading-none text-white sm:text-8xl [text-shadow:0_0_28px_rgba(255,1,79,0.25)] animate-[fadeUp_1.1s_ease-out]">
					PAGE LOST
				</h1>

				<h2 className="mt-4 text-xl font-semibold text-[#d7deea] sm:text-2xl animate-[fadeUp_1.3s_ease-out]">
					This route does not exist anymore
				</h2>

				<p className="mt-5 max-w-2xl text-sm leading-7 text-[#9ca7b8] sm:text-base animate-[fadeUp_1.45s_ease-out]">
					The page you are trying to open might have been moved, deleted, or the
					URL may be incorrect. Use one of the actions below to get back on
					track.
				</p>

				<div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row animate-[fadeUp_1.6s_ease-out]">
					<Link
						href="/"
						className="w-full rounded-xl border border-brand/40 bg-brand px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_rgba(255,1,79,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#ff2a6d] sm:w-auto"
					>
						Back To Home
					</Link>

					<Link
						href="/#contact"
						className="w-full rounded-xl border border-white/20 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#dce3ef] transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/5 sm:w-auto"
					>
						Contact Me
					</Link>
				</div>
			</section>

			<style jsx>{`
				@keyframes fadeUp {
					0% {
						opacity: 0;
						transform: translateY(18px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes floatOrb {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-16px);
					}
				}
			`}</style>
		</main>
	);
}
