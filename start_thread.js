// const urlParams = new URLSearchParams(window.location.search)
// const uuid = urlParams.get('fidel_uuid');

const base_path = 'fidel_thread_'
const key_uuid = base_path + 'uuid_'
const key_tab = base_path + 'tab_'

// Start
function run(settings) {
    // uuid - tab
    console.log("start thread", settings)
    var uuid = settings.uuid
    var tab = settings.tab
    // var uuid_storage = localStorage.getItem(base_path + uuid) || null
    // if (uuid_storage == null) {
    localStorage.setItem(key_uuid + uuid, ["created"])
    localStorage.setItem(key_tab + tab, tab)
    // }
    console.log(localStorage)
}

run(settings)

