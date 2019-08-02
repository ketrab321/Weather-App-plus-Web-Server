const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'..','public');
const viewsPath = path.join(__dirname,'..','templates','views');
const partialsPath = path.join(__dirname,'..','templates','partials');
const port = process.env.port || 3000;

const app = express();
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
//setup handlebars engine
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: 'Bartosz Stajnowski'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help me",
        name:'Bartosz Stajnowski'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About me",
        name: 'Bartosz Stajnowski'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide address field'
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });   
})

app.get('/products',(req,res)=>{
    if(!req.query.key){
        return res.send({
            error: 'You must provide key term'
        })
    }
    
        console.log(req.query.key);
        res.send({
            products: []
        })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Bartosz Stajnowski'
    });
})
app.get('*',(req,res)=>{
    res.render('404page',{
        title: '404',
        errorMessage: 'not found',

        name: 'Bartosz Stajnowski'
    });
})

app.listen(port,()=>{
    console.log("Server is up on port " + port);
});