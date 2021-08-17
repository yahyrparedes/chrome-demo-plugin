// const urlParams = new URLSearchParams(window.location.search)
// const uuid = urlParams.get('fidel_uuid');

const base_path = 'fidel_thread_'
const key_uuid = base_path + 'uuid_'
const key_tab = base_path + 'tab_'
const key_domain = base_path + 'domain_'
const key_path = base_path + 'path_'

// Start
function run(settings) {
    // uuid - tab
    console.log("start thread", settings)
    var uuid = settings.uuid
    var tab = settings.tab
    var domain = settings.domain
    var path = settings.path
    // var uuid_storage = localStorage.getItem(base_path + uuid) || null
    // if (uuid_storage == null) {
    localStorage.setItem(key_uuid + uuid, ["created"])
    localStorage.setItem(key_tab + tab, tab)
    localStorage.setItem(key_domain + domain, domain)
    localStorage.setItem(key_path + path, path)
    // }
    console.log(localStorage)
}

run(settings)

