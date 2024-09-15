const pool = require("./pool");

async function getAllCartItemsFromDb() {
  const { rows } = await pool.query(
    "SELECT cartitemid, tripname, price FROM cart JOIN triptypes ON cart.triptypeid = triptypes.triptypeid"
  );
  return rows;
}

async function getAllTripTypesFromDb() {
  const { rows } = await pool.query("SELECT * FROM triptypes");
  return rows;
}

async function insertIntoCartDb(id) {
  await pool.query("INSERT INTO cart (triptypeid) VALUES ($1)", [id]);
}

async function countCartRowsFromDb() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM cart");
  return rows;
}

async function deleteItemInCartFromDb(id) {
  await pool.query("DELETE FROM cart WHERE cartitemid = " + id);
}

async function getTotalAmountFromDb() {
  const { rows } = await pool.query(
    "SELECT SUM(price) FROM cart JOIN triptypes ON cart.triptypeid = triptypes.triptypeid"
  );
  return rows[0].sum;
}

async function deleteCartData() {
  await pool.query("TRUNCATE TABLE cart RESTART IDENTITY");
}

module.exports = {
  getAllCartItemsFromDb,
  getAllTripTypesFromDb,
  insertIntoCartDb,
  countCartRowsFromDb,
  deleteItemInCartFromDb,
  getTotalAmountFromDb,
  deleteCartData,
};
