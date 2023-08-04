function getSettings() {
    return {
        length: document.getElementById("length").value,
        includeLetters: document.getElementById("letters").checked,
        includeNumbers: document.getElementById("numbers").checked,
        includeSymbols: document.getElementById("symbols").checked,
    };
}

function generatePassword(settings) {
    let characters = "";
    if (settings.includeLetters) characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (settings.includeNumbers) characters += "0123456789";
    if (settings.includeSymbols) characters += "!@#$%^&*()_+-=[]{};:',.<>/?`~";

    let password = "";
    for (let i = 0; i < settings.length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}

function displayPassword() {
    const settings = getSettings();
    const password = generatePassword(settings);
    document.getElementById("password").value = password;
    document.getElementById("length-display").textContent = settings.length; // Display current length
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    navigator.clipboard.writeText(passwordField.value).then(() => {
        alert("Password copied to clipboard!"); // Provide feedback
    });
}

// Generate password when page loads
window.onload = displayPassword;

// Add event listeners to inputs to regenerate password when their value changes
["length", "letters", "numbers", "symbols"].forEach(id => {
    document.getElementById(id).addEventListener("input", displayPassword);
    document.getElementById(id).addEventListener("change", displayPassword);
});

document.getElementById("copy").addEventListener("click", copyPassword);
