items();

async function items() {
    const products = await getProducts()
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
        
        //Lien vers page produit
        const productLink = document.createElement("a");
        let sectionItems = document.getElementById("items")
        sectionItems.appendChild(productLink);
        productLink.href = `./product.html?id=${product._id}`;

        //Article
        const productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        //Image
        const productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = product.imageUrl;
        productImg.alt = product.altTxt;

        //Titre
        const productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = product.name;

        //Description
        const productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = product.description;
        }
    }