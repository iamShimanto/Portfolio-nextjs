import Image from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { renderIcon } from "@/app/lib/iconRenderer";

export default function Footer({ profile, socials }) {
  const name  = profile?.name  ?? "Shimanto Sarkar";
  const title = profile?.title ?? "Full Stack Web Developer";
  const phone = profile?.phone ?? "+8801750658101";
  const email = profile?.email ?? "shimanto.dev.bd@gmail.com";

  return (
    <footer id="contact" aria-label="Contact section" className="mb-12">
      <div data-aos="fade-up" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-brand leading-3.5">Get In Touch</p>
          <h2 className="text-5xl font-bold text-primary leading-18 mt-3">
            Contact Me
          </h2>
          <p className="text-[#878E99] mt-3 text-base max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info card */}
          <div className="bg-[#212428] p-8 rounded-xl shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e]">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/images/contact1.png"
                alt={`${name} — ${title} contact`}
                className="w-full rounded-lg h-70 object-cover"
                width={500}
                height={280}
              />
            </div>
            <h3 className="text-[29px] font-bold text-[#E4E6EA] leading-11 mt-10 mb-1">
              {name}
            </h3>
            <p className="text-[#878E99] text-base mb-4">{title}</p>

            <address className="not-italic">
              <p className="text-[18px] text-[#878E99] mb-2">
                Phone:{" "}
                <a
                  href={`tel:${phone}`}
                  className="relative hover:text-brand after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-px after:bg-brand after:transition-all after:duration-300 transition-all duration-300"
                >
                  {phone}
                </a>
              </p>
              <p className="text-[18px] text-[#878E99] mb-2">
                Email:{" "}
                <a
                  href={`mailto:${email}`}
                  className="relative hover:text-brand after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-px after:bg-brand after:transition-all after:duration-300 transition-all duration-300"
                >
                  {email}
                </a>
              </p>
            </address>

            {socials.length > 0 && (
              <>
                <p className="mt-10 mb-6 text-lg text-primary font-medium">Find Me On</p>
                <nav aria-label="Social media links">
                  <div className="flex gap-6">
                    {socials.map((s) => (
                      <Link
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} on ${s.name}`}
                        className="w-15 h-15 flex items-center justify-center rounded-md text-primary text-lg bg-linear-to-r from-[#1E2024] to-[#23272B] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black/10"
                      >
                        {renderIcon(s.icon)}
                      </Link>
                    ))}
                  </div>
                </nav>
              </>
            )}
          </div>

          {/* Contact form — client component */}
          <div className="p-8 rounded-xl shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] bg-transparent">
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
