window.addEventListener('load', () => {
    
    let forms = document.querySelectorAll('form')

    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', event => {
            event.preventDefault();
            Swal.fire({
            customClass: {
                confirmButton: 'swalBtnColor',
                cancelButton: 'swalBtnColor'
            },

            title: '¿Estás seguro que querés eliminar el producto?',
            text: "Al eliminarlo, no podrás recuperarlo.",
            icon: 'warning',
            background: "#ffefef",
            showCancelButton: true,
            confirmButtonColor: '#f79090',
            cancelButtonColor: '#323232',
            cancelButtonText: 'No estoy seguro',
            confirmButtonText: 'Eliminar',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },

            }).then((result) => {

                if (result.isConfirmed) {
                    forms[i].submit();
                }

            })
    })
    }
})