const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload || {};

    productsList.innerText="";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Nombre: ${product.title} <br> Descripción: ${product.description} <br> Categoría: ${product.category}</li>`;
    });
};
btnRefreshProductsList.addEventListener("click", ()=>{
    loadProductsList();
    console.log("Lista recargada");
});