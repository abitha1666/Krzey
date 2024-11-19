const products = {
    oily: [
      { name: "Oil-Free Moisturizer", image: "images/oil_free_moisturizer.jpg", description: "A lightweight, non-greasy moisturizer for oily skin.", price: 1299 },
      { name: "Clay Mask", image: "images/clay_mask.jpg", description: "A detoxifying mask to remove excess oil and impurities.", price: 999 },
      { name: "Foaming Face Wash", image: "images/foaming_face_wash.jpg", description: "Gentle cleanser for deep pore cleansing.", price: 599 },
    ],
    dry: [
      { name: "Hydrating Cream", image: "images/hydrating_cream.jpg", description: "Rich cream to nourish and hydrate dry skin.", price: 1499 },
      { name: "Gentle Cleanser", image: "images/gentle_cleanser.jpg", description: "Soothing cleanser for sensitive, dry skin.", price: 899 },
      { name: "Face Oil", image: "images/face_oil.jpg", description: "Lightweight oil to lock in moisture and improve texture.", price: 1299 },
    ],
    sensitive: [
      { name: "Soothing Face Cream", image: "images/soothing_face_cream.jpg", description: "Gentle cream to calm irritated skin.", price: 1599 },
      { name: "Fragrance-Free Cleanser", image: "images/fragrance_free_cleanser.jpg", description: "A mild cleanser for hypersensitive skin.", price: 1099 },
      { name: "Repair Serum", image: "images/repair_serum.jpg", description: "Rejuvenates and repairs delicate skin.", price: 2499 },
    ],
    combination: [
      { name: "Balancing Toner", image: "images/balancing_toner.jpg", description: "Balances oil production and hydration levels.", price: 799 },
      { name: "Dual-Action Moisturizer", image: "images/dual_action_moisturizer.jpg", description: "Moisturizes dry areas and controls oil in the T-zone.", price: 1199 },
      { name: "Pore-Minimizing Serum", image: "images/pore_minimizing_serum.jpg", description: "Reduces the appearance of pores.", price: 1899 },
    ],
    acne: [
      { name: "Acne Spot Treatment", image: "images/acne_spot_treatment.jpg", description: "Targets and clears active breakouts.", price: 699 },
      { name: "Salicylic Acid Cleanser", image: "images/salicylic_cleanser.jpg", description: "Exfoliates and clears pores.", price: 899 },
      { name: "Oil-Free Sunscreen", image: "images/oil_free_sunscreen.jpg", description: "Protects acne-prone skin from UV damage.", price: 999 },
    ],
  };
  
  let cart = []; // Holds cart items
  
  // Handle form submission
  document.getElementById('skinTypeForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const skinType = document.getElementById('skinType').value;
    const recommendationsDiv = document.getElementById('recommendations');
  
    let allProducts = [];
    if (skinType === 'show-all') {
      allProducts = Object.values(products).flat(); // Combine all products
    } else if (products[skinType]) {
      allProducts = products[skinType];
    }
  
    if (allProducts.length > 0) {
      const productList = allProducts
        .map(product => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p class="price">₹${product.price}</p>
            <div class="product-buttons">
              <button class="add-to-cart" onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
          </div>
        `)
        .join('');
      recommendationsDiv.innerHTML = `
        <h3>Recommended Products:</h3>
        <div class="product-list">${productList}</div>
      `;
    } else {
      recommendationsDiv.innerHTML = "<p>Please select a valid skin type.</p>";
    }
  });
  
  // Add product to cart
  function addToCart(productName) {
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(item => item.name === productName);
  
    if (product) {
      const existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
      } else {
        cart.push({ ...product, quantity: 1 }); // Add new product to cart
      }
      alert(`${product.name} added to cart!`);
    }
  }
  
  // Display cart contents
  function goToCart() {
    const cartDiv = document.getElementById('cart');
    const cartItems = cart
      .map(item => `
        <div class="cart-item">
          <h4>${item.name}</h4>
          <p>Price: ₹${item.price}</p>
          <div class="cart-controls">
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
          </div>
          <p>Total: ₹${item.price * item.quantity}</p>
        </div>
      `)
      .join('');
    cartDiv.innerHTML = `
      <h3>Your Cart:</h3>
      ${cartItems || '<p>Your cart is empty!</p>'}
      ${cart.length > 0 ? '<button onclick="checkout()">Checkout</button>' : ''}
    `;
  }
  
  // Update cart item quantity
  function updateQuantity(productName, change) {
    const item = cart.find(product => product.name === productName);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(product => product.name !== productName); // Remove if quantity is 0
      }
    }
    goToCart(); // Refresh cart
  }
  
  // Checkout
  function checkout() {
    alert('Thank you for your purchase!');
    cart = []; // Clear cart
    goToCart(); // Refresh cart
  }
  

  document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    // Simulate a response for simplicity
    document.getElementById('contactResponse').style.display = 'block';
    document.getElementById('contactForm').reset();
  });
  