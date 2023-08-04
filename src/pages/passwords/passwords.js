import { db, storage } from "../../../firebase-config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


// Get user ID from local storage
const userID = localStorage.getItem('userID');

// If user is logged in, fetch credentials
const fetchCredentials = async () => {
    const querySnapshot = await getDocs(query(collection(db, `accounts`), where('userID', '==', userID)));

    // Get the list element
    let list = document.getElementById('credentials-list');

    for (const doc of querySnapshot.docs) {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();

        // Create a list item for each document and add it to the list
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');

        // Get the download URL for the image
        let imageRef = ref(storage, data.imageURL); // Assuming data.imageURL is the reference path in storage
        const url = await getDownloadURL(imageRef);

        // Add the image
        let image = document.createElement('img');
        image.src = url;
        image.alt = data.accountName;
        image.width = 50; // Set width as needed
        listItem.appendChild(image);

        // Add the account name
        let accountName = document.createElement('h5');
        accountName.textContent = data.accountName;
        listItem.appendChild(accountName);

        // Add the email/username
        let email = document.createElement('p');
        email.textContent = data.email; // Assuming email is the field name in your Firestore document
        listItem.appendChild(email);

        // Add the button to go to the account URL
        let button = document.createElement('a');
        button.href = data.url; 
        button.classList.add('btn', 'btn-primary');

        let icon = document.createElement('i');
        icon.classList.add('box', 'box-arrow-right'); 
        button.appendChild(icon);

        listItem.appendChild(button);



        list.appendChild(listItem);
    }
};

fetchCredentials(); // Call the function to execute the code

