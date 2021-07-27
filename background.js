chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {

        // If url startWith partners website
        var partners = [
            "https://hannahs.company.site",
            "https://unnostore.com",
            "https://www.perfezione-lingerie.com",
            "https://www.nathaliebird.pe",
            "https://unnostore.com",
            "https://hannahs.company.site",
            "https://www.corionica.co"
        ]

        for (var i = 0; i < partners.length; i++) {
            if (tab.url.indexOf(partners[i]) > -1) {
                //chrome.tabs.executeScript(tab.id, {file: "background.js"});
                console.log(tab.url);

                let field="fidel_uuid";

                if(tab.url.indexOf('?' + field + '=') != -1) {
                    console.log("Fidel UUID Detected");
                    //chrome.tabs.executeScript(tab.id, {file: "background.js"});

                }

            }
        }



        
    });
});
