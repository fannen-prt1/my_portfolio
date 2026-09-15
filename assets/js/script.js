'use strict';

// element toggle function
const elementToggleFunc = function (elem) { 
  if (elem) elem.classList.toggle("active"); 
}

// sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    }
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const pages = document.querySelectorAll("[data-page]");
const navTargetElements = document.querySelectorAll("[data-nav-target]");
const currentPageLabel = document.getElementById("current-page-label");
const dropdownWrapper = document.getElementById("dropdown-nav-wrapper");
const dropdownBtn = document.getElementById("dropdown-nav-btn");
const stickyHeader = document.getElementById("sticky-scroll-header");
const scrollDownBtn = document.getElementById("scroll-down-btn");

const pageTitleMap = {
  "about": "About",
  "resume": "Resume",
  "projects": "Projects",
  "extracurricular activities": "Activities",
  "certifications": "Certifications",
  "contact": "Contact"
};

const switchPage = function (targetPage) {
  const normalizedTarget = targetPage.trim().toLowerCase();

  for (let j = 0; j < pages.length; j++) {
    if (normalizedTarget === pages[j].dataset.page.toLowerCase()) {
      pages[j].classList.add("active");
    } else {
      pages[j].classList.remove("active");
    }
  }

  navTargetElements.forEach(elem => {
    if (elem.dataset.navTarget.toLowerCase() === normalizedTarget) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  });

  if (currentPageLabel && pageTitleMap[normalizedTarget]) {
    currentPageLabel.innerText = pageTitleMap[normalizedTarget];
  }

  if (dropdownWrapper) {
    dropdownWrapper.classList.remove("open");
  }
};

// Add delegated click listener for all data-nav-target elements
document.addEventListener("click", function (e) {
  const navTargetElem = e.target.closest("[data-nav-target]");
  if (navTargetElem) {
    const targetPage = navTargetElem.getAttribute("data-nav-target");
    if (targetPage) {
      switchPage(targetPage);

      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        const targetPos = mainContent.getBoundingClientRect().top + window.pageYOffset - 50;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: "smooth"
        });
      }
    }
  }
});

// Dropdown button toggle
if (dropdownBtn && dropdownWrapper) {
  dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownWrapper.classList.toggle("open");
  });

  document.addEventListener("click", function (e) {
    if (!dropdownWrapper.contains(e.target)) {
      dropdownWrapper.classList.remove("open");
    }
  });
}

// Scroll down indicator button
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", function () {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Sticky header show/hide on scroll
window.addEventListener("scroll", function () {
  if (stickyHeader) {
    if (window.scrollY > 150) {
      stickyHeader.classList.add("show");
    } else {
      stickyHeader.classList.remove("show");
    }
  }
});

// --- SCROLL REVEAL ANIMATION ---
const revealObserver = new IntersectionObserver(
  function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }
);

const autoRevealElements = document.querySelectorAll('.service-item, .timeline-item, .skill-category, .blog-post-item');
autoRevealElements.forEach(el => {
  el.setAttribute("data-reveal", "");
  revealObserver.observe(el);
});

// --- 3D TILT EFFECT ON HOVER ---
const tiltElements = document.querySelectorAll('.project-item > a, .content-card, .service-item');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    
    this.style.setProperty('--rotateX', `${rotateX}deg`);
    this.style.setProperty('--rotateY', `${rotateY}deg`);
  });
  
  el.addEventListener('mouseleave', function() {
    this.style.setProperty('--rotateX', '0deg');
    this.style.setProperty('--rotateY', '0deg');
  });
});

// --- QUICK COPY FOR CONTACT ITEMS ---
const copyItems = document.querySelectorAll('[data-copy]');
copyItems.forEach(item => {
  item.addEventListener('click', function(e) {
    const textToCopy = this.getAttribute('data-copy');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      let toast = this.querySelector('.copy-toast');
      if (!toast) {
        toast = document.createElement('span');
        toast.className = 'copy-toast';
        toast.innerText = 'Copied!';
        this.appendChild(toast);
      }
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });
});

// --- LIGHT & DARK THEME TOGGLE ---
const applyTheme = function (theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
  
  const themeToggleBtns = document.querySelectorAll("[data-theme-toggle]");
  themeToggleBtns.forEach(btn => {
    const icon = btn.querySelector("ion-icon");
    if (icon) {
      icon.setAttribute("name", theme === "light" ? "sunny-outline" : "moon-outline");
    }
  });

  localStorage.setItem("portfolio-theme", theme);
};

// Delegated click handling for theme toggle buttons
document.addEventListener("click", function (e) {
  const themeBtn = e.target.closest("[data-theme-toggle]");
  if (themeBtn) {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  }
});

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);


