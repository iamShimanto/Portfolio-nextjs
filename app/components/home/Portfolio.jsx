import { FaArrowRight, FaRegHeart } from "react-icons/fa";

const portfolioData = [
  {
    img: "/images/aliairtravels.png",
    title: "Travel Agency",
    likes: 360,
    desc: "Ali Air Travels & Tours Built With Nextjs and Node.js",
    link: "https://www.aliairtravels.com",
  },
  {
    img: "/images/chatapp.jpg",
    title: "ChatApp",
    likes: 750,
    desc: "Built with React and Firebase, real-time messaging",
    link: "https://shimantochat.vercel.app",
  },
  {
    img: "/images/joud.png",
    title: "Perfume Shop",
    likes: 280,
    desc: "Joud Perfumes Built With Nextjs and Node.js",
    link: "https://www.joudperfume.com",
  },
  {
    img: "/images/todo1.png",
    title: "ToDo_List",
    likes: 600,
    desc: "Fast & simple ToDo app with real-time Firebase sync",
    link: "https://shimanto-todo.vercel.app",
  },
  {
    img: "/images/weather.jpg",
    title: "Weather App",
    likes: 630,
    desc: "A responsive weather app built with React",
    link: "https://react-weather-app-shimantos-projects.vercel.app/",
  },
  {
    img: "/images/portfolio-06.jpg",
    title: "Web Design",
    likes: 690,
    desc: "App for technology & services",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="mb-[100px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-[50px]">
          <p className="text-[14px] font-medium  text-[var(--color-brand)] leading-[14px]">
            Visit my portfolio and keep your feedback
          </p>
          <h2 className="text-[60px] font-bold  text-[var(--color-primary)] leading-[72px] mt-[15px]">
            My Portfolio
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] border-b border-[#121415] pb-[100px]">
          {portfolioData.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
              className="group w-full h-[451px] p-[30px] mt-[20px] rounded-[20px] bg-gradient-to-br from-[#1e2024] to-[#23272b]
              shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-[#0000000f] hover:to-[#00000004]"
            >
              {/* Image */}
              <div className=" rounded-[10px] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[266px] rounded-[10px] transition-transform duration-300 ease-in-out group-hover:scale-[1.09]"
                />
              </div>

              {/* Text */}
              <div className="mt-[22.5px]">
                <div className="flex items-center justify-between mb-[15.7px]">
                  <h4 className="text-[12px] font-medium  text-[var(--color-brand)] tracking-[1px] uppercase">
                    {item.title}
                  </h4>
                  <h5 className="text-[13px] font-medium  text-[var(--color-primary)] flex items-center gap-[5px]">
                    <span className="transition-colors duration-300 hover:text-[var(--color-brand)]">
                      <FaRegHeart />
                    </span>
                    {item.likes}
                  </h5>
                </div>

                {/* Title */}
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <h3
                      className="text-[23px] font-semibold  text-[var(--color-primary)] leading-[34px]
                      transition-colors duration-300 hover:text-[var(--color-brand)]"
                    >
                      {item.desc}
                      <span className="inline-block ml-[5px] transition-all duration-300 ease-in-out opacity-0 invisible transform -translate-x-[25px] group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible">
                        <FaArrowRight className="text-[20px] text-[var(--color-brand)] rotate-[-45deg]" />
                      </span>
                    </h3>
                  </a>
                ) : (
                  <h3
                    className="text-[23px] font-semibold  text-[var(--color-primary)] leading-[34px]
                    transition-colors duration-300 hover:text-[var(--color-brand)]"
                  >
                    {item.desc}
                    <span className="inline-block ml-[5px] transition-all duration-300 ease-in-out opacity-0 invisible transform -translate-x-[25px] group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible">
                      <FaArrowRight className="text-[20px] text-[var(--color-brand)] rotate-[-45deg]" />
                    </span>
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
