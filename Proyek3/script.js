const products = [
  { id: 1, name: "Dinosaurus Kecil",   price: 1000000 , image: "dino1.jpeg" },
  { id: 2, name: "Dinosaurus Darat", price: 20000000, image: "dino2.jpeg" },
  { id: 3, name: "Dinosaurus Air",  price: 15000000, image: "dino3.jpeg" },
  { id: 4, name: "Dinosaurus Pintar",  price: 5000000, image: "dino4.jpeg" },
  { id: 5, name: "Dinosaurus Terbang",  price: 50000000, image: "dino5.jpg" },
  { id: 6, name: "Dinosaurus Besar",  price: 25000000, image: "dino6.jpg" },
];

// Membuat array bernama products yang memiliki struktur sama, tetapi nilai atribut berbeda


const cart = [];
let total = 0;

function displayProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <span>${product.name} - Rp.${product.price}</span>
    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">+</button>
    <button onclick="removeFromCart(${product.id}, ${product.price})">-</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

function addToCart(id, name, price) {

  const tax2= 0.11;
  const tax = price * tax2;
  
  cart.push({ id, name, price, tax });
   
  total += price + tax;




  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${products.find(product => product.id === item.id).image}" alt="${item.name}">
    <div>
      <p>${item.name}</p>
      <p>Price: Rp.${item.price.toFixed(2)}</p>
    </div>
  `;
  cartList.appendChild(li);
  });

  totalSpan.innerText = `Total: Rp.${total.toFixed(2)}`;
}

window.onload = function () {
  displayProducts();
};

function removeFromCart(id, price, tax) {
  const removedItem = cart.find(item => item.id === id);
  
  if (removedItem) {
    total -= removedItem.price + removedItem.tax;
    const index = cart.indexOf(removedItem);
    cart.splice(index, 1);
    updateCartUI();
  }
}