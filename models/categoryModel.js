const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    display: { type: String, required: true },  // Tên hiển thị của danh mục
    slug: { type: String, required: true, unique: true },  // Đường dẫn slug của danh mục
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }  // Tự động tạo ID cho danh mục
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
