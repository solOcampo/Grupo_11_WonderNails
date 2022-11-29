window.addEventListener('load', () => {
    let $ = (elemento) => document.querySelector(elemento)
    console.log("Login vinculado");

    const regExLetter = /^[A-Z]+$/;
    const regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/
    const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  
    let form = $('#FormLogin')
    let email = $('#emailLogin')
    let password = $('#password')
    let recordarme = $('#recordarme')


    let errores = [{
        id: 1,
        elemento: "email",
        mensaje: "Este campo es obligatorio"
    },{
        id: 2,
        elemento: "password",
        mensaje: "Este campo es obligatorio"
    },{
        id: 3,
        elemento:"checkbox",
        mensaje: "Debe aceptar los terminos y condiciones"
    }]
    let eye = $('#eye-pass')
    eye.addEventListener('click', (e) => {
        password.type === 'password' ? password.type = 'text' : password.type = 'password'
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        } else {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }
    })


    email.addEventListener('blur', () => {
        let error = {
            id: 1,
            elemento: "email",
            mensaje: "Este campo es obligatorio"
        }
        let variable = true
        switch (true) {
            case email.value:
                $('#emailContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                email.style.border = "1px solid red"
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
                case !regExEmail.test(email.value):
                    $('#emailContainer').innerHTML = "<small>El email no coincide con un email valido</small>"
                    email.style.border = "1px solid red"
                    errores.forEach(e => {
                        if(e.id === 1 ){
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
                        return error.id !== 1
                    })
                    break;
            }
            console.log(errores);
        })
        password.addEventListener('blur',() => {
            let error = {
                id: 2,
                elemento:"password",
                mensaje: "Este campo es obligatorio"
            }
            let variable = true
            switch (true) {
                case !password.value:
                    $('#passwordContainer').innerHTML = "<small>Este campo es obligatorio</small>"
                    password.style.border = "1px solid red"
                    errores.forEach(e => {
                        if(e.id === 2 ){
                            e.mensaje = "Este campo es obligatorio"
                            variable = false
                        }
                    });
                    if (variable) {
                        errores.push(error)
                    }
                    break;
                case !regExPass.test(password.value):
                    $('#passwordContainer').innerHTML = "<small>La contraseña debe tener entre 8 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero</small>"
                    password.style.border = "1px solid red"
                    errores.forEach(e => {
                        if(e.id === 2 ){
                            e.mensaje = "La contraseña debe tener entre 8 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero"
                            variable = false
                        }
                    });
                    if (variable) {
                        errores.push(error)
                    }
                    break;
                default:
                    $('#passwordContainer').innerHTML = ""
                    password.style.border = "1px solid black"
                    errores = errores.filter(error => {
                        return error.id !== 2
                    })
                    break;
            }
        })
        recordarme.addEventListener('click', (e) => {
            let error = {
            id: 3,
            elemento:"checkbox",
            mensaje: "Debe aceptar los terminos y condiciones"
                }   
            let variable = true
            if (recordarme.checked) {
                password.style.border = "1px solid black"
                    errores = errores.filter(error => {
                        return error.id !== 6
                    })
            }else{
            $('#recordarme').innerHTML = "<small>Debe aceptar los terminos y condiciones</small>"
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
            console.log(recordarme.checked);
        })
    
        form.addEventListener('submit',(e) => {
            e.preventDefault();
    
            console.log(form.elements);
            if(errores.length > 0){
                form.submit()
            }
        })
    })


