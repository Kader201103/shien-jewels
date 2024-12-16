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
        let cartItems = cart.map(item => `${item.name}: $${item.price.toFixed(2)}`).join('\n');
        alert(`Your cart contains:\n${cartItems}`);
    }
}

// Example product objects (these would typically come from your database)
const products = [
    { name: "Elegant Gold Ring", price: 199.99 },
    { name: "Diamond Engagement Ring", price: 999.99 },
    { name: "Sapphire Cocktail Ring", price: 299.99 },
    { name: "Vintage Silver Ring", price: 149.99 }
];

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.product-card button:nth-child(1)').forEach((button, index) => {
    button.addEventListener('click', () => addToCart(products[index]));
});

// Event listener for the cart icon to view cart contents
document.querySelector('.cart a').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    viewCart();
});
