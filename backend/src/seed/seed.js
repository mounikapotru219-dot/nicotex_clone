require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Product = require('../models/Product');

const MONGODB = process.env.MONGODB_URI || 'mongodb://localhost:27017/nicotex_clone';

const seed = async () => {
  await mongoose.connect(MONGODB);
  console.log('Connected for seeding');

  // Create admin
  const adminExists = await AdminUser.findOne({ username: 'admin' });
  if (!adminExists) {
    await AdminUser.create({ username: 'admin', password: 'admin123', name: 'Admin User' });
    console.log('Admin user created: admin / admin123');
  }

  // Create sample product
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.create({
      title: 'MAR Mouth Chill Nicotine Gum 2mg',
      description: 'Helps reduce cravings and supports your journey to quit smoking.',
      price: 499,
      stock: 100,
      images: []
    });
    console.log('Sample product created');
  }

  console.log('Seeding done');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
