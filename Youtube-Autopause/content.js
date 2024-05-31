chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "play") {
        document.querySelector('video').play();
    } else if (request.action === 'pause') {
        document.querySelector('video').pause();
    }
});

// Automatically pause video when content script is loaded
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        document.querySelector('video').pause();
    } else if (document.visibilityState === 'visible') {
        document.querySelector('video').play();
    }
});