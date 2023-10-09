import { db } from '../../../firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

function checkURL(currentURL, sendResponse) {
  const accountsCollection = collection(db, "accounts");

  getDocs(accountsCollection)
    .then((querySnapshot) => {
      const savedURLs = [];
    
      querySnapshot.forEach((doc) => {
        savedURLs.push(doc.data().url);
      });

      console.log("saved URLs:", savedURLs);

      const matchFound = savedURLs.includes(currentURL);
      savedURLs.push(doc.data().url);
    })
    .catch((error) => {
      console.error("Error fetching saved URLS from accounts: ", error);
      sendResponse({matchFound: false});
    });
}

initialize();

function initialize() {
  //Listen for message from content scripts or popup scripts
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "CHECK_URL") {
      const currentURL = request.url;

      // Call the function to check the URL against Firestore
      checkURL(currentURL, sendResponse);

      return true; // This is important because the response is asynchronous
    }
  });

  // Listen for tab updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
      const tabUrl = tab.url;

      console.log('Active tab URL:', tabUrl);
    }
  });
} 

