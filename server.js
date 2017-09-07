const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');	//register hbs partials
app.set('view engine', 'hbs');	//Using hbs as the default view engine

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();	//Register the parameter in partials
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to access server.log');
		}
	});
	next();
});

/*
app.use((req, res, next) => {	
	//using middleware to redirect any request to maintenance page
	res.render('maintenance.hbs');
});
*/

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	res.send('<h1>About Page</h1>');
});

app.get('/json', (req, res) => {
	res.send({
		name: 'Fan',
		age: 34,
		hobbies: ['Sport','Music', 'Biking']
	});
})

app.use(express.static(__dirname + '/public'));	//set up and display a static page

app.get('/contact', (req, res) => {
	res.render('contact.hbs', {
		pageTitle: 'Contact Page',
		currentYear: new Date().getFullYear()
	});
})

app.listen(3000, () => {
	console.log('App listening on port 3000...');
});