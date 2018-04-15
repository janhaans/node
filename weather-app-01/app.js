const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .option('a', {
        alias: 'address',
        describe: 'provide an address',
        type: 'string',
        demand: true,
        demand: 'An address is required'
    })
    .alias('h', 'help')
    .help('help')
    .argv;

var address = encodeURIComponent(argv.address);
const lKey = process.env.GEOCODE_KEY;
const wKey = process.env.DARK_SKY;

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${lKey}`)
    .then( response => {
        console.log(`Address = ${response.data.results[0].formatted_address}`);
        latitude = response.data.results[0].geometry.location.lat;
        longitude = response.data.results[0].geometry.location.lng;
        console.log(`Latitude = ${latitude}`);
        console.log(`Longitude = ${longitude}`);
        return axios.get(`https://api.darksky.net/forecast/${wKey}/${latitude},${longitude}`);
    })
    .then( response => {
        temperature = parseFloat(response.data.currently.temperature);
        console.log(`Temperature = ${((temperature-32)*(5/9)).toFixed(2)} Celsius`);
    })
    .catch( errorMessage => {
        if (errorMessage.code === 'ENOTFOUND') {
            console.log('Can not connect to servers');
        } else {
            console.log(errorMessage);
        }   
    });

