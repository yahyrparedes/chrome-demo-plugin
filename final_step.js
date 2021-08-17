let base_path = 'fidel_thread_'
let key_status = base_path + 'status'
let key_uuid = base_path + 'uuid'
let key_uuid_value = base_path + 'uuid_value'
let key_tab = base_path + 'tab'
let key_domain = base_path + 'domain'
let key_path = base_path + 'path'
let key_db_uuid = base_path + 'db_uuid'
let service = 'http://localhost:8000/api/transaction/'

const query_selector_response = 'div.section__content'

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

// Start
function run(settings) {
    // uuid - tab
    console.log("Final Step", settings)

    var body = document.querySelector('body')
    var response = body.querySelector(query_selector_response).innerHTML

    var uuid_value = localStorage.getItem(key_uuid_value) || null
    var uuid_db = localStorage.getItem(key_db_uuid) || null
    if (uuid_value != null && uuid_db != null) {
        localStorage.setItem(key_status, "[thank_you]")
        // localStorage.setItem(key_uuid, settings.uuid)
        localStorage.setItem(key_uuid_value, settings.uuid_value)
        // localStorage.setItem(key_tab, settings.tab)
        // localStorage.setItem(key_domain, settings.domain)
        // localStorage.setItem(key_path, settings.path)

        sendParams({
            meta_3: JSON.stringify({
                key_status: "[thank_you]",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_tab: settings.tab,
                key_domain: settings.domain,
                key_path: settings.path,
                response: response
            })
        }, uuid_db).then((data) => {
            // localStorage.setItem(key_db_uuid, data.uuid)
            localStorage.clear()
            console.log('Success Finish!')
        })
    }

    console.log(localStorage)
}

run(settings)
