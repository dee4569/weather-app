
const request = require('request');

var getWeather = (lat,lng, callback) =>{
    request({
        url: `https://api.darksky.net/forecast/0488eb0fb1507d858af1eae2b299fcc0/${lat},${lng}`,
        json: true
    }, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        }else {
            callback('Unable to fetch');
        }
    });    
}

module.exports = {
    getWeather,
}