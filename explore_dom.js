let base_path = 'fidel_thread_'
let key_status = base_path + 'status'
let key_uuid = base_path + 'uuid'
let key_uuid_value = base_path + 'uuid_value'
let key_tab = base_path + 'tab'
let key_domain = base_path + 'domain'
let key_path = base_path + 'path'
let key_db_uuid = base_path + 'db_uuid'
let service = 'http://localhost:8000/api/transaction/'

const query_selector_price = 'span[data-checkout-payment-due-target]'
const query_selector_form = 'form'


async function sendParams(body, uuid) {
    const url = service + uuid + '/'
    const response = await fetch(url, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}


//Start scan dom for values detect
function run(settings) {
    // uuid - tab
    console.log("Explore DOM", settings)

    var body = document.querySelector('body')
    var price = body.querySelector(query_selector_price).textContent
    var form = body.querySelector(query_selector_form).innerHTML

    var uuid_value = localStorage.getItem(key_uuid_value) || null
    var uuid_db = localStorage.getItem(key_db_uuid) || null
    if (uuid_value != null && uuid_db != null) {
        localStorage.setItem(key_status, "[payment]")
        // localStorage.setItem(key_uuid, settings.uuid)
        localStorage.setItem(key_uuid_value, settings.uuid_value)
        // localStorage.setItem(key_tab, settings.tab)
        // localStorage.setItem(key_domain, settings.domain)
        // localStorage.setItem(key_path, settings.path)

        sendParams({
            meta_2: JSON.stringify({
                key_status: "[payment]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_tab: settings.tab,
                key_domain: settings.domain,
                key_path: settings.path,
                price: price,
                form: form
            })
        }, uuid_db).then((data) => {
            // localStorage.setItem(key_db_uuid, data.uuid)
            console.log('Success Update!')
        })
    }
    console.log(localStorage)
}

// Execute
run(settings)