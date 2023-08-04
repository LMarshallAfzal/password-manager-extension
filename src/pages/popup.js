import { auth } from '../../firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const PAGES = [
  'passwords/passwords.html',
  'generator/generator.html',
  'account/account.html'
];

window.onload = function() {
    document.getElementById('content-placeholder').src = PAGES[0];

    const navButtons = document.querySelectorAll(".btn");

    navButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            document.getElementById('content-placeholder').src = PAGES[index];
        });
    });
};

onAuthStateChanged(auth, (user) => {
    var iframe = document.getElementById('content-placeholder');
  
    if (user) {
      console.log("User signed in:", user);
      iframe.src = PAGES[0];
    } else {
      console.log("No user signed in");
      iframe.src = 'login/login.html';
    }
});
