const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const Farm = require('../models/farm');

mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to mongoose :)'))
	.catch(err => console.error(err));

const router = new express.Router();

router.get('/', async (req, res) => {
	const products = await Product.find({});
	res.render('products/index', { products });
});

router.get('/new', (req, res) => {
	res.render('products/new');
})

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id).populate('farm');
	res.render('/products/details');
})

router.get('/:id/edit', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('/products/edit', { product });
})

module.exports = router;
