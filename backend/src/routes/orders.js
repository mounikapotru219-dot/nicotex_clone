const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const shiprocket = require('../services/shiprocket');
const auth = require('../middlewares/auth');

// POST /api/orders - create order and call Shiprocket
router.post('/', async (req, res, next) => {
  try {
    const { customer, items } = req.body;
    // basic validation
    if (!customer || !items || items.length === 0) return res.status(400).json({ message: 'Invalid order' });

    let subtotal = 0;
    const orderItems = [];
    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(400).json({ message: 'Invalid product' });
      if (product.stock < it.quantity) return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      subtotal += product.price * it.quantity;
      orderItems.push({ product: product._id, title: product.title, price: product.price, quantity: it.quantity });

      // reduce stock - in real world use transaction
      product.stock -= it.quantity;
      await product.save();
    }

    const shippingCharge = 0; // simple for now
    const total = subtotal + shippingCharge;

    const order = await Order.create({ customer, items: orderItems, subtotal, shippingCharge, total });

    // Create shipment via Shiprocket service (async)
    try {
      const shipment = await shiprocket.createShipment(order);
      order.shipment = shipment;
      await order.save();
    } catch (err) {
      console.warn('Shiprocket create failed', err.message);
    }

    res.status(201).json(order);
  } catch (err) { next(err); }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) { next(err); }
});

// GET /api/orders - admin list
router.get('/', auth, async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
});

// PUT /api/orders/:id/status - update status (admin)
router.put('/:id/status', auth, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) { next(err); }
});

module.exports = router;
