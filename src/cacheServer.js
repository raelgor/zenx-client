/* global log */
'use strict';

const fs = require('fs');
const cp = require('child_process');
const cache = require('zenx-cache');

function handler(options) {
    
    log(`starting a cache server on ${options.host}:${options.port}...`);
    
    let server = new cache.Server(options);
    
    log('cache server started. proceeding...');
    
}

module.exports = handler;