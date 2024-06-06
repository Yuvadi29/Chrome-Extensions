chrome.storage.local.get('darkMode', ({ darkMode }) => {
    if (darkMode) {
        document.documentElement.classList.add('dark-mode');
    }
});