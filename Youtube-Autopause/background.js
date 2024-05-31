chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tab.id, { action: "play" });
        } else {
            chrome.tabs.query({
                url: "*://www.youtube.com/*"
            }, youtubeTabs => {
                youtubeTabs.forEach(youtubeTab => {
                    chrome.tabs.sendMessage(youtubeTab.id, { action: "pause" });
                });
            });
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, { action: "play" });
    }
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId == chrome.windows.WINDOW_ID_NONE) {
        chrome.tabs.query({
            url: "*://www.youtube.com/*"
        }, youtubeTabs => {
            youtubeTabs.forEach(youtubeTab => {
                chrome.tabs.sendMessage(youtubeTab.id, { action: "pause" });
            });
        });
    } else {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, tabs => {
            let activeTab = tabs[0];
            if (activeTab && activeTab.url.includes("youtube.com")) {
                chrome.tabs.sendMessage(activeTab.id, { action: "play" });
            }
        });
    }
});