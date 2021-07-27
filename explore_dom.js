
console.log("exploring dom");

amount = document.querySelectorAll(".amount bdi ")[3].innerText;

console.log("Precio total detectado: " + amount);

events = localStorage.getItem('fidel_thread_' + fidel_uuid);

events.push("amount detected " + amount);

localStorage.setItem('fidel_thread_' + uuid, events);