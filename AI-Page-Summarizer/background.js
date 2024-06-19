// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "summarize_selected_text") {
        // Message to summarize the current page
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // Send message to content script to extract text content
            chrome.tabs.sendMessage(tabs[0].id, { message: "get_selected_text" }, function (response) {
                if (response && response.text) {
                    // Send extracted text content to server for summarization
                    fetch('http://127.0.0.1:5000/summarize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ text: response.text })
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Send summarized text back to the extension popup
                            chrome.runtime.sendMessage({ summary: data.summary });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Send error message back to the extension popup
                            chrome.runtime.sendMessage({ error: "Error summarizing the page." });
                        });
                } else {
                    // Send error message back to the extension popup
                    chrome.runtime.sendMessage({ error: "No selected text content found on the page." });
                }
            });

            return true;
        });
    }
});
