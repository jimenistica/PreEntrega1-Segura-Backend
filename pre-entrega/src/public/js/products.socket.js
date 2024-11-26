// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const errorMessage = document.getElementById("error-message");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");

socket.on("products-list", (data)=>{
    const products = data.products || {};

    productsList.innerText="";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Nombre: ${product.title} -- Código: ${product.code}<br>
        Descripción: ${product.description} <br>
        Categoría: ${product.category} -- Stock: ${product.stock} -- Estado: ${product.status} <br>
        Imagen: <img src="/api/public/images/${product.thumbnail}" alt="image-${product.title}" width="100"></li>`;
    });

});

productsForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    errorMessage.innerText="";
    form.reset();

    socket.emit("insert-product", {
        title: formdata.get("title"),
        category: formdata.get("category"),
        description: formdata.get("description"),
        status: formdata.get("status") || "of",
        code: formdata.get("code"),
        price: formdata.get("price"),
        stock: formdata.get("stock"),
        thumbnail: formdata.get("thumbnail"),
    });
});

btnDeleteProduct.addEventListener("click", ()=>{
    const id = inputProductId.value;
    inputProductId.innerText="";
    errorMessage.innerText="";

    if (id>0) {
        socket.emit("delete-product", { id });
    }

});

socket.on("error-message", (data)=>{
    errorMessage.innerHTML= data.message;
});