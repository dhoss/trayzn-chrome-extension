// this will more than likely need to be rewritten as a content.js script
// where the default_popup is defined (add_bookmark_result.html) and it has a script which makes the fetch call using
// the tab information passed in as a message, and then updating the save-bookmark-result div with a result message
// https://stackoverflow.com/questions/61924508/pass-a-information-between-content-and-popup-on-chrome-extensions
chrome.action.onClicked.addListener(async function(tab) {
  let tabInfo = await chrome.tabs.get(tab.id);
  let configuration = await chrome.storage.local.get(['url', 'apiKey', 'apiSecret']);
  fetch(configuration.url + "/api/v1/bookmarks/add", {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-API-Key': configuration.apiKey,
                  'X-API-Secret': configuration.apiSecret
              },
              body: JSON.stringify(
                {
                  url: tabInfo.url,
                  title: tabInfo.title,
                  favIconUrl: tabInfo.favIconUrl
                })
          })
              .then(response => response.json())
              .then(response => {
                 console.log('Response: ', response);
               })
              .catch(error => console.log('Error:', error));
});