/* ============================================================
   DAKSH KUMAR — ULTRA PREMIUM PERSONAL WEBSITE
   script.js — Shared logic for all pages
   ============================================================

   FEATURES:
   1. Language system (English / हिंदी) with localStorage
   2. Auto-redirect from index.html → home.html if language saved
   3. Theme toggle (dark / light) with localStorage
   4. Mobile hamburger menu
   5. Sticky navigation on scroll
   6. Back-to-top button
   7. Scroll reveal animations
   8. Footer year auto-update
   9. Smooth anchor scrolling
   10. Dynamic content rendering (skills, projects, timeline, notes)
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. TRANSLATIONS DICTIONARY
     ============================================================
     Add or edit any key here. Both English and Hindi must have
     the same keys. Use data-i18n="key" in HTML to translate
     short text, or data-i18n-en / data-i18n-hi for inline text.
     ============================================================ */

  var TRANSLATIONS = {
    en: {
      /* Navigation */
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.learning": "Learning",
      "nav.projects": "Projects",
      "nav.journey": "Journey",
      "nav.contact": "Contact",

      /* Buttons */
      "btn.exploreStory": "Explore My Story",
      "btn.myJourney": "My Journey",
      "btn.readFullStory": "Read Full Story →",
      "btn.getInTouch": "Get in Touch",
      "btn.seeAllSkills": "See All Skills",
      "btn.viewProjects": "View Projects",
      "btn.seeAllProjects": "See All Projects",
      "btn.seeTimeline": "See Timeline",
      "btn.readNotes": "Read Notes",
      "btn.emailMe": "Email Me",
      "btn.seeSocials": "See Socials",
      "btn.sendMessage": "Send a Message",
      "btn.letsConnect": "Let's Connect",
      "btn.followJourney": "Follow the Journey",
      "btn.seeWhatsBuilding": "See What I'm Building",
      "btn.readMyStory": "Read My Story",
      "btn.exploreSkills": "Explore Skills",

      /* Footer */
      "footer.rights": "All rights reserved.",
      "footer.note": "I am still building. My story is not finished yet.",

      /* Section titles */
      "section.about": "About Me",
      "section.explore": "Explore the Journey",
      "section.mindset": "My Mindset",
      "section.vision": "My Vision",
      "section.skills": "My Skills",
      "section.learning": "What I'm Learning",
      "section.projects": "My Projects",
      "section.timeline": "The Timeline",
      "section.notes": "Personal Notes",
      "section.contact": "Get in Touch"
    },

    hi: {
      /* Navigation */
      "nav.home": "होम",
      "nav.about": "मेरे बारे में",
      "nav.skills": "स्किल्स",
      "nav.learning": "सीखना",
      "nav.projects": "प्रोजेक्ट्स",
      "nav.journey": "सफ़र",
      "nav.contact": "संपर्क",

      /* Buttons */
      "btn.exploreStory": "मेरी कहानी पढ़ें",
      "btn.myJourney": "मेरा सफ़र",
      "btn.readFullStory": "पूरी कहानी पढ़ें →",
      "btn.getInTouch": "संपर्क करें",
      "btn.seeAllSkills": "सभी स्किल्स देखें",
      "btn.viewProjects": "प्रोजेक्ट्स देखें",
      "btn.seeAllProjects": "सभी प्रोजेक्ट्स देखें",
      "btn.seeTimeline": "टाइमलाइन देखें",
      "btn.readNotes": "नोट्स पढ़ें",
      "btn.emailMe": "ईमेल करें",
      "btn.seeSocials": "सोशल देखें",
      "btn.sendMessage": "मैसेज भेजें",
      "btn.letsConnect": "जुड़ें",
      "btn.followJourney": "सफ़र फॉलो करें",
      "btn.seeWhatsBuilding": "देखें मैं क्या बना रहा हूँ",
      "btn.readMyStory": "मेरी कहानी पढ़ें",
      "btn.exploreSkills": "स्किल्स देखें",

      /* Footer */
      "footer.rights": "सर्वाधिकार सुरक्षित।",
      "footer.note": "मैं अभी भी बना रहा हूँ। मेरी कहानी अभी खत्म नहीं हुई।",

      /* Section titles */
      "section.about": "मेरे बारे में",
      "section.explore": "सफ़र को explore करें",
      "section.mindset": "मेरी सोच",
      "section.vision": "मेरा विज़न",
      "section.skills": "मेरी स्किल्स",
      "section.learning": "मैं क्या सीख रहा हूँ",
      "section.projects": "मेरे प्रोजेक्ट्स",
      "section.timeline": "टाइमलाइन",
      "section.notes": "पर्सनल नोट्स",
      "section.contact": "संपर्क करें"
    }
  };

  /* ============================================================
     2. LANGUAGE SYSTEM
     ============================================================ */

  var DEFAULT_LANG = 'en';
  var LANG_KEY = 'dk_lang';

  /**
   * Get current language from localStorage.
   * Returns 'en' as fallback.
   */
  function getCurrentLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'hi') {
        return saved;
      }
    } catch (e) {
      /* localStorage may be blocked in some browsers */
    }
    return DEFAULT_LANG;
  }

  /**
   * Save language to localStorage.
   */
  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  /**
   * Check if user has already chosen a language.
   */
  function hasChosenLang() {
    try {
      return localStorage.getItem(LANG_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  /**
   * Apply translations to all elements with data-i18n attributes.
   * Also updates <html lang="..."> attribute.
   */
  function applyTranslations(lang) {
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

    /* Update <html lang="..."> */
    document.documentElement.setAttribute('lang', lang);

    /* Elements using data-i18n="key" */
    var i18nEls = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < i18nEls.length; i++) {
      var el = i18nEls[i];
      var key = el.getAttribute('data-i18n');
      var text = dict[key];
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    }

    /* Elements using data-i18n-en / data-i18n-hi (inline bilingual) */
    var inlineEls = document.querySelectorAll('[data-i18n-en][data-i18n-hi]');
    for (var j = 0; j < inlineEls.length; j++) {
      var el2 = inlineEls[j];
      var inlineText = el2.getAttribute('data-i18n-' + lang);
      if (inlineText) {
        if (el2.tagName === 'INPUT' || el2.tagName === 'TEXTAREA') {
          el2.placeholder = inlineText;
        } else {
          el2.innerHTML = inlineText;
        }
      }
    }

    /* Update language buttons active state */
    var langBtns = document.querySelectorAll('.lang-btn');
    for (var k = 0; k < langBtns.length; k++) {
      var btn = langBtns[k];
      var btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  /**
   * Change language and save it.
   */
  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'hi') {
      lang = DEFAULT_LANG;
    }
    saveLang(lang);
    applyTranslations(lang);
  }

  /**
   * Initialize language system.
   * Wires up the .lang-btn buttons in the navbar.
   */
  function initLanguage() {
    var currentLang = getCurrentLang();
    applyTranslations(currentLang);

    var langBtns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < langBtns.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var newLang = btn.getAttribute('data-lang');
          if (newLang) {
            setLanguage(newLang);
          }
        });
      })(langBtns[i]);
    }
  }

  /* ============================================================
     3. LANGUAGE CHOICE PAGE LOGIC (index.html only)
     ============================================================
     - If user already chose a language → redirect to home.html
     - Otherwise show the language choice page
     - When user clicks an option → save choice + go to home.html
     ============================================================ */

  function initLanguageChoicePage() {
    /* Only run on language choice page */
    var isLangPage = document.body.classList.contains('lang-page');
    if (!isLangPage) return;

    /* If user already chose → redirect immediately */
    if (hasChosenLang()) {
      window.location.replace('home.html');
      return;
    }

    /* Handle option clicks */
    var options = document.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      (function (opt) {
        opt.addEventListener('click', function (e) {
          var chosen = opt.getAttribute('data-lang-choice');
          if (chosen === 'en' || chosen === 'hi') {
            saveLang(chosen);
          }
          /* Let the link navigate naturally to home.html */
        });
      })(options[i]);
    }
  }

  /* ============================================================
     4. THEME TOGGLE (dark / light)
     ============================================================ */

  var THEME_KEY = 'dk_theme';

  function initTheme() {
    var themeToggle = document.getElementById('themeToggle');

    /* Determine initial theme */
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) { /* ignore */ }

    var prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'light') {
      document.body.classList.add('light');
    } else if (saved === 'dark') {
      document.body.classList.remove('light');
    } else if (!prefersDark) {
      /* No saved preference and system is light → use light */
      document.body.classList.add('light');
    }

    if (!themeToggle) return;

    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light');
      var isLight = document.body.classList.contains('light');
      try {
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
      } catch (e) { /* ignore */ }
    });
  }

  /* ============================================================
     5. NAVIGATION
     ============================================================ */

  function initNav() {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    /* Sticky style on scroll */
    if (navbar) {
      var onScroll = function () {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Hamburger menu */
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      /* Close on nav link click */
      var navLinkItems = document.querySelectorAll('.nav-link');
      for (var i = 0; i < navLinkItems.length; i++) {
        navLinkItems[i].addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      }

      /* Close on Escape key */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      /* Close when clicking outside (on mobile) */
      document.addEventListener('click', function (e) {
        if (!navLinks.classList.contains('open')) return;
        if (navLinks.contains(e.target)) return;
        if (hamburger.contains(e.target)) return;
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }
  }

  /* ============================================================
     6. BACK TO TOP
     ============================================================ */

  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    var update = function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     7. SCROLL REVEAL
     ============================================================ */

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    /* Fallback for old browsers */
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  /* ============================================================
     8. FOOTER YEAR
     ============================================================ */

  function initFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ============================================================
     9. SMOOTH ANCHOR SCROLL
     ============================================================ */

  function initSmoothAnchors() {
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      (function (link) {
        link.addEventListener('click', function (e) {
          var targetId = link.getAttribute('href');
          if (!targetId || targetId === '#' || targetId.length < 2) return;

          var target = document.querySelector(targetId);
          if (!target) return;

          e.preventDefault();
          var navHeight = 80;
          var top = target.getBoundingClientRect().top +
                    window.pageYOffset - navHeight;

          window.scrollTo({ top: top, behavior: 'smooth' });

          if (history.replaceState) {
            history.replaceState(null, '', targetId);
          }
        });
      })(anchors[i]);
    }
  }

  /* ============================================================
     10. INITIALIZE ON DOM READY
     ============================================================ */

  function init() {
    /* Language choice page logic first (may redirect) */
    initLanguageChoicePage();

    /* Language system (safe on all pages) */
    initLanguage();

    /* Theme */
    initTheme();

    /* Navigation */
    initNav();

    /* Back to top */
    initBackToTop();

    /* Reveal animations */
    initReveal();

    /* Footer year */
    initFooterYear();

    /* Smooth anchors */
    initSmoothAnchors();
  }

  /* Run when DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();