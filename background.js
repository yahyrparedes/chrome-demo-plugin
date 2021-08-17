// Sites our partners
const partners = [
    'https://hannahs.company.site',
    'https://unnostore.com',
    'https://www.perfezione-lingerie.com',
    'https://www.nathaliebird.pe',
    'https://unnostore.com',
    'https://hannahs.company.site',
    'https://www.corionica.co',
    'https://corionica.com'
]

// Sites paths our partners
const checkoutPartnersPath = [
    'checkouts',
    'payments'
]

// Sites paths our partners
const congratsPartnersPath = [
    'thank_you',
    'orders'
]

//Query params [keys]
const uui_key = "fidel_uuid";

// Global varibles
var global_uuid = null


chrome.tabs.onActivated.addListener(function (info) {
    console.log("onActivated", info)

    var global_ambrowsingDataount = ""

    chrome.tabs.get(info.tabId, function (tab) {
        var url = new URL(tab.url);
        // console.log(url.origin)

        partners.forEach(domain => {
            console.log("DOMAIN => ", domain)
            // Validate domain need scan
            if (domain === url.origin) {
                console.log("Domain is valid => ", domain)
                var path = url.pathname.toLowerCase()
                var uuid_value = url.searchParams.get(uui_key)
                global_uuid = uuid_value

                console.log("uui => ", global_uuid)
                if (global_uuid != null) {
                    console.log("Value UUID Detected")

                    var config = {
                        uuid: uui_key,
                        uuid_value: uuid_value,
                        tab: tab.id,
                        domain: domain,
                        path: path
                    };
                    chrome.tabs.executeScript(tab.id, {
                        code: 'var settings = ' + JSON.stringify(config)
                    }, function () {
                        chrome.tabs.executeScript(tab.id, {file: 'start_thread.js'});
                    });
                }
            }
        })


    })
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log("onUpdated")
        // console.log('tabId', tabId)
        // console.log('changeInfo', changeInfo.status)
        // console.log('tab', tab)

        if (changeInfo.status === 'complete') {
            console.log(tab)
            chrome.tabs.get(tabId, function (tab) {
                var url = new URL(tab.url);
                console.log(url.origin)

                partners.forEach(domain => {
                    // console.log("DOMAIN => ", domain)
                    // Validate domain need scan
                    if (domain === url.origin) {
                        console.log("Domain is valid => ", domain)

                        console.log(url.pathname)
                        var path = url.pathname.toLowerCase()

                        checkoutPartnersPath.forEach(value => {
                            if (path.indexOf(value.toLowerCase()) > -1) {
                                console.log('coincidencia', path.indexOf(value))

                                var config = {
                                    uuid: global_uuid,
                                    tab: tab.id,
                                    domain: domain,
                                    path: path
                                };
                                chrome.tabs.executeScript(tab.id, {
                                    code: 'var settings = ' + JSON.stringify(config)
                                }, function () {
                                    chrome.tabs.executeScript(tab.id, {file: 'explore_dom.js'});
                                });
                            }
                        })

                        congratsPartnersPath.forEach(value => {
                            if (path.indexOf(value.toLowerCase()) > -1) {
                                console.log('coincidencia', path.indexOf(value))

                                var config = {
                                    uuid: global_uuid,
                                    tab: tab.id,
                                    domain: domain,
                                    path: path
                                };
                                chrome.tabs.executeScript(tab.id, {
                                    code: 'var settings = ' + JSON.stringify(config)
                                }, function () {
                                    chrome.tabs.executeScript(tab.id, {file: 'final_step.js'});
                                });
                            }
                        })
                    }
                })
            })
        } else if (changeInfo.status === 'loading') {
            console.log('Loading!')
        } else {
            console.log('Pending!')
        }
    }
)
;

// chrome.tabs.onActivated.addListener(function (info) {
//
//     function getParameterByName(queryString, name) {
//         // Escape special RegExp characters
//         name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
//         // Create Regular expression
//         var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
//         // Attempt to get a match
//         var results = regex.exec(queryString);
//         return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
//     }
//
//     var global_uuid = ""
//     var global_ambrowsingDataount = ""
//
//     var tab = chrome.tabs.get(info.tabId, function (tab) {
//         // If url startWith partners website
//         var partners = [
//             "https://hannahs.company.site",
//             "https://unnostore.com",
//             "https://www.perfezione-lingerie.com",
//             "https://www.nathaliebird.pe",
//             "https://unnostore.com",
//             "https://hannahs.company.site",
//             "https://www.corionica.co",
//             "https://corionica.com"
//         ]
//         console.log(tab)
//         for (var i = 0; i < partners.length; i++) {
//             if (tab.url.indexOf(partners[i]) > -1) {
//                 //chrome.tabs.executeScript(tab.id, {file: "background.js"});
//                 let field = "fidel_uuid";
//                 if (tab.url.indexOf('?' + field + '=') != -1) {
//
//                     console.log("Fidel UUID Detected");
//                     var queryString = /\?[^#]+(?=#|$)|$/.exec(tab.url)[0];
//                     var uuid = getParameterByName(queryString, 'fidel_uuid');
//                     console.log(uuid)
//                     global_uuid = uuid;
//
//                     chrome.tabs.executeScript(tab.id, {file: "start_thread.js"});
//
//
//                     // chrome.storage.local.set({threads: "value"}, function() {
//                     //     console.log('Start a new buying thread ' + value);
//                     // });
//
//                     //chrome.tabs.executeScript(tab.id, {file: "background.js"});
//
//                 }
//
//                 if (tab.url.indexOf('finalizar-compra') != -1) {
//                     if (tab.url.indexOf('finalizar-compra/order-received/') != -1) {
//
//                         chrome.tabs.executeScript(tab.id, {
//                             code: 'var fidel_uuid = ' + global_uuid + '; console.log(fidel_uuid);'
//                         }, function (results) {
//                             chrome.tabs.executeScript(tab.id, {file: "final_step.js"});
//                         });
//                         console.log("Compra finalizada!")
//                     } else {
//                         console.log("Checkout Detected");
//
//                         chrome.tabs.executeScript(tab.id, {
//                             code: 'var fidel_uuid = ' + global_uuid + '; console.log(fidel_uuid);'
//                         }, function (results) {
//                             chrome.tabs.executeScript(tab.id, {file: "explore_dom.js"});
//                         });
//                     }
//
//                     //chrome.tabs.executeScript(tab.id, {file: "background.js"});
//                 }
//             }
//         }
//
//
//     });
// });
