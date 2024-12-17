// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
}

// Function to view the contents of the cart
function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        const cartItems = cart.map(item => `${item.name}: $${item.price}`).join('\n');
        alert(`Your cart contains:\n${cartItems}`);
    }
}

// Event listener for the cart icon to view cart contents
document.querySelector('.cart a').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    viewCart();
});

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const productName = document.getElementById('product-name').value;
    const productType = document.getElementById('product-type').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productImage = document.getElementById('product-image').files[0];

    // Create a new product object
    const product = {
        name: productName,
        type: productType,
        description: productDescription,
        price: productPrice,
        image: URL.createObjectURL(productImage) // Create a URL for the uploaded image
    };

    // Store the product in local storage
    const productPage = `${productType}s.html`; // e.g., rings.html, necklaces.html
    let products = JSON.parse(localStorage.getItem(productPage)) || [];
    products.push(product);
    localStorage.setItem(productPage, JSON.stringify(products));

    alert(`${productName} has been added successfully!`);

    // Redirect to the product page
    window.location.href = `${productPage}?name=${encodeURIComponent(productName)}`;
}

// Function to load product details based on the query parameter
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');

    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.name === productName);

    if (product) {
        // Set product details in the HTML
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-description').innerText = product.description;
        document.getElementById('product-price').innerText = `$${product.price.toFixed(2)}`;
        document.getElementById('product-img').src = product.image; // Assuming image is stored as a URL
    } else {
        console.log('Product not found.');
    }
}

// Function to dynamically create the product form
function createProductForm() {
    const formContainer = document.getElementById('form-container');

    // Create form element
    const form = document.createElement('form');
    form.id = 'add-product-form';

    const fields = [
        { label: 'Product Name', type: 'text', id: 'product-name', required: true },
        { label: 'Product Type', type: 'select', id: 'product-type', options: ['ring', 'necklace', 'bracelet', 'earring'], required: true },
        { label: 'Product Description', type: 'textarea', id: 'product-description', required: true },
        { label: 'Product Price', type: 'number', id: 'product-price', required: true },
        { label: 'Product Image', type: 'file', id: 'product-image', required: true }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.innerText = field.label;

        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.id = field.id;
            input.required = field.required;
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.innerText = option.charAt(0).toUpperCase() + option.slice(1);
                input.appendChild(opt);
            });
        } else if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.id = field.id;
            input.required = field.required;
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.required = field.required;
        }

        form.appendChild(label);
        form.appendChild(input);
    });

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Add Product';
    form.appendChild(submitButton);

    // Append form to the container
    formContainer.appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', handleSubmit);
}

// Call the necessary functions when the page loads
window.onload = () => {
    createProductForm();
    loadProductDetails();
};
document.addEventListener('DOMContentLoaded', () => {
    loadLatestProducts();
});

function loadLatestProducts() {
    const showcaseContainer = document.getElementById('product-showcase-container');

    // Define product categories
    const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];

    categories.forEach(category => {
        const products = JSON.parse(localStorage.getItem(category)) || [];
        
        // Display the last 2 products from each category
        const latestProducts = products.slice(-2).reverse(); // Get the last 2 added products

        latestProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <a href="${category}s.html" class="view-more">View More</a>
            `;
            showcaseContainer.appendChild(productCard);
        });
    });

    if (!showcaseContainer.innerHTML.trim()) {
        showcaseContainer.innerHTML = '<p>No products available yet. Check back soon!</p>';
    }
}



