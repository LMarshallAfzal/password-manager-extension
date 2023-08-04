import { auth } from '../../../firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from being submitted the default way

    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let errorDiv = document.getElementById('error-message');

    let email = emailInput.value;
    let password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
        localStorage.setItem('userID', auth.currentUser.uid);
        console.log("Logged in successfully");
        // You can now redirect the user or do something else
    })
    .catch((error) => {
        console.error("Error signing in:", error);

        // Depending on the error code, you can set different error messages
        switch (error.code) {
            case 'auth/invalid-email':
                errorDiv.textContent = 'Invalid email';
                break;
            case 'auth/user-disabled':
            case 'auth/user-not-found':
                errorDiv.textContent = 'User not found or disabled';
                break;
            case 'auth/wrong-password':
                errorDiv.textContent = 'Wrong password';
                break;
            default:
                errorDiv.textContent = 'Failed to log in';
        }
    });
});


