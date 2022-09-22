const $ = id => document.getElementById(id)

/* imagen previa del producto */

$("product-img").addEventListener('change', (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => $("img-preview").src = reader.result
    changeImage(e.target.name,e.target.files)

})