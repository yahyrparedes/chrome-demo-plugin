chrome.tabs.onActivated.addListener(function(info) {

    function getParameterByName(queryString, name) {
        // Escape special RegExp characters
        name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
        // Create Regular expression
        var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
        // Attempt to get a match
        var results = regex.exec(queryString);

        return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
    }

    var global_uuid = ""
    var global_amount = ""


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
                    var queryString = /\?[^#]+(?=#|$)|$/.exec(tab.url)[0];
                    var uuid = getParameterByName(queryString, 'fidel_uuid');

                    global_uuid = uuid;
 
                    chrome.tabs.executeScript(tab.id, {file: "start_thread.js"});
                    

                    // chrome.storage.local.set({threads: "value"}, function() {
                    //     console.log('Start a new buying thread ' + value);
                    // });
                      
                    //chrome.tabs.executeScript(tab.id, {file: "background.js"});

                }

                if (tab.url.indexOf('finalizar-compra') != -1) {
                    if (tab.url.indexOf('finalizar-compra/order-received/') != -1) {
                        
                        chrome.tabs.executeScript(tab.id, {
                            code: 'var fidel_uuid = ' + global_uuid + '; console.log(fidel_uuid);'
                        }, function(results) {
                            chrome.tabs.executeScript(tab.id, {file: "final_step.js"});
                        });
                        console.log("Compra finalizada!")
                    } else {
                        console.log("Checkout Detected");
                        
                        chrome.tabs.executeScript(tab.id, {
                            code: 'var fidel_uuid = ' + global_uuid + '; console.log(fidel_uuid);'
                        }, function(results) {
                            chrome.tabs.executeScript(tab.id, {file: "explore_dom.js"});
                        });
                        
                    }
                    
                    //chrome.tabs.executeScript(tab.id, {file: "background.js"});
                }

                

            }
        }



        
    });
});
