const urlParams = new URLSearchParams(window.location.search);
const uuid = urlParams.get('fidel_uuid');

localStorage.setItem('fidel_thread_' + uuid, ["created"]);