window.addEventListener('load', () => {

    const $ = (tag) => document.querySelector(tag)
    const id = (tag) => document.getElementById(tag)
    console.log('Register vinculado con éxito');

    const funcValidate = (obj) => {
        let arr = Object.values(obj)
        console.log(arr);
        if (!arr.includes(false)) {
            btn.disabled = false
            btn.style.backgroundColor = '#1a78fd'
        } else {
            btn.disabled = true
            btn.style.backgroundColor = 'var(--rojoError)'
        }
    }
    let nombres = $('#nombre')
    let marcas = $('#marca')
    let categorias = $('#categoria')
    let estados = $('#estado')
    let precios = $('#precio')
    let descuentos = $('#descuento')
    let stocks = $('#stock')
    let descripcion = $('#descripcion')
    let img = $('#product-img')
    let img2 = $('#product-sub-img-1')
    let img3 = $('#product-sub-img-2')
    let img4 = $('#product-sub-img-3')
    let imgErr = $('#imgError')

    iconoExito = ('#success-icon'),
    failureIcon = ('#failure-icon');

    let btn = $('#btn-submit')

    let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/
    let regExNumber = /^[+]?([0-9][0-9]?|150)$/
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/




    nombres.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#nombreError').innerHTML = "Debes ingresar el nombre de tu producto"
                this.classList.add('is-invalid')
                /* $('#failure').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>' */
                validate.nombres = false
                break;
            case !(this.value.trim().length > 2):
                $('#nombreError').innerHTML = "El nombre del producto debe 2 letras"
                this.classList.add('is-invalid')
                /* $('#failure').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>' */
                validate.nombres = false
                break;
            case !(this.value.trim().length < 100):
                $('#nombreError').innerHTML = "El nombre del producto no puede ser tan largo"
                this.classList.add('is-invalid')
                /* $('#failure').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>' */
                validate.nombres = false
                break;
            default:
                $('#nombreError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                /* $('#success').innerHTML = '<i class="fa-solid fa-circle-check"></i>' */
                validate.nombres = true
                break;
        }
        funcValidate(validate)
    })
    marcas.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#marcaError').innerHTML = "Debes elegir una marca"
                this.classList.add('is-invalid')
                validate.marcas = false
                break;
            default:
                $('#marcaError').innerText = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.marcas = true
            break;
        }
        funcValidate(validate)
    })
    categorias.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#categoriaError').innerHTML = "Debes elegir una categoría"
                this.classList.add('is-invalid')
                validate.categorias = false
                break;
            
            default:
                $('#categoriaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.categorias = true
            break;
        }
        funcValidate(validate)
    })
    estados.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#subcategoriaError').innerHTML = "Debes elegir una subcategoría"
                this.classList.add('is-invalid')
                validate.estados = false
                break;
            
            default:
                $('#subcategoriaError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.estados = true
            break;
        }
        funcValidate(validate)
    })
    precios.addEventListener('blur', function() {
        switch (true) {
            case !this.value.trim():
                $('#precioError').innerHTML = "Debes ingresar el precio del producto"
                this.classList.add('is-invalid')
                validate.precios = false
                break;
            case !(this.value.trim() >= 10):
                $('#precioError').innerHTML = "El precio debe ser mayor o igual que $10"
                this.classList.add('is-invalid')
                validate.precios = false
                break;
            case !(this.value.trim().length <= 16):
                $('#precioError').innerHTML = "El precio debe ser mayor o igual que $10"
                this.classList.add('is-invalid')
                validate.precios = false
                break;
            default:
                $('#precioError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.precios = true
                break;
        }
        funcValidate(validate)
    })
    descuentos.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#descuentoError').innerHTML = "Debes ingresar el descuento del producto"
                this.classList.add('is-invalid')
                validate.descuentos = false
                break;
            case !(this.value.trim() >= 0):
                $('#descuentoError').innerHTML = "Debe ser mayor o igual que 0"
                this.classList.add('is-invalid')
                validate.descuentos = false
                break;
            case !(this.value.trim() <= 99):
                $('#descuentoError').innerHTML = "Debe ser menor o igual que 99"
                this.classList.add('is-invalid')
                validate.descuentos = false
                break;
            default:
                $('#descuentoError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.descuentos = true
                break;
        }
        funcValidate(validate)
    })
    stocks.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#stockError').innerHTML = "Debes ingresar el stock del producto"
                this.classList.add('is-invalid')
                validate.stocks = false
                break;
            case !(this.value.trim() >= 0):
                $('#stockError').innerHTML = "Debe ser mayor o igual que 0"
                this.classList.add('is-invalid')
                validate.descuentos = false
                break;
            default:
                $('#stockError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.stocks = true
                break;
        }
        funcValidate(validate)
    })
    descripcion.addEventListener('blur', function () {
        switch (true) {
            case !this.value.trim():
                $('#descripcionError').innerHTML = "Debes ingresar una descripción del producto"
                this.classList.add('is-invalid')
                validate.descripcion = false
                break;
            case !(this.value.trim().length > 20):
                $('#descripcionError').innerHTML = "La descripción debe ser más larga"
                this.classList.add('is-invalid')
                validate.descripcion = false
                break;
            case !(this.value.trim().length < 1000):
                $('#descripcionError').innerHTML = "La descripción solo puede tener un máximo de 1000 caracteres"
                this.classList.add('is-invalid')
                validate.descripcion = false
                break;
            default:
                $('#descripcionError').innerHTML = null
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                validate.descripcion = true
                break;
        }
        funcValidate(validate)
    })
    img.addEventListener('change', function () {
        switch (true) {
            case !regExExt.exec(img.value):
                $('#imgError').innerHTML = "La imagen solo puede tener uno de los siguientes formatos: <br> jpg | jpeg | png | jfif | gif | webp"
                imgErr.style.color='red'
                validate.img = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img = true
                break;
        }
        funcValidate(validate)
    })
    img2.addEventListener('change', function () {
        switch (true) {
            case !regExExt.exec(img2.value):
                $('#imgError').innerHTML = "La imagen solo puede tener uno de los siguientes formatos: <br> jpg | jpeg | png | jfif | gif | webp"
                imgErr.style.color='red'
                validate.img2 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img2 = true
                break;
        }
        funcValidate(validate)
    })
    img3.addEventListener('change', function () {
        switch (true) {
            case !regExExt.exec(img3.value):
                $('#imgError').innerHTML = "La imagen solo puede tener uno de los siguientes formatos: <br> jpg | jpeg | png | jfif | gif | webp"
                imgErr.style.color='red'
                validate.img3 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img3 = true
                break;
        }
        funcValidate(validate)
    })
    img4.addEventListener('change', function () {
        switch (true) {
            case !regExExt.exec(img4.value):
                $('#imgError').innerHTML = "La imagen solo puede tener uno de los siguientes formatos: <br> jpg | jpeg | png | jfif | gif | webp"
                imgErr.style.color='red'
                validate.img4 = false
                break;
            default:
                $('#imgError').innerHTML = null
                validate.img4 = true
                break;
        }
        funcValidate(validate)
    })
    
    /* Validacion */
    const validate = {
        nombres: false,
        marcas: false,
        categorias: false,
        estados: false,
        precios: false,
        descuentos: true,
        descripcion: false,
        img : true,
        img2 : true,
        img3 : true,
        img4 : true
    }


    funcValidate(validate)
})