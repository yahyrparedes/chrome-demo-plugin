const base_path = 'fidel_thread_'
const key_uuid = base_path + 'uuid_'
const key_tab = base_path + 'tab_'
const key_domain = base_path + 'domain_'
const key_path = base_path + 'path_'

const query_selector_price = 'span[data-checkout-payment-due-target]'
const query_selector_form = 'form'

//Start scan dom for values detect
function run(settings) {
    // uuid - tab
    console.log("Explore DOM", settings)
    var uuid = settings.uuid
    var tab = settings.tab
    var domain = settings.domain
    var path = settings.path

    var body = document.querySelector('body')
    var price = body.querySelector(query_selector_price).innerHTML
    var form = body.querySelector(query_selector_form)
    console.log("Precio total detectado: " + price);
    console.log(form);

    // var uuid_storage = localStorage.getItem(base_path + uuid) || null
    // if (uuid_storage == null) {
        localStorage.setItem(key_uuid + uuid, ["created"])
        localStorage.setItem(key_tab + tab, tab)
        localStorage.setItem(key_domain + domain, domain)
        localStorage.setItem(key_path + path, path)

        fetch()

    // }
    console.log(localStorage)

    uuid_storage.push("price detected " + price);
}

// Execute
run(settings)