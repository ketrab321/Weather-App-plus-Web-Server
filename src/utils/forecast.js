const request = require('request');

const forecast= (latitude,longitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/94f2fdef961f7eab168800ccd1306646/'+latitude+','+longitude+'?units=si&lang=pl';
    //console.log(url);
    request({url,json: true},(error, {body}) => {
        //console.log(response.body);
        if(error){
            callback('Unable to connect to forecast services',undefined);
        }
        else if(body.error){
            callback('Unable to find forecast. Try another search',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary +" Obecna temperatura: " + body.currently.temperature + " °C. Prawdopodobieństwo deszczu " + body.currently.precipProbability + " %");
        }

    })
}
module.exports=forecast
