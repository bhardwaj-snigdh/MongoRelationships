const mongoose = require('mongoose');
const Farm = require('../models/farm');

mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('Connected'))
	.catch(err => console.error(err));

const seedFarms = async () => {
	const res = await Farm.insertMany([
		{ name: 'Raspberry Farms', city: 'Dehradun', email: 'raspberry@farms.com', },
		{ name: 'Pinewood Farms', city: 'Meerut', email: 'pinewood@farms.com', },
		{ name: 'Bluewater Farms', city: 'Kashipur', email: 'bluewaater@farms.com', },
	]);
	console.log(res);
}

seedFarms();
mongoose.connection.close();
