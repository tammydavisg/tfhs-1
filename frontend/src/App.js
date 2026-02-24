import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, X, ChevronRight, Star, Clock, Users, Award, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Images
const IMAGES = {
  basement: "https://customer-assets.emergentagent.com/job_organize-renovate/artifacts/ekk3ro1a_basement%20pic.webp",
  kitchen: "https://customer-assets.emergentagent.com/job_organize-renovate/artifacts/k3dnlld0_kitchen%20pic.jpg",
  framing: "https://customer-assets.emergentagent.com/job_website-finder-15/artifacts/p5suga3m_45F1B17D-6329-49BA-AC41-2F287FA178D4.jpeg",
  welding: "https://customer-assets.emergentagent.com/job_eee0f944-e9a4-418c-b3f8-efb6d089d823/artifacts/n9bdxxdp_9EF5C4EC-9D73-4AA5-A289-43170278E15C.jpeg",
  garage: "https://customer-assets.emergentagent.com/job_organize-renovate/artifacts/z5rzgzth_garage%20photos.webp",
  professional: "https://customer-assets.emergentagent.com/job_organize-renovate/artifacts/jj90q0gl_167084189_m-1200x520.jpg",
  tammy: "https://customer-assets.emergentagent.com/job_website-finder-15/artifacts/vgw0nb18_6BE738CB-97E0-4D32-94A4-7FB48A0D6171.png",
  tammyConsult: "https://customer-assets.emergentagent.com/job_website-finder-15/artifacts/0k526e99_BBA92089-1248-4C95-B553-9A9334695FFC.png",
  roofing: "https://customer-assets.emergentagent.com/job_eee0f944-e9a4-418c-b3f8-efb6d089d823/artifacts/1wcyqeg8_711D9217-93C3-42D1-AD78-571FA2CF439C.jpeg",
  outdoor: "https://customer-assets.emergentagent.com/job_eee0f944-e9a4-418c-b3f8-efb6d089d823/artifacts/9ekilmmu_E70DF8DA-AF48-4735-AD7F-CE1433441ECC.png",
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${scrolled ? "text-slate-800" : "text-white"}`}>
              Total Family Home Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-amber-500"
                    : scrolled
                    ? "text-slate-600 hover:text-amber-500"
                    : "text-white hover:text-amber-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:9432551655"
              className="bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              <Phone size={18} />
              (943) 255-1655
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${scrolled ? "text-slate-800" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 px-4 font-medium rounded-lg ${
                  location.pathname === link.path
                    ? "bg-amber-50 text-amber-500"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:9432551655"
              className="block mt-4 bg-amber-500 text-white px-6 py-3 rounded-full font-medium text-center"
            >
              Call (943) 255-1655
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Total Family Home Solutions</h3>
            <p className="text-slate-400 mb-6">
              Locally-owned and operated in the Greater Atlanta Area. We provide quality, reliable, and honest home solutions backed by over 15 years of experience.
            </p>
            <div className="flex space-x-4">
              <a href="tel:9432551655" className="bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition-colors">
                Call Now
              </a>
              <Link to="/contact" className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-slate-900 transition-colors">
                Get Quote
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
              <li><Link to="/testimonials" className="hover:text-amber-500 transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amber-500" />
                <a href="tel:9432551655" className="hover:text-amber-500">(943) 255-1655</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-amber-500" />
                <a href="mailto:totalfamilyhome@gmail.com" className="hover:text-amber-500">totalfamilyhome@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-amber-500" />
                <span>Greater Atlanta Area</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Total Family Home Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselItems = [
    { image: IMAGES.basement, title: "Basement Renovations" },
    { image: IMAGES.kitchen, title: "Kitchen Renovations" },
    { image: IMAGES.framing, title: "Framing, Electrical & Plumbing" },
    { image: IMAGES.welding, title: "Welding" },
    { image: IMAGES.garage, title: "Garage Organization" },
    { image: IMAGES.professional, title: "Professional Home Solutions" },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const services = [
    { image: IMAGES.kitchen, title: "Renovations", description: "Transform your home with complete renovations — from basements and kitchens to bathrooms and whole-house remodels tailored to your lifestyle." },
    { image: IMAGES.framing, title: "Framing, Electrical & Plumbing", description: "Complete construction services including professional framing, electrical wiring, and plumbing installations. Quality structural and mechanical work you can count on." },
    { image: IMAGES.welding, title: "Welding", description: "Professional welding services for custom metalwork, repairs, and fabrication. Precision craftsmanship for any project." },
    { image: IMAGES.garage, title: "Organization", description: "Create a clean, functional, and stress-free home with personalized organizing solutions and custom storage systems." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${IMAGES.kitchen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 font-medium mb-4 tracking-wider">15+ Years of Trusted Service</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Your Home Deserves
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-amber-400 mb-8">
            Expert Care
          </h2>
          <p className="text-xl text-slate-300 mb-4">Repair. Remodel. Organize.</p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Locally-owned and operated in the Greater Atlanta Area. We provide quality, reliable, and honest home solutions backed by over 15 years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg">
              Get Free Estimate
            </Link>
            <a href="tel:9432551655" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2">
              <Phone size={20} />
              Call (943) 255-1655
            </a>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Slides */}
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-20 left-0 right-0 text-center">
              <h3 className="text-3xl md:text-4xl font-light text-white tracking-wide">{item.title}</h3>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
          data-testid="carousel-prev-btn"
        >
          <ChevronRight className="rotate-180 text-slate-700" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
          data-testid="carousel-next-btn"
        >
          <ChevronRight className="text-slate-700" size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-2 bg-amber-500"
                  : "w-2 h-2 bg-white/70 hover:bg-white"
              }`}
              data-testid={`carousel-dot-${index}`}
            />
          ))}
        </div>
      </section>

      {/* Meet the Owner Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 font-medium mb-2">Meet the Owner</p>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Tammy Davis</h2>
              <p className="text-lg text-slate-600 mb-6">
                With over 15 years of experience in the home services industry, Tammy Davis founded Total Family Home Solutions with a simple mission: to provide honest, reliable, and quality work that families can trust.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Born from real-life caregiving experience, Tammy understands what families truly need. Whether it's a small repair or a complete renovation, she treats every home like her own.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-600 transition-all">
                Get a Free Quote
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative">
              <img src={IMAGES.tammy} alt="Tammy Davis - Owner" className="rounded-2xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 text-lg">From small repairs to complete renovations, we're here to help.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                  <Link to="/services" className="text-amber-400 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition-all">
              View All Services
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src={IMAGES.tammyConsult} alt="Tammy Davis consulting with client" className="rounded-2xl shadow-xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-8">Why Choose Us?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Users className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Family-Focused Care</h3>
                    <p className="text-slate-600">Born from real-life caregiving experience, we understand what families truly need: reliability, honesty, and thoughtful solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Quality & Integrity</h3>
                    <p className="text-slate-600">No overcharging, no overselling. Just honest, high-quality work from contractors you can trust.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="text-amber-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">15+ Years Experience</h3>
                    <p className="text-slate-600">Proven expertise in home repairs, remodeling, and organization services throughout the Greater Atlanta area.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-amber-400 fill-amber-400" size={24} />
              ))}
            </div>
            <blockquote className="text-2xl text-slate-700 italic mb-6">
              "They designed a custom gate that matched our existing railing perfectly. Their professionalism and attention to detail gave me real peace of mind."
            </blockquote>
            <p className="font-semibold text-slate-800">Dave</p>
            <p className="text-slate-500">Custom Stair Gate</p>
          </div>
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-amber-500 font-semibold mt-8 hover:gap-3 transition-all">
            Read More Reviews <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Get Started Today</h2>
          <p className="text-xl text-amber-100 mb-10">
            Just bought your house and trying to figure out your space? Lived in your home for years and ready for a change? We can make your home the best it can be.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-amber-500 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
            Get Your Free Quote
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Services Page
const Services = () => {
  const serviceCategories = [
    {
      title: "Renovations",
      image: IMAGES.kitchen,
      items: [
        "Basement finishing, updating, or converting into livable space",
        "Kitchen remodeling: modern layouts, updated cabinetry, countertops, and fixtures",
        "Bathroom upgrades: full remodels, tile work, vanities, and improved functionality",
        "Bedroom improvements: flooring, lighting, storage, and layout enhancements",
        "Flooring installation: hardwood, laminate, vinyl, tile, and repairs",
        "Whole-house remodeling: complete transformations tailored to your lifestyle",
        "Garage renovations: organization systems, flooring, storage, and functional upgrades"
      ]
    },
    {
      title: "Plumbing Services",
      image: IMAGES.professional,
      items: ["Plumbing repairs", "Leak detection & repair", "Fixture installation", "Water heater services", "Drain cleaning"]
    },
    {
      title: "Electrical Services",
      image: IMAGES.basement,
      items: ["Electrical repairs", "Outlet & switch installation", "Lighting fixtures", "Circuit breaker services", "Safety inspections"]
    },
    {
      title: "Interior Repairs",
      image: IMAGES.kitchen,
      items: ["Drywall patching for holes or cracks", "Painting and touch-ups", "Cabinet adjustments", "Door adjustments", "Caulking and sealing"]
    },
    {
      title: "Roofing & Exterior",
      image: IMAGES.roofing,
      items: ["Roofing repairs", "Siding repairs", "Gutter maintenance", "Deck or porch fixes", "Fence repair"]
    },
    {
      title: "Outdoor & Yard",
      image: IMAGES.outdoor,
      items: ["Fence repair", "Deck repair", "Porch fixes", "Outdoor structures", "Landscaping support"]
    },
    {
      title: "Organization Services",
      image: IMAGES.garage,
      items: ["Home organization", "Garage organization", "Storage solutions", "Closet systems", "Decluttering assistance"]
    },
    {
      title: "General Repairs",
      image: IMAGES.professional,
      items: ["Flooring repairs", "Loose tile fixing", "Scratched wood repair", "Carpet repairs", "General handyman services"]
    }
  ];

  const processSteps = [
    { number: "1", title: "Contact Us", description: "Call or fill out our contact form to discuss your needs." },
    { number: "2", title: "Free Estimate", description: "We'll assess your project and provide a transparent quote." },
    { number: "3", title: "Quality Work", description: "Our experienced team completes your project with care." },
    { number: "4", title: "Your Satisfaction", description: "We ensure you're completely happy with the results." }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            From small repairs to major renovations, we handle it all with expertise and care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-slate-400 text-lg">Our streamlined process ensures quality results and peace of mind.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-amber-100 mb-10">
            Contact us today for a free estimate on your project.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-amber-500 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all">
            Request Free Estimate
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Testimonials Page
const Testimonials = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "4.9", label: "Average Rating" },
    { value: "100%", label: "Satisfaction" }
  ];

  const testimonials = [
    {
      quote: "After my wife's fall, I needed help fast before traveling. They responded quickly, designed a custom gate matching our railing, and installed it so it can be removed later without damage. Their professionalism gave me real peace of mind.",
      name: "David K",
      location: "Alpharetta",
      project: "Custom Stair Gate"
    },
    {
      quote: "High-quality work on our rental property refresh — bathrooms, flooring, and paint. Stayed on budget and timeline, and worked through a challenging inspection to pass on time. Would definitely work with them again.",
      name: "Ashleigh Harvey",
      location: "Johns Creek",
      project: "Rental Property Refresh"
    },
    {
      quote: "They helped design a basement kitchenette and laundry in a tight space and budget. Fit everything I needed — washer/dryer, dishwasher, cabinets, sink — while saving money. The finished area looks like it was always part of the home.",
      name: "Barbara Ulp",
      location: "Cumming GA",
      project: "Basement Kitchenette"
    },
    {
      quote: "Total Family Home Solutions transformed our basement into a beautiful living space. Their attention to detail and professionalism exceeded our expectations. Highly recommend!",
      name: "Oscar G",
      location: "Roswell",
      project: "Basement Renovation"
    },
    {
      quote: "We hired them for our kitchen remodel and couldn't be happier. From free quote to final walkthrough, they made the process easy and stress-free. Outstanding quality of work.",
      name: "Tony Parker",
      location: "Suwanee",
      project: "Kitchen Remodel"
    },
    {
      quote: "Our garage was a disaster until they came in. Custom shelving and storage solutions completely transformed the space. Now we can actually park our cars in there! Professional and reliable.",
      name: "Kathy Preuss",
      location: "",
      project: "Garage Organization"
    }
  ];

  const featuredTestimonial = {
    quote: "Total Family Home Solutions isn't just a contractor - they're part of our family now. After working with them on multiple projects, I wouldn't trust anyone else with our home.",
    name: "The Patterson Family",
    location: "Sandy Springs, GA"
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Testimonials</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about working with us.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-amber-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={18} />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  {testimonial.location && <p className="text-slate-500 text-sm">{testimonial.location}</p>}
                  <p className="text-amber-500 text-sm font-medium mt-1">{testimonial.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-800 rounded-3xl p-12 border border-slate-700">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-amber-400 fill-amber-400" size={28} />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl text-white italic mb-8">
              "{featuredTestimonial.quote}"
            </blockquote>
            <p className="font-semibold text-amber-400 text-xl">{featuredTestimonial.name}</p>
            <p className="text-slate-400">{featuredTestimonial.location}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Happy Customers</h2>
          <p className="text-xl text-amber-100 mb-10">
            Experience the Total Family Home Solutions difference. Contact us today for your free quote.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-amber-500 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all">
            Get Your Free Quote
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start the process of turning your house into the home of your dreams by calling or emailing us today.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <img src={IMAGES.tammy} alt="Tammy Davis" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">Tammy Davis</h3>
                    <p className="text-slate-500">Owner & Founder</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-slate-400 mb-8">
                  We are happy to answer any questions you may have and discuss your specific needs with you. Why wait any longer? Let us show you your home's true potential.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <a href="tel:9432551655" className="text-lg font-medium hover:text-amber-400">(943) 255-1655</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Email</p>
                      <a href="mailto:totalfamilyhome@gmail.com" className="text-lg font-medium hover:text-amber-400">totalfamilyhome@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Service Area</p>
                      <p className="text-lg font-medium">Greater Atlanta Area</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Request a Free Estimate</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">Thank You!</h3>
                    <p className="text-slate-600">We've received your inquiry and will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        data-testid="contact-email-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        data-testid="contact-phone-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Project Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        data-testid="contact-address-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tell Me About Your Project *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                        data-testid="contact-message-input"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="contact-submit-btn"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
