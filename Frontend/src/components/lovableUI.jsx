import { useState } from "react";
import {  ArrowRight } from "lucide-react";
// import heroImage from "/lovable-uploads/2be034ff-b7de-415f-8f29-22fe56bc2815.png";
import NavLink from "./utils/navLink";
import AnimatedBackground from "./utils/animatedBackround";
import SallyButton from "./utils/sallyButton";
import ServiceBadge from "./utils/serviceBadge";
import SectionHeader from "./utils/sectionHeader";
// import SallyButton from "@/components/SallyButton";
// import NavLink from "@/components/NavLink";
// import SectionHeader from "@/components/SectionHeader";
// import ServiceBadge from "@/components/ServiceBadge";
// import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 relative z-10">
        <div className="flex items-center gap-8">
          <span className="text-sally-orange font-bold text-2xl">SALLY</span>
          <div className="hidden md:flex gap-8">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#scalable">Scalable</NavLink>
            <NavLink href="#contact">Contact us</NavLink>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
          <NavLink href="#">Login</NavLink>
          <NavLink href="#" className="flex items-center">
            <span className="text-sally-orange mr-1">→</span> VISION
          </NavLink>
        </div>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <AnimatedBackground imageSrc={"/"} className="opacity-90" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="mega-text text-8xl sm:text-9xl md:text-[12rem] text-sally-orange mb-4 animate-fade-in">
            NEXTGEN
            <div className="relative">
              <span className="script-text text-5xl md:text-7xl absolute left-1/2 top-[-1rem] transform -translate-x-1/2 animate-scale-in animate-delay-300">
                Intelligence
              </span>
            </div>
          </h1>
          <div className="mt-12 animate-fade-in animate-delay-500">
            <SallyButton variant="outline" size="md" className="hover-zoom">
              GET STARTED →
            </SallyButton>
          </div>
        </div>
      </section>

      {/* Services Badge Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["INTUITIVE", "ASSISTANCE", "ELEGANCE", "CONVERSATION", "INFORMATION"].map((text, i) => (
              <div className="flex justify-center" key={text}>
                <ServiceBadge className={`animate-fade-in animate-delay-${(i + 1) * 100}`}>{text}</ServiceBadge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Powered By AI Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <p className="text-sm uppercase tracking-wider mb-3">POWERED BY AI</p>
              <p className="text-sm uppercase tracking-wider mb-3">DRIVEN BY DATA</p>
              <p className="text-sm uppercase tracking-wider mb-3">ENHANCED BY HUMAN DESIGN</p>
              <div className="mt-6 border-t border-sally-orange pt-6">
                <p className="text-sally-orange text-sm italic">
                  Experience quality interaction — what truly matters with AI
                </p>
              </div>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 h-64">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Tech component" className="h-full w-full object-cover" />
              </div>
              <div className="bg-black text-sally-orange flex items-center justify-center h-64">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold mb-2">AUTO</div>
                  <div className="text-2xl font-bold">WORKFLOW</div>
                </div>
              </div>
              <div className="bg-gray-900 h-64">
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Tech visual" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="scalable" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            <SectionHeader title="SERVICES" subtitle="we offer" align="center" size="lg" />
          </div>
          <div className="mt-16 max-w-4xl mx-auto">
            <p className="text-lg text-white leading-relaxed">
              OUR CHATBOT IS DESIGNED TO ASSIST USERS BY PROVIDING INSTANT, ACCURATE RESPONSES TO THEIR QUESTIONS AND NEEDS...
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Services background" className="w-full h-full object-cover opacity-30" />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm mb-8 text-white">I UNDERSTAND AND REMEMBER WHAT YOU'RE ASKING AND BUILD ON IT</p>
            <h3 className="text-4xl md:text-6xl font-bold mb-8">
              ENJOY FAST <span className="relative">EFFICIENT <span className="absolute w-16 h-16 rounded-full border-2 border-sally-orange -right-2 -top-2"></span></span> INFORMATION FOR BEST EXPERIENCE
            </h3>
            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm uppercase tracking-wider mb-3">AI SERVICES</p>
                </div>
                <div className="text-right">
                  <p className="text-sm uppercase tracking-wider mb-3">TEXT & IMAGE GENERATION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {["SERVICES", "ABOUT US", "CHAT BOT", "BLOG", "SOCIALS"].map((item) => (
              <div key={item}>
                <ServiceBadge className="footer-btn">{item}</ServiceBadge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Footer */}
      <section id="contact" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-3">SIGN UP FOR<br />LATEST UPDATES</h4>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-3">RECEIVE EXCLUSIVE NEWS ABOUT UPDATES<br />OR NEW ISSUES</h4>
              <div className="flex mt-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent border-b border-gray-600 text-white px-0 py-2 focus:outline-none focus:border-sally-orange flex-1"
                />
                <button className="ml-4">
                  <ArrowRight className="text-sally-orange" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mega-text text-8xl md:text-9xl text-sally-orange">SALLY</h2>
        </div>
      </footer>
    </div>
  );
};

export default Index;
