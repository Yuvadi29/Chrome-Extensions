document.getElementById('summarize').addEventListener('click', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: {
                    tabId: tabs[0].id
                },
                function: summarizePage,
            },
            (results) => {
                if (results && results[0]) {
                    document.getElementById('summary').innerText = results[0].result;
                }
            }
        );
    });
});

function summarizePage() {
    let text = document.body.innerText;
    const port = process.env.PORT || 8000;


    fetch(`http://127.0.0.1:${port}/summarize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            return data.summary;
        })
        .catch(error => {
            console.log('Error: ', error);
            return 'An error occurred while summarizing the text.';
        });
}