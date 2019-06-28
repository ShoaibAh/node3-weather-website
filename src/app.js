const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for express config
const publicDirecotryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directories to serve
app.use(express.static(publicDirecotryPath));

app.get('', (req, res) => {
    res.render('index', {title: "Weather App", name: "Shoaib Ahmed"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About Me", name: "Shoaib Ahmed"})
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({error: "You must provide address"})
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
    
       forecast(latitude, longitude, (error, forecastData) => {
           if(error) {
               return res.send({error})
            }
            // const { forecast, temperature, possibility } = forecastData;
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
       })
    })
    // res.send({
    //             forecast: "its snowing",
    //             location: "Mumbai",
    //             address:req.query.address
    //         });
})

app.get('/help', (req, res) => {
    res.render('help', {title: "Help", helpText: "help text goes here...", name:"Shoaib Ahmed"})
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: "404", name:"Shoaib Ahmed", errorMessage: 'Help article not found'})
});

app.get('*', (req, res) => {
    res.render('404', {title: "404", name:"Shoaib Ahmed", errorMessage: 'Page not found!'})
});

app.listen(3000, ()=> {
    console.log('Express server running on port 3000');
})