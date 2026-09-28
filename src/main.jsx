import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import backgroundImage from './assets/jai-background.png';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const workItems = [
  {
    title: 'Machine Learning',
    index: '01',
    concepts: ['Regression', 'Classification', 'Ensemble Learning', 'Feature Engineering', 'Preprocessing', 'Model Evaluation & Tuning', 'NLP', 'Embeddings'],
    tools: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TensorFlow', 'Keras'],
  },
  {
    title: 'Deep Learning',
    index: '02',
    concepts: ['Neural Networks', 'Forward & Backpropagation', 'Activation Functions', 'Loss Functions', 'Optimizers', 'Regularization', 'Dropout', 'RNNs', 'LSTMs', 'Embeddings', 'Attention', 'QKV', 'Multi-Head Attention', 'Positional Encoding', 'Transformers', 'LoRA & Adapters'],
    tools: ['TensorFlow', 'Keras', 'NumPy'],
  },
  {
    title: 'Systems',
    index: '03',
    concepts: ['API Development', 'Model Serving', 'Inference Pipelines', 'Streaming', 'Containerization', 'Local Model Deployment', 'Cloud Tunneling'],
    tools: ['Flask', 'Docker', 'Ollama', 'NVIDIA NIM'],
  },
  {
    title: 'LLMs',
    index: '04',
    concepts: ['Transformers', 'Attention', 'QKV', 'Multi-Head Attention', 'Positional Encoding', 'Tokenization', 'Embeddings', 'Instruction Tuning', 'Fine-Tuning', 'LoRA', 'Adapters', 'RAG', 'Prompt Engineering', 'Tool Calling', 'Structured Outputs', 'Streaming & Inference'],
    tools: [],
  },
];

const currentLearning = ['Hugging Face Transformers', 'RAG Architecture', 'Advanced Machine Learning', 'Fine-Tuning', 'AI Research', 'Advanced NumPy'];

const projects = [
  { number: '01', title: 'Academic Management System', meta: 'Project' },
  { number: '02', title: 'Basic Python Projects', meta: 'Collection', nested: [
    { title: 'Tkinter Auth App', description: 'A Python/Tkinter-based authentication application.' },
    { title: 'Memory System for Ollama Models', description: 'A Python project focused on adding memory capabilities to local Ollama-based models.' },
    { title: 'Fine-Tuning with Quality Dataset', description: 'A project focused on fine-tuning a model using a carefully prepared, high-quality dataset.' },
  ] },
  { number: '03', title: 'Forensic AI', meta: 'Currently Developing', ongoing: true, description: 'An ongoing AI-focused project exploring the intersection of artificial intelligence and forensic work. Details are intentionally kept high-level while development continues.' },
  { number: '04', title: 'ChoixModel', meta: 'Currently Developing', ongoing: true, description: 'An ongoing project that identifies the best model for your use case and fine-tunes it automatically.' },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={`arrow-icon ${diagonal ? 'diagonal' : ''}`}>
      <path d="M3 15 15 3M7 3h8v8" />
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  return <Tag className={`scroll-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</Tag>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [openWork, setOpenWork] = useState(null);
  const [openPython, setOpenPython] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.scroll-reveal').forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, [sectionIds]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="custom-cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} aria-hidden="true" />

      <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand-mark" href="#home" onClick={closeMenu} aria-label="Jai home">
          <span className="brand-short">Jai</span>
          <span className="brand-full">Jai Tanwar</span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={activeSection === item.href.slice(1) ? 'active' : ''} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
      </header>

      <main>
        <section id="home" className="hero" style={{ '--hero-image': `url(${backgroundImage})` }}>
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />

          <div className="hero-meta hero-meta-top"><span>01 / HOME</span><span>ML / 2026</span></div>

          <div className="hero-content">
            <Reveal className="eyebrow" delay={100}>MACHINE LEARNING / EXPERIMENTATION</Reveal>
            <Reveal as="h1" className="hero-title word-reveal" delay={170}><span>Jai</span></Reveal>
            <Reveal className="hero-role" delay={260}>ML Enthusiast</Reveal>
            <Reveal as="p" className="hero-description word-reveal" delay={340}>
              Learn things deeply, connect ideas across disciplines, and turn them into something better.
            </Reveal>

            <Reveal className="hero-actions" delay={430}>
              <a className="primary-link magnetic-link" href="#projects"><span>View My Work</span><ArrowIcon /></a>
              <a className="secondary-link magnetic-link" href="https://github.com/JAI4213H" target="_blank" rel="noreferrer"><span>GitHub</span><ArrowIcon diagonal /></a>
            </Reveal>
          </div>

          <div className="hero-side-note"><span>BUILD / LEARN / EXPERIMENT</span><span>JAI</span></div>

          <Reveal className="hero-metrics" delay={520}>
            <div className="metric"><strong>10</strong><span>Repositories</span></div>
            <div className="metric"><strong>6+</strong><span>Months Learning</span></div>
            <div className="metric"><strong>∞</strong><span>Ideas to Explore</span></div>
          </Reveal>

          <a className="scroll-cue" href="#work" aria-label="Scroll to work"><span>SCROLL</span><span className="scroll-arrow">↓</span></a>
        </section>

        <section id="work" className="work-section section-shell">
          <Reveal className="section-kicker"><span>02</span><span>WORK / AREAS OF EXPLORATION</span></Reveal>
          <div className="section-heading-row">
            <Reveal as="h2" className="word-reveal" delay={70}>What I'm Working With</Reveal>
            <Reveal as="p" delay={140}>Click a discipline to open the concepts and tools currently shaping my learning and building.</Reveal>
          </div>

          <div className="work-accordion">
            {workItems.map((item) => {
              const isOpen = openWork === item.title;
              return (
                <Reveal key={item.title} className={`work-item ${isOpen ? 'is-open' : ''}`} delay={80}>
                  <button className="work-trigger" type="button" aria-expanded={isOpen} onClick={() => setOpenWork(isOpen ? null : item.title)}>
                    <span className="work-index">{item.index}</span>
                    <span className="work-title">{item.title}</span>
                    <span className="work-toggle" aria-hidden="true"><span /><span /></span>
                  </button>
                  <div className="work-panel" aria-hidden={!isOpen}>
                    <div className="work-panel-inner">
                      <div className="skill-group">
                        <span className="skill-label">Concepts</span>
                        <div className="skill-tags">{item.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
                      </div>
                      {item.tools.length > 0 && <div className="skill-group"><span className="skill-label">Tools</span><div className="skill-tags tool-tags">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="projects" className="projects-section section-shell">
          <Reveal className="section-kicker"><span>03</span><span>SELECTED WORK</span></Reveal>
          <div className="section-heading-row projects-heading">
            <Reveal as="h2" className="word-reveal" delay={70}>Things I've Built</Reveal>
            <a href="https://github.com/JAI4213H" target="_blank" rel="noreferrer" className="text-link">Explore GitHub <ArrowIcon diagonal /></a>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <div className={`project-block ${project.nested ? 'has-nested' : ''}`} key={project.number}>
                <a className="project-row" href="https://github.com/JAI4213H" target="_blank" rel="noreferrer">
                  <span className="project-number">{project.number}</span>
                  <span className="project-title">{project.title}</span>
                  <span className={`project-meta ${project.ongoing ? 'ongoing' : ''}`}>{project.meta}</span>
                  <ArrowIcon diagonal />
                </a>
                {project.nested && (
                  <>
                    <button className="nested-toggle" type="button" aria-expanded={openPython} onClick={() => setOpenPython((value) => !value)}>
                      <span>{openPython ? 'Hide sub-projects' : 'View sub-projects'}</span><span className="nested-chevron">{openPython ? '↑' : '↓'}</span>
                    </button>
                    <div className={`nested-projects ${openPython ? 'is-open' : ''}`}>
                      {project.nested.map((sub, index) => (
                        <div className="nested-project" key={sub.title}>
                          <span className="nested-number">0{index + 1}</span>
                          <div><h3>{sub.title}</h3><p>{sub.description}</p></div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {project.description && <p className="project-description">{project.description}</p>}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section section-shell">
          <Reveal className="section-kicker"><span>04</span><span>ABOUT / CURRENTLY LEARNING</span></Reveal>
          <div className="about-layout">
            <Reveal as="h2" className="word-reveal" delay={70}>Understanding how things connect.</Reveal>
            <div className="about-copy">
              <Reveal as="p" delay={120}>I like going beneath the surface of technical ideas, understanding the pieces that make them work, and looking for relationships between them.</Reveal>
              <Reveal as="p" delay={180}>Machine learning is the current direction of that exploration — from classical models and deep learning to language models, systems, and experiments that turn questions into working things.</Reveal>
            </div>
          </div>

          <Reveal className="learning-wrap" delay={140}>
            <div className="learning-heading"><span>Currently Learning</span><span>IN PROGRESS</span></div>
            <div className="learning-grid">
              {currentLearning.map((item, index) => <div className="learning-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><i aria-hidden="true" /></div>)}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="contact-section section-shell">
          <Reveal className="section-kicker"><span>05</span><span>CONTACT</span></Reveal>
          <div className="contact-layout">
            <Reveal as="h2" className="word-reveal" delay={70}>Let's build something worth understanding.</Reveal>
            <div>
              <a className="contact-link" href="https://github.com/JAI4213H" target="_blank" rel="noreferrer">github.com/JAI4213H <ArrowIcon diagonal /></a>
              <a className="contact-link" href="https://www.linkedin.com/in/jaitanwar08/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
              <a className="contact-link" href="https://www.instagram.com/veyron.jai/" target="_blank" rel="noreferrer">Instagram <ArrowIcon diagonal /></a>
              <p className="contact-note">For projects, experiments, ideas, and technical conversations.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <div>Jai Tanwar</div><div>ML Enthusiast</div><a href="https://github.com/JAI4213H" target="_blank" rel="noreferrer">GitHub</a><div>2026</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
