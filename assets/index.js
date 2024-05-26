import menuArray from "/assets/data.js";

let totalPrice = 0;
let order = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addToOrder(e.target.dataset.add);
  }
});

function addToOrder(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id === itemId;
  })[0];

  if (!order.includes(targetItemObj)) {
    order.push(targetItemObj);
    // totalPrice += targetItemObj.price;
    console.log(typeof targetItemObj);
  }
}

function getOrderHTML() {
  let orderHTML = "";
  order.forEach((menuItem) => {
    orderHTML += `<section class="order-container">
                <div class="order-item">
                <p>${menuItem.name}</p>
                <button class="remove-btn" data-remove="${menuItem.id}">remove</button>
                </div>
                <div class="order-price">
                <p>£${menuItem.price}</p>
                </div>
            </section`;
  });
}

function menuItemsHTML(menuArr) {
  return menuArr
    .map((menuItem) => {
      const { name, ingredients, price, emoji, id } = menuItem;
      return `<div class="menu-items">
                <div class="menu-item">
                <div class="item-wrapper">
                <h1 class="item-emoji">${emoji}</h1>
                <div class="text-wrapper">
                <h2 class="item-name">${name}</h2>
                <p class="item-ingredients">${ingredients}</p>
                <h3 "item-price">£${price}</h3>
                </div>
                </div>
                <div class="add-btn">
                <i class="fa-solid fa-circle-plus
                "data-add="${id}"></i>
                </div>
                </div>
                <hr>
            </div`;
    })
    .join("");
}

document.getElementById("menu-container").innerHTML = menuItemsHTML(menuArray);
document.getElementById("order-section").innerHTML = getOrderHTML();
