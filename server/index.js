// Requiring packages
require('dotenv').config();
const app = require('express')();
const fs = require('fs');
const XLSX = require('xlsx');
const cors = require('cors');

// Middleware
app.use(cors());

// Variables
const port = process.env.PORT || 8000;
const link = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : '';

// App routes
app.get('/', (req, res) => {
	//Converting data to JSON
	const workbook = XLSX.readFile('./Sample.xlsx');
	const sheet_name = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheet_name];
	const jsa = XLSX.utils.sheet_to_json(worksheet);
	let uniqueCategories = [];
	const result = jsa.reduce((categories, product) => {
		const category = product['Category'];
		if (categories[category] == undefined) {
			categories[category] = [];
			uniqueCategories.push(category);
		}
		categories[category].push(product);
		return categories;
	});
	res.json({
		data: result,
		set: uniqueCategories
	});
});

// Starting server
app.listen(port, () => {
	console.log(`App Started.. Click here to visit the app: ${link}`);
});
