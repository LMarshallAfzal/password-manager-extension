import { auth } from '../../../firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

function openAccountSettings() {
    // Open or navigate to the account settings page
}

function openExtensionSettings() {
    // Open or navigate to the extension settings page
}

function logout() {
    var confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
        // If user confirms, proceed to sign out
        signOut(auth).then(() => {
            // Redirect to the login page
            localStorage.removeItem('userID');
            window.location.href = 'src/pages/login/login.html';
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('accountSettingsBtn').addEventListener('click', openAccountSettings);
    document.getElementById('extensionSettingsBtn').addEventListener('click', openExtensionSettings);
    document.getElementById('logoutBtn').addEventListener('click', logout);
});
