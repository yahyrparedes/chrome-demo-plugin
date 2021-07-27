
console.log("final step");

events = localStorage.getItem('fidel_thread_' + fidel_uuid);

events.push("Final Step");

localStorage.setItem('fidel_thread_' + uuid, events);