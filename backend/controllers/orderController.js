// controllers/orderController.js
const Order = require("../models/Order");

// Create an order
const createOrder = async (req, res) => {
  const { items, price, address, deliveryDate } = req.body;

  try {
    const newOrder = new Order({
      buyerId: req.user.userId, // User from authenticated token
      items,
      price,
      address,
      deliveryDate,
      isDelivered: false,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders for an authenticated user or all orders for admin
const getOrders = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ buyerId: req.user.userId });
      return res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = status === "delivered";
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
