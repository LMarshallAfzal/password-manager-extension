// This is to catch forms that exist when the script initially runs
checkForForms();

// Setting up MutationObserver to catch dynamically loaded forms
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            checkForForms();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

function checkForForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        if (isLoginForm(form)) {
            console.log('Detected a login form');
            // Do something when login form is detected, e.g., notify background
            chrome.runtime.sendMessage({ type: "FORM_DETECTED", formType: "login" });
        } else if (isSignupForm(form)) {
            console.log('Detected a signup form');
            // Do something when signup form is detected, e.g., notify background
            chrome.runtime.sendMessage({ type: "FORM_DETECTED", formType: "signup" });
        }
    });
}

function calculateFormScore(form) {
    let score = 0;

    const formActionURL = form.action || window.location.href;
    const nearbyText = form.innerText.toLowerCase();

    const signupPatterns = ["/signup", "/register", "/join", "/create", "sign up", "join now", "create account"];
    const loginPatterns = ["/login", "/signin", "/enter", "/access", "sign in", "login", "log in"];

    signupPatterns.forEach(pattern => {
        if (formActionURL.includes(pattern) || nearbyText.includes(pattern)) score += 3;
    });

    loginPatterns.forEach(pattern => {
        if (formActionURL.includes(pattern) || nearbyText.includes(pattern)) score -= 3;
    });

    if (form.querySelector('input[name*="confirm"], input[name*="retype"], input[placeholder*="confirm"], input[placeholder*="retype"]')) score += 2;
    if (form.querySelectorAll('input[type="password"]').length > 1) score += 2;
    if (Array.from(form.querySelectorAll('button, a, input[type="submit"]')).some(el => el.innerText.toLowerCase().includes("create account"))) score += 2;
    if (form.querySelector('input[type="checkbox"][name*="terms"], input[type="checkbox"][name*="agree"]')) score += 1;
    if (form.querySelectorAll('input').length > 4) score += 1;

    return score;
}

function isLoginForm(form) {
    const score = calculateFormScore(form);
    return score < 0;
}

function isSignupForm(form) {
    const score = calculateFormScore(form);
    return score > 0;
}

function isAmbiguousForm(form) {
    const score = calculateFormScore(form);
    return score === 0;
}

// In checkForForms function:
forms.forEach(form => {
    if (isLoginForm(form)) {
        // handle login form
    } else if (isSignupForm(form)) {
        // handle signup form
    } else if (isAmbiguousForm(form)) {
        console.log('Ambiguous form detected. Asking user for feedback...');
        // handle ambiguous form, possibly asking user for feedback
    }
});

chrome.runtime.sendMessage({ type: "CHECK_URL", url: window.location.href }, function(response) {
    if (response.matchFound) {
        console.log("Match found! This URL has saved credentials.");
        // Prompt user or auto-fill credentials or whatever action you'd like.
    } else {
        console.log("No saved credentials found for this URL.");
    }
});

