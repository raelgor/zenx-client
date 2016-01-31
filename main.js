'use strict';

const config = require('./config');
const mongodb = require('mongodb');
const makeMongoUrl = require('./src/makeMongoUrl');
const getInstructions = require('./src/getInstructions');

const handlers = {
    "load-balancer": require('./src/lb'),
    "eval": require('./src/eval')
}

if(!config.initialized)
    getInstructions();
else
    for(let service in config.services)
        handlers[service.type](service);

