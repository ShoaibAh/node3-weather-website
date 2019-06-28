const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hvYWliYWgiLCJhIjoiY2p4NjhudTJjMDhkejQ5bDh5dmg2bGoyaiJ9.7X59QF0GpsDn4yGlUFEX3A&limit=1`;
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect geolocation service!', undefined);
        } 
        else if(body.features.length === 0) {
            callback('Unable to find location. Please refine your search! ', undefined);
        }    
        else {
            const data = body.features[0].center;
            const latitude = data[1];
            const longitude = data[0];
            const location = body.features[0].place_name;
            callback(undefined, {latitude, longitude,location});
        }
    })
}

module.exports = geocode;