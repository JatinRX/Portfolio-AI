import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Linkedin, 
  MapPin, 
  Code, 
  Gamepad2, 
  Brain, 
  ExternalLink,
  Play,
  Award,
  Users,
  Zap,
  Star,
  ChevronRight,
  Download,
  Menu,
  X
} from 'lucide-react';
import portfolioData from './mock.js';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-green-400" />
              <span className="text-white font-bold text-xl">JG</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'text-green-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/10 to-slate-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <img
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-green-400/30 shadow-2xl"
            />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">{portfolioData.personal.name}</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 gradient-text">
              {portfolioData.personal.title}
            </h2>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {portfolioData.personal.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-gaming inline-flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-gaming-outline inline-flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {portfolioData.personal.bio}
            </p>
          </div>

          <div className="gaming-grid">
            {/* Skills Cards */}
            <div className="gaming-card">
              <div className="flex items-center mb-4">
                <Gamepad2 className="h-8 w-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Game Development</h3>
              </div>
              <div className="space-y-2">
                {portfolioData.skills.gamedev.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-700 text-green-400 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="gaming-card">
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Programming</h3>
              </div>
              <div className="space-y-2">
                {portfolioData.skills.programming.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-700 text-blue-400 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="gaming-card">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">AI & Emerging Tech</h3>
              </div>
              <div className="space-y-2">
                {portfolioData.skills.emerging.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-700 text-purple-400 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Journey</h2>
            <p className="text-xl text-slate-300">Building innovative experiences across the gaming industry</p>
          </div>

          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="gaming-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{exp.role}</h3>
                    <p className="text-green-400 text-lg font-medium mb-1">{exp.company}</p>
                    <p className="text-slate-400 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="text-slate-300 bg-slate-700 px-4 py-2 rounded-full text-sm mt-4 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-300">Showcasing innovation in game development and AI integration</p>
          </div>

          <div className="gaming-grid">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="gaming-card group">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-green-400 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-lg text-green-400 mb-3">{project.subtitle}</p>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {project.highlights.map((highlight, hlIndex) => (
                      <div key={hlIndex} className="flex items-center text-sm text-slate-400">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gaming-outline w-full inline-flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Colleagues Say</h2>
            <p className="text-xl text-slate-300">Testimonials from industry professionals</p>
          </div>

          <div className="gaming-grid">
            {portfolioData.testimonials.map((testimonial, index) => (
              <div key={index} className="gaming-card">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-green-400/30"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-green-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
            <p className="text-xl text-slate-300">
              Ready to collaborate on the next breakthrough in gaming and AI?
            </p>
          </div>

          <div className="gaming-grid mb-12">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="gaming-card group text-center hover:scale-105 transition-transform"
            >
              <Mail className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
              <p className="text-slate-300">Drop me a line directly</p>
              <p className="text-green-400 mt-2 text-sm">{portfolioData.personal.email}</p>
            </a>

            <a
              href={`https://wa.me/${portfolioData.personal.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gaming-card group text-center hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-slate-300">Quick message on WhatsApp</p>
              <p className="text-green-400 mt-2 text-sm">Let's chat instantly</p>
            </a>

            <a
              href={`https://${portfolioData.personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gaming-card group text-center hover:scale-105 transition-transform"
            >
              <Linkedin className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-slate-300">Connect professionally</p>
              <p className="text-green-400 mt-2 text-sm">View my network</p>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${portfolioData.personal.email}?subject=Collaboration Opportunity`}
              className="btn-gaming inline-flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Start a Project
            </a>
            <a
              href="#"
              className="btn-gaming-outline inline-flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Gamepad2 className="h-8 w-8 text-green-400" />
              <span className="text-white font-bold text-xl">{portfolioData.personal.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>{portfolioData.personal.location}</span>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 {portfolioData.personal.name}. Building the future of interactive experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;