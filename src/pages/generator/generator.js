// Function to generate password
function generate() {
    const length = document.getElementById("length").value;
    const includeLetters = document.getElementById("letters").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    // Display the current length
    document.getElementById("length-display").textContent = length;

    let characters = "";
    if (includeLetters) characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{};:',.<>/?`~";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    document.getElementById("password").value = password;
}

// Function to copy password to clipboard
function copyPassword() {
    const passwordField = document.getElementById("password");
    navigator.clipboard.writeText(passwordField.value);
}

// Generate password when page loads
window.onload = generate;

// Add event listeners to inputs to regenerate password when their value changes
document.getElementById("length").addEventListener("input", generate);
document.getElementById("letters").addEventListener("change", generate);
document.getElementById("numbers").addEventListener("change", generate);
document.getElementById("symbols").addEventListener("change", generate);

document.getElementById("copy").addEventListener("click", copyPassword);
