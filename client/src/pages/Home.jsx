
import Hero from "../components/Hero/Hero"
import Features from "../components/Features/Features";
import Banner2 from "../components/Banner/Banner";

const Home = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Hero />
      <Features />
      <Banner2 />
    </main>
  );
};

export default Home;