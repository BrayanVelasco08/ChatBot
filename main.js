
//Iniciar apenas abra la pagina
window.onload = function () {
  getNombre();
}
async function getNombre() {
  const { value: text } = await Swal.fire({
    input: 'text',
    inputLabel: '¿Con quién vas a chatear?',
    inputPlaceholder: 'Ingresa nombre amigo...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  })

  if (text) {
    await Swal.fire(`${text} Esta Online`)
    document.getElementById('nombre').textContent = `${text}`;
  }
}