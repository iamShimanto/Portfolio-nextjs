import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import LikeButton from "./LikeButton";

export default function Portfolio({ projects }) {
  return (
    <section id="portfolio" aria-label="Projects portfolio" className="mb-25">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12.5">
          <p className="text-[14px] font-medium text-(--color-brand) leading-3.5">
            Explore my work and share your feedback
          </p>
          <h2 className="text-[60px] font-bold text-(--color-primary) leading-18 mt-3.75">
            My Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5 border-b border-[#121415] pb-25" role="list">
          {projects.map((item) => (
            <article
              key={item.id}
              data-aos="flip-up"
              role="listitem"
              className="group w-full h-112.75 p-7.5 mt-5 rounded-[20px] bg-linear-to-br from-[#1e2024] to-[#23272b]
              shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 ease-in-out
              hover:bg-linear-to-r hover:from-[#0000000f] hover:to-[#00000004]"
            >
              <div className="rounded-[10px] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={266}
                  className="w-full h-66.5 rounded-[10px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.09]"
                />
              </div>

              <div className="mt-[22.5px]">
                <div className="flex items-center justify-between mb-[15.7px]">
                  <h4 className="text-[12px] font-medium text-(--color-brand) tracking-[1px] uppercase">
                    {item.title}
                  </h4>
                  <LikeButton projectId={item.id} initialLikes={item.likes} />
                </div>

                {item.liveUrl ? (
                  <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${item.title}`}>
                    <h3 className="text-[23px] font-semibold text-(--color-primary) leading-8.5 transition-colors duration-300 hover:text-(--color-brand)">
                      {item.description}
                      <span className="inline-block ml-1.25 transition-all duration-300 ease-in-out opacity-0 invisible -translate-x-6.25 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible">
                        <FaArrowRight className="text-[20px] text-(--color-brand) -rotate-45" aria-hidden="true" />
                      </span>
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-[23px] font-semibold text-(--color-primary) leading-8.5">
                    {item.description}
                  </h3>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
