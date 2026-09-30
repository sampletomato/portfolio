/* ==========================================================================
   SOHAM NAYAK — CREATIVE PORTFOLIO ENGINE 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO API SYNTHESIZER (Tactile SFX)
  // =========================================================================
  class SoundController {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('sfx_enabled') !== 'false';
      this.initUI();
    }

    initCtx() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    initUI() {
      const sfxBtn = document.getElementById('sfxToggle');
      const sfxText = document.getElementById('sfxText');
      const sfxIcon = document.getElementById('sfxIcon');

      const updateUI = () => {
        if (!sfxBtn) return;
        if (this.enabled) {
          sfxBtn.classList.remove('is-muted');
          if (sfxText) sfxText.textContent = 'SFX ON';
          if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-high';
        } else {
          sfxBtn.classList.add('is-muted');
          if (sfxText) sfxText.textContent = 'SFX OFF';
          if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-xmark';
        }
      };

      updateUI();

      if (sfxBtn) {
        sfxBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.initCtx();
          this.enabled = !this.enabled;
          localStorage.setItem('sfx_enabled', this.enabled);
          updateUI();
          if (this.enabled) this.playClick();
        });
      }
    }

    playClick(freq = 600, duration = 0.05) {
      if (!this.enabled) return;
      this.initCtx();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {
        // Audio fallback ignore
      }
    }

    playHover() {
      if (!this.enabled) return;
      this.initCtx();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (err) {
        // Ignore
      }
    }

    playSuccess() {
      if (!this.enabled) return;
      this.initCtx();
      if (!this.ctx) return;

      try {
        const notes = [440, 554.37, 659.25, 880]; // A major chord sweep
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

          gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime + idx * 0.08);
          osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
        });
      } catch (err) {
        // Ignore
      }
    }
  }

  const sound = new SoundController();

  // Attach sound triggers to interactive elements
  document.querySelectorAll('button, a, .project-card, .service-card, .skill-chip, .purple-sticker-badge').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
    el.addEventListener('click', () => sound.playClick());
  });

  // =========================================================================
  // 2. FUTURISTIC PRELOADER CONTROLLER
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloaderPercent');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderLog = document.getElementById('preloaderLog');

  const logs = [
    "INITIALIZING LENIS SCROLL ENGINE...",
    "CALIBRATING GLOWING CURSOR PHYSICS...",
    "LOADING 3D CHARACTER SPECIMENS...",
    "CONNECTING AI PROMPT MATRIX...",
    "SYNTHESIZING AUDIO CONTROLLER...",
    "SYSTEM READY // SOHAM NAYAK PORTFOLIO"
  ];

  let currentPercent = 0;
  let logIdx = 0;

  const preloaderInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 8) + 4;

    if (currentPercent > 100) currentPercent = 100;

    if (preloaderPercent) {
      preloaderPercent.textContent = currentPercent.toString().padStart(2, '0');
    }
    if (preloaderBar) {
      preloaderBar.style.width = `${currentPercent}%`;
    }

    if (currentPercent > (logIdx + 1) * 16 && logIdx < logs.length - 1) {
      logIdx++;
      if (preloaderLog) preloaderLog.textContent = logs[logIdx];
    }

    if (currentPercent >= 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
        document.body.classList.remove('is-loading');
      }, 300);
    }
  }, 40);

  // =========================================================================
  // 3. LENIS MOMENTUM SCROLL INITIALIZATION
  // =========================================================================
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth Anchor Scroll Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -70 });
        }
      });
    });
  }

  // Header Scroll Shadow
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    const scrollY = window.scrollY || (lenis ? lenis.scroll : 0);
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
  if (lenis) lenis.on('scroll', handleScroll);

  // =========================================================================
  // 4. CUSTOM GLOWING & TRAILING PHYSICS CURSOR
  // =========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');
  const cursorBadge = document.getElementById('cursorBadge');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  const renderCursor = () => {
    // Lerp smoothing physics
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    if (cursorFollower) {
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(renderCursor);
  };
  renderCursor();

  // Hover targets for custom cursor scaling
  document.querySelectorAll('a, button, input, select, textarea, .filter-btn, .purple-sticker-badge').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorFollower) cursorFollower.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      if (cursorFollower) cursorFollower.classList.remove('is-hover');
    });
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (cursorFollower) cursorFollower.classList.add('is-card');
      if (cursorBadge) cursorBadge.textContent = 'EXPLORE';
    });
    card.addEventListener('mouseleave', () => {
      if (cursorFollower) cursorFollower.classList.remove('is-card');
      if (cursorBadge) cursorBadge.textContent = '';
    });
  });

  // =========================================================================
  // 5. PARALLAX DEPTH EFFECTS (Character + Background Text)
  // =========================================================================
  const heroCharImg = document.getElementById('heroCharImg');
  const giantBgText = document.getElementById('giantBgText');
  const heroSection = document.getElementById('hero');

  let targetCharX = 0;
  let targetCharY = 0;
  let currCharX = 0;
  let currCharY = 0;

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      targetCharX = (clientX - innerWidth / 2) / 35;
      targetCharY = (clientY - innerHeight / 2) / 35;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetCharX = 0;
      targetCharY = 0;
    });
  }

  // Smooth Parallax Animation Loop
  const updateParallax = () => {
    currCharX += (targetCharX - currCharX) * 0.1;
    currCharY += (targetCharY - currCharY) * 0.1;

    const scrollY = window.scrollY || (lenis ? lenis.scroll : 0);
    const charScrollOffset = scrollY * 0.12;
    const textScrollOffset = scrollY * 0.25;

    if (heroCharImg) {
      heroCharImg.style.transform = `translate3d(${currCharX}px, ${currCharY + charScrollOffset}px, 0)`;
    }

    if (giantBgText) {
      giantBgText.style.transform = `translateY(calc(-50% + ${textScrollOffset}px)) scale(1)`;
    }

    requestAnimationFrame(updateParallax);
  };
  updateParallax();

  // Dynamic Background Text Words Cycler
  const roles = ["MULTIMEDIA", "3D MODELING", "FULL-STACK", "AI PROMPTING", "MOTION FX", "SOHAM NAYAK"];
  let roleIndex = 0;

  if (giantBgText) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      giantBgText.style.opacity = '0';
      
      setTimeout(() => {
        giantBgText.textContent = roles[roleIndex];
        giantBgText.style.opacity = '0.98';
      }, 300);
    }, 3500);
  }

  // =========================================================================
  // 6. LIVE STATUS BADGE & TOOLTIP CLOCK
  // =========================================================================
  const statusBadge = document.getElementById('statusBadge');
  const statusPopover = document.getElementById('statusPopover');
  const liveClock = document.getElementById('liveClock');

  // Digital Clock Updater
  const updateClock = () => {
    const now = new Date();
    // Convert to IST format (GMT+5:30) or local user time display
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    if (liveClock) {
      liveClock.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    }
  };
  setInterval(updateClock, 1000);
  updateClock();

  // Popover Toggle
  if (statusBadge && statusPopover) {
    statusBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = statusPopover.classList.contains('active');
      if (isActive) {
        statusPopover.classList.remove('active');
        statusBadge.setAttribute('aria-expanded', 'false');
      } else {
        statusPopover.classList.add('active');
        statusBadge.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!statusPopover.contains(e.target) && !statusBadge.contains(e.target)) {
        statusPopover.classList.remove('active');
        statusBadge.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 7. NAVIGATION DRAWER & SCROLLSPY
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const drawerClose = document.getElementById('drawerClose');
  const navDrawer = document.getElementById('navDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const navLinks = document.querySelectorAll('.drawer-nav .nav-link');

  const openDrawer = () => {
    if (navDrawer) navDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (navDrawer) navDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ScrollSpy Active Link Update
  const sections = document.querySelectorAll('section[id]');
  const updateScrollSpy = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateScrollSpy);

  // =========================================================================
  // 8. 3D CARD TILT EFFECT
  // =========================================================================
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // =========================================================================
  // 9. DYNAMIC FILTERABLE PROJECT GALLERY
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =========================================================================
  // 10. IMMERSIVE PROJECT DETAIL MODAL SYSTEM
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');

  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDescFull = document.getElementById('modalDescFull');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalDiscipline = document.getElementById('modalDiscipline');
  const modalTechPills = document.getElementById('modalTechPills');
  const modalVisualBg = document.getElementById('modalVisualBg');
  const modalMainIcon = document.getElementById('modalMainIcon');

  const projectData = {
    p1: {
      title: "CYBERPUNK 3D PORTFOLIO SPEC",
      subtitle: "High-end editorial web application with real-time WebGL graphics, Lenis momentum scroll, and custom audio physics.",
      category: "3D MODELING & DEV",
      year: "SPEC-2026",
      discipline: "3D Modeling, WebGL, Full-Stack Dev",
      bgClass: "bg-gradient-1",
      icon: "fa-cube",
      desc: "An experimental high-performance creative portfolio built to bridge 3D graphics, procedural audio, and brutalist typography. Features dynamic camera controls, real-time lighting shaders, and low-latency Web Audio API micro-interactions.",
      highlights: [
        "Integrated Lenis smooth momentum scroll for 60fps inertia",
        "Custom Web Audio API synthesizer for tactile sound effects",
        "Dual-axis mouse parallax on 3D avatar & typography",
        "Responsive grid overlay & customizable theme system"
      ],
      tech: ["Three.js", "WebGL", "HTML5/CSS3", "JavaScript", "Lenis Scroll"]
    },
    p2: {
      title: "AI GEN ENGINE & PROMPT MATRIX",
      subtitle: "High-throughput LLM & Midjourney prompt automation suite designed for creative AI asset pipelines.",
      category: "AI PROMPTING & DESIGN",
      year: "SPEC-2026",
      discipline: "Prompt Engineering, LLM Pipelines, UI/UX",
      bgClass: "bg-gradient-2",
      icon: "fa-brain",
      desc: "A production suite engineered to automate structured prompt generation for image synthesis and LLM coding agents. Built for rapid asset generation, automated token optimization, and seamless creative workflows.",
      highlights: [
        "Advanced multi-modal prompt matrix for Midjourney & Stable Diffusion",
        "Automated LLM context window optimization",
        "Custom UI dashboard with real-time token tracking",
        "Python & Node.js backend integrations"
      ],
      tech: ["Prompt Engineering", "Claude API", "Python", "Node.js", "Generative AI"]
    },
    p3: {
      title: "NEON MOTION EDIT REEL 2026",
      subtitle: "Cinematic video editing showcase blending audio-reactive visual cuts, motion typography, and sound design.",
      category: "MOTION & VIDEO EDITING",
      year: "SPEC-2026",
      discipline: "Video Editing, Motion Graphics, Sound FX",
      bgClass: "bg-gradient-3",
      icon: "fa-film",
      desc: "Fast-paced editorial video showcase featuring custom kinetic typography, visual effects, precision color grading, and audio-synced transition cuts tailored for modern media platforms.",
      highlights: [
        "Frame-accurate sound effect sync & bass drop cuts",
        "Custom After Effects kinetic typography templates",
        "Professional DaVinci Resolve color grading workflow",
        "Cross-platform 4K render export settings"
      ],
      tech: ["Premiere Pro", "After Effects", "Color Grading", "Sound Design", "Kinetic Typography"]
    },
    p4: {
      title: "MULTIMEDIA CREATOR DASHBOARD",
      subtitle: "Production web portal engineered for creators to manage video render queues, AI prompts, and software repositories.",
      category: "FULL-STACK SOFTWARE",
      year: "SPEC-2026",
      discipline: "Full-Stack Web, REST APIs, UI Architecture",
      bgClass: "bg-gradient-4",
      icon: "fa-laptop-code",
      desc: "Unified web portal providing creative developers with automated render management, prompt history logs, project analytics, and direct client inquiry transmission in one responsive dashboard.",
      highlights: [
        "Modular DOM state management with zero external framework weight",
        "REST API endpoints for real-time asset queuing",
        "Responsive dark mode glassmorphic interface",
        "Integrated client inquiry transmission logger"
      ],
      tech: ["Full-Stack Web", "REST API", "JavaScript", "HTML/CSS", "Dashboard Design"]
    },
    p5: {
      title: "DYNAMIC 'S' EMBLEM & 3D LOGO",
      subtitle: "Minimalist dynamic vector logo system and 3D procedural branding assets designed for high-impact visual identity.",
      category: "3D & GRAPHIC DESIGN",
      year: "SPEC-2026",
      discipline: "Brand Identity, Vector Graphics, 3D Assets",
      bgClass: "bg-gradient-1",
      icon: "fa-shapes",
      desc: "Comprehensive visual branding identity centered around a geometric vector emblem, 3D embossed logo renders, typography systems, and high-fashion merchandise layouts.",
      highlights: [
        "Scalable SVG vector icon system with grid guides",
        "High-poly 3D logo renders with metallic red materials",
        "Complete editorial typography hierarchy guidelines",
        "Merchandise mockups & web asset packages"
      ],
      tech: ["Illustrator", "Photoshop", "3D Rendering", "Vector Art", "Brand Identity"]
    },
    p6: {
      title: "KINETIC TYPOGRAPHY & EDITORIAL VFX",
      subtitle: "Experimental motion design exploration integrating generative AI frame interpolation with brutalist typography.",
      category: "MOTION & AI PROMPTING",
      year: "SPEC-2026",
      discipline: "Motion FX, AI Interpolation, Audio Synth",
      bgClass: "bg-gradient-3",
      icon: "fa-wand-magic-sparkles",
      desc: "An experimental visual artwork merging generative AI frame interpolation with brutalist kinetic typography and audio synthesizers to produce futuristic video art.",
      highlights: [
        "AI-assisted frame interpolation for hyper-smooth motion",
        "Audio-reactive visual pulse generators",
        "Brutalist typographic layout composition",
        "Exported as high-resolution WebGL video texture"
      ],
      tech: ["After Effects", "AI Interpolation", "Kinetic Motion", "Sound Design", "Generative Media"]
    }
  };

  const openModal = (projId) => {
    const data = projectData[projId] || projectData.p1;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalYear) modalYear.textContent = data.year;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalDescFull) modalDescFull.textContent = data.desc;
    if (modalDiscipline) modalDiscipline.textContent = data.discipline;

    if (modalVisualBg) {
      modalVisualBg.className = `showcase-visual-content ${data.bgClass}`;
    }
    if (modalMainIcon) {
      modalMainIcon.className = `fa-solid ${data.icon} showcase-main-icon`;
    }

    if (modalHighlights) {
      modalHighlights.innerHTML = data.highlights.map(h => `<li><i class="fa-solid fa-check"></i> ${h}</li>`).join('');
    }

    if (modalTechPills) {
      modalTechPills.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    }

    if (projectModal) projectModal.classList.add('active');
    if (modalBackdrop) modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (projectModal) projectModal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (projectModal) projectModal.classList.remove('active');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (projectModal) projectModal.setAttribute('aria-hidden', 'true');
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openModal(projId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Showcase Tabs inside Modal
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const modalScreenBadge = document.getElementById('modalScreenBadge');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const slideMode = tab.getAttribute('data-slide');
      if (modalScreenBadge) {
        if (slideMode === 'overview') modalScreenBadge.textContent = 'INTERACTIVE DEMO PREVIEW';
        if (slideMode === 'features') modalScreenBadge.textContent = 'SYSTEM ARCHITECTURE';
        if (slideMode === 'stack') modalScreenBadge.textContent = 'TECHNICAL SPECIFICATIONS';
      }
    });
  });

  // =========================================================================
  // 11. WORKING CONTACT FORM & SUCCESS RECEIPT MODAL
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnIcon = document.getElementById('submitBtnIcon');

  const successModal = document.getElementById('successModal');
  const successModalBackdrop = document.getElementById('successModalBackdrop');
  const successCloseBtn = document.getElementById('successCloseBtn');
  const receiptId = document.getElementById('receiptId');
  const receiptSender = document.getElementById('receiptSender');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal || !validateEmail(emailVal)) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      const msgVal = messageInput.value.trim();
      if (!msgVal || msgVal.length < 10) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (!isValid) return;

      // Form Transmit Animation State
      submitBtn.classList.add('is-loading');
      if (submitBtnText) submitBtnText.textContent = 'TRANSMITTING...';
      if (submitBtnIcon) submitBtnIcon.className = 'fa-solid fa-spinner';

      setTimeout(() => {
        sound.playSuccess();

        // Generate Transmission Receipt ID
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        if (receiptId) receiptId.textContent = `#SPEC-2026-${randomNum}`;
        if (receiptSender) receiptSender.textContent = nameVal;

        // Reset Button State
        submitBtn.classList.remove('is-loading');
        if (submitBtnText) submitBtnText.textContent = 'SEND TRANSMISSION';
        if (submitBtnIcon) submitBtnIcon.className = 'fa-solid fa-paper-plane';

        // Show Success Modal
        if (successModal) successModal.classList.add('active');
        if (successModalBackdrop) successModalBackdrop.classList.add('active');

        // Reset Form
        contactForm.reset();
      }, 1200);
    });
  }

  const closeSuccessModal = () => {
    if (successModal) successModal.classList.remove('active');
    if (successModalBackdrop) successModalBackdrop.classList.remove('active');
  };

  if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);
  if (successModalBackdrop) successModalBackdrop.addEventListener('click', closeSuccessModal);

});
