// Module requires
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const news = require('./utils/news');

// Creates an express app
const app = express();
const port = process.env.PORT || 3000;

// Define path for Express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.get('/news', (req, res) => {

    news('br', (error, data) => {
        if (error) {
            return res.send(error);
        }

        res.send(data);
    });
    
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Página Não Encontrada',
        message: 'A página que estava procurando não existe.'
    })
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
})