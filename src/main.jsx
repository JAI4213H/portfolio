import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    art: 'ml',
    description: 'Classical ML, model building, evaluation, and real-world datasets.',
    concepts: ['Regression', 'Classification', 'Ensemble Learning', 'Feature Engineering', 'Preprocessing', 'Model Evaluation & Tuning', 'NLP', 'Embeddings'],
    tools: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TensorFlow', 'Keras'],
  },
  {
    title: 'Deep Learning',
    index: '02',
    art: 'deep',
    description: 'Neural networks, architectures, training techniques, and beyond.',
    concepts: ['Neural Networks', 'Forward & Backpropagation', 'Activation Functions', 'Loss Functions', 'Optimizers', 'Regularization', 'Dropout', 'RNNs', 'LSTMs', 'Embeddings', 'Attention', 'QKV', 'Multi-Head Attention', 'Positional Encoding', 'Transformers', 'LoRA & Adapters'],
    tools: ['TensorFlow', 'Keras', 'NumPy'],
  },
  {
    title: 'Computer Vision',
    index: '03',
    art: 'vision',
    description: 'Images, visual understanding, and real-world applications.',
    concepts: ['Image Representation', 'Convolutional Networks', 'Transfer Learning', 'Object Detection', 'Image Classification', 'Visual Embeddings'],
    tools: ['Python', 'OpenCV', 'TensorFlow', 'Keras'],
  },
  {
    title: 'LLMs & NLP',
    index: '04',
    art: 'llm',
    description: 'Language models, RAG, embeddings, and useful AI systems.',
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

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="github-icon"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg>;
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  return <Tag className={`scroll-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</Tag>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const cursorRef = useRef(null);
  const cursorFrameRef = useRef(null);
  const heroRef = useRef(null);
  const [portraitFocus, setPortraitFocus] = useState(false);
  const [openWork, setOpenWork] = useState(null);
  const [openPython, setOpenPython] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), []);

  useEffect(() => {
    const onScroll = () => setScrolled((value) => {
      const nextValue = window.scrollY > 20;
      return value === nextValue ? value : nextValue;
    });
    const onMove = (event) => {
      if (cursorFrameRef.current) cancelAnimationFrame(cursorFrameRef.current);
      cursorFrameRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        if (heroRef.current) {
          const proximity = Math.max(0, 1 - Math.abs(event.clientX - window.innerWidth * 0.18) / (window.innerWidth * 0.56));
          heroRef.current.style.setProperty('--portrait-scale', (1 + proximity * 0.045).toFixed(3));
          heroRef.current.style.setProperty('--portrait-shift', `${(proximity * 3).toFixed(1)}px`);
        }
      });
      setPortraitFocus((value) => {
        const nextValue = event.clientX < window.innerWidth * 0.5;
        return value === nextValue ? value : nextValue;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const sectionVisibility = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
      const visible = [...sectionVisibility.entries()].sort((a, b) => b[1] - a[1])[0];
      if (visible && visible[1] > 0) setActiveSection(visible[0]);
    }, { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('work-item')) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
          return;
        }
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.scroll-reveal').forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      if (cursorFrameRef.current) cancelAnimationFrame(cursorFrameRef.current);
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, [sectionIds]);

  const closeMenu = () => setMenuOpen(false);
  const toggleWork = (title, event) => {
    const opening = openWork !== title;
    const row = event.currentTarget.closest('.work-item');
    setOpenWork(opening ? title : null);
    if (opening && row) requestAnimationFrame(() => row.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };
  const activeIndex = Math.max(0, navItems.findIndex((item) => item.href.slice(1) === activeSection));

  return (
    <div className="site-shell">
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

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

        <div className="section-progress" aria-label={`Current section: ${navItems[activeIndex].label}`}>
          <span className="section-progress-label">{String(activeIndex + 1).padStart(2, '0')} / {navItems[activeIndex].label.toUpperCase()}</span>
          <span className="section-progress-track"><i style={{ width: `${((activeIndex + 1) / navItems.length) * 100}%` }} /></span>
        </div>

        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span /><span />
        </button>
      </header>

      <main>
        <section ref={heroRef} id="home" className={`hero ${portraitFocus ? 'portrait-focus' : ''}`} style={{ '--hero-image': `url(${backgroundImage})` }}>
          <div className="hero-image-frame" aria-hidden="true"><div className="hero-image" /></div>
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-atmosphere" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="system-line line-one" />
            <span className="system-line line-two" />
            <span className="system-node node-one" />
            <span className="system-node node-two" />
            <span className="system-node node-three" />
            <span className="system-node node-four" />
          </div>
          <div className="grain" aria-hidden="true" />

          <div className="hero-meta hero-meta-top"><span>01 / HOME</span></div>

          <div className="hero-content">
            <Reveal className="eyebrow" delay={100}>MACHINE LEARNING / EXPERIMENTATION</Reveal>
            <Reveal as="h1" className="hero-title word-reveal" delay={170}><span>Jai</span><i className="hero-title-mark" aria-hidden="true" /></Reveal>
            <Reveal className="hero-role" delay={260}><span className="role-accent">ML</span> Enthusiast</Reveal>
            <Reveal as="p" className="hero-description word-reveal" delay={340}>
              Learn things deeply, connect ideas across disciplines, and turn them into something better.
            </Reveal>

            <Reveal className="hero-actions" delay={430}>
              <a className="primary-link magnetic-link" href="#projects"><span>View My Work</span><ArrowIcon /></a>
              <a className="secondary-link github-link magnetic-link" href="https://github.com/JAI4213H" target="_blank" rel="noreferrer"><span>GitHub</span><GitHubIcon /></a>
            </Reveal>
            <Reveal className="hero-domains" delay={500}>LLMs <span>·</span> COMPUTER VISION <span>·</span> SYSTEMS <span>·</span> REAL-WORLD AI</Reveal>
          </div>

          <Reveal className="hero-system-label" delay={620}>
            <span className="system-label-dot" aria-hidden="true" />
            <span>BUILD</span><span>LEARN</span><span>EXPERIMENT</span>
          </Reveal>

          <Reveal className="hero-metrics" delay={520}>
            <div className="metric"><strong>10+</strong><span>Projects</span></div>
            <div className="metric"><strong>6+</strong><span>Months Learning</span></div>
            <div className="metric"><strong>∞</strong><span>Experiments</span></div>
          </Reveal>

          <div className="hero-wave" aria-hidden="true" />
          <a className="scroll-cue" href="#work" aria-label="Scroll to work"><span>SCROLL TO EXPLORE</span><span className="scroll-arrow">↓</span></a>
        </section>

        <section id="work" className="work-section section-shell">
          <Reveal className="section-kicker"><span>02</span><span>WORK / AREAS OF EXPLORATION</span></Reveal>
          <div className="section-heading-row">
            <Reveal as="h2" className="word-reveal" delay={70}>What I'm Working With</Reveal>
            <Reveal as="p" delay={140}>Click a discipline to open the concepts and tools currently shaping my learning and building.<small className="section-annotation">EXPLORE <span>·</span> LEARN <span>·</span> BUILD <span>·</span> CONNECT</small></Reveal>
          </div>

          <div className="work-visual" aria-hidden="true"><span className="work-visual-orbit" /><span className="work-visual-orbit orbit-small" /><i /><i /><i /><i /><b /></div>

          <div className="work-accordion">
            {workItems.map((item, index) => {
              const isOpen = openWork === item.title;
              return (
                <div key={item.title} className={`scroll-reveal work-item ${isOpen ? 'is-open' : ''}`} style={{ '--reveal-delay': `${index * 100}ms` }}>
                  <button className="work-trigger" type="button" aria-expanded={isOpen} onClick={(event) => toggleWork(item.title, event)}>
                    <span className="work-index">{item.index}</span>
                    <span className={`discipline-art art-${item.art}`} aria-hidden="true"><i /><i /><i /></span>
                    <span className="work-title">{item.title}</span>
                    <span className="work-description">{item.description}</span>
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
                </div>
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

        <Reveal className="transition-bridge section-shell" delay={80}>
          <span className="bridge-label">CURRENTLY EXPLORING</span>
          <span className="bridge-line">LLMs <i>·</i> COMPUTER VISION <i>·</i> SYSTEMS <i>·</i> REAL-WORLD AI</span>
          <span className="bridge-sequence">LEARN <b>→</b> EXPERIMENT <b>→</b> BUILD <b>→</b> ITERATE</span>
        </Reveal>

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
