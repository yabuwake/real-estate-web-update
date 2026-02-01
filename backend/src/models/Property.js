const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, enum: ['apartment', 'house', 'villa', 'commercial'], required: true },
  status: { type: String, enum: ['for-sale', 'for-rent', 'sold', 'rented'], default: 'for-sale' },
  image: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);