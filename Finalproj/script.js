const products = [
    {id: 1, name: '🏍️ Yamaha R1', price: 850000},
    {id: 2, name: '🏍️ Honda CBR600RR', price: 720000},
    {id: 3, name: '🏍️ Kawasaki Ninja ZX-10R', price: 950000},
    {id: 4, name: '🏍️ Suzuki GSX-R1000', price: 680000},
    {id: 5, name: '🏍️ BMW S1000RR', price: 1200000},
    {id: 6, name: '🏍️ Ducati Panigale V4', price: 1400000},
    {id: 7, name: '🏍️ Aprilia RSV4', price: 1100000}
];

let cart = [];

function displayProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        const found = cart.find(item => item.id === p.id);

        list.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₱${p.price.toLocaleString()}</p>
            <button onclick="addToCart(${p.id})" ${found ? "disabled" : ""}>
                ${found ? "Already in Cart" : "Add to Cart"}
            </button>
        </div>`;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push({...product, qty: 1});
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p style='text-align: center; color: #ccc;'>Cart is empty</p>";
    } else {
        cartDiv.innerHTML = "";

        cart.forEach(item => {
            cartDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong></p>
                    <p>₱${item.price.toLocaleString()} x ${item.qty} = ₱${(item.price * item.qty).toLocaleString()}</p>
                </div>
                <div class="qty-controls">
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>`;
        });
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById("total").innerText = "Total: ₱" + total.toLocaleString();
    document.getElementById("count").innerText = cart.length;
    document.getElementById("clearCartBtn").style.display = cart.length > 0 ? "block" : "none";

    displayProducts();
}

function changeQty(id, val) {
    let item = cart.find(i => i.id === id);
    if (!item) return;
    
    item.qty += val;

    if (item.qty <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

// Initialize
displayProducts();