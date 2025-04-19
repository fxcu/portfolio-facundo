let currentSlide = 0;
const slides = document.querySelectorAll(".slide"),
  dots = document.querySelectorAll(".dot");

// Muestra un slide específico y actualiza los puntos
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      if (dots[i]) dots[i].classList.add("active");
    }
  });
  currentSlide = index;
}

// Navega al siguiente slide
function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

// Navega al slide anterior
function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Ir a un slide específico
function goToSlide(index) {
  showSlide(index);
}

// Anima las barras de progreso de habilidades
function animateProgressBars() {
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.width = "0%";
    bar.style.transition = "none";
    bar.offsetHeight; // Reflow para reiniciar animación
    setTimeout(() => {
      bar.style.transition = "width 2s ease";
      bar.style.width = progress + "%";
    }, 50);
  });
}

// Scroll suave a la sección de contacto
function scrollToContact() {
  const target = document.getElementById("contacto");
  if (!target) return;
  const targetY = target.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;
  let animationFrame = null;
  let interrupted = false;

  function cancelScroll() {
    interrupted = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    removeListeners();
  }

  function removeListeners() {
    window.removeEventListener("wheel", cancelScroll);
    window.removeEventListener("touchstart", cancelScroll);
    window.removeEventListener("keydown", cancelScroll);
  }

  window.addEventListener("wheel", cancelScroll, { passive: true });
  window.addEventListener("touchstart", cancelScroll, { passive: true });
  window.addEventListener("keydown", cancelScroll, { passive: true });

  animationFrame = requestAnimationFrame(function animateScroll(time) {
    if (interrupted) return;
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / 2000, 1);
    const easing = progress < 0.5
      ? 2 * progress * progress
      : (4 - 2 * progress) * progress - 1;
    window.scrollTo(0, easing * distance + startY);
    if (elapsed < 2000) {
      animationFrame = requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo(0, targetY);
      removeListeners();
    }
  });
}

// Cambio automático de slide cada 7 segundos
setInterval(nextSlide, 7000);

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  animateProgressBars();
  setInterval(animateProgressBars, 20000); // Repetir animación cada 20s
});
