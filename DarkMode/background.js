function checkDarkMode() {
    const now = new Date();
    const hour = now.getHours();
  
    chrome.storage.local.get(['startHour', 'endHour'], (data) => {
      const startHour = data.startHour !== undefined ? data.startHour : 18;
      const endHour = data.endHour !== undefined ? data.endHour : 7;
  
      const darkMode = hour >= startHour || hour < endHour;
      chrome.storage.local.set({ darkMode });
    });
  }
  
  chrome.runtime.onStartup.addListener(checkDarkMode);
  chrome.runtime.onInstalled.addListener(checkDarkMode);
  setInterval(checkDarkMode, 3600000);
  