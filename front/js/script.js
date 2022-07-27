items();

async function items() {
    const products = await getProducts()
    console.log(products)
    displayProducts(products)
}

// Récupération des produits depuis l'API
function getProducts() {
    return fetch("http://localhost:3000/api/products/")
        .then(function(res) {
            return res.json();
        })
        .then(function(products) {
            return products;
        })
        .catch (function(error) {
            alert(error)
        });
}

// Affichage des produits dans la page d'accueil
function displayProducts(products) {
    for (let product of products) {
        // TODO: retirer innerHTML
        document.getElementById("items").innerHTML += 
        `<a href="./product.html?id=${product._id}">          
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`;
        }
    }