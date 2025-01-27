console.log('succesfully attached');
const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();
function onLoad(){
    LoadBagItemObjects();
    displayBagItems();
    displaybagSummary();
}
function displaybagSummary(){
    let bagSummaryElement = document.querySelector(".bag-summary");

    let totalItem =bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
     
    bagItemObjects.forEach(bagItem =>{
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    })

    let finalPayment =  totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummaryElement.innerHTML = `    
        <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItem}) </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value"> ₹${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">- ₹${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ 99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${finalPayment}</span>
        </div>
        </div>
        <button class="btn-place-order">
        <div class="css-xjhrni">PLACE ORDER</div>
        </button>
        `;
    

}

function LoadBagItemObjects(){
    console.log(bagItems);
    

    bagItemObjects = bagItems.map(itemId =>{
        for(let i = 0; i< items.length; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    });
    console.log(bagItemObjects);
}

function displayBagItems(){
   
    
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    bagItemObjects.forEach(bagItem =>{
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}
function removeFromBag(itemId){
   bagItems = bagItems.filter(bagitemId => bagitemId != itemId);
   
   localStorage.setItem('bagItems',JSON.stringify(bagItems));
   LoadBagItemObjects();
   displayBagIcon();
   displayBagItems();
   displaybagSummary();

}
function generateItemHTML (item){
   
    return  ` <div class="bag-item-container">
        <div class="item-left-part">
        <img class="bag-item-img" src="./${item.image}">
        </div>
        <div class="item-right-part">
        <div class="company">${item.company}ADIDAS</div>
        <div class="item-name">${item.item_name}Men Printed Polo Collar Indian Cricket ODI Jersey</div>
        <div class="price-container">
            <span class="current-price">${item.current_price} Rs </span>
            <span class="original-price">${item.original_price} Rs </span>
            <span class="discount-percentage">${item.discount_percentage}0% OFF</span>
        </div>
        <div class="return-period">
            <span class="return-period-days">${item.return_period} </span> return available
        </div>
        <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
        </div>

        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>

    </div>`
    ;
}
{/* <script src='./bag.html'></script> */}