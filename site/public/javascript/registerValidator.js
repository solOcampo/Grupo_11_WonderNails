window.addEventListener('load', () => {
    let $ = (elemento) => document.querySelector(elemento)
    console.log("Register vinculado");

    const regExLetter = /^[A-Z]+$/;
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let form = $('#FormRegister')
    let nombre = $('#name')
    let apellido = $('#lastname')
    let email = $('#Email')
    // let image = $('#image')
    let inputPass = $('#password')
    let inputPass2 = $('#password2')
    let terminos = $('#terminos')

    let errores = []

    let eye = $('#eye-pass')
    let eye2 = $('#eye-pass2')
    eye.addEventListener('click', (e) => {
        inputPass.type === 'password' ? inputPass.type = 'text' : inputPass.type = 'password'
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        } else {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }
    })

    eye2.addEventListener('click', (e) => {
        inputPass2.type === 'password' ? inputPass2.type = 'text' : inputPass2.type = 'password'
        if (eye2.classList.contains('fa-eye-slash')) {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        } else {
            eye2.classList.toggle('fa-eye-slash')
            eye2.classList.toggle('fa-eye')
        }
    })

    nombre.addEventListener('blur', () => {
        let error = {
            id: 1,
            elemento: "nombre",
            mensaje: "Este campo es obligatorio"
        }
        let variable = true
        switch (true) {
            case !nombre.value:
                $('#nameContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "Este campo es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(nombre.value):
                $('#nameContainer').innerHTML = "<small>El nombre solo acepta letras</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 1) {
                        e.mensaje = "El nombre solo acepta letras"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#nameContainer').innerHTML = ""
                nombre.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 1
                })
                break;
        }
        console.log(errores);
    })
    apellido.addEventListener('blur', () => {
        let error = {
            id: 2,
            elemento: "apellido",
            mensaje: "Falta el apellido"
        }
        let variable = true
        switch (true) {
            case !apellido.value:
                $('#lastnameContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                apellido.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje =  "Este campo es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExLetter.test(apellido.value):
                $('#lastnameContainer').innerHTML = "<small>El apellido no puede contener numeros ni caracteres especiales</small>"
                nombre.style.border = "1px solid red"
                errores.forEach(e => {
                    if (e.id === 2) {
                        e.mensaje = "El apellido no puede contener numeros ni caracteres especiales"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#lastnameContainer').innerHTML = ""
                apellido.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 2
                })
                break;
        }
    })
    email.addEventListener('blur',() => {
        let error = {
            id: 3,
            elemento:"email",
            mensaje:  "Este campo es obligatorio"
        }
        let variable = true
        switch (true) {
            case !email.value:
                $('#emailContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                email.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "Este campo es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExEmail.test(email.value):
                $('#emailContainer').innerHTML = "<small>El email no coincide con un email valido</small>"
                email.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "El email no coincide con un email valido"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#emailContainer').innerHTML = ""
                email.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 3
                })
                break;
        }
        console.log(errores);
    })
    inputPass.addEventListener('blur',() => {
        let error = {
            id: 4,
            elemento:"inputPass",
            mensaje: "Este campo es obligatorio"
        }
        let variable = true
        switch (true) {
            case !inputPass.value:
                $('#passwordContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                inputPass.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 4 ){
                        e.mensaje = "Este campo es obligatorio"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            case !regExPass.test(inputPass.value):
                $('#passwordContainer').innerHTML = "<small>La contraseña debe tener entre 6 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero</small>"
                email.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 3 ){
                        e.mensaje = "La contraseña debe tener entre 6 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero"
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                break;
            default:
                $('#passwordContainer').innerHTML = ""
                inputPass.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 4
                })
                break;
        }
    })
    inputPass2.addEventListener('blur',() => {
        let error = {
            id: 5,
            elemento:"inputPass2",
            mensaje: "Debe confirmar su contraseña"
        }
        let variable = true
        
        switch (true) {
            case !inputPass2.value:
                $('#passwordContainer2').innerHTML = "<small>La confirmacion de la contraseña no puede estar vacia</small>"
                inputPass2.style.border = "1px solid red"
                error.mensaje = "La confirmacion de la contraseña no puede estar vacia"
                errores.forEach(e => {
                    if(e.id === 5 ){
                        variable = false
                    }
                });
                if (variable) {
                    errores.push(error)
                }
                
                break;
            case inputPass2.value != inputPass.value:
                $('#passwordContainer2').innerHTML = "<small>Las contraseñas no coinciden</small>"
                error.mensaje = "Las contraseñas no coinciden"
                inputPass2.style.border = "1px solid red"
                errores.forEach(e => {
                    if(e.id === 5 ){
                        variable = false
                    }
                });
                
                if (variable) {
                    errores.push(error)
                }
                
                break;
            default:
                $('#passwordContainer2').innerHTML = ""
                inputPass2.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 5
                })
                break;
        }
    })
    
    terminos.addEventListener('click', (e) => {
        let error = {
        id: 6,
        elemento:"checkbox",
        mensaje: "Debe aceptar los terminos y condiciones"
            }   
        let variable = true
        if (terminos.checked) {
            inputPass2.style.border = "1px solid black"
                errores = errores.filter(error => {
                    return error.id !== 6
                })
        }else{
        $('#terminosContainer').innerHTML = "<small>Debe aceptar los terminos y condiciones</small>"
        errores.forEach(e => {
            if(e.id === 5 ){
                    error.mensaje = "Debe aceptar los terminos y condiciones"
                    variable = false
                }
            });
            if (variable) {
                errores.push(error)
            }
        }
        console.log(terminos.checked);
    })

    form.addEventListener('submit',(e) => {
        e.preventDefault();

        console.log(form.elements);
        if(errores.length > 0){
            form.submit()
        }
    })
})
