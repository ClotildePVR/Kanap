// Récupérer les produits depuis le local storage
let productLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.table(productLocalStorage);

// Récupérer les produit et leurs détails depuis l'API
fetch("http://localhost:3000/api/products/")    
    .then(function(res) {
        return res.json();
    })
    .then(function(product) {
        displayBasket(product);
        showTotalQuantity();
        showTotalPrice();
    })
    .catch (function(error) {
        alert(error);
        console.log("erreur");
    });

// Définir l'emplacement du panier dans la page HTML
let basketLocation = document.getElementById("cart__items");

// Afficher les produits dans le panier
function displayBasket(product) {
    
    // Si le localstorage est vide
    if (productLocalStorage === null || productLocalStorage == 0) {
        const emptyBasket = document.createElement("p");
        basketLocation.appendChild(emptyBasket);
        emptyBasket.textContent = "Votre panier est vide.";
    }
    
    // Si des produits sont présents dans le localstorage
    else {
        console.log("Il y a des produits dans le panier");

        // Boucle pour affichage des détails des produits, depuis API et depuis local storage
        for (let basket in productLocalStorage) {
            const lsProduct = productLocalStorage[basket];
            const APIProduct = product.find((product) => product._id == lsProduct.productId);

            // Article
            const productArticle = document.createElement("article");
            basketLocation.appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.dataset.id = lsProduct.productId;
            productArticle.dataset.color = lsProduct.productColor;

            // Div Image
            const ImgDiv = document.createElement("div");
            productArticle.appendChild(ImgDiv);
            ImgDiv.className = "cart__item__img";

            // Image
            const productImg = document.createElement("img");
            ImgDiv.appendChild(productImg);
            productImg.setAttribute("src", APIProduct.imageUrl);
            productImg.setAttribute("alt", APIProduct.altTxt);

            // Div contenu
            const contentDiv = document.createElement("div");
            productArticle.appendChild(contentDiv);
            contentDiv.className = "cart__item__content";

            // Div description
            const descriptionDiv = document.createElement("div");
            contentDiv.appendChild(descriptionDiv);
            descriptionDiv.className = "cart__item__content__description";
        
            // Titre
            const productName = document.createElement("h2");
            descriptionDiv.appendChild(productName);
            productName.innerHTML = APIProduct.name;

            // Couleur
            const productColor = document.createElement("p");
            descriptionDiv.appendChild(productColor);
            productColor.innerHTML = lsProduct.productColor;

            // Prix
            const productPrice = document.createElement("p");
            descriptionDiv.appendChild(productPrice);
            productPrice.innerHTML = `${APIProduct.price} €`;

            // Div réglages
            const settingsDiv = document.createElement("div");
            contentDiv.appendChild(settingsDiv);
            settingsDiv.className = "cart__item__content__settings";

            // Div choix quantité
            const quantityDiv = document.createElement("div");
            settingsDiv.appendChild(quantityDiv);
            quantityDiv.className = "cart__item__content__settings__quantity";

            // Texte quantité
            const quantityTxt = document.createElement("p");
            quantityDiv.appendChild(quantityTxt);
            quantityTxt.textContent = "Qté :";

            // Champs de saisie quantité
            const quantityInput = document.createElement("input");
            quantityDiv.appendChild(quantityInput);
            quantityInput.setAttribute("type", "number");
            quantityInput.className = "itemQuantity";
            quantityInput.setAttribute("name", "itemQuantity");
            quantityInput.setAttribute("min", "1");
            quantityInput.setAttribute("max", "100");
            quantityInput.setAttribute("value", lsProduct.productQuantity);

            // Fonction de changement de la quantité d'un produit
            quantityInput.addEventListener("change", (event) => {
                let selectedQuantity = lsProduct.productQuantity;
                let modifiedQuantity = quantityInput.valueAsNumber;
                const resultFound = productLocalStorage.find( el => el.modifiedQuantity !== selectedQuantity);
                resultFound.productQuantity = modifiedQuantity;
                lsProduct.productQuantity = resultFound.productQuantity;
                localStorage.setItem("basket", JSON.stringify(productLocalStorage));
                location.reload();
            })

            // Div suppression
            const deleteDiv = document.createElement("div");
            settingsDiv.appendChild(deleteDiv);
            deleteDiv.className = "cart__item__content__settings__delete";

            // Texte suppression
            const deleteProduct = document.createElement("p");
            deleteDiv.appendChild(deleteProduct);
            deleteProduct.className = "deleteItem";
            deleteProduct.textContent = "Supprimer";

            // Fonction de suppression d'un produit
            deleteProduct.addEventListener("click", (event) => {
                let idDelete = lsProduct.productId;
                let colorDelete = lsProduct.productColor;
                productLocalStorage = productLocalStorage.filter( el => el.productId !== idDelete || el.productColor !== colorDelete );
                localStorage.setItem("basket", JSON.stringify(productLocalStorage));
                alert("Ce produit a bien été supprimé du panier.");
                location.reload();
            })
        }
    }
}

// Afficher la quantité totale de produits dans le panier
function showTotalQuantity() {
    const itemsQuantity = document.getElementsByClassName("itemQuantity");
    const basketLength = itemsQuantity.length;
    totalQuantity = 0;

    for (var i = 0; i < basketLength; ++i) {
        totalQuantity += itemsQuantity[i].valueAsNumber;
    }

    let showTotalQuantity = document.getElementById("totalQuantity");
    showTotalQuantity.innerHTML = totalQuantity;    
}

// Afficher le prix total de produits dans le panier
function showTotalPrice() {
    let totalPrice = 0; 

    for (let basket in productLocalStorage) {
        const lsProduct = productLocalStorage[basket];
        let quantity = lsProduct.productQuantity;
        let price = parseInt(document.querySelector(`article[data-id="${lsProduct.productId}"][data-color="${lsProduct.productColor}"] .cart__item__content__description :nth-child(3)`).textContent);
        totalPrice += quantity * price;
    }

    let showTotalPrice = document.getElementById("totalPrice");
    showTotalPrice.innerHTML = totalPrice;    
}

// FORMULAIRE
// Récupérer les données du formulaire
let formDatas = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    address: document.getElementById("address"),
    city: document.getElementById("city"),
    email: document.getElementById("email"),
}

// Etablir les REGEX pour validation des données saisies par l'utilisateur
let charactersRegex = new RegExp("^[a-zA-Zéèà' -]+$");
let addressRegex = new RegExp("^[0-9]{1,3}[,. ]{1,2}[a-zA-Zàâäéèêëïîôöùûüç' -]+$");
let emailRegex = new RegExp("^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,3}$");

// Validation du prénom
firstName.addEventListener('change', function() {
    let firstNameError = firstName.nextElementSibling;
    if (charactersRegex.test(firstName.value)) {
        firstNameError.textContent = "";
    } else {
        firstNameError.textContent = "Veuillez renseigner ce champs (caractères autorisés : minuscules, masjuscules, é, è, à, ', -)";
    }
});

// Validation du nom
lastName.addEventListener('change', function() {
    let lastNameError = lastName.nextElementSibling;
    if (charactersRegex.test(lastName.value)) {
        lastNameError.textContent = "";
    } else {
        lastNameError.textContent = "Veuillez renseigner ce champs (caractères autorisés : minuscules, masjuscules, é, è, à, ', -)";
    }
});

// Validation de l'adresse
address.addEventListener('change', function() {
    let addressError = address.nextElementSibling;
    if (addressRegex.test(address.value)) {
        addressError.textContent = "";
    } else {
        addressError.textContent = "Veuillez renseigner ce champs (n°, rue)";
    }
});

// Validation de la ville
city.addEventListener('change', function() {
    let cityError = city.nextElementSibling;
    if (charactersRegex.test(city.value)) {
        cityError.textContent = "";
    } else {
        cityError.textContent = "Veuillez renseigner ce champs (caractères autorisés : minuscules, masjuscules, é, è, à, ', -)";
    }
});

// Validation de l'email
email.addEventListener('change', function() {
    let emailError = email.nextElementSibling;
    if (emailRegex.test(email.value)) {
        emailError.textContent = "";
    } else {
        emailError.textContent = "Veuillez renseigner votre adresse email";
    }
});

