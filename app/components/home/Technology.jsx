import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaHtml5,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";

const technologies = [
  {
    icon: <FaReact className="text-[40px] text-[#61DBFB]" />,
    name: "React.js",
    desc: "Building fast and dynamic user interfaces using React components and hooks.",
  },
  {
    icon: <SiNextdotjs className="text-[40px] text-white" />,
    name: "Next.js",
    desc: "Creating SEO-friendly and high-performance web apps with Next.js framework.",
  },
  {
    icon: <FaNodeJs className="text-[40px] text-[#3C873A]" />,
    name: "Node.js",
    desc: "Server-side JavaScript development for scalable applications and APIs.",
  },
  {
    icon: <SiExpress className="text-[40px] text-[#f0db4f]" />,
    name: "Express.js",
    desc: "Minimal and flexible Node.js framework for backend REST APIs.",
  },
  {
    icon: <SiMongodb className="text-[40px] text-[#4DB33D]" />,
    name: "MongoDB",
    desc: "NoSQL database for managing and storing data efficiently.",
  },
  {
    icon: <SiTailwindcss className="text-[40px] text-[#38BDF8]" />,
    name: "Tailwind CSS",
    desc: "Modern utility-first CSS framework for fast and responsive UI design.",
  },
  {
    icon: <FaGithub className="text-[40px] text-[#FFFFFF]" />,
    name: "Git & GitHub",
    desc: "Version control and collaborative development using Git workflow.",
  },
  {
    icon: <FaHtml5 className="text-[40px] text-[#E34F26]" />,
    name: "HTML5 & CSS3",
    desc: "Core building blocks of modern web design with responsive layouts.",
  },
  {
    icon: <FaDatabase className="text-[40px] text-[#00BFA5]" />,
    name: "REST APIs",
    desc: "Designing structured and secure API endpoints for client-server communication.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="mb-[100px]">
      <div className="container mx-auto px-4 border-b border-[#121415] pb-[100px]">
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-once="true"
          className="text-left mb-10"
        >
          <h4 className="text-[14px] font-medium text-[var(--color-brand)] leading-[14px]">
            Technologies
          </h4>
          <h2 className="text-4xl sm:text-[60px] font-bold text-[var(--color-primary)] leading-[72px] mt-[15px] ">
            Tech Stack I Use
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {technologies.map((tech, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-once="true"
              className="group relative w-full h-[300px] p-[40px] mt-[20px] bg-gradient-to-br from-[#1e2024] to-[#23272b]
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
          ))}
        </div>
      </div>
    </section>
  );
}
