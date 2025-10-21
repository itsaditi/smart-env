require('dotenv');
console.log(process.env);

function init() {
    process.env = {
        ...process.env,
        test: 'testKey',
    }
};

module.exports = {
    init,
};