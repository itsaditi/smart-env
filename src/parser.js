
console.log('Before init : ', process.env);

require('./index').init();

console.log('After init: ', process.env);