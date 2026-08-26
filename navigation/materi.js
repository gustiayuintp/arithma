const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const searchInput = document.querySelector('#materi-search');
const searchForm = document.querySelector('.search-form');
const filterButtons = document.querySelectorAll('[data-filter]');
const categoryButtons = document.querySelectorAll('[data-category]');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const materialList = document.querySelector('#material-list');

const materials = [
	['eksponen-logaritma', 'Eksponen dan logaritma', 'Kelas 10', 'aljabar', 'Memahami pangkat, akar, dan logaritma melalui pola yang sederhana.', '35'],
	['barisan-deret', 'Barisan dan deret', 'Kelas 10', 'aljabar', 'Menemukan pola bilangan dan menghitung jumlah deret.', '32'],
	['spltv', 'Sistem persamaan linear tiga variabel', 'Kelas 10', 'aljabar', 'Menyelesaikan tiga persamaan dengan tiga variabel secara runtut.', '40'],
	['trigonometri', 'Trigonometri', 'Kelas 10', 'geometri', 'Mengenal perbandingan sudut dan penerapannya dalam segitiga.', '38'],
	['statistika', 'Statistika', 'Kelas 10', 'statistika', 'Membaca, mengolah, dan menyimpulkan data dengan mudah.', '30'],
	['komposisi-fungsi', 'Komposisi fungsi', 'Kelas 11', 'aljabar', 'Memahami cara menggabungkan dua fungsi dan menentukan hasilnya.', '34'],
	['peluang', 'Peluang', 'Kelas 11', 'statistika', 'Mengukur kemungkinan suatu kejadian dengan ruang sampel yang jelas.', '29'],
	['matriks', 'Matriks', 'Kelas 11', 'aljabar', 'Mengenal operasi matriks dan penerapannya untuk menyelesaikan masalah.', '36'],
	['transformasi-geometri', 'Transformasi geometri', 'Kelas 11', 'geometri', 'Melihat perpindahan dan perubahan bentuk melalui translasi dan rotasi.', '33'],
	['kaidah-pencacahan', 'Kaidah pencacahan', 'Kelas 12', 'statistika', 'Menghitung banyak kemungkinan dengan aturan penjumlahan dan perkalian.', '31']
].map(([id, title, level, category, description, duration]) => ({ id, title, level, category, description, duration }));

function updateHeader() {
	header.classList.toggle('is-scrolled', window.scrollY > 30);
}

function closeMenu() {
	header.classList.remove('menu-open');
	menuButton.setAttribute('aria-expanded', 'false');
	menuButton.setAttribute('aria-label', 'Buka menu');
}

function materialMarkup(material) {
	return `<a class="material-row" href="detail-materi.html?id=${material.id}"><span class="material-icon icon-blue"><i data-lucide="book-open"></i></span><span class="material-copy"><strong>${material.title}</strong><span>${material.description}</span></span><span class="material-info"><small>${material.level}</small><span>${material.duration} menit <i data-lucide="arrow-up-right" size="16"></i></span></span></a>`;
}

function renderMaterials(filter = 'all') {
	const searchTerm = searchInput.value.trim().toLowerCase();
	const visibleMaterials = materials.filter((material) => {
		const matchesFilter = filter === 'all' || material.level.toLowerCase().replace(' ', '-') === filter;
		return matchesFilter && material.title.toLowerCase().includes(searchTerm);
	});
	materialList.innerHTML = visibleMaterials.map(materialMarkup).join('');
	lucide.createIcons();
	resultCount.textContent = `${visibleMaterials.length} materi ditemukan`;
	emptyState.hidden = visibleMaterials.length !== 0;
}

lucide.createIcons();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuButton.addEventListener('click', () => {
	const isOpen = header.classList.toggle('menu-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
	menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));

let activeFilter = 'all';
filterButtons.forEach((button) => button.addEventListener('click', () => {
	activeFilter = button.dataset.filter;
	filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
	categoryButtons.forEach((item) => item.classList.remove('is-active'));
	renderMaterials(activeFilter);
}));
categoryButtons.forEach((button) => button.addEventListener('click', () => {
	const category = button.dataset.category;
	categoryButtons.forEach((item) => item.classList.toggle('is-active', item === button));
	filterButtons.forEach((item) => item.classList.toggle('is-active', item.dataset.filter === 'all'));
	activeFilter = 'all';
	searchInput.value = '';
	const categoryMaterials = materials.filter((material) => material.category === category);
	materialList.innerHTML = categoryMaterials.map(materialMarkup).join('');
	lucide.createIcons();
	resultCount.textContent = `${categoryMaterials.length} materi ditemukan`;
	emptyState.hidden = true;
	document.querySelector('#hasil-materi').scrollIntoView({ behavior: 'smooth' });
}));
searchInput.addEventListener('input', () => renderMaterials(activeFilter));
searchForm.addEventListener('submit', (event) => { event.preventDefault(); renderMaterials(activeFilter); });
renderMaterials();
