// Redirect to login page when Sign In is clicked
function openAuthModal() {
  window.location.href = 'login.html';
}

// Replace Sign In button with user dropdown after login
function updateSignInButton(initial) {
  const oldBtn = document.querySelector('a[onclick="openAuthModal()"]');
  if (!oldBtn) return;

  const parent = oldBtn.parentElement;
  oldBtn.remove();

  const dropdownHTML = `
    <div id="user-dropdown" class="relative inline-block">
      <div id="user-avatar" class="bg-rose-600 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer select-none">
        ${initial}
      </div>
      <div id="user-menu" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 text-sm text-gray-800">
        <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">Account</button>
        <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
        <button onclick="logout()" class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
      </div>
    </div>
  `;
  parent.insertAdjacentHTML('beforeend', dropdownHTML);

  const avatar = document.getElementById('user-avatar');
  const menu = document.getElementById('user-menu');

  avatar.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  menu.addEventListener('click', e => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    menu.classList.add('hidden');
  });
}

// Log out user, remove dropdown and restore Sign In button
function logout() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    const parent = dropdown.parentElement;
    dropdown.remove();
    localStorage.removeItem('userInitial');

    const newBtn = document.createElement('a');
    newBtn.setAttribute('href', '#');
    newBtn.setAttribute('onclick', 'openAuthModal()');
    newBtn.className = 'border-2 bg-primary text-black px-6 py-1 rounded-full hover:bg-amber-700 hover:text-white';
    newBtn.textContent = 'Sign In';
    parent.appendChild(newBtn);
  }
}

// On page load, check localStorage and update button if logged in
document.addEventListener('DOMContentLoaded', () => {
  const userInitial = localStorage.getItem('userInitial');
  if (userInitial) {
    updateSignInButton(userInitial);
  }
});




/////////////////////////


// Function to change the main product image and highlight the selected thumbnail
function changeImage(thumbnail) {
  const mainImage = document.getElementById('main-img');
  const smallImages = document.querySelectorAll('.small-img');

  // Update main image source to thumbnail source
  mainImage.src = thumbnail.src;

  // Remove active class from all thumbnails
  smallImages.forEach(img => img.classList.remove('active'));

  // Add active class to the clicked thumbnail
  thumbnail.classList.add('active');
}

// Function to add the selected product to the cart
function addToCart() {
  const productName = document.getElementById('product-name').textContent;
  const productPrice = document.getElementById('product-price').textContent.replace('Rs ', '');
  const productSize = document.getElementById('size').value;
  const productQuantity = parseInt(document.getElementById('quantity').value, 10);
  const cartMessage = document.getElementById('cart-message');

  // Validate the selected size
  if (productSize === "Select size") {
      cartMessage.textContent = "Please select a size.";
      cartMessage.style.color = "red";
      return;
  }

  // Create a product object
  const product = {
      name: productName,
      price: parseFloat(productPrice),
      size: productSize,
      quantity: productQuantity,
      image: document.getElementById('main-img').src
  };

  // Retrieve existing cart from local storage or initialize an empty array
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  existingCart.push(product); // Add the new product to the cart
  localStorage.setItem('cart', JSON.stringify(existingCart)); // Save updated cart

  cartMessage.textContent = "Product added to cart!";
  cartMessage.style.color = "green";
}
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const img = urlParams.get('img'); // Get the image path from the URL

  console.log("Image source:", img); // Log the image source for debugging

  // Set product details
  if (img) {
      document.getElementById('main-img').src = img; // Set the main image source
  } else {
      console.error("Image source not found!"); // Log an error if no image is found
      document.getElementById('main-img').src = 'img/default-image.webp'; // Replace with your default image path
  }
  
  // Set other product details as necessary
  const name = urlParams.get('name');
  const price = urlParams.get('price');

  if (name) {
      document.getElementById('product-name').innerText = name; // Set the product name
  }

  if (price) {
      document.getElementById('product-price').innerText = `Rs ${price}`; // Set the product price
  }
};





window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const img = urlParams.get('img'); // Get the image path from the URL

  console.log("Image source:", img); // Log the image source for debugging

  // Check if img parameter exists and if the image file exists
  if (img) {
    const imgElement = document.getElementById('main-img');
    imgElement.src = img; // Set the main image source

    // Check if the image is available
    imgElement.onload = function() {
      console.log("Image loaded successfully!");
    }

    imgElement.onerror = function() {
      console.error("Failed to load image, setting default image.");
      imgElement.src = 'img/default-image.webp'; // Use fallback image
    };
  } else {
    console.error("Image source not found!");
    document.getElementById('main-img').src = 'img/default-image.webp'; // Fallback to default image
  }

  // Set other product details
  const name = urlParams.get('name');
  const price = urlParams.get('price');

  if (name) {
    document.getElementById('product-name').innerText = name; // Set the product name
  }

  if (price) {
    document.getElementById('product-price').innerText = `Rs ${price}`; // Set the product price
  }
};



        function addToCart() {
            const size = document.getElementById('size').value;
            if (!size) {
                document.getElementById('cart-message').textContent = "Please select a size before adding to the cart.";
                return;
            }

            const product = {
                name: document.getElementById('product-name').textContent,
                price: document.getElementById('product-price').textContent,
                quantity: document.getElementById('quantity').value,
                size: size,
                image: document.getElementById('main-img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const idx = cart.findIndex(item => item.name === product.name && item.size === product.size);

            if (idx > -1) {
                cart[idx].quantity = parseInt(cart[idx].quantity, 10) + parseInt(product.quantity, 10);
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('cart-message').textContent = "Added to cart successfully!";
        }



        // Change main image when small image clicked
function changeImage(imgElement) {
  const mainImg = document.getElementById("main-img");
  mainImg.src = imgElement.src;
}

// Add to cart with validation
function addToCart() {
  const productName = document.getElementById("product-name").innerText;
  const productPrice = document.getElementById("product-price").innerText;
  const productSize = document.getElementById("size").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const productImage = document.getElementById("main-img").src;

  const cartMessage = document.getElementById("cart-message");

  // Validation
  if (productSize === "Select size") {
      cartMessage.innerHTML = "<p class='text-red-600 font-semibold'>Please select a size.</p>";
      return;
  }

  if (isNaN(quantity) || quantity < 1) {
      cartMessage.innerHTML = "<p class='text-red-600 font-semibold'>Please enter a valid quantity (1 or more).</p>";
      return;
  }

  const item = {
      name: productName,
      price: productPrice,
      size: productSize,
      quantity: quantity,
      image: productImage
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));

  cartMessage.innerHTML = "<p class='text-green-600 font-semibold'>Added to cart successfully!</p>";
}











// Function to change the main product image and highlight the selected thumbnail
function changeImage(thumbnail) {
  const mainImage = document.getElementById('main-img');
  const smallImages = document.querySelectorAll('.small-img');

  // Update main image source to thumbnail source
  mainImage.src = thumbnail.src;

  // Remove active class from all thumbnails
  smallImages.forEach(img => img.classList.remove('active'));

  // Add active class to the clicked thumbnail
  thumbnail.classList.add('active');
}

// Function to add the selected product to the cart
function addToCart() {
  const productName = document.getElementById('product-name').textContent;
  const productPrice = document.getElementById('product-price').textContent.replace('Rs ', '');
  const productSize = document.getElementById('size').value;
  const productQuantity = parseInt(document.getElementById('quantity').value, 10);
  const cartMessage = document.getElementById('cart-message');

  // Validate the selected size
  if (productSize === "Select size") {
      cartMessage.textContent = "Please select a size.";
      cartMessage.style.color = "red";
      return;
  }

  // Create a product object
  const product = {
      name: productName,
      price: parseFloat(productPrice),
      size: productSize,
      quantity: productQuantity,
      image: document.getElementById('main-img').src
  };

  // Retrieve existing cart from local storage or initialize an empty array
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  existingCart.push(product); // Add the new product to the cart
  localStorage.setItem('cart', JSON.stringify(existingCart)); // Save updated cart

  cartMessage.textContent = "Product added to cart!";
  cartMessage.style.color = "green";
}
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const img = urlParams.get('img'); // Get the image path from the URL

  console.log("Image source:", img); // Log the image source for debugging

  // Set product details
  if (img) {
      document.getElementById('main-img').src = img; // Set the main image source
  } else {
      console.error("Image source not found!"); // Log an error if no image is found
      document.getElementById('main-img').src = 'img/default-image.webp'; // Replace with your default image path
  }
  
  // Set other product details as necessary
  const name = urlParams.get('name');
  const price = urlParams.get('price');

  if (name) {
      document.getElementById('product-name').innerText = name; // Set the product name
  }

  if (price) {
      document.getElementById('product-price').innerText = `Rs ${price}`; // Set the product price
  }
};





window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const img = urlParams.get('img'); // Get the image path from the URL

  console.log("Image source:", img); // Log the image source for debugging

  // Check if img parameter exists and if the image file exists
  if (img) {
    const imgElement = document.getElementById('main-img');
    imgElement.src = img; // Set the main image source

    // Check if the image is available
    imgElement.onload = function() {
      console.log("Image loaded successfully!");
    }

    imgElement.onerror = function() {
      console.error("Failed to load image, setting default image.");
      imgElement.src = 'img/default-image.webp'; // Use fallback image
    };
  } else {
    console.error("Image source not found!");
    document.getElementById('main-img').src = 'img/default-image.webp'; // Fallback to default image
  }

  // Set other product details
  const name = urlParams.get('name');
  const price = urlParams.get('price');

  if (name) {
    document.getElementById('product-name').innerText = name; // Set the product name
  }

  if (price) {
    document.getElementById('product-price').innerText = `Rs ${price}`; // Set the product price
  }
};



        function addToCart() {
            const size = document.getElementById('size').value;
            if (!size) {
                document.getElementById('cart-message').textContent = "Please select a size before adding to the cart.";
                return;
            }

            const product = {
                name: document.getElementById('product-name').textContent,
                price: document.getElementById('product-price').textContent,
                quantity: document.getElementById('quantity').value,
                size: size,
                image: document.getElementById('main-img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const idx = cart.findIndex(item => item.name === product.name && item.size === product.size);

            if (idx > -1) {
                cart[idx].quantity = parseInt(cart[idx].quantity, 10) + parseInt(product.quantity, 10);
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('cart-message').textContent = "Added to cart successfully!";
        }



        // Change main image when small image clicked
function changeImage(imgElement) {
  const mainImg = document.getElementById("main-img");
  mainImg.src = imgElement.src;
}

// Add to cart with validation
function addToCart() {
  const productName = document.getElementById("product-name").innerText;
  const productPrice = document.getElementById("product-price").innerText;
  const productSize = document.getElementById("size").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const productImage = document.getElementById("main-img").src;

  const cartMessage = document.getElementById("cart-message");

  // Validation
  if (productSize === "Select size") {
      cartMessage.innerHTML = "<p class='text-red-600 font-semibold'>Please select a size.</p>";
      return;
  }

  if (isNaN(quantity) || quantity < 1) {
      cartMessage.innerHTML = "<p class='text-red-600 font-semibold'>Please enter a valid quantity (1 or more).</p>";
      return;
  }

  const item = {
      name: productName,
      price: productPrice,
      size: productSize,
      quantity: quantity,
      image: productImage
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));

  cartMessage.innerHTML = "<p class='text-green-600 font-semibold'>Added to cart successfully!</p>";
}




