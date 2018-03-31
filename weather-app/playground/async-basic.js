console.log('Begin application');

setTimeout(() => {
    console.log('This callback function is called after 2 seconds');
}, 2000);

setTimeout(() => {
    console.log('This callback function is called after 0 seconds');
}, 0);

console.log('End application');