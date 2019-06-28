const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2f2728a2f8bd35d57948fd72ee7cf790/${latitude},${longitude}?units=si`;
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect weather service', undefined);
        } else if (body.error){
            callback('Unable to find the location', undefined);
        } else {
            // const data = body;
           callback(undefined, `${body.daily.data[0].summary}. This is is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        //    callback(undefined, {forecast:body.daily.data[0].summary, temperature:body.currently.temperature, possibility: body.currently.precipProbability})
        }
    })
}

module.exports = forecast;