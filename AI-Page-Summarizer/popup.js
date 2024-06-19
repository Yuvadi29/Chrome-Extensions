document.addEventListener('DOMContentLoaded', function() {
    const summarizeButton = document.getElementById('summarizeButton');
    const resultDiv = document.getElementById('result');
  
    summarizeButton.addEventListener('click', function() {
      // Get the selected text from the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "get_selected_text" }, function(response) {
          if (response && response.selectedText) {
            const selectedText = response.selectedText;
  
            // Send the selected text to the backend for summarization
            fetch('http://127.0.0.1:5000/summarize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: selectedText })
            })
            .then(response => response.json())
            .then(data => {
              if (data.summary) {
                resultDiv.textContent = data.summary;
              } else {
                resultDiv.textContent = 'Error summarizing the text.';
              }
            })
            .catch(error => {
              console.error('Error:', error);
              resultDiv.textContent = 'Error summarizing the text.';
            });
          } else {
            resultDiv.textContent = 'No text selected.';
          }
        });
      });
    });
  });
  