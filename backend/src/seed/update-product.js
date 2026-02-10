require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGODB = process.env.MONGODB_URI || 'mongodb://localhost:27017/nicotex_clone';

const updateProduct = async () => {
  await mongoose.connect(MONGODB);
  console.log('Connected to database');

  // Update all products with Nicotex in the name
  const result = await Product.updateMany(
    { title: { $regex: /Nicotex/i } },
    { 
      $set: { 
        title: 'MAR Mouth Chill Nicotine Gum 2mg',
        description: 'Helps reduce cravings and supports your journey to quit smoking.'
      } 
    }
  );

  console.log(`Updated ${result.modifiedCount} product(s)`);
  
  // Show all products
  const products = await Product.find();
  console.log('Current products:', products.map(p => ({ title: p.title, price: p.price })));

  process.exit(0);
};

updateProduct().catch((err) => { 
  console.error(err); 
  process.exit(1); 
});
