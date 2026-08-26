const questionSets = {
	'eksponen-logaritma': ['Nilai dari 2³ adalah ...', 'Bentuk sederhana dari √49 adalah ...', 'Jika log₂ 8 = x, nilai x adalah ...'],
	'barisan-deret': ['Suku berikutnya dari 3, 6, 9, 12 adalah ...', 'Rumus suku ke-n barisan aritmetika digunakan untuk ...', 'Jumlah 5 suku pertama dari 2, 4, 6, ... adalah ...'],
	'spltv': ['SPLTV terdiri dari berapa persamaan?', 'Metode eliminasi digunakan dengan cara ...', 'Penyelesaian SPLTV berupa ...'],
	'trigonometri': ['Sinus pada segitiga siku-siku adalah perbandingan ...', 'Nilai sin 30° adalah ...', 'Sisi di depan sudut disebut sisi ...'],
	'statistika': ['Nilai yang paling sering muncul disebut ...', 'Median adalah nilai yang berada di ... data.', 'Rata-rata dari 4 dan 8 adalah ...'],
	'komposisi-fungsi': ['Notasi komposisi fungsi adalah ...', 'Pada (f o g)(x), fungsi yang dikerjakan lebih dulu adalah ...', 'Jika f(x)=x+1 dan g(x)=2x, maka (f o g)(x) adalah ...'],
	'peluang': ['Nilai peluang selalu berada di antara ...', 'Peluang muncul angka pada dadu adalah ...', 'Himpunan semua hasil percobaan disebut ...'],
	'matriks': ['Susunan bilangan dalam baris dan kolom disebut ...', 'Matriks berordo 2 x 3 memiliki ... elemen.', 'Matriks identitas memiliki diagonal utama bernilai ...'],
	'transformasi-geometri': ['Pergeseran titik disebut ...', 'Pencerminan disebut juga ...', 'Rotasi 90° mengubah arah titik dengan ...'],
	'kaidah-pencacahan': ['Aturan perkalian digunakan untuk kejadian yang ...', 'Banyak cara memilih satu baju dan satu celana dihitung dengan ...', 'Faktorial dari 4 adalah ...']
};
const answers = ['A', 'B', 'C'];
const params = new URLSearchParams(window.location.search);
const materialId = params.get('materi') || 'eksponen-logaritma';
const version = params.get('versi') || '1';
const title = materialId.replaceAll('-', ' ');
const formattedTitle = materialId === 'spltv' ? 'SPLTV' : title.charAt(0).toUpperCase() + title.slice(1);
const questions = questionSets[materialId] || questionSets['eksponen-logaritma'];
const list = document.querySelector('#question-list');
document.querySelector('#question-count').textContent = `${questions.length} soal pilihan ganda`;
document.title = `Latihan ${formattedTitle} | Arithma`;
document.querySelector('#soal-title').textContent = `Latihan ${formattedTitle} versi ${version}`;
document.querySelector('#soal-class').textContent = materialId === 'kaidah-pencacahan' ? 'Kelas 12' : materialId === 'komposisi-fungsi' || materialId === 'peluang' || materialId === 'matriks' || materialId === 'transformasi-geometri' ? 'Kelas 11' : 'Kelas 10';
list.innerHTML = questions.map((question, index) => `<article class="question"><h3>${index + 1}. ${question}</h3><div class="option-list">${['A', 'B', 'C', 'D'].map((option) => `<label class="option"><input type="radio" name="question-${index}" value="${option}">${option}. Pilihan jawaban</label>`).join('')}</div></article>`).join('');
lucide.createIcons();
document.querySelector('#check-answer').addEventListener('click', () => {
	const answered = [...document.querySelectorAll('.question')].filter((question) => question.querySelector('input:checked')).length;
	const score = document.querySelector('#score');
	score.hidden = false;
	score.textContent = answered === questions.length ? `Semua ${answered} soal sudah dijawab. Periksa kembali langkahmu sebelum dikumpulkan.` : `${answered} dari ${questions.length} soal sudah dijawab. Lengkapi dulu yang masih kosong.`;
});
