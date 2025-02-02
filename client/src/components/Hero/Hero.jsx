
import Blob from "../../assets/blob.svg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import botImg from '../../assets/chatbot (2).png'

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <section className="bg-light overflow-hidden relative">
      <div className="container mt-8 grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-lg lg:text-3xl font-medium !leading-snug"
            >
              <span style={{color:'#ff735c'}}>
                <Typewriter
                  words={['Seamlessly integrate AI chatbots into your website with our intuitive and responsive UI—effortless setup, smooth experience!',
                  'Transform your customer interactions with our chatbot UI—designed for efficiency, ease of use, and a touch of WOW!',
                  'Smart, sleek, and simple! Our chatbot setup UI ensures hassle-free registration, instant training updates, and seamless integration.',
                  'Watch your chatbot come to life—real-time training insights, easy website embedding, and instant testing at your fingertips!',
                  'Elevate your business with a chatbot UI that’s as intelligent as it is beautiful. Engage customers like never before!']}
                  loop={true}
                  cursor
                  cursorStyle='|'
                  typeSpeed={50}
                  deleteSpeed={10}
                  delaySpeed={3000}
                />
              </span>
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >

            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex justify-center scale-[2.5] items-center">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={botImg}
            alt=""
            className=" relative z-10 drop-shadow h-[200px] w-[200px]"
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt=""
            className="absolute -bottom-32 w-[800px] md:w-[1500px] z-[1] hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
