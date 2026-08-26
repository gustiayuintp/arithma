import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
	apiKey: 'AIzaSyA3-Y_sJpTXkIghpSWXY_JFVdtEwV71Okw',
	authDomain: 'arithma-smk.firebaseapp.com',
	projectId: 'arithma-smk',
	storageBucket: 'arithma-smk.firebasestorage.app',
	messagingSenderId: '134853319118',
	appId: '1:134853319118:web:6c30c3faf3f78fb1a0339f',
	measurementId: 'G-LPKCLXB9PT'
};

const auth = getAuth(initializeApp(firebaseConfig));
const dashboardPath = window.location.pathname.includes('/navigation/') ? 'dashboard.html' : 'navigation/dashboard.html';

function updateAuthButtons(user) {
	const authGroups = document.querySelectorAll('.nav-actions, .mobile-auth');
	authGroups.forEach((group) => {
		const loginButton = group.querySelector('a[href$="login.html"], a[href="#masuk"]');
		const registerButton = group.querySelector('a[href$="daftar.html"], a[href="#daftar"]');
		if (!user || (!loginButton && !registerButton)) return;
		if (user) {
			const dashboardButton = loginButton || registerButton;
			if (dashboardButton) {
				dashboardButton.href = dashboardPath;
				dashboardButton.textContent = 'Dashboard';
				dashboardButton.classList.remove('btn-login');
				dashboardButton.classList.add('btn-gradient');
			}
			if (registerButton && registerButton !== dashboardButton) registerButton.remove();
		}
	});
}

setPersistence(auth, browserLocalPersistence).then(() => onAuthStateChanged(auth, updateAuthButtons));
