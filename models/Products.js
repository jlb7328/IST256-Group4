const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  ProductId: String,
  ProductDescription: String,
  ProductCategory: String,
  ProductUnitOfMeasure: String,
  ProductPrice: Number,
  ProductWeight: String,
  ProductImage: String
});
module.exports = mongoose.model('Product', ProductSchema);
