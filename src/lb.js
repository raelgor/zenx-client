/* global log */
'use strict';

const lib = require('zenx').lb;

function handler(options) {
    
    log('starting load-balancer service...');
    
    var lb = new lib.LoadBalancer(options);
    
    log('load-balancer service started. proceeding...');
    
}

module.exports = handler;