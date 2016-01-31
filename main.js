/* global log */
/* global handlers */
'use strict';

const config = require('./config');
const mongodb = require('mongodb');
const getInstructions = require('./src/getInstructions');

global.log = (...args) => console.log('[' + new Date() + '] ', ...args);
global.handlers = {
    "load-balancer": require('./src/lb'),
    "eval": require('./src/eval')
}

if(!config.initialized)
    getInstructions(config);
else
    for(let service in config.services)
        handlers[service.type](service);

log('client operational.');