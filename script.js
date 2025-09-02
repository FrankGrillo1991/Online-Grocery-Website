let Items = [];
function addToCart(name, price) {
    // console.log(`addToCart called with: name=${name}, price=${price}`);
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        Items[index].quantity += 1;
    // console.log(`Increased quantity of ${name} to ${Items[index].quantity}`);
    } else {
        const item = {
            name: name,
            price: price,
            quantity: 1
        };
        Items.push(item);
    // console.log(`Added new item:`, item);
    }
    updateCartDisplay();
    // console.log('Current cart:', Items);
}

function deleteFromCart(index) {
    // console.log(`deleteFromCart called with index=${index}`);
    Items.splice(index, 1);
    updateCartDisplay();
    // console.log('Current cart:', Items);
}

function updateQuantity(index, quantity) {
    // console.log(`updateQuantity called with index=${index}, quantity=${quantity}`);
    Items[index].quantity = quantity;
    updateCartDisplay();
    // console.log('Current cart:', Items);
}

function checkout() {
    // console.log('checkout called');
    let totalPrice = 0;
    Items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    // console.log(`Total Price: $${totalPrice.toFixed(2)}`);
    alert(`Total Price: $${totalPrice.toFixed(2)}`);
}

function updateCartDisplay() {
    // console.log('updateCartDisplay called');
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';
    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x 
                <div class="quantity">
                    <button onclick="updateQuantity(${index}, Math.max(1, ${item.quantity - 1}))">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, Math.max(1, this.value))">
                    <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </span>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
        cartElement.appendChild(li);
    });
    // console.log('Cart display updated.');
}