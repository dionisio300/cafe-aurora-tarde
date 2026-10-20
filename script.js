// Interações simples, sem bibliotecas nem servidor.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const carousel = document.querySelector('.carousel');
const slides = carousel ? Array.from(carousel.querySelectorAll('.hero-slide')) : [];
const indicators = carousel ? Array.from(carousel.querySelectorAll('.carousel-indicator')) : [];
const previousButton = carousel?.querySelector('.carousel-previous');
const nextButton = carousel?.querySelector('.carousel-next');
const carouselStatus = carousel?.querySelector('.carousel-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let autoplayTimer;
let isHovered = false;
let swipeStart;

if (carousel && slides.length && indicators.length === slides.length && previousButton && nextButton) {
  const showSlide = (index, announce = false) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    indicators.forEach((indicator, indicatorIndex) => {
      const isActive = indicatorIndex === currentSlide;
      indicator.classList.toggle('is-active', isActive);
      if (isActive) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });

    if (announce && carouselStatus) {
      carouselStatus.textContent = `Slide ${currentSlide + 1} de ${slides.length}`;
    }
  };

  const scheduleAutoplay = () => {
    window.clearTimeout(autoplayTimer);
    if (reducedMotion.matches || isHovered || document.hidden) return;

    autoplayTimer = window.setTimeout(() => {
      showSlide(currentSlide + 1);
      scheduleAutoplay();
    }, 5000);
  };

  const navigateTo = (index) => {
    showSlide(index, true);
    scheduleAutoplay();
  };

  previousButton.addEventListener('click', () => navigateTo(currentSlide - 1));
  nextButton.addEventListener('click', () => navigateTo(currentSlide + 1));

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => navigateTo(index));
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateTo(currentSlide - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigateTo(currentSlide + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      navigateTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      navigateTo(slides.length - 1);
    }
  });

  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    window.clearTimeout(autoplayTimer);
  });

  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    scheduleAutoplay();
  });

  carousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') {
      swipeStart = { x: event.clientX, y: event.clientY };
    }
  });

  carousel.addEventListener('pointerup', (event) => {
    if (!swipeStart) return;

    const horizontalDistance = event.clientX - swipeStart.x;
    const verticalDistance = event.clientY - swipeStart.y;
    swipeStart = undefined;

    if (Math.abs(horizontalDistance) > 50 && Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2) {
      navigateTo(currentSlide + (horizontalDistance < 0 ? 1 : -1));
    }
  });

  carousel.addEventListener('pointercancel', () => {
    swipeStart = undefined;
  });

  document.addEventListener('visibilitychange', scheduleAutoplay);
  reducedMotion.addEventListener('change', scheduleAutoplay);
  showSlide(0);
  scheduleAutoplay();
}

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
