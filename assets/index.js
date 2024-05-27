import menuArray from "/assets/data.js";

let totalPrice = 0;
let order = [];

// Mapping through elmenents in the menus array to output options on the screen for the user.
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

// Listening out for clicks on each items add button. If the e.target.dataset.add  is greater than or equal to 0 and is less than menuArray's length, the order will be rendered.
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
              <h3 class="order-total-title">Total price:</h3>
              <h3 id="order-total"></h3>
            </div>
            <button id="complete-order">Complete Order</button>
  `;

  // Adding the item and pushing to update the order array.
  order.push(itemId);
  totalPrice += menu[itemId].price;

  //Rendering items in the order
  renderItems(order, menu, itemId);

  // Removing items from the order if remove is clicked on them.
  document
    .getElementById("order-items")
    .addEventListener("click", function (e) {
      if (
        e.target.dataset.remove >= 0 &&
        e.target.dataset.remove < menuArray.length
      ) {
        order.splice(order.indexOf(e.target.dataset.remove), 1); //removing 1 element from the array and the element that will be removed will depend on the id/menu item that had its remove button clicked.

        // Subtracting the price from total price
        totalPrice -= menu[e.target.dataset.remove].price;

        // Clear order list
        document.getElementById("order-items").innerHTML = "";

        // Rendering items in the order after change
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
            <div class="order-wrapper">
              <h3 class="order-item-name">${menu[itemId].name}</h3>
              <p class="remove-item" data-remove="${itemId}">remove</p>
            </div>
              <h3 class="order-item-price">£${menu[itemId].price}</h3>
            </div>
    `;
  });
  //Redering to the order total.
  document.getElementById("order-total").textContent = `£${totalPrice}`;
}

// user pays here.
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
