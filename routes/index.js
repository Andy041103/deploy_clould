var express = require('express');
var router = express.Router();
const Product = require('../models/productModel'); 
const Category = require('../models/categoryModel');

/* GET home page. */
router.get('/',async (req, res) => {
  try {
    const products = await Product.find().populate('categorySlug', 'display'); // Thêm populate để lấy tên danh mục
    res.render('index', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
  
});


module.exports = router;
