const mongoose = require('mongoose');

const { Schema } = mongoose;

const farmSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	city: {
		type: String,
		required: true
	},
	email: {
		type: String,
		require: true
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
});

module.exports = mongoose.model('Farm', farmSchema);
