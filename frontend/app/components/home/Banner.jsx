import Image from "next/image";
import Link from "next/link";
import { renderIcon } from "@/app/lib/iconRenderer";
import { SiDocker, SiPrisma } from "react-icons/si";
import { FaReact } from "react-icons/fa";

export default function Banner({ profile, socials }) {
  const name = profile?.name ?? "Shimanto Sarkar";
  const title = profile?.title ?? "Full Stack Web Developer";
  const bio =
    profile?.bio ??
    "I build fast, scalable web applications using Next.js, Node.js, and MongoDB — turning ideas into production-ready products.";
  const avatarUrl = profile?.avatarUrl ?? "/images/shimanto.webp";
  const roles = profile?.roles?.length
    ? profile.roles
    : ["Full Stack Developer.", "Next.js Developer.", "Backend Engineer."];

  return (
    <section
      id="iam"
      aria-label="About Shimanto Sarkar"
      className="py-19 banner"
    >
      <div className="container">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-7.5 xl:px-10">
          <div>
            <div className="sm:p-15 duration-300 rounded-2xl">
              <div data-aos="fade-up" className="text-main_colo">
                <p className="text-xl mb-5">Welcome to my portfolio</p>
              </div>

              <h1
                data-aos="fade-down"
                className="title leading-15 text-4xl sm:text-6xl text-white"
              >
                Hi, I&apos;m{" "}
                <span className="text-brand!">{name.split(" ")[0]}</span>
                <br />
                <span className="header-caption" id="page-top">
                  <span className="cd-headline clip is-full-width flex items-center gap-3 mt-4">
                    <span className="aa text-3xl sm:text-5xl md:text-6xl">
                      a{" "}
                    </span>
                    <span className="cd-words-wrapper text-3xl tracking-tighter sm:tracking-normal sm:text-5xl md:text-6xl">
                      {roles.map((role, i) => (
                        <b
                          key={i}
                          className={i === 0 ? "is-visible" : "is-hidden"}
                        >
                          {role.endsWith(".") ? role : `${role}.`}
                        </b>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>

              {bio && (
                <p
                  data-aos="zoom-in"
                  className="text-main_colo max-w-165 leading-7 tracking-widest mt-10"
                >
                  {bio}
                </p>
              )}

              <div className="botton_card mt-25 text-main_colo">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                  {socials.length > 0 && (
                    <div data-aos="fade-right" className="left_side">
                      <h2 className="text-base font-medium">Find me on</h2>
                      <div
                        className="icon"
                        role="list"
                        aria-label="Social media links"
                      >
                        {socials.map((s) => (
                          <Link
                            key={s.id}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${name} on ${s.name}`}
                            role="listitem"
                          >
                            {renderIcon(s.icon)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div data-aos="fade-left" className="left_side">
                    <p className="text-base font-medium">Best skill on</p>
                    <div className="icon" role="list" aria-label="Top skills">
                      <Link
                        href="https://www.prisma.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Prisma ORM"
                        role="listitem"
                      >
                        <SiPrisma
                          className="text-[24px] text-[#2D3748]"
                          aria-hidden="true"
                        />
                      </Link>
                      <Link
                        href="https://react.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="React.js"
                        role="listitem"
                      >
                        <FaReact
                          className="text-[24px] text-[#61DBFB] react"
                          aria-hidden="true"
                        />
                      </Link>
                      <Link
                        href="https://www.docker.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Docker"
                        role="listitem"
                      >
                        <SiDocker
                          className="text-[24px] text-[#2496ED]"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            className="card rounded-2xl h-120 sm:h-162.5 p-7.5 overflow-hidden"
          >
            <Image
              src={avatarUrl}
              width={500}
              height={400}
              className="scale-110"
              alt={`${name} — ${title}`}
              priority
            />
          </div>
        </div>
      </div>

      <script src="/js/jquery-1.12.4.min.js"></script>
      <script src="/js/text-type.js"></script>
    </section>
  );
}
