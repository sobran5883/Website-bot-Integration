import { motion } from "framer-motion";

const FeaturesData = [
  {
    id: 1,
    title: "Seamless User Registration",
    link: "#",
    delay: 0.2,
  },
  {
    id: 2,
    title: "Automated Website Data Extraction",
    link: "#",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Intuitive Chatbot Integration",
    link: "#",
    delay: 0.4,
  },
  {
    id: 4,
    title: "Live Testing & Feedback System",
    link: "#",
    delay: 0.5,
  },
  {
    id: 5,
    title: "Success & Error Handling UI",
    link: "#",
    delay: 0.6,
  },
  {
    id: 6,
    title: "Mobile-Responsive & Modern UI ",
    link: "#",
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Features = () => {
  return (
    <section id="services" className="bg-white">
      <div className="container pb-14 pt-32">
        <h1 className="text-4xl font-semibold text-left pb-10">
          Features
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {FeaturesData.map((service) => (
            <motion.div
              key={service.id} 
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="bg-[#ffffff] border hover:border-red-400 rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-red-400 hover:text-white cursor-pointer duration-300 hover:shadow-2xl"
            >
              {/* <div className="text-4xl mb-4"> {service.icon}</div> */}
              <h1 className="text-md text font-semibold text-center px-3">
                {service.title}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
