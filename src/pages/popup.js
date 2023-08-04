import { auth } from '../../firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";;

window.onload = function() {
    // Load the first page initially
    document.getElementById('content-placeholder').src = 'src/pages/passwords/passwords.html';
    
    // Select the navigation buttons
    const navButtons = document.querySelectorAll(".btn");

    // Add click event listeners to the navigation buttons
    navButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            switch(index) {
                case 0:
                    document.getElementById('content-placeholder').src = 'passwords/passwords.html';
                    break;
                case 1:
                    document.getElementById('content-placeholder').src = 'generator/generator.html';
                    break;
                case 2:
                    document.getElementById('content-placeholder').src = 'account/account.html';
                    break;
            }
        });
    });
};

// Add an observer on Firebase auth changes
onAuthStateChanged(auth, (user) => {
    var iframe = document.getElementById('content-placeholder');
  
    if (user) {
      console.log("User signed in:", user); // Log user object for debugging
      iframe.src = 'passwords/passwords.html';
    } else {
      console.log("No user signed in"); // Log the message for debugging
      iframe.src = 'login/login.html';
    }
});

