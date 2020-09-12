const Order = require("./model"); //importing model

module.exports = {
  // ---------------------------CREATING ORDER--------------------------------
  async create_order(req, res) {
    try {
      const order = await new Order({ ...req.body }).save();

      return res.status(201).json({
        success: { message: "Order created successfully" },
        data: { order },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  // -----------------------------UPDATING ORDER--------------------------------
  async update_order(req, res) {
    try {
      const { order_id, delivery_date } = req.body;

      // checking for presence of proper fields in req.body(Handling Error)
      if (!order_id || !delivery_date)
        return res
          .status(400)
          .json({ error: { message: "order_id and delivery_date required" } });

      const order = await Order.findOne({ order_id: order_id });

      // if no order found sending error message(Handling Error)
      if (!order)
        return res.status(404).json({
          error: { message: "No orders found with the given order_id" },
        });

      order.delivery_date = delivery_date;
      order.save();

      return res.status(201).json({
        success: { message: "Order updated successfully" },
        data: { order },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  // -----------------------------LISTING ALL ORDERS--------------------------------
  async list_orders(req, res) {
    try {
      const orders = await Order.find({}).sort({ order_date: -1 });
      return res.status(200).json({
        data: { orders },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  // -----------------------------SEARCHING ORDERS BASED ON ORDERS--------------------------------
  async search_orders(req, res) {
    try {
      const { q } = req.query;
      // checking for presence of query req.query(Handling Error)
      if (!q)
        return res
          .status(400)
          .json({ error: { message: "order_id required" } });

      const order = await Order.findOne(
        { order_id: q },
        { createAt: 0, updatedAt: 0, __v: 0, _id: 0 }
      );

      // if no order found sending error message(Handling Error)
      if (!order)
        return res.status(404).json({
          error: { message: "No orders found with the given order_id" },
        });

      return res.status(200).json({
        data: { order },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  // -----------------------------DELETING ORDERS BASED ON ORDERS--------------------------------
  async delete_order(req, res) {
    try {
      const { q } = req.query;
      // checking for presence of proper fields in req.body(Handling Error)
      if (!q)
        return res
          .status(400)
          .json({ error: { message: "order_id required" } });

      await Order.findOneAndDelete({ order_id: q });

      return res.status(200).json({
        success: { message: "successfully deleted order" },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { message: error.message } });
    }
  },
};
