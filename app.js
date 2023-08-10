const images = [
  {
    id: 1,
    image: "images/image-product-1.jpg",
  },
  {
    id: 2,
    image: "images/image-product-2.jpg",
  },
  {
    id: 3,
    image: "images/image-product-3.jpg",
  },
  {
    id: 4,
    image: "images/image-product-4.jpg",
  },
];
const navOpen = document.getElementById("menu");
const navClose = document.getElementById("close-btn");
const sideBar = document.querySelector(".nav-items");
const fade = document.querySelector(".fade");
const cartIcon = document.querySelector("#cart-icon");
const cartModal = document.querySelector(".cart-modal");
const productImages = document.querySelectorAll(".images");
const singleProductImage = document.querySelector(".product-images img");
console.log(productImages);
const indImg = document.querySelectorAll(".images img");
const previousImage = document.querySelectorAll("#previous");
const nextImage = document.querySelectorAll("#next");
const modal = document.querySelector(".lightbox");
const closeModal = document.querySelector(".lightbox svg");
const thumbnail = document.querySelectorAll(".thumbnail");
const quantity = document.getElementById("quantity");
const orangeBtn = document.querySelector(".orange-btn");
const cartContent = document.querySelector(".cart-content");
const message = document.querySelector(".message");
const productNumber = document.querySelector(".product-number");

navOpen.addEventListener("click", showSideBar);
navClose.addEventListener("click", hideSideBar);
cartIcon.addEventListener("click", toggleCartModal);
singleProductImage.addEventListener("click", showLightbox);
closeModal.addEventListener("click", closeLightbox);
previousImage.forEach((prevImg) => {
  prevImg.addEventListener("click", previous);
});
nextImage.forEach((nextImg) => {
  nextImg.addEventListener("click", next);
});
thumbnail.forEach((thumb) => {
  thumb.addEventListener("click", changeThumbnail);
});

function showSideBar() {
  sideBar.classList.add("active-sidebar");
  fade.classList.add("active-fade");
}

function hideSideBar() {
  sideBar.classList.remove("active-sidebar");
  fade.classList.remove("active-fade");
}

function toggleCartModal() {
  cartModal.classList.toggle("active-cart-modal");
}

let imageIndex = 1;
let currentImg = 0;

function next() {
  productImages.forEach((product) => {
    product.style.transform = `translateX(-${imageIndex}00%)`;
    imageIndex++;
    if (imageIndex > indImg.length - 1) {
      imageIndex = indImg.length - 1;
      productImages[0].style.transform = `translateX(-${imageIndex}00%)`;
    }
  });

  const item = images[currentImg];
  singleProductImage.src = item.image;
  currentImg++;
  if (currentImg > images.length - 1) {
    currentImg = 0;
  }

  console.log(currentImg);

  // console.log(imageIndex);
  // console.log(productImages[0]);
}

function previous() {
  productImages.forEach((product) => {
    product.style.transform = `translateX(-${imageIndex}00%)`;
    imageIndex--;
    if (imageIndex < 1) {
      imageIndex = 0;
      productImages[0].style.transform = `translateX(-${imageIndex}00%)`;
    }
  });

  const item = images[currentImg];
  singleProductImage.src = item.image;
  if (currentImg < 1) {
    currentImg = 4;
  }
  currentImg--;
  // console.log(imageIndex);
  // console.log(productImages[0]);
}

function showLightbox() {
  modal.classList.add("show");
  fade.classList.add("show");
}

function closeLightbox() {
  modal.classList.remove("show");
  fade.classList.remove("show");
}

function changeThumbnail(e) {
  let saveThumbnail = e.target.id[0];
  const item = images[saveThumbnail];
  singleProductImage.src = item.image;
}

let editQuantity = parseInt(quantity.textContent);

document
  .querySelector(".quantity-container")
  .addEventListener("click", function (e) {
    // console.log(e.target.id);
    if (
      e.target.id === "reduce-quantity" &&
      e.target.nextElementSibling.textContent > 0
    ) {
      editQuantity--;
      quantity.textContent = editQuantity;
    } else if (e.target.id === "increase-quantity") {
      editQuantity++;
      quantity.textContent = editQuantity;
    }
  });

let addToCart = document.querySelector(".add-cart");

addToCart.addEventListener("click", addTotal);
function addTotal() {
  if (quantity.textContent == 0)
    return messageImp(message, "Add a product to cart", "#E3691A");
  let addQuantity = (quantities) => {
    productNumber.innerHTML = "1";
    quantity.textContent = 0;
    editQuantity = 0;
    if (cartContent.classList.contains("no-product")) {
      cartContent.classList.remove("no-product");
      cartContent.innerHTML = `<img src="images/image-product-1-thumbnail.jpg" alt="product-thumbnail" id="product-thumbnail"><div class="product-details"><p>Fall Limited Edition Sneakers</p><p>$125.00 x <span>3 </span> $<strong>375.00</strong></p></div><img src="images/icon-delete.svg" alt="delete-product" id="delete-product">`;
    }
    document.querySelector(".product-details span").innerText = quantities;
    let sum = +quantities * 125;
    document.querySelector(".product-details strong").innerText = sum;
    messageImp(message, "product added successfully", "#0bb90b");
  };
  addQuantity(quantity.textContent);
}

function deleteProd() {
  cartModal.addEventListener("click", (e) => {
    if (
      e.target.closest("#delete-product") ||
      orangeBtn.classList.contains("delete-product")
    ) {
      productNumber.innerHTML = "0";
      cartContent.textContent = "No product in cart";
      cartContent.classList.add("no-product");
      e.currentTarget.classList.remove("active-cart-modal");
      if (orangeBtn.classList.contains("delete-product")) {
        messageImp(message, "Your payment is successful", "#0bb90b");
        orangeBtn.classList.remove("delete-product");
      } else {
        messageImp(message, "Product removed from cart");
      }
    }
  });
}

document.body.addEventListener("click", (e) => console.log(e.target));

orangeBtn.addEventListener("click", (e) => {
  if (cartContent.classList.contains("no-product")) {
    messageImp(message, "No product in cart");
    cartModal.classList.remove("active-cart-modal");
  } else {
    orangeBtn.classList.add("delete-product");
    deleteProd();
  }
});

function messageImp(msg, data, color = "hsl(26, 100%, 55%)") {
  msg.classList.add("show");
  msg.style.backgroundColor = color;
  msg.innerHTML = data;
  setTimeout(() => {
    msg.classList.remove("show");
  }, 2000);
}
