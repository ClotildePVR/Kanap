// Récupérer dans l'URL, l'id du produit à afficher
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/api/products/";
const productUrl = host + id

// Récupérer le produit et ses détails depuis l'API
showDetails()

async function showDetails() {
    const product = await getProducts()
    displayProduct(product)
}

function getProducts() {
    return fetch(productUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(product) {
            return product;
        })
        .catch (function(error) {
            alert(error)
        });
}

// Insérer le produit et ses détails dans la page
function displayProduct(product) {
    
    // Image
    const productImg = document.createElement("img");
    let divImg = document.getElementsByClassName("item__img")[0];
    divImg.appendChild(productImg);
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);
    
    //Titre
    const productName = document.getElementById("title");
    productName.innerHTML = product.name;

    //Prix
    const productPrice = document.getElementById("price");
    productPrice.innerHTML = product.price;    

    //Description
    const productDescription = document.getElementById("description");
    productDescription.innerHTML = product.description;
    
    //Options de couleurs
    for (let colors of product.colors) {
        const productColor = document.createElement("option");
        let selectOption = document.getElementById("colors");
        selectOption.appendChild(productColor);
        productColor.setAttribute("value", colors);
        productColor.innerHTML = colors;
    }
}
