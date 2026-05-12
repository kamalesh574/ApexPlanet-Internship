// Product Data
const products = [
    {
        id: 1,
        name: "Aura One Wireless",
        category: "Headphones",
        price: 8999,
        rating: 4.8,
        reviews: 124,
        image: "images/over_ear_headphones_1778601413382.png",
        dateAdded: "2023-10-01",
        description: "Minimalist premium wireless over-ear headphones with matte black finish and studio-quality sound.",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Echo Buds Pro",
        category: "Headphones",
        price: 4999,
        rating: 4.6,
        reviews: 89,
        image: "images/wireless_earbuds_1778601435110.png",
        dateAdded: "2023-11-15",
        description: "Premium true wireless earbuds with high-end noise cancellation and exceptional battery life.",
        badge: "New"
    },
    {
        id: 3,
        name: "Nova Chrono Luxe",
        category: "Watches",
        price: 9999,
        rating: 4.9,
        reviews: 42,
        image: "images/luxury_smartwatch_1778601449962.png",
        dateAdded: "2023-09-20",
        description: "Luxury modern smartwatch with a premium leather band, glowing OLED face, and health tracking.",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Aero Charge Pad",
        category: "Accessories",
        price: 1499,
        rating: 4.3,
        reviews: 215,
        image: "images/wireless_charger_1778601472211.png",
        dateAdded: "2024-01-10",
        description: "Sleek wireless charging pad with cyberpunk aesthetic, supporting dual-device fast charging.",
        badge: ""
    },
    {
        id: 5,
        name: "Titan X Gaming",
        category: "Headphones",
        price: 6999,
        rating: 4.7,
        reviews: 156,
        image: "images/gaming_headset_1778601488553.png",
        dateAdded: "2023-08-05",
        description: "Noise-cancelling gaming headset with subtle RGB lighting and spatial audio 3D tracking.",
        badge: "Gamer's Choice"
    },
    {
        id: 6,
        name: "Vanguard Sport",
        category: "Watches",
        price: 7999,
        rating: 4.5,
        reviews: 312,
        image: "images/sport_smartwatch_1778601512125.png",
        dateAdded: "2024-02-28",
        description: "Minimalist sport smartwatch designed for peak athletic performance and extreme durability.",
        badge: "Popular"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');
const emptyState = document.getElementById('emptyState');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// State
let currentProducts = [...products];

// Initialize
function init() {
    // Find max price to set slider dynamically (optional but good practice)
    const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;

    renderProducts(currentProducts);
    attachEventListeners();
}

// Render Products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    productsToRender.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        
        const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        
        productCard.innerHTML = `
            ${badgeHtml}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <div class="product-rating">
                        <i class="ph-fill ph-star"></i>
                        ${product.rating} <span>(${product.reviews})</span>
                    </div>
                </div>
                <button class="add-to-cart">
                    <i class="ph ph-shopping-cart-simple"></i>
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter and Sort Logic
function applyFiltersAndSort() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const maxPrice = parseFloat(priceRange.value);
    const sortValue = sortSelect.value;

    // Filter
    currentProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                              product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    switch (sortValue) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            currentProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'rating':
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            // Assuming default ID order is 'featured'
            currentProducts.sort((a, b) => a.id - b.id);
            break;
    }

    renderProducts(currentProducts);
}

// Event Listeners
function attachEventListeners() {
    searchInput.addEventListener('input', applyFiltersAndSort);
    
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', applyFiltersAndSort);
    });

    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `₹${Number(e.target.value).toLocaleString('en-IN')}`;
        applyFiltersAndSort();
    });

    sortSelect.addEventListener('change', applyFiltersAndSort);

    resetFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        document.querySelector('input[name="category"][value="All"]').checked = true;
        
        const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
        priceRange.value = maxPrice;
        priceValue.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;
        
        sortSelect.value = 'featured';
        
        applyFiltersAndSort();
    });
}

// Run init on load
document.addEventListener('DOMContentLoaded', init);
