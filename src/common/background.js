
// Run the initialization when the background script is loaded
initialize();

// You might also want to add listeners for other events that are relevant to your extension
// For example, you might listen for tabs being updated and run your analysis on the new page:

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    // The tab has finished loading; you can run your analysis here
    // You might need to inject a content script or send a message to an existing content script
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "CHECK_URL") {
      const currentURL = request.url;

      // Access the 'accounts' collection in Firestore
      const db = firebase.firestore();
      db.collection("accounts").get().then((querySnapshot) => {
          const savedURLs = [];
          querySnapshot.forEach((doc) => {
              savedURLs.push(doc.data().url);  // Extracting the 'url' field from each document
          });

          const matchFound = savedURLs.includes(currentURL);
          sendResponse({ matchFound });
      }).catch((error) => {
          console.error("Error fetching saved URLs from accounts: ", error);
          sendResponse({ matchFound: false });
      });

      return true; // This is important because the response is asynchronous
  }
});

