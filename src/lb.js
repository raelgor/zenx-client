'use strict';

const lib = require('zenx').lb;

function handler(options) {
    
    var lb = new lib.LoadBalancer(options);
    
}

module.exports = handler;