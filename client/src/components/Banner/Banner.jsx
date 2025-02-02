
import { Link } from 'react-router-dom';
import chatbot from '../../assets/chatbot.avif'
import { motion } from "framer-motion";

const Banner2 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug">
            Feasibility
            </h1>
            <p className="text-dark2">The feasibility of this chatbot setup UI/UX project is high due to its structured workflow, reliance on JavaScript-based frameworks (ReactJS/NextJS), and use of existing web scraping techniques.</p>
            <p className="text-dark2">
            The integration process is simplified with a copy-paste embed code, making it accessible even for non-technical users. Additionally, the use of dummy data for training visualization ensures smooth development without backend dependencies. With a focus on responsiveness and user experience, this project can be effectively implemented within the given timeframe.</p>
            <Link
              to="/get"
              className="primary-btn !mt-8"
            >
              Join Now
            </Link>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={chatbot}
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
