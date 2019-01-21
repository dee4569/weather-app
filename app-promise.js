const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },

        d:{
            alias: 'default',
            describe: 'Default address to check'
        }
})
    .help()
    .alias('help', 'h')
    .argv;

var encodedaddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=5OIUPoHfuNJ4I6AA17lGySDW2sCmP9WK&location= ${encodedaddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.results[0].locations[0].geocodeQualityCode === 'A1XAX'){
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/0488eb0fb1507d858af1eae2b299fcc0/${lat},${lng}`;
    
    var addressDetails = ``;
    console.log(response.data);
    return axios.get(weatherUrl);
}).then((response) =>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    }else{
        console.log(e.message);
    }
});




