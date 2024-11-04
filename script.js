// ฟังก์ชันเพิ่มสินค้า
function addProduct() {
    const name = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (name && quantity > 0) {
        const products = getProducts();
        const existingProduct = products.find(product => product.name === name);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            products.push({ name, quantity });
        }

        saveProducts(products);
        loadProducts();
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
    } else {
        alert('Please enter a valid product name and quantity.');
    }
}

// ฟังก์ชันโหลดสินค้า
function loadProducts() {
    const products = getProducts();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Quantity: ${product.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeProduct(product.name);

        li.appendChild(removeButton);
        productList.appendChild(li);
    });
}

// ฟังก์ชันลบสินค้า
function removeProduct(name) {
    let products = getProducts();
    products = products.filter(product => product.name !== name);
    saveProducts(products);
    loadProducts();
}

// ฟังก์ชันจัดเก็บข้อมูลสินค้าใน Local Storage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// ฟังก์ชันดึงข้อมูลสินค้าออกมาจาก Local Storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// โหลดสินค้าเมื่อเริ่มต้นหน้าเว็บ
window.onload = loadProducts;
