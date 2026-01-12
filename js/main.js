// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function() {
  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // ---------- Navigation & Menu Mobile ----------
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenu = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Active link
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ---------- Dark Mode Toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  // Check if user has dark mode preference
  if (localStorage.getItem('darkMode') === 'true' || 
     (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') !== 'false')) {
    document.documentElement.classList.add('dark');
  }
  
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
  }
  
  if (themeToggle) themeToggle.addEventListener('click', toggleDarkMode);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleDarkMode);

  // ---------- Back to Top Button ----------
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible');
    }
  });
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- Project Filtering ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const noProjectsMsg = document.getElementById('no-projects');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active', 'bg-primary-600', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-gray-200', 'dark:bg-gray-700'));
        btn.classList.add('active', 'bg-primary-600', 'text-white');
        btn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
        
        const filter = btn.getAttribute('data-filter');
        let visibleProjects = 0;
        
        projectCards.forEach(card => {
          if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
            visibleProjects++;
            
            // Add animation when cards appear
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
          }
        });
        
        // Show/hide "no projects" message
        if (noProjectsMsg) {
          noProjectsMsg.classList.toggle('hidden', visibleProjects > 0);
        }
      });
    });
  }

  // ---------- Skill Progress Animation ----------
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const target = bar.getAttribute('data-target');
      bar.style.width = target;
    });
  }
  
  // Use Intersection Observer to animate skills when visible
  if (skillBars.length > 0) {
    const skillSection = document.querySelector('.skill-container').closest('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(skillSection);
  }

  // ---------- Form Validation ----------
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const formFields = contactForm.querySelectorAll('input, textarea');
    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('spinner');
    const formStatus = document.getElementById('form-status');
    
    formFields.forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });
      
      field.addEventListener('input', () => {
        const errorDiv = field.nextElementSibling;
        errorDiv.classList.add('hidden');
        field.classList.remove('border-red-500');
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      formFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Show loading spinner
        submitBtn.disabled = true;
        spinner.classList.remove('hidden');
        
        // Configuration EmailJS - REMPLACER PAR VOS PROPRES IDs
        // Pour utiliser EmailJS:
        // 1. Créez un compte sur https://www.emailjs.com/
        // 2. Configurez un service email (Gmail, Outlook, etc.)
        // 3. Créez un template d'email
        // 4. Remplacez 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'
        
        const templateParams = {
          from_name: document.getElementById('name').value,
          from_email: document.getElementById('email').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };
        
        // Vérifier si EmailJS est chargé
        if (typeof emailjs !== 'undefined') {
          emailjs.send('service_rv3looo', 'template_kutkjkw', templateParams, '1MunetjMpfBPxbHRg')
            .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
              formStatus.textContent = "Message envoyé avec succès!";
              formStatus.classList.add('text-green-600', 'dark:text-green-400');
              contactForm.reset();
            }, function(error) {
              console.log('FAILED...', error);
              formStatus.textContent = "Une erreur s'est produite. Veuillez réessayer.";
              formStatus.classList.add('text-red-600', 'dark:text-red-400');
            })
            .finally(() => {
              spinner.classList.add('hidden');
              setTimeout(() => {
                submitBtn.disabled = false;
                formStatus.textContent = "";
                formStatus.classList.remove('text-green-600', 'dark:text-green-400', 'text-red-600', 'dark:text-red-400');
              }, 3000);
            });
        } else {
          // Fallback si EmailJS n'est pas chargé
          console.error('EmailJS not loaded');
          formStatus.textContent = "Service d'envoi non configuré. Veuillez configurer EmailJS.";
          formStatus.classList.add('text-red-600', 'dark:text-red-400');
          spinner.classList.add('hidden');
          submitBtn.disabled = false;
          
          setTimeout(() => {
            formStatus.textContent = "";
            formStatus.classList.remove('text-red-600', 'dark:text-red-400');
          }, 5000);
        }
      }
    });
    
    function validateField(field) {
      const errorDiv = field.nextElementSibling;
      
      // Check if field is empty
      if (field.required && !field.value.trim()) {
        showError(field, errorDiv, "Ce champ est requis");
        return false;
      }
      
      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          showError(field, errorDiv, "Veuillez entrer une adresse email valide");
          return false;
        }
      }
      
      return true;
    }
    
    function showError(field, errorDiv, message) {
      errorDiv.textContent = message;
      errorDiv.classList.remove('hidden');
      field.classList.add('border-red-500');
    }
  }

  // ---------- Alert Message Auto-Dismiss ----------
  const alertMessages = document.querySelectorAll('.alert-message');
  
  if (alertMessages.length > 0) {
    alertMessages.forEach(alert => {
      setTimeout(() => {
        alert.classList.add('opacity-0');
        setTimeout(() => {
          alert.remove();
        }, 500);
      }, 5000);
    });
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---------- Page Transitions ----------
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if modifier keys are pressed or it's an external link
      if (e.metaKey || e.ctrlKey || href.startsWith('http')) return;
      
      e.preventDefault();
      
      document.body.classList.add('opacity-0');
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // ---------- Image Lazy Loading ----------
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ---------- Typewriter Effect ----------
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  const heroTitle = document.querySelector('h1');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 70);
  }

  // ---------- Parallax Effect ----------
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('section:first-of-type');
    
    if (heroSection) {
      const background = heroSection.querySelector('div');
      background.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // ---------- Mouse Move Effects ----------
  const profileImg = document.querySelector('.rounded-full.w-full.h-full');
  
  if (profileImg) {
    document.addEventListener('mousemove', function(e) {
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      
      profileImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  // ---------- Animation on elements when they come into view ----------
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;
      
      if (isVisible) {
        el.classList.add('animated');
      }
    });
  }
  
  // Add animate-on-scroll class to elements you want to animate
  document.querySelectorAll('.card-hover').forEach(el => {
    el.classList.add('animate-on-scroll');
  });
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load

  // ---------- Toast Notifications ----------
  function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`;
    toast.innerHTML = `
      <div class="flex items-center">
        <i class="bx ${type === 'error' ? 'bx-x-circle' : 'bx-check-circle'} text-xl mr-2"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Make the toast visible
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }

  // Example of using toast (uncomment to test)
  // showToast('Bienvenue sur mon portfolio!', 'info', 3000);
});

// Gestion du défilement des compétences
document.addEventListener('DOMContentLoaded', function() {
  const skillsContainer = document.querySelector('.skills-container');
  if (!skillsContainer) return;
  
  const scrollWrapper = skillsContainer.querySelector('.skills-scroll-wrapper');
  
  // Variables pour le défilement manuel
  let isScrolling = false;
  let startY;
  let scrollTop;
  
  // Gestion du défilement manuel au survol
  skillsContainer.addEventListener('mousedown', (e) => {
    isScrolling = true;
    skillsContainer.style.cursor = 'grabbing';
    startY = e.pageY - skillsContainer.offsetTop;
    scrollTop = skillsContainer.scrollTop;
    e.preventDefault();
  });
  
  document.addEventListener('mouseup', () => {
    isScrolling = false;
    skillsContainer.style.cursor = 'grab';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    const y = e.pageY - skillsContainer.offsetTop;
    const walkY = (y - startY) * 1.5; // Multiplicateur pour accélérer le défilement
    skillsContainer.scrollTop = scrollTop - walkY;
  });
  
  // Ajuster l'animation en fonction du nombre de compétences
  const skillItems = document.querySelectorAll('.skill-icon-container');
  const itemCount = skillItems.length / 2; // Divisé par 2 car nous avons dupliqué les éléments
  
  // Si on a beaucoup d'éléments, ralentir l'animation
  if (itemCount > 6) {
    const animationDuration = Math.min(30, itemCount * 2.5);
    scrollWrapper.style.animationDuration = `${animationDuration}s`;
  }
  
  // Créer un clone des items à la fin pour un défilement continu sans saut
  const firstGridItems = scrollWrapper.querySelector('.grid:first-child');
  const lastGridItems = scrollWrapper.querySelector('.grid:last-child');
  
  // S'assurer que les deux grilles ont exactement le même contenu
  lastGridItems.innerHTML = firstGridItems.innerHTML;
});