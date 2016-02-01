/* global log */
'use strict';

const lib = require('zenx').lb;

function handler(options) {
    
    log('starting load-balancer service...');
    
    var lb = new lib.LoadBalancer({
        host: options.host,
        port: options.port,
        protocol: options.protocol,
        ssl: options.ssl
    });
    
    for(let ruleOptions of options.rules)
        lb.addRule(new lib.Rule(ruleOptions));
        
    for(let tgOptions of options.targetGroups)
        lb.addTargetGroup(new lib.TargetGroup(tgOptions));
    
    lb.on('listening', () => log('load-balancer listening.'));
    
    log('load-balancer service started. proceeding...');
    
}

module.exports = handler;