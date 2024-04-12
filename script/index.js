console.log('I am inside index js');

let bagItems = [];
function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems =bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
 }
onLoad(); 


function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();

}
function displayItemsOnHomePage(){
 
let itemsContainerElement = document.querySelector('.items-container');
// console.log(itemsContainerElement);
if(! itemsContainerElement){
    return;
}

let innerHTML = '';
items.forEach( item =>{
    innerHTML +=`

    <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item images">
        <div class="rating">
            ${item.rating.stars}⭐ | ${item.rating.count}k
        </div>
        <div class="company_name">${item.company}</div>
        <div class="item_name">${item.item_name}</div>
        <div class="price">
            <span class="curent-price">${item.current_price}</span>
            <span class="original-price">${item.original_price}</span>
            <span class="discout">${item.discount_percentage}% OFF</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bag</button>
    </div>


`
})
itemsContainerElement.innerHTML = innerHTML;

}
function displayBagIcon(){
    let bagItemCountElement =document.querySelector('.bag-item-count');
    if(bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText =bagItems.length;
    }
    else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}