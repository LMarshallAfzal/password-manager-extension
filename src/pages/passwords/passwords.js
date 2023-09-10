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
  listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');

  const imageRef = ref(storage, data.imageURL);
  const imageUrl = await getDownloadURL(imageRef);
  listItem.appendChild(createImage(imageUrl, data.accountName));
  listItem.appendChild(createAccountName(data.accountName));
  listItem.appendChild(createEmail(data.username));
  listItem.appendChild(createGoToAccountButton(data.url));

  list.appendChild(listItem);
};

const createImage = (src, alt) => {
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.width = 50;
  return image;
};

const createAccountName = (name) => {
  const accountName = document.createElement('h5');
  accountName.textContent = name;
  return accountName;
};

const createEmail = (email) => {
  const emailElement = document.createElement('p');
  emailElement.textContent = email;
  return emailElement;
};

const createGoToAccountButton = (url) => {
  const button = document.createElement('button'); // Change to a button element
  button.classList.add('btn', 'btn-primary');
  button.onclick = () => chrome.tabs.create({ url }); // This will open a new tab with the given URL

  const icon = document.createElement('i');
  icon.classList.add('bi', 'bi-box-arrow-right');

  button.appendChild(icon);

  return button;
};



fetchCredentials();
