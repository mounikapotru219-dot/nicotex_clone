const axios = require('axios');

// Small Shiprocket integration helper (needs real API keys and endpoints)
// Docs: https://shiprocket.in/docs

const getAuthToken = async () => {
  // placeholder - replace with real auth flow
  // Example: POST https://apiv2.shiprocket.in/v1/external/auth/login
  const key = process.env.SHIPROCKET_API_KEY;
  const secret = process.env.SHIPROCKET_API_SECRET;
  if (!key || !secret) throw new Error('Shiprocket credentials missing');

  // For demo, return a dummy token
  return 'shiprocket_dummy_token';
};

const createShipment = async (order) => {
  // Format order payload according to Shiprocket API and call it
  const token = await getAuthToken();

  // Example payload skeleton
  const payload = {
    order_id: order._id.toString(),
    order_date: order.createdAt || new Date(),
    pickup_location: 'Default',
    shipping_charges: order.shippingCharge || 0,
    sub_total: order.subtotal,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
    customer_details: {
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phone,
      address: order.customer.address,
    },
    items: order.items.map((i) => ({ name: i.title, sku: i.product.toString(), units: i.quantity, selling_price: i.price }))
  };

  // Use axios to POST to Shiprocket create order endpoint
  // return { shiprocketOrderId, awb, status }
  // For now return a stub to avoid failing without credentials
  return { shiprocketOrderId: 'SR_DUMMY_ID', awb: 'AWB_DUMMY', status: 'created' };
};

module.exports = { getAuthToken, createShipment };
