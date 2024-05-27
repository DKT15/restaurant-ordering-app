import menuArray from "/assets/data.js";

let totalPrice = 0;
let order = [];

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
                <hr/>
            </div`;
    })
    .join("");
}

document.getElementById("menu-container").innerHTML = menuItemsHTML(menuArray);

// Listening out for clicks on each items add button. If the menuItemID is greater than or equal to 0 and is less than menuArray's length, the order will be rendered.
document.addEventListener("click", function (e) {
  if (e.target.dataset.add >= 0 && e.target.dataset.add < menuArray.length) {
    renderOrder(menuArray, e.target.dataset.add);
  }
});

function renderOrder(menu, itemId) {
  // Order section structure.
  document.getElementById("order-section").innerHTML = ` 
            <h2> Your Order </h2>
            <div id="order-items"></div> 
            <hr/>
            <div class="order-total-wrapper">
              <div class="order-total-title">Total price:</div>
              <div id="order-total"></div>
            </div>
            <button id="complete-order">Complete Order</button>
  `;

  // Adding the item and pushing to update the order array.
  order.push(itemId);
  totalPrice += menu[itemId].price;

  //Rendering items in the order
  renderItems(order, menu, itemId);

  document
    .getElementById("order-items")
    .addEventListener("click", function (e) {
      if (
        e.target.dataset.remove >= 0 &&
        e.target.dataset.remove < menuArray.length
      ) {
        order.splice(order.indexOf(e.target.dataset.remove), 1);

        // Subtract price from total price
        totalPrice -= menu[e.target.dataset.remove].price;

        // Clean cart list
        document.getElementById("order-items").innerHTML = "";

        // Render items in the cart after change
        renderItems(order, menu, itemId);
      }
    });

  // Form is displayed once the user clicks complete order.
  document
    .getElementById("complete-order")
    .addEventListener("click", function () {
      document.getElementById("payment-modal").style.display = "block";
    });
}

function renderItems(items, menu, _itemId) {
  //Rendering each element in order array to the order.
  items.forEach(function (itemId) {
    document.getElementById("order-items").innerHTML += `
            <div class="order-item">
              <h3 class="order-item-name">${menu[itemId].name}</h3>
              <p class="remove-item" data-remove="${itemId}">remove</p>
              <h3 class="order-item-price">£${menu[itemId].price}</h3>
            </div>
    `;
  });
  //Redering to the order total.
  document.getElementById("order-total").textContent = `£${totalPrice}`;
}

function payment() {
  document
    .getElementById("payment-btn")
    .addEventListener("click", function (e) {
      e.preventDefault();

      //hides the modal.
      document.getElementById("payment-modal").style.display = "none";

      //displays thank you message.
      document.getElementById("order-section").innerText = `Thanks, ${
        document.getElementById("users-name").value
      }! Your order is on its way!`;
    });
}

//function call
payment();
