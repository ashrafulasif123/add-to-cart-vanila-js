const totalPrice = document.getElementById(targetButton.dataset.cart).querySelector('.cartProductPrice').textContent
let totalPriceNumber = Number(totalPrice)
totalPriceNumber = totalPriceNumber * totalQuantity
document.getElementById(targetButton.dataset.cart).querySelector('.cartProductPrice').textContent = totalPriceNumber

const price = document.getElementById(targetButton.dataset.cart).querySelector('.cartProductPrice').textContent
const priceNumber = Number(price)
let totalPriceNumber2 = priceNumber * totalQuantity
document.getElementById(targetButton.dataset.cart).querySelector('.cartProductPrice').textContent = totalPriceNumber2