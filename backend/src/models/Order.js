const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  price: Number,
  quantity: Number,
}, { _id: false });

const ShipmentSchema = new mongoose.Schema({
  shiprocketOrderId: String,
  awb: String,
  status: String,
});

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  items: [OrderItemSchema],
  subtotal: Number,
  shippingCharge: { type: Number, default: 0 },
  total: Number,
  status: { type: String, default: 'created' },
  shipment: ShipmentSchema,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
