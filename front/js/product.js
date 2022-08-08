// Récupérer dans l'URL, l'id du produit à afficher
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/api/products/";
const productUrl = host + id

// Récupérer le produit et ses détails depuis l'API
fetch(productUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {
        selectedProduct(product);
        registredProduct(product);
    })
    .catch (function(error) {
        alert(error)
    });


const colorSelection = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCart");

// Insérer le produit souahité et ses détails dans la page
function selectedProduct(product) {
    
    // Image
    const productImg = document.createElement("img");
    let divImg = document.getElementsByClassName("item__img")[0];
    divImg.appendChild(productImg);
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);
    
    // Titre
    const productName = document.getElementById("title");
    productName.innerHTML = product.name;

    // Prix
    const productPrice = document.getElementById("price");
    productPrice.innerHTML = product.price; 

    // Description
    const productDescription = document.getElementById("description");
    productDescription.innerHTML = product.description;
    
    // Options de couleurs
    for (let colors of product.colors) {
        const productColor = document.createElement("option");
        colorSelection.appendChild(productColor);
        productColor.setAttribute("value", colors);
        productColor.innerHTML = colors;
    }
}

// Ajouter le produit au panier
function registredProduct (basket) {
    
    // Ecouter l'évènement au click du bouton "ajouter au panier"
    addToCartBtn.addEventListener("click", (event) => {
        event.preventDefault();

        if (colorSelection.value == false) {
            confirm("Veuillez sélectionner une couleur");
        } 
        else if (productQuantity.value == 0) {
            confirm("Veuillez sélectionner le nombre d'articles souhaité");
        } 
        else {
            alert("Votre article a bien été ajouté au panier");
        
            if (productQuantity.value >= 1 && productQuantity.value <= 100) {
            
            // Récupérer les informations du produit à ajouter au panier
            let colorChoice = colorSelection.value;
            let quantityChoice = productQuantity.value;
            let productInformations = {
                productId: id,
                productColor: colorChoice,
                productQuantity: quantityChoice,
            };
            
            // Initialiser le local storage
            let productLocalStorage = JSON.parse(localStorage.getItem("basket"));

            // Envoyer les informations du produit dans le local storage
            if (productLocalStorage) {
                
            // Si le panier contient déjà un produit
            const resultFound = productLocalStorage.find(
                (element) => element.productId === id && element.productColor === colorChoice);
            
                // Si le produit dans le panier est le même que celui à ajouter : MAJ de la quantité
                if (resultFound) {
                let newQuantity =
                parseInt(productInformations.productQuantity) + parseInt(resultFound.productQuantity);
                resultFound.productQuantity = newQuantity;
                localStorage.setItem("basket", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                }
            
                // Si le produit dans le panier est une autre référence : ajout du produit demandé au panier
                else {
                productLocalStorage.push(productInformations);
                localStorage.setItem("basket", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                }
            }

            // Si le panier est vide : initier le panier
            else {
                productLocalStorage = [];
                productLocalStorage.push(productInformations);
                localStorage.setItem("basket", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
            }
            }
        }
    });
}

