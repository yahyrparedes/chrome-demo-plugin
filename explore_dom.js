const base_path = 'fidel_thread_'
const key_uuid = base_path + 'uuid_'
const key_tab = base_path + 'tab_'

//Start scan dom for values detect
function run(settings) {
    // uuid - tab
    console.log("Explore DOM", settings)
    var uuid = settings.uuid
    var tab = settings.tab

    amount = document.querySelectorAll('dd').innerText;
    console.log("Precio total detectado: " + amount);

    var uuid_storage = localStorage.getItem(base_path + uuid) || null
    if (uuid_storage == null) {
        localStorage.setItem(key_uuid + uuid, ["created"])
        localStorage.setItem(key_tab + tab, tab)
    }
    console.log(localStorage)

    uuid_storage.push("amount detected " + amount);
    localStorage.setItem(base_path + uuid, uuid_storage);

}

// Execute
run(settings)