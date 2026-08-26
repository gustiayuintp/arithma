const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const searchInput = document.querySelector('#practice-search');
const filterButtons = document.querySelectorAll('[data-practice-category]');
const pdfList = document.querySelector('#pdf-list');
const pdfCount = document.querySelector('#pdf-count');
const pdfHelper = document.querySelector('#pdf-helper');
const difficultyButtons = document.querySelectorAll('[data-difficulty]');
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizLabel = document.querySelector('#quiz-label');
const quizDifficulty = document.querySelector('#quiz-difficulty');
const quizFeedback = document.querySelector('#quiz-feedback');
const nextQuestion = document.querySelector('#next-question');

const exercises = [
	['eksponen-logaritma', 'Eksponen dan logaritma', 'aljabar', 'Kelas 10', '35'], ['barisan-deret', 'Barisan dan deret', 'aljabar', 'Kelas 10', '32'], ['spltv', 'Sistem persamaan linear tiga variabel', 'aljabar', 'Kelas 10', '40'], ['trigonometri', 'Trigonometri', 'geometri', 'Kelas 10', '38'], ['statistika', 'Statistika', 'statistika', 'Kelas 10', '30'], ['komposisi-fungsi', 'Komposisi fungsi', 'aljabar', 'Kelas 11', '34'], ['peluang', 'Peluang', 'statistika', 'Kelas 11', '29'], ['matriks', 'Matriks', 'aljabar', 'Kelas 11', '36'], ['transformasi-geometri', 'Transformasi geometri', 'geometri', 'Kelas 11', '33'], ['kaidah-pencacahan', 'Kaidah pencacahan', 'statistika', 'Kelas 12', '31']
	].map(([id, title, category, level, duration]) => ({ id, title, category, level, duration }));
const quizzes = { mudah: ['Berapa hasil dari 2 + 3?', 'Bilangan setelah 9 adalah ...', 'Sisi dengan panjang terpanjang pada segitiga siku-siku disebut ...'], sedang: ['Jika 2x + 4 = 10, nilai x adalah ...', 'Rumus luas lingkaran adalah ...', 'Median dari 2, 4, 7 adalah ...'], sulit: ['Jika f(x)=2x+1, nilai f(3) adalah ...', 'Determinan matriks [[2,1],[1,3]] adalah ...', 'Banyak cara memilih 2 benda dari 5 benda adalah ...'] };
let activeCategory = 'semua';
let difficulty = 'mudah';
let questionIndex = 0;

function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
function closeMenu() { header.classList.remove('menu-open'); menuButton.setAttribute('aria-expanded', 'false'); }
function pdfMarkup(exercise) { return [1, 2, 3].map((version) => `<article class="pdf-card"><span class="pdf-icon"><i data-lucide="file-text"></i></span><span><strong>${exercise.title} versi ${version}</strong><small>${exercise.level} · ${exercise.duration} menit</small></span><a class="btn btn-outline" href="soal.html?materi=${exercise.id}&versi=${version}" target="_blank">Buka soal</a></article>`).join(''); }
function renderPdfs() {
	const term = searchInput.value.trim().toLowerCase();
	const results = exercises.filter((exercise) => term ? exercise.title.toLowerCase().includes(term) : activeCategory === 'semua' || exercise.category === activeCategory);
	pdfList.innerHTML = results.map(pdfMarkup).join('');
	pdfCount.textContent = `${results.length * 3} latihan`;
	pdfHelper.textContent = term ? `Hasil pencarian untuk “${term}”.` : 'Latihan berdasarkan kategori matematika.';
	lucide.createIcons();
}
function renderQuiz() {
	const questions = quizzes[difficulty];
	const question = questions[questionIndex];
	quizLabel.textContent = `Soal ${questionIndex + 1} dari ${questions.length}`;
	quizDifficulty.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
	quizQuestion.textContent = question;
	quizFeedback.textContent = '';
	quizOptions.innerHTML = ['A', 'B', 'C', 'D'].map((option) => `<label class="quiz-option"><input type="radio" name="quiz-answer" value="${option}"> ${option}. Pilihan jawaban</label>`).join('');
}
lucide.createIcons();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuButton.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menuButton.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
filterButtons.forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.practiceCategory; filterButtons.forEach((item) => item.classList.toggle('is-active', item === button)); renderPdfs(); }));
searchInput.addEventListener('input', renderPdfs);
document.querySelector('#search-practice').addEventListener('click', renderPdfs);
difficultyButtons.forEach((button) => button.addEventListener('click', () => { difficulty = button.dataset.difficulty; questionIndex = 0; difficultyButtons.forEach((item) => item.classList.toggle('is-active', item === button)); renderQuiz(); }));
nextQuestion.addEventListener('click', () => { const selected = document.querySelector('input[name="quiz-answer"]:checked'); if (!selected) { quizFeedback.textContent = 'Pilih satu jawaban dulu.'; return; } if (questionIndex === quizzes[difficulty].length - 1) { quizFeedback.textContent = 'Kuis selesai. Bagus, lanjutkan latihan lainnya.'; questionIndex = 0; } else { questionIndex += 1; } renderQuiz(); });
renderPdfs();
renderQuiz();
