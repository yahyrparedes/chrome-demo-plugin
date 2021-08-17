let base_path = 'fidel_thread_'
let key_status = base_path + 'status'
let key_uuid = base_path + 'uuid'
let key_uuid_value = base_path + 'uuid_value'
let key_tab = base_path + 'tab'
let key_domain = base_path + 'domain'
let key_path = base_path + 'path'
let key_db_uuid = base_path + 'db_uuid'
let service = 'http://localhost:8000/api/transaction/'

async function sendParams(body) {
    const response = await fetch(service, {
        method: 'post',
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
    console.log("start thread", settings)

    localStorage.clear()
    var uuid_storage = localStorage.getItem(key_uuid) || null
    if (uuid_storage == null) {
        localStorage.setItem(key_status, "[created]")
        localStorage.setItem(key_uuid, settings.uuid)
        localStorage.setItem(key_uuid_value, settings.uuid_value)
        localStorage.setItem(key_tab, settings.tab)
        localStorage.setItem(key_domain, settings.domain)
        localStorage.setItem(key_path, settings.path)
        sendParams({
            meta_1: JSON.stringify({
                key_status: "created",
                key_uuid: settings.uuid,
                key_uuid_value: settings.uuid_value,
                key_tab: settings.tab,
                key_domain: settings.domain,
                key_path: settings.path,
            })
        }).then((data) => {
            localStorage.setItem(key_db_uuid, data.uuid)
        })
    }
    console.log(localStorage)
}

// Execute
run(settings)


