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
              .then(response => console.log('Response: ', response))
              .catch(error => console.log('Error:', error));
});