let products =[

{name:"Miss White",image:"Flw1",price:200},
{name:"Make me Blush",image:"Flw2",price:380},
{name:"Purple Bouquet",image:"Flw3",price:250},
{name:"Love Bouquet",image:"Flw4",price:499},
{name:"Classic Bouquet",image:"Flw5",price:399},
{name:"The Lush Lady",image:"Flw6",price:450},
{name:"Shy Pink",image:"Flw10",price:345},
{name:"Deep Love",image:"Flw11",price:525},

]
let cart = [];
function addItems (itemKey){
    let isAlreadyInCart = false;

    let selectedItem = products[itemKey-1];
    for (let i = 0; i < cart.length; i++) {
        if ( cart[i].productName === selectedItem.name ){
            cart[i].count++;
            isAlreadyInCart = true;
        }        
    }
    if ( !isAlreadyInCart ){
        cart.push ( {productName:selectedItem.name, productPrice:selectedItem.price,count:1, image:selectedItem.image});
    }
    saveCart();
    let totalPrice = 0;
    for (let cartKey = 0; cartKey < cart.length; cartKey++) {
        totalPrice += cart[cartKey].productPrice * cart[cartKey].count;
    }

    document.getElementById("totalPricePargraph").innerText = `${totalPrice} SAR.`;
	var toastLiveExample = document.getElementById("priceToast");
	var toast = new bootstrap.Toast(toastLiveExample);

	toast.show();
};

// Save cart
function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}
// Load cart
function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
}
if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
}

function getTotalPrices (){
    let subtotal = 0;
    let taxTotal = 0;
    let discount = 0;
    let shipping = 0;
    let totalPrice = 0;

    // Get subtotal
    for (let cartKey = 0; cartKey < cart.length; cartKey++) {
        subtotal += cart[cartKey].productPrice * cart[cartKey].count;
    }

    //Get tax
    taxTotal = (15/100) * subtotal;

    //discount
    let discountInput = document.getElementById("discountInput").value;
    if ( discountInput && discountInput === "Roz"){
        discount = (30/100) * subtotal;
    }

    //shipping
    let shippingOption = Array.from(
		document.getElementsByName("shippingOptions")
	).find((r) => r.checked).value;
    if ( shippingOption === "3days"){
        shipping = 30;
    }else if ( shippingOption === "5days"){
        shipping = 40;
    }else if ( shippingOption === "pickup"){
        shipping = 0;
    }
    // calculate

    totalPrice = subtotal;
    totalPrice = totalPrice - discount;
    totalPrice = totalPrice + taxTotal;
    totalPrice = totalPrice + shipping;

    return {
        totalPrice:totalPrice,
        subtotal:subtotal,
        shipping:shipping,
        taxTotal:taxTotal,
        discount:discount,
    }
}

function handleClick (){
    let price = getTotalPrices();
    document.getElementById("subtotalText").innerText = Math.floor(price.subtotal);
    document.getElementById("shippinglText").innerText = Math.floor(price.shipping);
    document.getElementById("discountText").innerText = Math.floor(price.discount);
    document.getElementById("totalText").innerText = Math.floor(price.totalPrice);
}

//confirm

function confirmOrder() {
	document.getElementById("orderText").innerText = `Order was successful your order number is\n #${Math.floor(Math.random() * 100000) + 10000}`;
	document.getElementById("orderText").classList = "text-center";
    
}

let price = getTotalPrices();
document.getElementById("subtotalText").innerText = Math.floor(price.subtotal);
document.getElementById("shippinglText").innerText = Math.floor(price.shipping);
document.getElementById("discountText").innerText = Math.floor(price.discount);
document.getElementById("totalText").innerText = Math.floor(price.totalPrice);


for (let i = 0; i < cart.length; i++) {
    if (cart[i]) {
        let productDiv = document.createElement("li");
        productDiv.classList = "list-group-item m-2 d-flex";
        productDiv.innerHTML = `<img src="./${cart[i].image}.jpg" class="img-fluid rounded-start" width="150" height="150"></img>
        <div class="d-grid fw-lighter">
        <h6 class="flex-grow-1 p-3 pb-0 align-self-center">${cart[i].productName}</h6></div>
        <div class="text-muted p-2 align-self-center">${cart[i].count}x</div>
        <div class="text-success p-2 align-self-center">${Math.floor(cart[i].productPrice)} SAR</div>`;
        document.getElementById("productsList").appendChild(productDiv);
    }
}


