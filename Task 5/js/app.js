// Cart State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Utility Functions
const updateCartCount = () => {
    const counts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    counts.forEach(count => count.textContent = totalItems);
};

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Render Functions
const createProductCard = (product) => {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};

// Cart Operations
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    
    // Simple visual feedback
    alert(`${product.name} added to cart!`);
};

const updateQuantity = (productId, change) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCart();
        renderCart();
    }
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
};

// Page specific logic
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Home Page - Featured Products (first 4)
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
        const featuredProducts = products.slice(0, 4);
        featuredGrid.innerHTML = featuredProducts.map(createProductCard).join('');
    }

    // Shop Page - All Products with filters
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        let currentProducts = [...products];
        
        const renderShop = (items) => {
            if (items.length === 0) {
                productsGrid.innerHTML = '<p>No products found in this category.</p>';
                return;
            }
            productsGrid.innerHTML = items.map(createProductCard).join('');
        };
        
        renderShop(currentProducts);

        // Filter Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-filter');
                if (filter === 'all') {
                    currentProducts = [...products];
                } else {
                    currentProducts = products.filter(p => p.category === filter);
                }
                
                // Trigger sort on filtered items to maintain sort order
                document.getElementById('sort-select').dispatchEvent(new Event('change'));
            });
        });

        // Sort Logic
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const sortValue = e.target.value;
                let sorted = [...currentProducts];
                
                if (sortValue === 'price-low') {
                    sorted.sort((a, b) => a.price - b.price);
                } else if (sortValue === 'price-high') {
                    sorted.sort((a, b) => b.price - a.price);
                } else if (sortValue === 'name-asc') {
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                }
                
                renderShop(sorted);
            });
        }
    }

    // Cart Page
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        renderCart();
    }
});

// Render Cart HTML
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-cart-msg">
                    <h2>Your cart is empty</h2>
                    <p style="margin: 1rem 0 2rem;">Looks like you haven't added anything yet.</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping</a>
                </div>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    const cartItemsHtml = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cartItemsHtml}
        </div>
        <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${formatPrice(tax)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary btn-checkout" onclick="alert('Checkout functionality coming soon!')">
                Proceed to Checkout
            </button>
        </div>
    `;
}
