const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedaddress = encodeURIComponent(address);
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=5OIUPoHfuNJ4I6AA17lGySDW2sCmP9WK&location= ${encodedaddress}`,
            json: true
        }, (error, response, body)=>{
            if(error){
                reject('Unable to connect to map quest servers');
            }else if(body.results[0].locations[0].geocodeQualityCode === 'A1XAX'){
                reject('Unable to find that address.');
            }else {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        })
    });
};

geocodeAddress('1914sdfsd6').then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})

