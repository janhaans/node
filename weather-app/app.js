const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

var argv = yargs
    .options({
        a: {
            alias: 'address',
            describe: 'Provide an address',
            type: 'string',
            demand: true
        }
    })
    .help('help')
    .alias('h', 'help')
    .argv;

var address = argv.address;
const geocodeKey = process.env.GEOCODE_KEY;

geocode.getGeoCode(encodeURIComponent(address), geocodeKey, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else if (result) {
        console.log(`Address = ${address}`);
        console.log(`Latitude = ${result.latitude}`);
        console.log(`Longitude = ${result.longitude}`);
    }
});