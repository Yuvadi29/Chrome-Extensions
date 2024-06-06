document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('optionsForm');
  
    // Load saved settings
    chrome.storage.local.get(['startHour', 'endHour'], (data) => {
      if (data.startHour !== undefined) {
        form.startHour.value = data.startHour;
      }
      if (data.endHour !== undefined) {
        form.endHour.value = data.endHour;
      }
    });
  
    // Save settings
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const startHour = parseInt(form.startHour.value);
      const endHour = parseInt(form.endHour.value);
      chrome.storage.local.set({ startHour, endHour });
    });
  });
  