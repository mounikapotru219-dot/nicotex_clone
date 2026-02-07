const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');

// GET /api/products - public
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({ status: 'active' });
    res.json(products);
  } catch (err) { next(err); }
});

// GET /api/products/:id - public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
});

// Admin: create product
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description, images, price, stock, status } = req.body;
    const p = await Product.create({ title, description, images, price, stock, status });
    res.status(201).json(p);
  } catch (err) { next(err); }
});

// Admin: update product
router.put('/:id', auth, async (req, res, next) => {
  try {
    const updates = req.body;
    const p = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { next(err); }
});

// Admin: delete product
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
