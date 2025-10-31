document.getElementById('add-product').addEventListener('click', function () {
    addProduct('product-name', 'product-price', 'product-id')
})

document.getElementById('clear-cart').addEventListener('click', function () {
    const cartLists = document.getElementById('cart-item').querySelectorAll('ul')
    if (cartLists) {
        cartLists.forEach(cartList => cartList.remove())
        CARTLISTS = []
        totalPriceInCart()
    }
})

// const cartTotalPrice = document.querySelectorAll('.cartProductPrice')
// if (cartTotalPrice) {

//     console.log(cartTotalPrice)
// }