const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Tên sản phẩm
    price: { type: String, required: true }, // Giá tiền
    image01: { type: String, required: true }, // URL hình ảnh sản phẩm 01
    image02: { type: String, required: true }, // URL hình ảnh sản phẩm 02
    categorySlug: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }, // ID danh mục
    slug: { type: String, required: true, unique: true }, // Đường dẫn slug của sản phẩm
    description: { type: String, required: true }, // Mô tả sản phẩm
   
    
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
