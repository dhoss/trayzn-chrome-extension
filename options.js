const saveOptions = () => {
  const apiKey = document.getElementById('apiKey').value;
  const apiSecret = document.getElementById('apiSecret').value;

  chrome.storage.local.set(
    { apiKey: apiKey, apiSecret: apiSecret },
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
    [ 'apiKey', 'apiSecret'],
    (items) => {
      document.getElementById('apiKey').value = items.apiKey;
      document.getElementById('apiSecret').value = items.apiSecret;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);