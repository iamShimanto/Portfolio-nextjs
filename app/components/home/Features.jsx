import {
  FaBars,
  FaBookOpen,
  FaTv,
  FaArrowRight,
  FaWifi,
  FaFan,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

const features = [
  {
    icon: <FaBars className="text-[40px] text-[var(--color-brand)]" />,
    title: "Business Strategy",
    desc: "I throw myself down among the tall grass by the stream as I lie close to the earth.",
  },
  {
    icon: <FaBookOpen className="text-[40px] text-[var(--color-brand)]" />,
    title: "App Development",
    desc: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence.",
  },
  {
    icon: <FaTv className="text-[40px] text-[var(--color-brand)]" />,
    title: "Web Development",
    desc: "I throw myself down among the tall grass by the stream as I lie close to the earth.",
  },
  {
    icon: <FaRegMessage className="text-[40px] text-[var(--color-brand)]" />,
    title: "Mobile App",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority.",
  },
  {
    icon: <FaWifi className="text-[40px] text-[var(--color-brand)]" />,
    title: "CEO Marketing",
    desc: "Always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    icon: <FaFan className="text-[40px] text-[var(--color-brand)]" />,
    title: "Personal Portfolio April",
    desc: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mb-[100px]">
      <div className="container mx-auto px-4 border-b border-[#121415] pb-[100px]">
        <div
          data-aos="fade-up"
          className="text-left mb-10"
        >
          <h4 className="text-[14px] font-medium text-[var(--color-brand)] leading-[14px]">
            Features
          </h4>
          <h2 className="text-[60px] font-bold text-[var(--color-primary)] leading-[72px] mt-[15px] ">
            What I Do
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {features.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="group relative w-full h-[330px] p-[50px] mt-[20px] bg-gradient-to-br from-[#1e2024] to-[#23272b] 
              shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-[#0000000f] hover:to-[#00000004] hover:pt-[30px]"
            >
              {item.icon}
              <h3 className="text-[24px] font-medium  text-[var(--color-primary)] leading-[32px] mt-[27px] mb-[21px]">
                {item.title}
              </h3>
              <p className="text-[16px] font-normal  text-[var(--color-primary)] leading-[28px]">
                {item.desc}
              </p>
              <FaArrowRight
                className="text-[30px] text-[var(--color-brand)] mt-[20px] opacity-0 invisible 
                group-hover:opacity-100 group-hover:visible transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
