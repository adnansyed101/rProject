const db = require("../db/queries");

async function getAllCartItems(req, res) {
  const cartItems = await db.getAllCartItemsFromDb();

  let total = 0;
  for (const item of cartItems) {
    total = total + parseInt(item.price);
  }
  res.render("cart", { cartItems: cartItems, total: total });
}

async function deleteCartItem(req, res) {
  const id = req.params.id;

  await db
    .deleteItemInCartFromDb(id)
    .then((result) => {
      res.json({ redirect: "/cart" });
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getAllCartItems,
  deleteCartItem,
};
