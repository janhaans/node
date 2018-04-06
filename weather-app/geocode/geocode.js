const request = require('request');



var getGeoCode = (address, geocodeKey, geocodeCallback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            geocodeCallback('No connection with Google servers');
        } else if (body.status === "ZERO_RESULTS") {
            geocodeCallback("Unknown address");
        } else {
            geocodeCallback(undefined, {
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }     
    });
};

module.exports.getGeoCode = getGeoCode;