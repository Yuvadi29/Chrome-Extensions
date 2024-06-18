document.getElementById('summarize').addEventListener('click', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
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
    return new Promise((resolve, reject) => {
        let text = document.body.innerText;
        const port = 5000;

        fetch(`http://127.0.0.1:${port}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        })
            .then(response => response.json())
            .then(data => {
                resolve(data.summary);
            })
            .catch(error => {
                console.log('Error: ', error);
                resolve('An error occurred while summarizing the text.');
            });
    });
}
