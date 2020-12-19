const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = 8080;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const productsRouter = require('./routers/productsRouter');
const farmRouter = require('./routers/farmRouter');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use('/products', productsRouter);
app.use('/farms', farmRouter);

mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to database'))
	.catch(err => console.error('Some connection error'));


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
