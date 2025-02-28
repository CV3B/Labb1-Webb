const products = [
  { 
    brand: "Ferrari", 
    model: "SF-24", 
    price: 1000000000, 
    img: "../img/ferrari2024.webp" },
  {
    brand: "Ferrai",
    model: "F2004",
    price: 20000000,
    img: "../img/ferrari2004.webp",
  },
  { 
    brand: "Red Bull", 
    model: "RB16", 
    price: 400000,
    img: "../img/redbull2020.webp" },
  {
    brand: "Mclaren",
    model: "MCL60",
    price: 20000,
    img: "../img/mclaren2023.webp",
  },
];

let cart = [];

let selectedProduct;

document.addEventListener("DOMContentLoaded", (e) => {
  let productList = document.getElementById("productList");
  let addToCartBtn = document.getElementById("addToCartBtn");
  let shoppingCart = document.getElementById("shoppingCart");

  for (const product of products) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "col";

    const card = document.createElement("div");

    card.className = "card m-4 p-0 cardShadow";
    card.style = "width: 18rem; height: 300px; cursor: pointer;";

    card.setAttribute("data-bs-toggle", "modal");
    card.setAttribute("data-bs-target", "#productModal");

    card.innerHTML = `
            <img src="${
              product.img
            }" class="card-img-top productImgFit " alt="${product.model}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.brand} ${product.model}</h5>
                <p class="card-text mt-auto">$${product.price.toLocaleString()}</p>
            </div>`;

    cardContainer.appendChild(card);
    productList.appendChild(cardContainer);

    card.addEventListener("click", () => {
      selectedProduct = product;

      let modalTitle = document.getElementById("modalTitle");
      let productImg = document.getElementById("productImg");
      let productInfo = document.getElementById("productInfo");

      modalTitle.textContent = `${product.brand} ${product.model}`;
      productImg.innerHTML = `<img src="${product.img}" class="img-fluid rounded m-auto d-block" width="200" height="200" alt="${product.brand} ${product.model}"/>`;
      productInfo.innerHTML = `
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Model:</strong> ${product.model}</p>
                <p><strong>Price:</strong> $${product.price.toLocaleString()}</p>`;
    });
  }

  addToCartBtn.addEventListener("click", () => {
    let isProductInCart = cart.find((p) => p.model == selectedProduct.model);

    if (isProductInCart) {
      selectedProduct.quantity += 1;
    } else {
      cart.push(selectedProduct);
      selectedProduct.quantity = 1;
    }
  });

  shoppingCart.addEventListener("click", () => {
    let cartInfo = document.getElementById("cartInfo");
    let cartList = document.createElement("ul");
    console.log(cart);

    cartInfo.innerHTML = "";

    if (cart.length == 0) {
      cartInfo.textContent = "Cart is empty!";
      return;
    }

    for (const item of cart) {
      let cartItem = document.createElement("li");
      cartItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      cartItem.textContent = `${item.brand} ${
        item.model
      } - $${item.price.toLocaleString()}`;

      let quantityContainer = document.createElement("div");
      quantityContainer.className = "d-flex align-items-center";

      let cartQuantity = document.createElement("p");
      cartQuantity.className = "m-0";
      cartQuantity.textContent = item.quantity;

      let cartQuantityAdd = document.createElement("button");
      cartQuantityAdd.className = "btn ";
      cartQuantityAdd.innerHTML = `<i class="fa-solid fa-plus"></i>`;
      cartQuantityAdd.addEventListener("click", () => {
        item.quantity += 1;
        cartQuantity.textContent = item.quantity;
      });

      let cartQuantityRemove = document.createElement("button");
      cartQuantityRemove.className = "btn ";
      cartQuantityRemove.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      cartQuantityRemove.addEventListener("click", () => {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          console.log(cart.filter((i) => i.model !== item.model));
          cart = cart.filter((i) => i.model !== item.model);
          cartItem.innerHTML = "";
        }

        cartQuantity.textContent = item.quantity;
      });

      quantityContainer.appendChild(cartQuantityRemove);
      quantityContainer.appendChild(cartQuantity);
      quantityContainer.appendChild(cartQuantityAdd);

      cartItem.appendChild(quantityContainer);

      cartList.appendChild(cartItem);
    }

    cartInfo.appendChild(cartList);
  });
});
