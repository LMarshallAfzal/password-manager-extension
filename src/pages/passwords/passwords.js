import { db, storage } from "../../../firebase-config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const userID = localStorage.getItem('userID');

const fetchCredentials = async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, `accounts`), where('userID', '==', userID)));
    const list = document.getElementById('credentials-list');
    querySnapshot.docs.forEach(doc => renderCredential(list, doc.data()));
  } catch (error) {
    console.error("An error occurred while fetching credentials:", error);
    // Handle the error as needed in your application
  }
};

const renderCredential = async (list, data) => {
  const listItem = document.createElement('li');
  listItem.classList.add('pw-list-group-item', 'd-flex', 'align-items-center');

  const imageRef = ref(storage, data.imageURL);
  const imageUrl = await getDownloadURL(imageRef);

  listItem.appendChild(createImage(imageUrl, data.accountName));

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('align-items-center', 'mr-3', 'pw-info-container');
  infoContainer.appendChild(createAccountName(data.accountName));
  infoContainer.appendChild(createEmail(data.username));
  listItem.appendChild(infoContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('pw-button-container');
  buttonContainer.appendChild(createCopyCredentialsButton(data.hashedPassword));
  buttonContainer.appendChild(createGoToAccountButton(data.url));
  listItem.appendChild(buttonContainer);

  list.appendChild(listItem);
};

const createImage = (src, alt) => {
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.width = 50;
  image.classList.add('pw-img-margin-right');
  return image;
};

const createAccountName = (name) => {
  const accountName = document.createElement('h6');
  accountName.textContent = name;
  accountName.classList.add('mb-1');
  return accountName;
};

const createEmail = (email) => {
  const emailElement = document.createElement('p');
  emailElement.textContent = email;
  emailElement.classList.add('mt-1', 'mb-1');
  return emailElement;
};

const createGoToAccountButton = (url) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'pw-custom-btn');
  button.onclick = () => window.open(url, '_blank');

  const icon = document.createElement('i');
  icon.classList.add('bi', 'bi-box-arrow-right');

  button.appendChild(icon);

  return button;
};

const createCopyCredentialsButton = (hashedPassword) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'pw-custom-btn'); 

  const icon = document.createElement('i');
  icon.classList.add('bi', 'bi-clipboard');

  button.appendChild(icon);

  // Add a click event handler to copy the URL to the clipboard
  button.addEventListener('click', () => {
    // Create a temporary input element to hold the URL
    const tempInput = document.createElement('input');
    tempInput.value = hashedPassword;
  
    // Append the input element to the DOM
    document.body.appendChild(tempInput);
  
    // Select the URL text
    tempInput.select();
  
    // Copy the selected text to the clipboard
    document.execCommand('copy');
  
    // Remove the temporary input element
    document.body.removeChild(tempInput);
    
    // Optionally, provide feedback to the user (e.g., a tooltip or a message)
    // You can add your own code here to indicate that the URL has been copied.
    // For example, you can display a tooltip or a success message.
  });

  return button;
};

fetchCredentials();
