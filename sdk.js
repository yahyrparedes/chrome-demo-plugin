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
const cartPartnersPath = [
    'cart'
]


// Sites paths our partners
const checkoutPartnersPath = [
    'checkouts',
    'payments',
]

// Sites paths our partners
const congratsPartnersPath = [
    'thank_you',
    'orders'
]

// KEY STORE
const base_path = 'fidel_thread_'
const key_status = base_path + 'status'
const key_uuid = base_path + 'uuid'
const key_uuid_value = base_path + 'uuid_value'
const key_db_uuid = base_path + 'db_uuid'

//Query params [keys]
const uuid_key = "fidel_uuid";

// Global varibles
var global_uuid = null

// Service
// const service = 'http://localhost:8000/api/transaction/'
const service = 'https://panel.fidel.pe/api/transaction/'


function fidel_sdk() {
    console.log("Fidel SDK Initialized! ")

    //window.location.href
    var url = new URL(document.URL)
    console.log("url => ", url)
    partners.forEach(domain => {
        console.log("DOMAIN => ", domain)
        // Validate domain need scan
        if (domain === url.origin) {
            console.log("Domain is valid => ", domain)
            var path = url.pathname.toLowerCase()

            // Get uuid
            global_uuid = url.searchParams.get(uuid_key)

            // first_step
            if (global_uuid != null) {
                console.log("Fidel SDK Installed")
                var config = {
                    uuid: uuid_key,
                    uuid_value: global_uuid,
                    domain: domain,
                    path: path
                };
                start_step(config)
            }

            global_uuid = localStorage.getItem(key_db_uuid) || null
            console.log("global_uuid => ", global_uuid)
            if (global_uuid != null) {
                console.log("Fidel SDK start")

                cartPartnersPath.forEach(value => {
                    if (path.indexOf(value.toLowerCase()) > -1) {
                        // console.log('coincidencia', path.indexOf(value))
                        var config = {
                            uuid: global_uuid,
                            domain: domain,
                            path: path
                        };
                        cart_step(config)
                    }
                })

                checkoutPartnersPath.forEach(value => {
                    if (path.indexOf(value.toLowerCase()) > -1) {
                        // console.log('coincidencia', path.indexOf(value))
                        var config = {
                            uuid: global_uuid,
                            domain: domain,
                            path: path
                        };
                        payment_step(config)
                    }
                })

                congratsPartnersPath.forEach(value => {
                    if (path.indexOf(value.toLowerCase()) > -1) {
                        // console.log('coincidencia', path.indexOf(value))
                        var config = {
                            uuid: global_uuid,
                            domain: domain,
                            path: path
                        };
                        congrats_step(config)
                    }
                })
            }
        }
    })
}


async function sendParams(method, body, uuid = null) {
    console.log("sendParams =>", uuid)
    let url = service
    if (uuid != null) {
        url = service + uuid + '/'
        console.log("another url => ", url)
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

// start_thread
function start_step(settings) {
    // uuid - tab
    console.log("start thread", settings)

    var uuid_storage = localStorage.getItem(key_db_uuid) || null
    if (uuid_storage == null) {
        localStorage.setItem(key_status, "[created]")
        localStorage.setItem(key_uuid_value, settings.uuid_value)
        sendParams('post', {
            meta_1: JSON.stringify({
                key_status: "[created]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                // key_tab: settings.tab,
                key_domain: settings.domain,
                key_path: settings.path,
            })
        }).then((data) => {
            localStorage.setItem(key_db_uuid, data.uuid)
            console.log('Success Created!')
        })
    }
    console.log(localStorage)
}

const query_selector_price = '.cart-subtotal__price'
const query_selector_form = 'form > table'

function payment_step(settings) {
    console.log("Explore DOM", settings)

    var body = document.querySelector('body')
    var price = body.querySelector(query_selector_price).textContent
    // var form = body.querySelector(query_selector_form)
    var form = body.querySelector('form > table')
    var uuid_value = localStorage.getItem(key_uuid_value) || null
    var uuid_db = localStorage.getItem(key_db_uuid) || null
    if (uuid_value != null && uuid_db != null) {
        localStorage.setItem(key_status, "[payment]")
        localStorage.setItem(key_uuid_value, settings.uuid_value)

        sendParams('put', {
            meta_3: JSON.stringify({
                key_status: "[payment]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_domain: settings.domain,
                key_path: settings.path,
                price: price,
                form: form
            })
        }, uuid_db).then((data) => {
            console.log('Success Update!')
        })
    }
    console.log(localStorage)
}


function cart_step(settings) {
    console.log("Explore DOM", settings)

    var body = document.querySelector('body')
    var price = body.querySelector(query_selector_price).textContent
    var form = body.querySelector(query_selector_form).innerHTML
    var uuid_value = localStorage.getItem(key_uuid_value) || null
    var uuid_db = localStorage.getItem(key_db_uuid) || null
    if (uuid_value != null && uuid_db != null) {
        localStorage.setItem(key_status, "[cart]")
        localStorage.setItem(key_uuid_value, settings.uuid_value)

        sendParams('put', {
            meta_2: JSON.stringify({
                key_status: "[cart]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_domain: settings.domain,
                key_path: settings.path,
                price: price,
                form: form
            })
        }, uuid_db).then((data) => {
            console.log('Success Update!')
            create_sw()
        })
    }
    console.log(localStorage)
}


const query_selector_response = 'div.section__content'

function congrats_step(settings) {
    // uuid - tab
    console.log("Final Step", settings)

    var body = document.querySelector('body')
    var response = body.querySelector(query_selector_response).innerHTML
    var uuid_value = localStorage.getItem(key_uuid_value) || null
    var uuid_db = localStorage.getItem(key_db_uuid) || null

    if (uuid_value != null && uuid_db != null) {
        localStorage.setItem(key_status, "[congrats]")
        localStorage.setItem(key_uuid_value, settings.uuid_value)

        sendParams('put', {
            meta_4: JSON.stringify({
                key_status: "[congrats]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_domain: settings.domain,
                key_path: settings.path,
                response: response
            })
        }, uuid_db).then((data) => {
            localStorage.clear()
            console.log('Success Finish!')
        })
    }
    console.log(localStorage)
}




fidel_sdk()




