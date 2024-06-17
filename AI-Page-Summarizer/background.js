// Example background script for a Chrome extension

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "summarize_page") {
        // Message to summarize the current page
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Send message to content script to extract text content
            chrome.tabs.sendMessage(tabs[0].id, { message: "extract_text" }, function (response) {
                if (response && response.textContent) {
                    // Send extracted text content to server for summarization
                    fetch('http://127.0.0.1:5000/summarize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ text: response.textContent })
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Send summarized text back to the extension popup
                            chrome.runtime.sendMessage({ message: "summarize_complete", summary: data.summary });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Send error message back to the extension popup
                            chrome.runtime.sendMessage({ message: "summarize_error", error: "Error summarizing the page." });
                        });
                } else {
                    // Send error message back to the extension popup
                    chrome.runtime.sendMessage({ message: "summarize_error", error: "No text content found on the page." });
                }
            });
        });
    }
});
