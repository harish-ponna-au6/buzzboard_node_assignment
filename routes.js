//NPM package
const router = require("express").Router(); //router invoking from express

// Controller Module importing
const {
  create_order,
  update_order,
  list_orders,
  search_orders,
  delete_order,
} = require("./controllers");

// all routes
router.post("/orders/create", create_order);
router.patch("/orders/update", update_order);
router.get("/orders/list", list_orders);
router.get("/orders/search", search_orders); // q=${order_id}
router.delete("/orders/delete", delete_order); // q = ${order_id}

module.exports = router;
