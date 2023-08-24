chrome.action.onClicked.addListener(function(tab) {
  fetch("http://localwsl.com:8080/api/v1/bookmarks/add", {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({key: "value"})
          })
              .then(response => response.json())
              .then(response => console.log('Response: ', response))
              .catch(error => console.log('Error:', error));
});