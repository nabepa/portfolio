'use strict';

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Active Navbar
const sectionIds = ['#home', '#about', '#works', '#study', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link='${id}']`)
);

let selectedNavIdx = getIdxOfSectionOnViewPort();
let selectedNavItem = navItems[selectedNavIdx];
const observerOpts = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // when an entry disappears from screen
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const idx = sectionIds.indexOf(`#${entry.target.id}`);
      // scroll down
      if (entry.boundingClientRect.y < 0) {
        selectedNavIdx = idx + 1;
      } else {
        selectedNavIdx = idx - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOpts);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIdx = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIdx = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIdx]);
});

window.addEventListener('load', () => {
  selectNavItem(navItems[selectedNavIdx]);
});

// Handle click on the "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// // Projects
// const workBtnContainer = document.querySelector('.works__categories');
// const projectsContainer = document.querySelector('.works__projects');
// const projects = document.querySelectorAll('.project');
// workBtnContainer.addEventListener('click', (event) => {
//   const filter =
//     event.target.dataset.filter || event.target.parentNode.dataset.filter;
//   if (filter == null) {
//     return;
//   }

//   // Remove selection from the previous item and selct the new one
//   const active = document.querySelector('.category__btn.selected');
//   if (active != null) {
//     active.classList.remove('selected');
//   }
//   event.target.classList.add('selected');

//   // Filter project
//   projectsContainer.classList.add('anim-out');
//   setTimeout(() => {
//     projects.forEach((project) => {
//       if (filter === '*' || filter === project.dataset.type) {
//         project.classList.remove('invisible');
//       } else {
//         project.classList.add('invisible');
//       }
//     });
//     projectsContainer.classList.remove('anim-out');
//   }, 300);
// });

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

function getIdxOfSectionOnViewPort() {
  const section = document
    .elementFromPoint(window.innerWidth / 2, window.innerHeight * (2 / 3))
    .closest('.section');
  const idx = sectionIds.indexOf(`#${section.id}`);
  return idx;
}
