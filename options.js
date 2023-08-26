const saveOptions = () => {
  const url = document.getElementById('url').value;
  const apiKey = document.getElementById('apiKey').value;
  const apiSecret = document.getElementById('apiSecret').value;

  chrome.storage.local.set(
    { url: url, apiKey: apiKey, apiSecret: apiSecret },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.local.get(
    ['url', 'apiKey', 'apiSecret'],
    (items) => {
      document.getElementById('url').value = items.url;
      document.getElementById('apiKey').value = items.apiKey;
      document.getElementById('apiSecret').value = items.apiSecret;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);