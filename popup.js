saveBookmark();

async function saveBookmark() {
    const tabInfo = await getCurrentTab();
    const config = await getConfiguration();

    document.getElementById("save-bookmark-result").innerHTML = "Saving bookmark...";

    fetch(config.url + "/api/v1/bookmarks/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': config.apiKey,
                    'X-API-Secret': config.apiSecret
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
                   document.getElementById("save-bookmark-result").innerHTML = "Bookmark saved.";
                 })
                .catch(error => console.log('Error:', error));
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getConfiguration() {
  let configuration = await chrome.storage.local.get(['url', 'apiKey', 'apiSecret']);
  return configuration;
}