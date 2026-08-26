const materials = {
	'eksponen-logaritma': { title: 'Eksponen dan logaritma', level: 'Kelas 10', description: 'Memahami pangkat, akar, dan logaritma melalui pola yang sederhana.', query: 'eksponen logaritma', category: 'Aljabar' },
	'barisan-deret': { title: 'Barisan dan deret', level: 'Kelas 10', description: 'Menemukan pola bilangan dan menghitung jumlah deret aritmetika maupun geometri.', query: 'barisan deret', category: 'Aljabar' },
	'spl tiga': { title: 'Sistem persamaan linear tiga variabel', level: 'Kelas 10', description: 'Menyelesaikan tiga persamaan dengan tiga variabel secara runtut.', query: 'sistem persamaan linear tiga variabel', category: 'Aljabar' },
	'spltv': { title: 'Sistem persamaan linear tiga variabel', level: 'Kelas 10', description: 'Menyelesaikan tiga persamaan dengan tiga variabel secara runtut.', query: 'sistem persamaan linear tiga variabel', category: 'Aljabar' },
	'trigonometri': { title: 'Trigonometri', level: 'Kelas 10', description: 'Mengenal perbandingan sudut dan penerapannya dalam segitiga.', query: 'trigonometri dasar', category: 'Geometri' },
	'statistika': { title: 'Statistika', level: 'Kelas 10', description: 'Membaca, mengolah, dan menyimpulkan data dengan cara yang mudah diikuti.', query: 'statistika dasar', category: 'Statistika' },
	'komposisi-fungsi': { title: 'Komposisi fungsi', level: 'Kelas 11', description: 'Memahami cara menggabungkan dua fungsi dan menentukan hasil komposisinya.', query: 'komposisi fungsi', category: 'Aljabar' },
	'peluang': { title: 'Peluang', level: 'Kelas 11', description: 'Mengukur kemungkinan suatu kejadian dengan ruang sampel yang jelas.', query: 'peluang matematika', category: 'Statistika' },
	'matriks': { title: 'Matriks', level: 'Kelas 11', description: 'Mengenal operasi matriks dan penerapannya untuk menyelesaikan masalah.', query: 'matriks matematika', category: 'Aljabar' },
	'transformasi-geometri': { title: 'Transformasi geometri', level: 'Kelas 11', description: 'Melihat perpindahan dan perubahan bentuk melalui translasi, refleksi, dan rotasi.', query: 'transformasi geometri', category: 'Geometri' },
	'kaidah-pencacahan': { title: 'Kaidah pencacahan', level: 'Kelas 12', description: 'Menghitung banyak kemungkinan dengan aturan penjumlahan dan perkalian.', query: 'kaidah pencacahan', category: 'Statistika' }
};

const orderedIds = ['eksponen-logaritma', 'barisan-deret', 'spltv', 'trigonometri', 'statistika', 'komposisi-fungsi', 'peluang', 'matriks', 'transformasi-geometri', 'kaidah-pencacahan'];
const id = new URLSearchParams(window.location.search).get('id') || orderedIds[0];
const material = materials[id] || materials[orderedIds[0]];
const index = orderedIds.indexOf(id) === -1 ? 0 : orderedIds.indexOf(id);
const nextId = orderedIds[(index + 1) % orderedIds.length];
const next = materials[nextId];
const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');

document.title = `${material.title} | Arithma`;
document.querySelector('#detail-class').textContent = material.level;
document.querySelector('#detail-title').textContent = material.title;
document.querySelector('#detail-description').textContent = material.description;
document.querySelector('#video-link').href = `https://www.youtube.com/@Mathlab/search?query=${encodeURIComponent(material.query)}`;
document.querySelector('#pdf-link').href = `soal.html?materi=${id}`;
document.querySelector('#practice-link').href = `soal.html?materi=${id}`;
document.querySelector('#next-material').href = `detail-materi.html?id=${nextId}`;
document.querySelector('#next-title').textContent = next.title;

document.querySelector('#timeline').innerHTML = [
	`<li class="timeline-item"><a href="https://www.youtube.com/@Mathlab/search?query=${encodeURIComponent(`${material.query} konsep dasar`)}" target="_blank" rel="noopener"><strong>01. Konsep dasar</strong><small>Kenali istilah dan ide utama materi.</small></a><span class="timeline-watch"><i data-lucide="play-circle" size="14"></i> Tonton</span></li>`,
	`<li class="timeline-item"><a href="https://www.youtube.com/@Mathlab/search?query=${encodeURIComponent(`${material.query} contoh soal`)}" target="_blank" rel="noopener"><strong>02. Contoh soal</strong><small>Ikuti langkah penyelesaian dari awal.</small></a><span class="timeline-watch"><i data-lucide="play-circle" size="14"></i> Tonton</span></li>`,
	`<li class="timeline-item"><a href="https://www.youtube.com/@Mathlab/search?query=${encodeURIComponent(`${material.query} latihan`)}" target="_blank" rel="noopener"><strong>03. Latihan</strong><small>Uji pemahaman lewat soal di halaman web.</small></a><span class="timeline-watch"><i data-lucide="play-circle" size="14"></i> Tonton</span></li>`
].join('');

document.querySelector('#video-count').textContent = '3 video';
lucide.createIcons();
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
function closeMenu() { header.classList.remove('menu-open'); menuButton.setAttribute('aria-expanded', 'false'); }
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuButton.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menuButton.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
