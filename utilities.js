function resetProducts(productId) {
    /* DELETEPRODUCTSIDS.push(productId)
    let remainingProduct = UNIQUEPRODUCTIDS.filter(uniqueProduct => !DELETEPRODUCTSIDS.includes(uniqueProduct))
    UNIQUEPRODUCTIDS = remainingProduct
    DELETEPRODUCTSIDS = [] */
    // DELETEPRODUCTSIDS.push(productId)
    let remainingProduct = UNIQUEPRODUCTIDS.filter(uniqueProduct => uniqueProduct !== productId)
    UNIQUEPRODUCTIDS = remainingProduct
    // DELETEPRODUCTSIDS = []
}
function resetCart(cartId) {

    DELETECARTLIST.push(cartId)
    const remainingCart = CARTLISTS.filter(cartList => !DELETECARTLIST.includes(cartList))
    CARTLISTS = remainingCart
    DELETECARTLIST = []
}
function totalPriceInCart() {
    const carts = document.querySelectorAll('.cartProductPrice')
    const cartsProductTotalPrice = Array.from(carts).map(cart => Number(cart.textContent)).reduce((acc, price) => acc + price, 0)
    document.getElementById('total-price-cart').textContent = cartsProductTotalPrice
}

function updateQuantiy(quantity, productPrice, targetButtonElementQuantity, targetButtonElementPrice, increaseOrDecrease) {
    let quantityUpdate;
    const quantityNumber = Number(quantity)
    if (increaseOrDecrease === 'increasing') {
        quantityUpdate = quantityNumber + 1
    }
    else if (increaseOrDecrease === 'decreasing') {
        quantityUpdate = quantityNumber - 1
        if (quantityUpdate < 1) {
            return
        }
    }
    targetButtonElementQuantity.innerText = quantityUpdate
    targetButtonElementPrice.textContent = quantityUpdate * productPrice
}

function showMessage(heading, text, messagebg, btncolor) {
    MODAL.showModal()
    MESSAGEHEADER.textContent = heading
    MESSAGETEXT.textContent = text
    CLOSEMODAL.addEventListener('click', (event) => {
        event.preventDefault()
        MODAL.close()
    })
    // Remove
    MESSAGEBOX.classList.remove('bg-green-100', 'bg-red-100')
    CLOSEMODAL.classList.remove('btn-success', 'btn-error')

    MESSAGEBOX.classList.add(messagebg)
    CLOSEMODAL.classList.add(btncolor)

}
function productValidation(productNameValue, productPriceValue, productPriceNumber, productIdInput) {
    if (productNameValue === '' || productPriceValue === '' || productIdInput === '') {
        showMessage('Oooops !', 'Input field cannot be empty', BGERROR, BTNERROR)
        return false
    }
    if (!isNaN(productNameValue)) {
        showMessage('Oooops !', 'Please Provide valid Product Name', BGERROR, BTNERROR)
        return false
    }
    if (isNaN(productPriceNumber)) {
        showMessage('Oooops !', 'Please Provide valid price', BGERROR, BTNERROR)
        return false
    }
    if (productPriceNumber <= 0) {
        showMessage('Oooops !', 'Price cannot be 0 or negetive', BGERROR, BTNERROR)
        return false
    }

    if (CARTLISTS.includes(productIdInput) === true) {
        showMessage('EXIST IN CART', 'This Product Have Already Exist in CART', BGERROR, BTNERROR)
        return false
    }
    if (UNIQUEPRODUCTIDS.includes(productIdInput) === false) {
        UNIQUEPRODUCTIDS.push(productIdInput)
    } else {
        showMessage('EXIST', 'Product have already exist', BGERROR, BTNERROR)
        return false
    }
    return true
}
// let count = 0;

/**
 * ---------------
 * New Product Add
 * ---------------
 */
function addProduct(productName, productPrice, productId) {

    const productNameInput = document.getElementById(productName).value.trim()
    const productPriceInput = document.getElementById(productPrice).value.trim()
    const productPriceNumber = Number(productPriceInput)
    const proudctIdInput = document.getElementById(productId).value.trim()



    if (!productValidation(productNameInput, productPriceInput, productPriceNumber, proudctIdInput)) return
    const productContainer = document.getElementById('products-container')

    /**COUNT is increase when click function addproduct START */
    COUNT = COUNT + 1
    /**COUNT is increase when click function addproduct END */

    const productItem = document.createElement('div')
    productItem.id = `item${COUNT}`

    productItem.classList.add('flex')

    const p1 = document.createElement('p')
    p1.id = `product${COUNT}`
    p1.classList.add('text-lg', 'font-bold', 'w-1/2', 'mt-3')
    p1.innerText = productNameInput

    const p2 = document.createElement('p')

    p2.classList.add('text-lg', 'font-bold', 'w-1/2', 'mt-3')
    p2.innerText = 'Price :'
    const span = document.createElement('span')
    span.classList.add('price')
    span.id = `price${COUNT}`
    span.innerText = productPriceNumber
    p2.appendChild(span)

    const p3 = document.createElement('p')
    p3.classList.add('text-lg', 'font-bold', 'w-1/2', 'mt-3')
    p3.innerText = 'Product ID: '
    const span2 = document.createElement('span')
    span2.classList.add('font-extrabold', 'text-red-500')
    span2.innerText = proudctIdInput
    p3.appendChild(span2)

    const button1 = document.createElement('button')
    button1.classList.add('button-add-cart', 'btn', 'btn-accent', 'w-fit', 'rounded-lg', 'mt-3')
    button1.dataset.product = `product${COUNT}`
    button1.dataset.price = `price${COUNT}`
    button1.dataset.item = `item${COUNT}`
    button1.dataset.cart = proudctIdInput
    button1.innerText = 'Add to Cart'
    const button2 = document.createElement('button')
    button2.classList.add('button-delete', 'btn', 'btn-error', 'w-fit', 'rounded-lg', 'ml-3', 'mt-3')
    button2.dataset.item = `item${COUNT}`
    button2.innerText = 'Delete'
    button2.dataset.cart = proudctIdInput

    productItem.appendChild(p1)
    productItem.appendChild(p2)
    productItem.appendChild(p3)
    productItem.appendChild(button1)
    productItem.appendChild(button2)

    productContainer.appendChild(productItem)
}

const productsContainer = document.getElementById('products-container')

productsContainer.addEventListener('click', (e) => {
    if (!(e.target.tagName === 'BUTTON')) return
    const targetButton = e.target
    if (targetButton.classList.contains('button-delete')) {
        const productDelete = document.getElementById(targetButton.dataset.item).remove()

        const cartDiv = document.getElementById(targetButton.dataset.cart)
        if (cartDiv) {
            cartDiv.remove()
            totalPriceInCart()
        }
        resetCart(targetButton.dataset.cart)

        if (!productDelete) {
            showMessage('Sucessfull', 'You have successfull deleted', BGSUCCESS, BTNSUCCESS)
            resetProducts(targetButton.dataset.cart)
            return
        }
        else {
            showMessage('Unsuccessful', 'Product is not Deleted', BGERROR, BTNERROR)
            return
        }

    }

    if (targetButton.classList.contains('button-add-cart')) {
        const productPrice = document.getElementById(targetButton.dataset.item).querySelector('.price').textContent
        CARTLISTS.push(targetButton.dataset.cart)
        const cartItem = document.getElementById('cart-item')
        const targetProductName = document.getElementById(targetButton.dataset.product).textContent

        const ul = document.createElement('ul')
        ul.id = targetButton.dataset.cart
        ul.classList.add('flex', 'justify-center', 'items-center', 'gap-4', 'mt-2', 'space-y-2')

        const li1 = document.createElement('li')
        li1.textContent = targetProductName

        const li6 = document.createElement('li');
        const p5 = document.createElement('p')
        p5.textContent = 'Price: '
        const span3 = document.createElement('span')
        span3.classList.add('product-price')
        span3.textContent = productPrice
        p5.appendChild(span3)
        li6.appendChild(p5)

        const li3 = document.createElement('li')
        const p3 = document.createElement('p3')
        p3.textContent = 'Quantity: '
        const span = document.createElement('span')
        span.classList.add('quantity')
        span.textContent = 1
        p3.appendChild(span)
        li3.appendChild(p3)

        const li2 = document.createElement('li')
        const p4 = document.createElement('p')
        p4.textContent = 'Total Price: '
        const span2 = document.createElement('span')
        span2.classList.add('cartProductPrice')
        span2.textContent = productPrice * span.textContent
        p4.appendChild(span2)
        li2.appendChild(p4)

        const li4 = document.createElement('li')
        const button3 = document.createElement('button')
        button3.classList.add('cart-delete-button', 'btn', 'btn-sm', 'btn-error', 'w-fit', 'rounded-lg')
        button3.textContent = 'Delete'
        button3.dataset.cart = targetButton.dataset.cart
        li4.appendChild(button3)

        const li5 = document.createElement('li')
        const button4 = document.createElement('button')
        button4.classList.add('increase', 'btn', 'btn-sm', 'btn-primary', 'w-fit', 'rounded-lg', 'mt-1', 'mr-2')
        button4.dataset.item = targetButton.dataset.item
        button4.dataset.cart = targetButton.dataset.cart
        button4.innerText = 'Increase Quantity'
        li5.appendChild(button4)

        const li7 = document.createElement('li')
        const button5 = document.createElement('button')
        button5.classList.add('decrease', 'btn', 'btn-sm', 'btn-warning', 'w-fit', 'rounded-lg', 'mt-1')
        button5.dataset.item = targetButton.dataset.item
        button5.dataset.cart = targetButton.dataset.cart
        button5.innerText = 'Decrease Quantity'
        li5.appendChild(button5)

        ul.appendChild(li1)
        ul.appendChild(li6)
        ul.appendChild(li3)
        ul.appendChild(li2)
        ul.appendChild(li5)
        ul.appendChild(li7)
        ul.appendChild(li4)

        cartItem.appendChild(ul)
        const productDelete = document.getElementById(targetButton.dataset.item).remove()
        if (!productDelete && ul) {
            showMessage('Sucessfull', 'This Products have successfully added to the cart', BGSUCCESS, BTNSUCCESS)
            // resetProducts(targetButton.dataset.cart)
            totalPriceInCart()

        }
        else {
            showMessage('Unsuccessful', 'Product is not Deleted', BGERROR, BTNERROR)

        }
    }

})

document.getElementById('cart-container').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') return
    const targetButton = e.target
    if (targetButton.classList.contains('cart-delete-button')) {
        const deleteCartProduct = targetButton.closest('ul').remove()
        if(!deleteCartProduct){
            showMessage('DELETED', 'Successfully deleted this product from the cart', BGERROR, BTNERROR)
        }
        TARGETCART = targetButton.dataset.cart
        resetCart(TARGETCART)
        resetProducts(TARGETCART)
        totalPriceInCart()
        totalPriceInCart()
    }
    if (targetButton.classList.contains('increase')) {
        const quantity = targetButton.closest('ul').querySelector('.quantity').innerText
        const productPrice = targetButton.closest('ul').querySelector('.product-price').innerText
        const targetButtonElementQuantity = targetButton.closest('ul').querySelector('.quantity')
        const targetButtonElementPrice = targetButton.closest('ul').querySelector('.cartProductPrice')
        updateQuantiy(quantity, productPrice, targetButtonElementQuantity, targetButtonElementPrice, 'increasing')
        totalPriceInCart()
    }
    if (targetButton.classList.contains('decrease')) {
        const quantity = targetButton.closest('ul').querySelector('.quantity').innerText
        const productPrice = targetButton.closest('ul').querySelector('.product-price').innerText
        const targetButtonElementQuantity = targetButton.closest('ul').querySelector('.quantity')
        const targetButtonElementPrice = targetButton.closest('ul').querySelector('.cartProductPrice')
        updateQuantiy(quantity, productPrice, targetButtonElementQuantity, targetButtonElementPrice, 'decreasing')
        totalPriceInCart()
    }
})



