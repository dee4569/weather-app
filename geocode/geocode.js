const request = require('request');

var geocodeAddress = (address, callback) => {
request({
    url: ``,
    json: true
}, (error, response, body)=>{
    if(error){
        callback('Unable to connect to map quest servers');
    }else if(body.results[0].locations[0].geocodeQualityCode === 'A1XAX'){
        callback('Unable to find that address.');
    }else {
        callback(undefined,{
            address: body.results[0].providedLocation.location,
            latitude: body.results[0].locations[0].latLng.lat,
            longitude: body.results[0].locations[0].latLng.lng
        });
    }
});    
}

module.exports = {
    geocodeAddress
};