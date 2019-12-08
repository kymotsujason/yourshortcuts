chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: "www.google.com" }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.target === "background") {
//         if (request.type === "message") {
//             alert(request.body);
//         }
//     }
// });
