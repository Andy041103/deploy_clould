const express = require('express');
const router = express.Router();

const Category = require('../models/categoryModel');

router.get('/', async (req, res) => {
    try {
      const categories = await Category.find(); // Lấy danh sách danh mục từ cơ sở dữ liệu
      res.render('categories', { categories }); // Render view với danh sách danh mục
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  router.get('/add-category', (req, res) => {
    res.render('add-category');
  });
  
  // Route để xử lý thêm danh mục
  router.post('/add-category', async (req, res) => {
    try {
      const { display, slug } = req.body;
      const newCategory = new Category({ display, slug });
      await newCategory.save();
      res.redirect('/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Route để hiển thị form chỉnh sửa danh mục
  router.get('/edit-category/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.render('edit-category', { category });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Route để xử lý chỉnh sửa danh mục
  router.post('/edit-category/:id', async (req, res) => {
    try {
      const { display, slug } = req.body;
      await Category.findByIdAndUpdate(req.params.id, { display, slug });
      res.redirect('/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  // Route để xóa danh mục
  router.post('/delete-category/:id', async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.redirect('/categories');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  
  module.exports = router;