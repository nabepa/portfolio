'use strict';

// Make navbar untransparent when it is on the bottom
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  /// event.target은 event가 발생한 target element를 반환
  const target = event.target;
  /// element.dataset.*는 HTML의 element에 data-*로 지정한 데이터를 가져옴
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  /// 작은 화면일 때, 버튼으로 navbar__menu열어 눌러 스크롤링 될때 창닫기
  navbarMenu.classList.remove('open');

  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on the "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  /// Navbar의 메뉴 선택과 달리, 얘는 눌리면 무조건 contact me btn이 눌린거니
  /// 눌린 target element가 뭔지 확인할 필요 없음
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

// Projects
const workBtnContainer = document.querySelector('.works__categories');
const projectsContainer = document.querySelector('.works__projects');
/// element.querySelectorAll(selector) 모든 selector 선택
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  /// ||뒤를 쓴 이유: 숫자 부분(프로젝트 몇개인지) 누르면, 숫자가 들어 있는 span이 선택됨
  /// 이것은 dataset.filter를 가지지 않음
  /// 따라서 span이 눌린 경우, 그 부모 노드인 category__btn의 dataset.filter을 가져 오게 하는 것
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and selct the new one
  const active = document.querySelector('.category__btn.selected');
  /// 가끔씩 누르다보면, querySelector가 제대로 작동 않하는 경우 있음
  /// 그래서 제대로 받았는지 검사해주는게 좋음!
  if (active != null) {
    active.classList.remove('selected');
  }
  event.target.classList.add('selected');

  // Filter project
  /*
  projectsContainer.classList.add('anim-out');
  projects.forEach((project) => {
    if (filter === '*' || filter === project.dataset.type) {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');
    }
  });
  setTimeout(() => {
    projectsContainer.classList.remove('anim-out');
  }, 300);
  */
  /// 모든 코드는 동기적으로 처림됨(코드가 완료되면 브라우저가 업데이트)
  /// 위의 코드에서 setTimeout은 브라우저야 "업데이트하고 300ms 후에 {}안의 코드를 실행해"라는 함수
  /// 즉, anim-out하고 필터링을 동시에 업데이트하고, 300ms 후에 anim-out을 없애줘 표시함
  /// 따라서 이미 필터링하고 그림이 작아지며 사라졌다 돌아오는 이상한 애니메이션이 됨
  /// 밑에 처럼 setTimeout 안에 필터링하면, 일단 없애고(anim-out) 300ms 후에 필터링된애가 나타나므로 자연스러운 애니메이션 됨
  projectsContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectsContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
