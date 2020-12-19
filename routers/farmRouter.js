const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const Farm = require('../models/farm');
const Product = require('../models/product');
const router = new express.Router();

router.get('/', async (req, res) => {
	const farms = await Farm.find({});
	res.render('farms/index', { farms });
});

router.get('/new', (req, res) => {
	res.render('farms/new');
});

router.get('/:id', async (req, res) => {
	const farm = await Farm.findById(req.params.id);
	res.render('farms/details', { farm });
});

router.post('/', async (req, res) => {
	const { name, city, email } = req.body;
	const farm = new Farm({ name, city, email });
	const result = await farm.save();
	console.log(result);
	res.redirect('/farms');
});

router.delete('/:id', async (req, res) => {
	const response = await Farm.findByIdAndDelete(req.params.id);
	console.log(response);
	res.redirect('/farms');
});

router.get('/:id/edit', async (req, res) => {
	const farm = await Farm.findById(req.params.id);
	res.render('farms/edit', { farm });
});

router.patch('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, city, email } = req.body;
	await Farm.findByIdAndUpdate(
		id,
		{ name, city, email },
		{ useFindAndModify: false }
	);
	res.redirect('/farms');
});

router.get('/:id/products/new', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	res.render('products/new', { farm });
});

router.post('/:id/products', async (req, res) => {
	const { id } = req.params;
	const { name, price, category } = req.body;
	const farm = await Farm.findById(id);
	const product = new Product({ name, price, category, farm });
	farm.products.push(product);
	console.log(farm);
	console.log(product);
	await farm.save();
	await product.save();
	res.redirect(`/farms/${id}`);
});

module.exports = router;
