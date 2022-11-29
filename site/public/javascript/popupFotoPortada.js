window.addEventListener('load', () => {
let btnAbrirPopupPortada = document.getElementById('btn-abrir-popupPortada'),
    overlay = document.getElementById('overlayPortada'),
    popup = document.getElementById('popupPortada'),
    btnCerrarPopupPortada = document.getElementById('btn-cerrar-popupPortada');

btnAbrirPopupPortada.addEventListener('click', function(){
    overlay.classList.add('active')
})
btnCerrarPopupPortada.addEventListener('click', function(){
    overlay.classList.remove('active')
})
})
