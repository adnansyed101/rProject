const uniqueId = require("uniqid");

// SSLCommerzPayement Gateway start
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "ulabs66e064197c826";
const store_passwd = "ulabs66e064197c826@ssl";
const is_live = false; //true for live, false for sandbox

function sslIntialize(req, res) {
  const data = {
    total_amount: 1,
    currency: "BDT",
    tran_id: uniqueId(), // use unique tran_id for each api call
    success_url: "http://localhost:3000/bus-pass",
    fail_url: "http://localhost:3000/fail",
    cancel_url: "http://localhost:3000/cancel",
    ipn_url: "http://localhost:3000/ipn",
    shipping_method: "Courier",
    product_name: "Bus Pass",
    product_category: "Trips",
    product_profile: "general",
    cus_name: "Tasneem",
    cus_email: "tasneemritee008@gmail.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
}

module.exports = {
  sslIntialize,
};
