// Mapping des icônes pour les compétences/technologies
const skillIcons = {
  'Python': 'bxl-python',
  'Flask': 'bx-server',
  'Docker': 'bxl-docker',
  'GitLab': 'bxl-git',
  'CI/CD': 'bx-git-branch',
  'R': 'bx-code-alt',
  'Excel': 'bx-spreadsheet',
  'Data Visualisation': 'bx-bar-chart-alt-2',
  'HTML': 'bxl-html5',
  'CSS': 'bxl-css3',
  'JavaScript': 'bxl-javascript',
  'Shiny': 'bx-radar',
  'Bokeh': 'bx-line-chart',
  'Pandas': 'bx-data',
  'RAG': 'bx-brain',
  'Statistiques': 'bx-math',
  'Analyse de données': 'bx-analyse',
  'ML et DL': 'bx-chip',
  'NLP': 'bx-message-square-dots',
  'Econométrie': 'bx-trending-up',
  'Analyse': 'bx-chart',
  'Algèbre': 'bx-calculator',
  'Statistiques et Probabilités': 'bx-bar-chart',
  'Micro et Macroéconomie': 'bx-dollar-circle',
  'Optimisation': 'bx-target-lock',
  'Théorie des graphes': 'bx-network-chart',
  'SI': 'bx-server'
};

// Fonction pour obtenir l'icône d'une compétence
function getSkillIcon(skill) {
  return skillIcons[skill] || 'bx-check-circle';
}

// Fonction pour charger et afficher les formations
async function loadEducation() {
  try {
    const response = await fetch('./data/education.json');
    const educationData = await response.json();
    const container = document.getElementById('education-container');
    
    if (!container) return;
    
    container.innerHTML = educationData.map((edu, index) => `
      <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
        <div class="relative overflow-hidden h-48">
          <img src="./${edu.image}" alt="${edu.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div>
            <span class="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${edu.period}</span>
            <h3 class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">${edu.title}</h3>
          </div>
        </div>
        
        <div class="p-6">
          <h4 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">${edu.institution}</h4>
          <div class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            ${edu.formation}
          </div>
          
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Compétences acquises</h5>
            <div class="flex flex-wrap gap-2">
              ${edu.skills.slice(0, 3).map(skill => `
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded flex items-center">
                  <i class="bx ${getSkillIcon(skill)} mr-1"></i>
                  ${skill}
                </span>
              `).join('')}
              ${edu.skills.length > 3 ? `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded">+${edu.skills.length - 3}</span>` : ''}
            </div>
          </div>
          
          <button onclick="openEducationModal(${index})" class="btn-voir-plus">
            <span>Voir plus</span>
            <i class="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erreur lors du chargement des formations:', error);
  }
}

// Fonction pour charger et afficher les expériences
async function loadExperiences() {
  try {
    const response = await fetch('./data/experiences.json');
    const experiencesData = await response.json();
    const container = document.getElementById('experiences-container');
    
    if (!container) return;
    
    container.innerHTML = experiencesData.map((exp, index) => `
      <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
        <div class="relative overflow-hidden h-48">
          <img src="./${exp.image}" alt="${exp.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div>
            <span class="absolute top-3 right-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${exp.period}</span>
            <h3 class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-xl font-semibold">${exp.title}</h3>
          </div>
        </div>
        
        <div class="p-6">
          <h4 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">${exp.institution}</h4>
          <div class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            ${exp.description}
          </div>
          
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Compétences et outils</h5>
            <div class="flex flex-wrap gap-2">
              ${exp.skills.map(skill => `
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded flex items-center">
                  <i class="bx ${getSkillIcon(skill)} mr-1"></i>
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>
          
          <button onclick="openExperienceModal(${index})" class="btn-voir-plus">
            <span>Voir plus</span>
            <i class="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erreur lors du chargement des expériences:', error);
  }
}

// Fonction pour charger et afficher les projets
async function loadProjects() {
  try {
    const response = await fetch('./data/projects.json');
    const projectsData = await response.json();
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    container.innerHTML = projectsData.map((project, index) => `
      <div class="project-card ${project.category.id} bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
        <div class="relative overflow-hidden h-48">
          <img src="./${project.image}" alt="${project.title}" class="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110">
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">${project.category.name}</span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">${project.title}</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            ${project.description}
          </p>
          
          <div class="mb-4">
            <h5 class="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Technologies utilisées</h5>
            <div class="flex flex-wrap gap-2">
              ${project.technologies.map(tech => `
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded flex items-center">
                  <i class="bx ${getSkillIcon(tech)} mr-1"></i>
                  ${tech}
                </span>
              `).join('')}
            </div>
          </div>
          
          <button onclick="openProjectModal(${index})" class="btn-voir-plus">
            <span>Voir plus</span>
            <i class="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
  }
}

// Variables globales pour stocker les données
let educationData = [];
let experiencesData = [];
let projectsData = [];

// Charger toutes les données
async function loadAllData() {
  try {
    const [eduResponse, expResponse, projResponse] = await Promise.all([
      fetch('./data/education.json'),
      fetch('./data/experiences.json'),
      fetch('./data/projects.json')
    ]);
    
    educationData = await eduResponse.json();
    experiencesData = await expResponse.json();
    projectsData = await projResponse.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  }
}

// Fonctions pour ouvrir les modales
function openEducationModal(index) {
  const edu = educationData[index];
  const modal = document.getElementById('detail-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = edu.title;
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div>
        <h4 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">${edu.institution}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4"><i class="bx bx-calendar mr-1"></i>${edu.period}</p>
      </div>
      ${edu.formation ? `
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">À propos de la formation</h5>
          <p class="text-gray-600 dark:text-gray-300">${edu.formation}</p>
        </div>
      ` : ''}
      ${edu.parcours ? `
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Parcours</h5>
          <p class="text-gray-600 dark:text-gray-300">${edu.parcours}</p>
        </div>
      ` : ''}
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Compétences acquises</h5>
        <div class="flex flex-wrap gap-2">
          ${edu.skills.map(skill => `
            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center">
              <i class="bx ${getSkillIcon(skill)} mr-2"></i>
              ${skill}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add('show');
}

function openExperienceModal(index) {
  const exp = experiencesData[index];
  const modal = document.getElementById('detail-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = exp.title;
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div>
        <h4 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">${exp.institution}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4"><i class="bx bx-calendar mr-1"></i>${exp.period}</p>
      </div>
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Description</h5>
        <p class="text-gray-600 dark:text-gray-300">${exp.description}</p>
      </div>
      ${exp.missions && exp.missions.length > 0 ? `
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Missions principales</h5>
          <ul class="space-y-2">
            ${exp.missions.map(mission => `
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <i class="bx bx-check-circle text-primary-600 dark:text-primary-400 mr-2 mt-1 flex-shrink-0"></i>
                <span>${mission}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Compétences et outils</h5>
        <div class="flex flex-wrap gap-2">
          ${exp.skills.map(skill => `
            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center">
              <i class="bx ${getSkillIcon(skill)} mr-2"></i>
              ${skill}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add('show');
}

function openProjectModal(index) {
  const project = projectsData[index];
  const modal = document.getElementById('detail-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = project.title;
  modalBody.innerHTML = `
    <div class="space-y-4">
      <div>
        <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full">
          ${project.category.name}
        </span>
      </div>
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Description</h5>
        <p class="text-gray-600 dark:text-gray-300">${project.description}</p>
      </div>
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Technologies utilisées</h5>
        <div class="flex flex-wrap gap-2">
          ${project.technologies.map(tech => `
            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full flex items-center">
              <i class="bx ${getSkillIcon(tech)} mr-2"></i>
              ${tech}
            </span>
          `).join('')}
        </div>
      </div>
      ${project.link ? `
        <div class="pt-4">
          <a href="${project.link}" target="_blank" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <i class="bx bxl-github text-2xl"></i>
            Voir sur GitHub
          </a>
        </div>
      ` : ''}
    </div>
  `;
  
  modal.classList.add('show');
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('show');
}

// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function() {
  // Charger toutes les données au démarrage
  loadAllData();
  
  // Charger les contenus spécifiques selon la page
  if (document.getElementById('education-container')) {
    loadEducation();
  }
  if (document.getElementById('experiences-container')) {
    loadExperiences();
  }
  if (document.getElementById('projects-container')) {
    loadProjects();
  }
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