window.addEventListener('load', () => {

    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)

    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = '#1a78fd'
        }else{
            btn.disabled = true
            btn.style.backgroundColor = 'var(--rojoError)'
        }
    }

    let nombres = $('#nombre')
    let marcas = $('#marca')
    let categorias = $('#categoria')
    let estados = $('#estado')
    let colores = $('#color')
    let precios = $('#precio')
    let descuentos = $('#descuento')
    let stocks = $('#stock')
    let descripcion = $('#descripcion')
    let imagenes = $('#imagen')

    let btn = $('#btn-submit')


    nombres.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#nombreError').innerHTML = "Debes ingresar el nombre de tu producto"
                this.classList.add('is-invalid')
                validate.nombres = false
                break;
            case !(this.value.trim().length > 2 && this.value.trim().length < 100):
                $('#nombreError').innerHTML = "El nombre del producto debe 2 letras y maximo 10"
                this.classList.add('is-invalid')
                validate.nombres = false
                break;
            default:
                $('#nombreError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.nombres = true
                break;
        }
        funcValidate(validate)
    })
    marcas.addEventListener('blur', function() {
        switch (true) {
            case this.value.trim():
                $('#marcaError').innerHTML = "Debes ingresar una marca"
                this.classList.add('is-invalid')
                validate.marcas = false
                break;
            default:
                $('#marcaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.marcas = true
                break;
        }
        funcValidate(validate)
    })


  /* Validacion */
  const validate = {
    nombres : false,
    marcas : false,
    categorias : false ,
    estados : false ,
    colores : false ,
    precios : false ,
    descuentos : true ,
    descripcion : false ,
    imagenes : true ,
}


funcValidate(validate)
})