const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.nav-links a');
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('[data-testimonial-dot]');
let activeTestimonial = 0;

function updateHeader() {
	header.classList.toggle('is-scrolled', window.scrollY > 30);
}

lucide.createIcons();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
	const isOpen = header.classList.toggle('menu-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
	menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

navLinks.forEach((link) => link.addEventListener('click', () => {
	header.classList.remove('menu-open');
	menuButton.setAttribute('aria-expanded', 'false');
	menuButton.setAttribute('aria-label', 'Buka menu');
}));

function showTestimonial(index) {
	activeTestimonial = (index + dots.length) % dots.length;
	track.style.transform = `translateX(-${activeTestimonial * 100}%)`;
	dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeTestimonial));
}

document.querySelector('[data-testimonial-prev]').addEventListener('click', () => showTestimonial(activeTestimonial - 1));
document.querySelector('[data-testimonial-next]').addEventListener('click', () => showTestimonial(activeTestimonial + 1));
dots.forEach((dot) => dot.addEventListener('click', () => showTestimonial(Number(dot.dataset.testimonialDot))));

let touchStartX = 0;
track.addEventListener('touchstart', (event) => { touchStartX = event.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', (event) => {
	const distance = event.changedTouches[0].clientX - touchStartX;
	if (Math.abs(distance) > 45) showTestimonial(activeTestimonial + (distance < 0 ? 1 : -1));
}, { passive: true });
