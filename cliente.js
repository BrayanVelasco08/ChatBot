const mensajes = document.getElementById('mensajes');
const msgForm = document.getElementById('msgForm');

const socket = io('http://localhost:3000');

socket.on('message', data => {
  //console.log(data);
  agregarMensaje(data);
  if (data.toLowerCase().includes('hola')) {
    enviarMensajeBot('Hola, ¿en qué puedo ayudarte?');
  } else if (data.toLowerCase().includes('adios')) {
    enviarMensajeBot('¡Hasta pronto!');
  } else {
    enviarMensajeBot('Lo siento, no entendí lo que quieres decir.');
  }
})

msgForm.addEventListener('submit', e => {
  e.preventDefault();
  const mensaje = msgForm.msg.value.trim();
  if (mensaje !== '') {
    socket.emit('chatmsg', mensaje);
    msgForm.msg.value = '';
  }
})
function obtenerHoraActual(){
  const fechaActual = new Date();
  const hora = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  return `${hora}:${minutos}`;
}
function agregarMensaje(mensaje){
  const horaActual = obtenerHoraActual();
  const mensajeHTML = `<div class="message message-personal new">${mensaje}<div class="timestamp">${horaActual}</div></div>`;
  const html =`<div>${mensajeHTML}</div>`;
  mensajes.innerHTML += html;
  mensajes.scrollTop = mensajes.scrollHeight;
}
function enviarMensajeBot(mensaje) {
  setTimeout(() => {
    const horaActual = obtenerHoraActual();
    const mensajeHTML = `<div class="message bot"><i class='bx bx-user-circle'></i>${mensaje}<div class="timestamp">${horaActual}</div></div>`;
    const html = `<div class="message new">${mensajeHTML}</div>`;
    mensajes.innerHTML += html;
  }, 1000);
  mensajes.scrollTop = mensajes.scrollHeight;
}

