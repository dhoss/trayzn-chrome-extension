chrome.action.onClicked.addListener(async function(tab) {
  let tabInfo = await chrome.tabs.get(tab.id);
  console.log("Tab info: ", tabInfo);
  fetch("http://localwsl.com:8080/api/v1/bookmarks/add", {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
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