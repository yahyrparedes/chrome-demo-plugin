chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
        console(tab.url);
    });
});
