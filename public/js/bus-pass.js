document.querySelectorAll(".pass-option button").forEach((button) => {
  button.addEventListener("click", function () {
    // Extract item details
    const itemName = this.parentElement.querySelector("h3").textContent;
    const itemPrice = parseFloat(
      this.parentElement.querySelector("p").textContent.replace("$", "")
    );

    // Get existing cart data from localStorage or initialize
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item to the cart
    cart.push({ name: itemName, price: itemPrice });

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Add the 'clicked' class to trigger the animation
    this.classList.add("clicked");

    // Remove the 'clicked' class after the animation ends
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 300);

    // Create a clone of the button to animate
    const buttonClone = this.cloneNode(true);
    buttonClone.classList.add("flying");
    buttonClone.style.position = "fixed";
    buttonClone.style.pointerEvents = "none";
    document.body.appendChild(buttonClone);

    // Get positions of the button and cart icon
    const cartIcon = document.querySelector(".fa-shopping-cart");
    const cartRect = cartIcon.getBoundingClientRect();
    const buttonRect = this.getBoundingClientRect();

    // Position the clone at the button's location
    buttonClone.style.top = `${buttonRect.top}px`;
    buttonClone.style.left = `${buttonRect.left}px`;
    buttonClone.style.width = `${buttonRect.width}px`;
    buttonClone.style.height = `${buttonRect.height}px`;
    buttonClone.style.transition =
      "transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.6s ease";

    // Animate the button clone to the cart icon
    requestAnimationFrame(() => {
      const deltaX =
        cartRect.left -
        buttonRect.left +
        (cartRect.width / 2 - buttonRect.width / 2);
      const deltaY =
        cartRect.top -
        buttonRect.top +
        (cartRect.height / 2 - buttonRect.height / 2);
      buttonClone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;
      buttonClone.style.opacity = "0.5";
    });

    // Remove the clone after the animation
    buttonClone.addEventListener("transitionend", () => {
      buttonClone.remove();
    });

    // Update cart notification
    const cartNotification = document.querySelector(".cart-notification");
    let itemCount = parseInt(cartNotification.textContent, 10) || 0;
    itemCount++;
    cartNotification.textContent = itemCount;
    cartNotification.classList.add("visible");

    // Add a slight bounce effect to the cart icon
    cartIcon.style.transition = "transform 0.3s ease";
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartIcon.style.transform = "scale(1)";
    }, 300);
  });
});
