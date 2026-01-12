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
    if (href === currentPath || (currentPath.endsWith(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

  // ---------- Dark Mode ----------
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
  
  function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }
  
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
  }
  
  initDarkMode();

  // ---------- Back to Top Button ----------
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- Data Loading Functions ----------
  async function loadJSON(filename) {
    try {
      const response = await fetch(`data/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return [];
    }
  }

  // ---------- Render Functions ----------
  function renderSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer || !skills.length) return;

    skillsContainer.innerHTML = '';
    
    skills.forEach((skill, index) => {
      const skillCard = document.createElement('div');
      skillCard.className = 'bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl';
      skillCard.setAttribute('data-aos', 'zoom-in');
      skillCard.setAttribute('data-aos-delay', (index * 100).toString());
      
      skillCard.innerHTML = `
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
            <i class="bx ${skill.icon} text-primary-600 dark:text-primary-400 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium">${skill.title}</h3>
        </div>
        <div class="space-y-3">
          ${skill.technologies.map(tech => `
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">${tech.name}</span>
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="skill-progress bg-primary-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                       data-target="${tech.level}%" style="width: 0%"></div>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">${tech.level}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      skillsContainer.appendChild(skillCard);
    });

    // Update counts on index page
    const technologiesCount = document.getElementById('technologies-count');
    if (technologiesCount) {
      const totalTechs = skills.reduce((count, skill) => count + skill.technologies.length, 0);
      technologiesCount.textContent = `${totalTechs}+`;
    }
  }

  function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || !projects.length) return;

    projectsContainer.innerHTML = '';
    
    projects.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = `project-card ${project.category.id} bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`;
      projectCard.setAttribute('data-aos', 'zoom-in');
      projectCard.setAttribute('data-aos-delay', (index * 100).toString());
      
      projectCard.innerHTML = `
        <div class="relative overflow-hidden h-48">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div class="">
            <span class="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${project.category.name}</span>
            <h3 class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">${project.title}</h3>
          </div>
        </div>
        <div class="p-6">
          <div class="overflow-y-auto text-gray-600 dark:text-gray-300 mb-4 project-description" style="max-height: 160px;">
            <p>${project.description}</p>
          </div>
          <style>.project-description::-webkit-scrollbar {width: 4px !important;}</style>
          
          <!-- Technologies utilisées -->
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Compétences et outils</h5>
            <div class="flex flex-wrap gap-2">
              ${project.technologies.map(tech => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded">${tech}</span>`).join('')}
            </div>
          </div>
          
          <!-- Liens du projet -->
          <div class="flex gap-3">
            ${project.link ? `
              <a href="${project.link}" target="_blank" 
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors duration-300 flex items-center justify-center">
                <i class="bx bx-link-external mr-1"></i> Voir le code
              </a>
            ` : ''}
          </div>
        </div>
      `;
      
      projectsContainer.appendChild(projectCard);
    });

    // Update project count on index page
    const projectsCount = document.getElementById('projects-count');
    if (projectsCount) {
      projectsCount.textContent = `${projects.length}+`;
    }

    // Initialize project filtering
    initProjectFiltering();
  }

  function renderExperiences(experiences) {
    const experiencesContainer = document.getElementById('experiences-container');
    if (!experiencesContainer || !experiences.length) return;

    experiencesContainer.innerHTML = '';
    
    experiences.forEach((exp, index) => {
      const expCard = document.createElement('div');
      expCard.className = 'bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl';
      expCard.setAttribute('data-aos', 'zoom-in');
      expCard.setAttribute('data-aos-delay', (index * 100).toString());
      
      expCard.innerHTML = `
        <div class="relative overflow-hidden h-48">
          <img src="${exp.image}" alt="${exp.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div class="">
            <span class="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${exp.period}</span>
            <h3 class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">${exp.title}</h3>
          </div>
        </div>
        
        <div class="p-6">
          <h4 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">${exp.institution}</h4>
          <div class="overflow-y-auto text-gray-600 dark:text-gray-300 mb-6 exp-description" style="max-height: 160px;">
            ${exp.description ? `<p class="text-gray-600 dark:text-gray-300 mb-4">${exp.description}</p>` : ''}
            ${exp.missions && exp.missions.length ? `
              <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Missions</h5>
              <ul class="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
                ${exp.missions.map(mission => `<li>${mission}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
          <style>.exp-description::-webkit-scrollbar {width: 4px !important;}</style>
          
          <!-- Compétences acquises -->
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Compétences et outils</h5>
            <div class="flex flex-wrap gap-2">
              ${exp.skills.map(skill => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded">${skill}</span>`).join('')}
            </div>
          </div>
          
          ${exp.link ? `
            <a href="${exp.link}" target="_blank" 
              class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-300">
              <i class="bx bx-link-external mr-1"></i> En savoir plus
            </a>
          ` : ''}
        </div>
      `;
      
      experiencesContainer.appendChild(expCard);
    });
  }

  function renderEducation(education) {
    const educationContainer = document.getElementById('education-container');
    if (!educationContainer || !education.length) return;

    educationContainer.innerHTML = '';
    
    education.forEach((edu, index) => {
      const eduCard = document.createElement('div');
      eduCard.className = 'bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl';
      eduCard.setAttribute('data-aos', 'zoom-in');
      eduCard.setAttribute('data-aos-delay', (index * 100).toString());
      
      eduCard.innerHTML = `
        <div class="relative overflow-hidden h-48">
          <img src="${edu.image}" alt="${edu.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div class="">
            <span class="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${edu.period}</span>
            <h3 class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">${edu.title}</h3>
          </div>
        </div>
        
        <div class="p-6">
          <h4 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">${edu.institution}</h4>
          <div class="overflow-y-auto text-gray-600 dark:text-gray-300 mb-4 edu-description" style="max-height: 160px;">
            ${edu.formation ? `<div class="formation-content">${edu.formation}</div>` : ''}
            ${edu.parcours ? `<div class="parcours-content">${edu.parcours}</div>` : ''}
          </div>
          <style>.edu-description::-webkit-scrollbar {width: 4px !important;}</style>
          
          <!-- Compétences acquises -->
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Compétences acquises</h5>
            <div class="flex flex-wrap gap-2">
              ${edu.skills.map(skill => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded">${skill}</span>`).join('')}
            </div>
          </div>
          
          ${edu.link ? `
            <a href="${edu.link}" target="_blank" 
              class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-300">
              <i class="bx bx-link-external mr-1"></i> En savoir plus
            </a>
          ` : ''}
        </div>
      `;
      
      educationContainer.appendChild(eduCard);
    });
  }

  // ---------- Project Filtering ----------
  function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update button states
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
      });
    });
  }

  // ---------- Skill Progress Animation ----------
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const target = bar.getAttribute('data-target');
      bar.style.width = target;
    });
  }
  
  // Use Intersection Observer to animate skills when visible
  function initSkillAnimation() {
    const skillSection = document.querySelector('#skills-container');
    if (!skillSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateSkillBars, 500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(skillSection.closest('section'));
  }

  // ---------- Form Handling ----------
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formFields = contactForm.querySelectorAll('input, textarea');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    
    formFields.forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });
      
      field.addEventListener('input', () => {
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
          errorDiv.classList.add('hidden');
          field.classList.remove('border-red-500');
        }
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
        submitText.textContent = 'Envoi en cours...';
        submitSpinner.classList.remove('hidden');
        
        const formData = new FormData(contactForm);
        
        // Pour Netlify Forms
        if (contactForm.hasAttribute('netlify')) {
          fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
          })
          .then(response => {
            if (response.ok) {
              showAlert('Message envoyé avec succès!', 'success');
              contactForm.reset();
            } else {
              showAlert('Une erreur s\'est produite. Veuillez réessayer.', 'error');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            showAlert('Une erreur s\'est produite. Veuillez réessayer.', 'error');
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Envoyer le message';
            submitSpinner.classList.add('hidden');
          });
        } else {
          // Pour Formspree ou autres services
          fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              showAlert('Message envoyé avec succès!', 'success');
              contactForm.reset();
            } else {
              showAlert('Une erreur s\'est produite. Veuillez réessayer.', 'error');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            showAlert('Une erreur s\'est produite. Veuillez réessayer.', 'error');
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Envoyer le message';
            submitSpinner.classList.add('hidden');
          });
        }
      }
    });
    
    function validateField(field) {
      const errorDiv = field.parentElement.querySelector('.error-message');
      if (!errorDiv) return true;
      
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

  // ---------- Alert System ----------
  function showAlert(message, type = 'info', duration = 5000) {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0 ${
      type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
      type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }`;
    
    alert.innerHTML = `
      <div class="flex items-center">
        <i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-x-circle' : 'bx-info-circle'} text-xl mr-2"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-xl">
          <i class="bx bx-x"></i>
        </button>
      </div>
    `;
    
    alertContainer.appendChild(alert);
    
    // Animate in
    setTimeout(() => {
      alert.classList.remove('translate-x-full', 'opacity-0');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      alert.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 300);
    }, duration);
  }

  // ---------- Load Data Based on Current Page ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (currentPage === 'index.html' || currentPage === '') {
    loadJSON('skills.json').then(renderSkills).then(initSkillAnimation);
    loadJSON('projects.json').then(renderProjects);
  } else if (currentPage === 'projects.html') {
    loadJSON('projects.json').then(renderProjects);
  } else if (currentPage === 'experiences.html') {
    loadJSON('experiences.json').then(renderExperiences);
  } else if (currentPage === 'education.html') {
    loadJSON('education.json').then(renderEducation);
  } else if (currentPage === 'contact.html') {
    initContactForm();
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

  // ---------- Initialize AOS refresh after dynamic content ----------
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 1000);
});

// Export functions for global access if needed
window.showAlert = function(message, type = 'info', duration = 5000) {
  const alertContainer = document.getElementById('alert-container');
  if (!alertContainer) return;
  
  const alert = document.createElement('div');
  alert.className = `p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0 ${
    type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
    type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }`;
  
  alert.innerHTML = `
    <div class="flex items-center">
      <i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-x-circle' : 'bx-info-circle'} text-xl mr-2"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-xl">
        <i class="bx bx-x"></i>
      </button>
    </div>
  `;
  
  alertContainer.appendChild(alert);
  
  // Animate in
  setTimeout(() => {
    alert.classList.remove('translate-x-full', 'opacity-0');
  }, 10);
  
  // Auto remove
  setTimeout(() => {
    alert.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 300);
  }, duration);
};