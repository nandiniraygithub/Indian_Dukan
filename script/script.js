document.addEventListener('DOMContentLoaded', function () {
   const shop = document.getElementById('showitems');
   const shop2 = document.getElementById('showitems2');

   // Render shop items
   function generateShop() {
      shop.innerHTML = shopItems.map((product) => {
         const { name, price, img } = product;

         return `
<div class="item">
   <img src="${img}" alt="">
   <div class="product-desc">
      <a href="#" class="title-prod">${name}</a>
      <div class="stars">
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star-half-stroke"></i>
      </div>
      <div class="price">
         <span>Rs${price}</span>
         <del>Rs5000</del>
      </div>
      <div class="icon-product">
         <a href="#" data-name="${name}" data-price="${price}" data-image="${img}" class="add-to-cart">
            <i class="fa-regular fa-heart"></i>
         </a>
         <a href="#" data-name="${name}" data-price="${price}" data-image="${img}" class="add-to-cart">
            <i class="fa-solid fa-cart-shopping"></i>
         </a>
      </div>
   </div>
</div>
`;
      }).join('');
   }

   function generateShopBottom() {
      shop2.innerHTML = shopItemsBottom.map((product) => {
         const { name, price, img } = product;

         return `
<div class="item">
   <img src="${img}" alt="">
   <div class="product-desc">
      <a href="#" class="title-prod">${name}</a>
      <div class="stars">
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star"></i>
         <i class="fa-solid fa-star-half-stroke"></i>
      </div>
      <div class="price">
         <span>Rs${price}</span>
         <del>Rs5000</del>
      </div>
      <div class="icon-product">
         <a href="#" data-name="${name}" data-price="${price}" data-image="${img}" class="add-to-cart">
            <i class="fa-regular fa-heart"></i>
         </a>
         <a href="#" data-name="${name}" data-price="${price}" data-image="${img}" class="add-to-cart">
            <i class="fa-solid fa-cart-shopping cartbutton"></i>
         </a>
      </div>
   </div>
</div>
`;
      }).join('');
   }

   // Cart Logic
   updateCart();
   document.addEventListener('click', function (event) {
      if (event.target.classList.contains('default-btn')) {
         var productContainer = event.target.closest('.item');
         if (productContainer) {
            var productName = event.target.dataset.name;
            var product = getProductByName(productName);
            if (product) {
               addToCart(productName, product.price, product.image, updateCart);
            }
         }
      } else if (event.target.classList.contains('remove-btn')) {
         var itemName = event.target.dataset.name;
         removeFromCart(itemName, updateCart);
      }
   });

   document.addEventListener('click', function (event) {
      if (event.target.classList.contains('cartbutton')) {
         var productContainer = event.target.closest('.item');
         if (productContainer) {
            var productName = event.target.dataset.name;
            var product = getProductByName(productName);
            if (product) {
               addToCart(productName, product.price, product.image, updateCart);
            }
         }
      } else if (event.target.classList.contains('remove-btn')) {
         var itemName = event.target.dataset.name;
         removeFromCart(itemName, updateCart);
      }
   });


   function getProductByName(productName) {
      return window.products.find(product => product.name === productName);
   }

   function addToCart(productName, price, imageUrl, callback) {
      var cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name: productName, price: price, image: imageUrl });
      localStorage.setItem('cart', JSON.stringify(cart));
      if (callback) {
         callback();
      }
   }

   function removeFromCart(productName, callback) {
      var cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.name !== productName);
      localStorage.setItem('cart', JSON.stringify(cart));
      if (callback) {
         callback();
      }
   }

   function updateCart() {
      var cartElement = document.getElementById('cartItems');
      var totalElement = document.getElementById('total');
      var cart = JSON.parse(localStorage.getItem('cart')) || [];
      var total = 0;

      if (!cartElement || !totalElement) {
         console.error("Cart elements not found.");
         return;
      }

      cartElement.innerHTML = '';

      cart.forEach(function (item) {
         var cartItem = document.createElement('div');
         cartItem.classList.add('cart-item');
         cartItem.innerHTML = `
      <h3> ${item.name} </h3>
      <p class="fs-4">Price: ₹ ${item.price.toFixed(2)}</p>
      <img src="${item.image}" class="rounded float-end position-relative bottom" alt="add Something to cart"
         onerror="this.style.display='none';" width="170px" height="165">
      <button class="remove-btn btn btn-danger float-right fs-4" data-name="${item.name}">Remove</button>
`;
         cartElement.appendChild(cartItem);
         total += item.price;
      });

      totalElement.textContent = total.toFixed(2);
   }

   // shop rendering
   generateShop();
   generateShopBottom();
});