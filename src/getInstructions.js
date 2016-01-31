/* global handlers */
'use strict';

const makeMongoUrl = require('./makeMongoUrl');
const mongodb = require('mongodb');
const fs = require('fs');

const log = (...args) => console.log('[' + new Date() + '] ', ...args);

function getInstructions(config){
    
    log('getting instructions...');
   
    const mongoUrl = makeMongoUrl(config.mongodb);
    
    mongodb.connect(mongoUrl, (error, db) => {
        
        if(error)
            return log('error getting instructions.', error);
            
        log('connected to mongodb. loading instructions...')
        
        db.collection('clients').find({ id: config.id }).toArray((err, data) => {
            
            let newConfig = data[0];
            
            log('loaded instructions for ' + newConfig.services.lengt + ' services. starting...');
            
            newConfig.initialized = true;
            
            fs.writeFileSync('./../config.js', JSON.stringify(newConfig));
            
            for(let service in newConfig.services)
                handlers[service.type](service);
                
            log('client operational.');
            
        });
        
    });
    
    
}

module.exports = getInstructions;