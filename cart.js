function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector("#cart-container");
    let subtotalContainer = document.querySelector("#subtotal");
    let totalContainerOne = document.querySelector("#total-cost");
    let totalContainerTwo = document.querySelector("#order-total");
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        subtotalContainer.innerHTML = '';
        totalContainerOne.innerHTML = '';
        totalContainerTwo.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div id="card-one" class="card" style="padding-bottom: 0.5%; padding-top: 0.5%; background-color: transparent; border-top: none; border-left: none; border-right: none; border-radius: 0; border-color: #353745;">
                        <div class="row" style="width: 100%; margin: auto;">
                            <div class="column" style="width: 25%; height: 100%;">
                                <img id="product-image" src="${item.cataloguePhoto}" alt="" style="height: 100%; width: 100%;">
                            </div>
                            <div class="column" style="padding-left: 0.5%; height: 100%; width: 35%;">
                                <h5 id="product-name">${item.productName}</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 10%;">
                                <h5 id="product-price">£${item.price}</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 2.5%;">
                                <h5 id="decrease-quantity" onclick="decreaseQuantity('${item.productName}');">-</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 5%;">
                                <h5 id="product-quantity">${item.inCart}</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 2.5%;">
                                <h5 id="increase-quantity" onclick="increaseQuantity('${item.productName}');">+</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 10%;">
                                <h5 id="total-product-cost">£${(item.inCart)*(item.price)}</h5>
                            </div>
                            <div class="column" style="text-align: center; height: 100%; width: 10%;">
                                <h5 id="remove-product" onclick="removeProduct('${item.productName}');">Remove</h5>
                            </div>
                        </div>
                    </div>
            `
        });
        subtotalContainer.innerHTML += `
        £${cartCost}
        `;
        totalContainerOne.innerHTML += `
        £${cartCost}
        `;
        totalContainerTwo.innerHTML += `
        £${cartCost}
        `;
    }
}

// let cartCost = localStorage.getItem('totalCost')
// cartCost = parseInt(cartCost);
// localStorage.setItem("totalCost", cartCost + product.price);

displayCart();

function increaseQuantity(name) {
    let cartNumbers = localStorage.getItem('cartNumbers');
    cartNumbers = parseInt(cartNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    productPrice = parseInt(cartItems[name].price);
    productQuantity = parseInt(cartItems[name].inCart);
    //will have if(cartItems[name].inCart < cartItems[name].inStock)
        localStorage.setItem("totalCost", cartCost + productPrice);
        localStorage.setItem("cartNumbers", cartNumbers + 1);
        cartItems[name].inCart = productQuantity + 1;
        window.localStorage.productsInCart = JSON.stringify(cartItems);
        displayCart();
        $('#cart-container').load(document.URL +  ' #cart-container');
        $('#subtotal').load(document.URL +  ' #subtotal');
        $('#total-cost').load(document.URL +  ' #total-cost');
        $('#order-total').load(document.URL +  ' #order-total');
}

function decreaseQuantity(name) {
    let cartNumbers = localStorage.getItem('cartNumbers');
    cartNumbers = parseInt(cartNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    productPrice = parseInt(cartItems[name].price);
    productQuantity = parseInt(cartItems[name].inCart);
    if(cartItems[name].inCart > 1){
        localStorage.setItem("totalCost", cartCost - productPrice);
        localStorage.setItem("cartNumbers", cartNumbers - 1);
        cartItems[name].inCart = productQuantity - 1;
        window.localStorage.productsInCart = JSON.stringify(cartItems);
        displayCart();
        $('#cart-container').load(document.URL +  ' #cart-container');
        $('#subtotal').load(document.URL +  ' #subtotal');
        $('#total-cost').load(document.URL +  ' #total-cost');
        $('#order-total').load(document.URL +  ' #order-total');
    } else if(cartItems[name].inCart = 1){
        localStorage.setItem("totalCost", cartCost - productPrice);
        localStorage.setItem("cartNumbers", cartNumbers - 1);
        delete cartItems[name];
        window.localStorage.productsInCart = JSON.stringify(cartItems);
        displayCart();
        $('#cart-container').load(document.URL +  ' #cart-container');
        $('#subtotal').load(document.URL +  ' #subtotal');
        $('#total-cost').load(document.URL +  ' #total-cost');
        $('#order-total').load(document.URL +  ' #order-total');
    }
}

function removeProduct(name){
    console.log(name);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    productPrice = parseInt(cartItems[name].price);
    productQuantity = parseInt(cartItems[name].inCart);
    localStorage.setItem("totalCost", cartCost - productPrice*productQuantity);
    let cartNumbers = localStorage.getItem('cartNumbers');
    cartNumbers = parseInt(cartNumbers);
    localStorage.setItem("cartNumbers", cartNumbers - cartItems[name].inCart);
    delete cartItems[name];
    window.localStorage.productsInCart = JSON.stringify(cartItems);
    displayCart();
    $('#cart-container').load(document.URL +  ' #cart-container');
    $('#subtotal').load(document.URL +  ' #subtotal');
    $('#total-cost').load(document.URL +  ' #total-cost');
    $('#order-total').load(document.URL +  ' #order-total');
}