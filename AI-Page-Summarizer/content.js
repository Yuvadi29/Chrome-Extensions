// Content script to extract text content from the current page

// Function to extract text content from the page
function extractTextContent() {
    // Use a more specific selector if you want to target specific elements
    let textContent = document.body.innerText.trim();
    return textContent;
}

// Send the extracted text content back to the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "extract_text") {
        const textContent = extractTextContent();
        sendResponse({ textContent: textContent });
    }
});
