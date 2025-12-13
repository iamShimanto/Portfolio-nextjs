import {
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiPrisma,
  SiRedis,
  SiNginx,
} from "react-icons/si";

const technologies = [
  {
    icon: <FaNodeJs className="text-[40px] text-[#3C873A]" />,
    name: "Node.js",
    desc: "Building scalable server-side applications using event-driven architecture.",
  },
  {
    icon: <SiExpress className="text-[40px] text-[#f0db4f]" />,
    name: "Express.js",
    desc: "Designing secure and performant RESTful APIs with middleware-based architecture.",
  },
  {
    icon: <SiPostgresql className="text-[40px] text-[#336791]" />,
    name: "PostgreSQL",
    desc: "Relational database design with complex queries, indexing, and transactions.",
  },
  {
    icon: <SiMongodb className="text-[40px] text-[#4DB33D]" />,
    name: "MongoDB",
    desc: "Schema-flexible NoSQL database for high-performance document-based storage.",
  },
  // {
  //   icon: <SiPrisma className="text-[40px] text-[#2D3748]" />,
  //   name: "Prisma ORM",
  //   desc: "Type-safe database access with schema modeling and migrations.",
  // },
  {
    icon: <SiRedis className="text-[40px] text-[#DC382D]" />,
    name: "Redis",
    desc: "In-memory data store for caching, sessions, and rate limiting.",
  },
  {
    icon: <SiDocker className="text-[40px] text-[#2496ED]" />,
    name: "Docker",
    desc: "Containerizing applications for consistent development and production environments.",
  },
  // {
  //   icon: <FaReact className="text-[40px] text-[#61DBFB]" />,
  //   name: "React.js",
  //   desc: "Building reusable UI components and client-side application logic.",
  // },
  {
    icon: <SiNextdotjs className="text-[40px] text-white" />,
    name: "Next.js",
    desc: "Server-side rendering and SEO-optimized frontend architecture.",
  },
  // {
  //   icon: <FaDatabase className="text-[40px] text-[#00BFA5]" />,
  //   name: "REST APIs",
  //   desc: "Designing versioned, secure APIs with authentication and validation.",
  // },
  {
    icon: <FaGithub className="text-[40px] text-white" />,
    name: "Git & GitHub",
    desc: "Version control, collaboration, and CI/CD workflows.",
  },
  {
    icon: <SiNginx className="text-[40px] text-[#009639]" />,
    name: "Nginx",
    desc: "Reverse proxy, load balancing, and production-grade server configuration.",
  },
];


export default function Technology() {
  return (
    <section id="technology" className="mb-[100px]">
      <div className="container mx-auto px-4 border-b border-[#121415] pb-[100px]">
        <div data-aos="fade-up" className="text-left mb-10">
          <h4 className="text-[14px] font-medium text-[var(--color-brand)] leading-[14px]">
            Technologies
          </h4>
          <h2 className="text-4xl sm:text-[60px] font-bold text-[var(--color-primary)] leading-[72px] mt-[15px] ">
            Tech Stack I Use
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {technologies.map((tech, i) => (
            <div key={i} data-aos="flip-up">
              <div
                className="group cursor-pointer relative w-full h-[300px] p-[40px] mt-[20px] bg-gradient-to-br from-[#1e2024] to-[#23272b]
              shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-[#0000000f] hover:to-[#00000004] hover:pt-[30px]"
              >
                {tech.icon}
                <h3 className="text-[24px] font-medium text-[var(--color-primary)] leading-[32px] mt-[27px] mb-[15px]">
                  {tech.name}
                </h3>
                <p className="text-[16px] font-normal text-[var(--color-primary)] leading-[28px]">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
