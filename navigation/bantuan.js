const header = document.querySelector('header');
import('./auth-state.js');
const menuButton = document.querySelector('.menu-button');
const form = document.querySelector('#contact-form');
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuButton.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menuButton.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => header.classList.remove('menu-open')));
lucide.createIcons();
form.addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#contact-status').textContent = 'Pesan sudah dicatat. Terima kasih sudah menghubungi kami.'; form.reset(); });
