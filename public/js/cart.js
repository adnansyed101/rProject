document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("cart-total");
  const purchaseBtn = document.getElementById("purchase-btn");

  // Get cart data from localStorage or initialize it
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    cart.forEach(function (item, index) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const itemName = document.createElement("h4");
      itemName.textContent = item.name;

      const itemNumber = document.createElement("p");
      itemNumber.textContent = index + 1;

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `TK ${item.price}`;

      const trashButton = document.createElement("button");
      trashButton.classList.add("trashBtn");

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid");
      trashIcon.classList.add("fa-trash");

      total += item.price;

      trashButton.appendChild(trashIcon);
      cartItem.appendChild(itemNumber);
      cartItem.appendChild(itemName);
      cartItem.appendChild(itemPrice);
      cartItem.appendChild(trashButton);
      cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total;
  }
  // Render cart items on page load
  renderCart();

  cartItemsContainer.addEventListener("click", function (e) {
    const id = e.target.parentNode.parentNode.childNodes[0].textContent;

    if (
      e.target.parentNode.classList.contains("trashBtn") &&
      confirm("Are you sure?")
    ) {
      cart.splice(id - 1, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      // Render Cart again after deleting item
      renderCart();
    }
  });

  // Handle purchase button click
  purchaseBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      localStorage.removeItem("cart"); // Clear the cart
      window.location.href = "bus-pass.html"; // Redirect to the main page
    } else {
      alert("Your cart is empty!");
    }
  });
});
