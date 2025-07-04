
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ParticleBackground from '@/components/ParticleBackground';
import SkillsSphere from '@/components/SkillsSphere';
import ProjectCard from '@/components/ProjectCard';
import AnimatedCounter from '@/components/AnimatedCounter';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Enhanced scroll tracking for better section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection

      // If we're at the very top, no section is active
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Find which section we're currently in
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    // Create PDF content using jsPDF (in a real scenario, you'd have an actual PDF file)
    const cvContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 250
>>
stream
BT
/F1 12 Tf
50 700 Td
(MOSAP ABDEL-GHANY - DATA SCIENTIST) Tj
0 -20 Td
(Email: abdelghanymosap@gmail.com) Tj
0 -20 Td
(Phone: +201013089663) Tj
0 -20 Td
(Location: Cairo, Egypt) Tj
0 -40 Td
(Data Scientist and Python Instructor with experience) Tj
0 -20 Td
(in machine learning, data visualization, and AI.) Tj
0 -20 Td
(Currently training at Digital Egypt Pioneers Initiative.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000576 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
643
%%EOF`;

    // Create and download the CV as a PDF file
    const blob = new Blob([cvContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mosap_Abdel-Ghany_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('CV downloaded successfully!');
  };

  const skills = [
    { name: 'Python', level: 95, category: 'Programming' },
    { name: 'Machine Learning', level: 88, category: 'AI/ML' },
    { name: 'Data Visualization', level: 90, category: 'Analytics' },
    { name: 'Pandas/NumPy', level: 92, category: 'Data Tools' },
    { name: 'Scikit-learn', level: 85, category: 'ML Libraries' },
    { name: 'Streamlit', level: 80, category: 'Deployment' }
  ];

  const projects = [
    {
      title: 'Sentiment Analysis for TripAdvisor & Quora Egypt',
      description: 'NLP project handling Arabic and English text using LSTM, BERT, and traditional ML models with interactive visualizations.',
      tech: ['Python', 'BERT', 'LSTM', 'Plotly', 'Streamlit'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      category: 'NLP'
    },
    {
      title: 'Disease Prediction System',
      description: 'AI-powered voting system combining Decision Tree, Random Forest, and Naïve Bayes for medical diagnosis.',
      tech: ['Python', 'Scikit-learn', 'Ensemble Learning', 'Machine Learning'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      category: 'ML'
    },
    {
      title: 'Customer Churn Prediction',
      description: 'Streamlit dashboard with 91% accuracy using Random Forest to predict customer churn and support retention decisions.',
      tech: ['Python', 'Random Forest', 'Streamlit', 'Data Visualization'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://demo.com',
      category: 'ML'
    }
  ];

  const services = [
    {
      title: 'Machine Learning Models',
      description: 'Custom ML solutions for classification, regression, and predictive analytics tailored to your business needs.',
      features: ['Data preprocessing', 'Model selection & training', 'Performance optimization', 'Deployment support'],
      price: '$1,500 - $8,000',
      duration: '2-6 weeks'
    },
    {
      title: 'Data Visualization',
      description: 'Interactive dashboards and compelling visualizations using Plotly, Matplotlib, and Streamlit.',
      features: ['Dashboard development', 'Interactive visualizations', 'Custom charts & graphs', 'Real-time analytics'],
      price: '$800 - $4,000',
      duration: '1-3 weeks'
    },
    {
      title: 'Python Training & Consulting',
      description: 'Python instruction and data science consulting for teams and individuals.',
      features: ['Python fundamentals', 'Data science libraries', 'ML algorithm training', 'Project mentoring'],
      price: '$50 - $150/hour',
      duration: 'Flexible'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! I\'ll get back to you soon.');
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Navigation */}
      <motion.header 
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
        style={{ opacity: headerOpacity }}
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mosap Abdel-Ghany
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['about', 'skills', 'projects', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`transition-all duration-300 capitalize relative px-3 py-2 rounded-md ${
                  activeSection === item 
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 font-semibold shadow-lg' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hidden md:flex"
            >
              {isDark ? '☀️' : '🌙'}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-background border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {['about', 'skills', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left transition-all duration-300 capitalize px-3 py-2 rounded-md ${
                    activeSection === item 
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 font-semibold' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <motion.div 
          className="relative z-10 text-center px-4"
          style={{ y: heroY }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Data Scientist &
            <br />
            Python Instructor
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Leveraging machine learning and data analysis to solve real-world problems and drive data-driven decisions
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => scrollToSection('contact')}
            >
              Hire Me
            </Button>
            <Button size="lg" variant="outline" onClick={handleDownloadCV}>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              onClick={() => scrollToSection('projects')}
            >
              See Projects
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-foreground/50" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                I'm Mosap Abdel-Ghany, a passionate Data Scientist and Python Instructor from Cairo, Egypt. 
                Currently training at the Digital Egypt Pioneers Initiative, I specialize in machine learning, 
                data analysis, and creating intelligent solutions for real-world problems.
              </p>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                As a Python Instructor at TM Academy and AI/ML mentor at RTC, I enjoy sharing knowledge and 
                helping others grow in the field of data science. My experience spans from sentiment analysis 
                with NLP to predictive modeling for business applications.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <AnimatedCounter end={15} duration={2} />
                  <p className="text-sm text-foreground/60 mt-1">Projects Completed</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={100} duration={2} />
                  <p className="text-sm text-foreground/60 mt-1">Students Taught</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  DATA
                  <br />
                  SCIENCE
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-foreground/60">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3">
                    <motion.div 
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <SkillsSphere />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="secondary" className="ml-2">{service.duration}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{service.price}</div>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => scrollToSection('contact')}
            >
              Get Custom Quote
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Let's discuss your project</h3>
              <p className="text-foreground/80 mb-8">
                Ready to transform your data into actionable insights? Let's collaborate on your next data science project.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:abdelghanymosap@gmail.com" 
                  className="flex items-center space-x-3 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>abdelghanymosap@gmail.com</span>
                </a>
                <a 
                  href="https://github.com" 
                  className="flex items-center space-x-3 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="flex items-center space-x-3 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn Profile</span>
                </a>
                <div className="flex items-center space-x-3 text-foreground/80">
                  <span className="text-lg">📱</span>
                  <span>+201013089663</span>
                </div>
                <div className="flex items-center space-x-3 text-foreground/80">
                  <span className="text-lg">📍</span>
                  <span>Cairo, Egypt</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input placeholder="Your Name" required />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your Email" required />
                    </div>
                    <div>
                      <Input placeholder="Subject" required />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Your Message" 
                        className="min-h-32"
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-foreground/60">
            © 2024 Mosap Abdel-Ghany Portfolio. Built with React, Three.js, and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
