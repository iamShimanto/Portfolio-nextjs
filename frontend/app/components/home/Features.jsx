import { FaArrowRight } from "react-icons/fa";
import { renderIcon } from "@/app/lib/iconRenderer";

export default function Features({ services }) {
  return (
    <section id="features" aria-label="Services and expertise" className="mb-25">
      <div className="container mx-auto px-4 border-b border-[#121415] pb-25">
        <div data-aos="fade-up" className="text-left mb-10">
          <p className="text-[14px] font-medium text-(--color-brand) leading-3.5">
            Services &amp; Expertise
          </p>
          <h2 className="text-[60px] font-bold text-(--color-primary) leading-18 mt-3.75">
            What I Do
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5" role="list">
          {services.map((item) => (
            <article key={item.id} data-aos="fade-up" role="listitem">
              <div className="group cursor-pointer relative w-full h-82.5 p-12.5 mt-5 bg-linear-to-br from-[#1e2024] to-[#23272b]
                shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 ease-in-out
                hover:bg-linear-to-r hover:from-[#0000000f] hover:to-[#00000004] hover:pt-7.5"
              >
                <div className="text-[40px] text-(--color-brand)" aria-hidden="true">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="text-[24px] font-medium text-(--color-primary) leading-8 mt-6.75 mb-5.25">
                  {item.title}
                </h3>
                <p className="text-[16px] font-normal text-(--color-primary) leading-7">
                  {item.description}
                </p>
                <FaArrowRight className="text-[30px] text-(--color-brand) mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
