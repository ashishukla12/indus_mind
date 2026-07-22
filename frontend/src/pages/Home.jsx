import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import Workflow from "../components/home/Workflow";
import About from "../components/home/About";
import Team from "../components/home/Team";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Workflow />
      <About />
      <Team />
      <Footer />
    </div>
  );
}

export default Home;