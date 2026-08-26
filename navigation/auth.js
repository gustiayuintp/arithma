import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
	createUserWithEmailAndPassword,
	browserLocalPersistence,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	setPersistence,
	updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
	apiKey: 'AIzaSyA3-Y_sJpTXkIghpSWXY_JFVdtEwV71Okw',
	authDomain: 'arithma-smk.firebaseapp.com',
	projectId: 'arithma-smk',
	storageBucket: 'arithma-smk.firebasestorage.app',
	messagingSenderId: '134853319118',
	appId: '1:134853319118:web:6c30c3faf3f78fb1a0339f',
	measurementId: 'G-LPKCLXB9PT'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const persistenceReady = setPersistence(auth, browserLocalPersistence);
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const loginView = document.querySelector('#loginView');
const registerView = document.querySelector('#registerView');
const googleProvider = new GoogleAuthProvider();

function toggleAuthView(view) {
	if (!loginView || !registerView) return;
	const showRegister = view === 'register';
	loginView.hidden = showRegister;
	registerView.hidden = !showRegister;
}

document.querySelectorAll('[data-auth-toggle]').forEach((toggle) => {
	toggle.addEventListener('click', (event) => {
		event.preventDefault();
		const view = toggle.dataset.authToggle;
		toggleAuthView(view);
		window.history.replaceState(null, '', `#${view}`);
	});
});

toggleAuthView(window.location.hash === '#register' ? 'register' : 'login');

if (registerForm) registerForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const regName = document.querySelector('#regName').value.trim();
	const regEmail = document.querySelector('#regEmail').value.trim();
	const regPassword = document.querySelector('#regPassword').value;
	const regConfirmPassword = document.querySelector('#regConfirmPassword').value;

	if (regPassword !== regConfirmPassword) {
		alert('Password dan konfirmasi password harus sama.');
		return;
	}

	try {
		await persistenceReady;
		const credential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
		await updateProfile(credential.user, { displayName: regName });
		alert('Pendaftaran berhasil. Selamat datang di Arithma!');
		window.location.href = 'dashboard.html';
	} catch (error) {
		alert(getAuthErrorMessage(error));
	}
});

if (loginForm) loginForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const loginEmail = document.querySelector('#loginEmail').value.trim();
	const loginPassword = document.querySelector('#loginPassword').value;

	try {
		await persistenceReady;
		await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		window.location.href = 'dashboard.html';
	} catch (error) {
		alert(getAuthErrorMessage(error));
	}
});

async function signInWithGoogle() {
	try {
		await persistenceReady;
		await signInWithPopup(auth, googleProvider);
		window.location.href = 'dashboard.html';
	} catch (error) {
		alert(getAuthErrorMessage(error));
	}
}

document.querySelectorAll('#googleLoginButton, #googleRegisterButton').forEach((button) => {
	button.addEventListener('click', signInWithGoogle);
});

function getAuthErrorMessage(error) {
	if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
		return 'Email atau password salah.';
	}
	if (error.code === 'auth/email-already-in-use') return 'Email sudah digunakan.';
	if (error.code === 'auth/weak-password') return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
	if (error.code === 'auth/invalid-email') return 'Format email tidak valid.';
	if (error.code === 'auth/popup-closed-by-user') return 'Jendela Google ditutup sebelum selesai.';
	if (error.code === 'auth/unauthorized-domain') return 'Domain ini belum diizinkan di Firebase Authentication.';
	return 'Terjadi kesalahan. Silakan coba lagi.';
}
