document.addEventListener('DOMContentLoaded', function () {
   updateCart();
   document.addEventListener('click', handleButtonClick);

   function handleButtonClick(event) {
      if (event.target.classList.contains('default-btn')) {
         var productContainer = event.target.closest('.featured-item');
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
   }

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
         <h3>${item.name}</h3>
         <p>Price: ₹ ${item.price.toFixed(2)}</p>
         <img src="${item.image}" class="rounded float-end p-3 position-relative" style="bottom: 6.6rem"
            alt="${item.name} Image" onerror="this.style.display='none';" width="170" height="165">
         <button class="remove-btn btn btn-danger" data-name="${item.name}">Remove</button>
         `;
         cartElement.appendChild(cartItem);
         total += item.price;
      });

      totalElement.textContent = total.toFixed(2);
   }
});
console.log(localStorage.getItem('cart'));
