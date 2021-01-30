//creating custom middleware
function log  (req, res, next) {
    console.log('Logging...');
    next();//if we don't use thos then our requst will be hagning 
};
module.exports = log;