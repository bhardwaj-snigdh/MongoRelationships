const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		enum: ['dairy', 'vegetable', 'fruit'],
		lowercase: true,
		required: true,
	},
	farm: {
		type: Schema.Types.ObjectId,
		ref: 'Farm'
	}
});

module.exports = mongoose.model('Product', productSchema);
