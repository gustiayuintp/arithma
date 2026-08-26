const firebaseConfig = {
	apiKey: 'AIzaSyA3-Y_sJpTXkIghpSWXY_JFVdtEwV71Okw',
	authDomain: 'arithma-smk.firebaseapp.com',
	projectId: 'arithma-smk',
	storageBucket: 'arithma-smk.firebasestorage.app',
	messagingSenderId: '134853319118',
	appId: '1:134853319118:web:6c30c3faf3f78fb1a0339f',
	measurementId: 'G-LPKCLXB9PT'
};

const accountMenu = document.querySelector('.account-menu');
document.querySelector('#account-button').addEventListener('click', () => accountMenu.classList.toggle('open'));
Promise.all([
	import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'),
	import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js')
]).then(([firebaseApp, firebaseAuth]) => {
	const auth = firebaseAuth.getAuth(firebaseApp.initializeApp(firebaseConfig));
	firebaseAuth.onAuthStateChanged(auth, (user) => {
		if (!user) { window.location.href = 'login.html'; return; }
		const name = user.displayName || user.email.split('@')[0];
		const initial = name.charAt(0).toUpperCase();
		document.querySelector('#account-name').textContent = name;
		document.querySelector('#account-avatar').textContent = initial;
		document.querySelector('#profile-name').textContent = name;
		document.querySelector('#profile-avatar').textContent = initial;
		document.querySelector('#profile-level').textContent = 'Pemula';
		document.querySelector('#profile-streak').textContent = 1;
		document.querySelector('#welcome-text').textContent = `Selamat datang kembali, ${name}.`;
	});
	document.querySelector('#logout-button').addEventListener('click', async () => {
		await firebaseAuth.signOut(auth);
		window.location.href = 'login.html';
	});
}).catch(() => {
	window.location.href = 'login.html';
});
