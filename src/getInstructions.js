/* global log */
/* global handlers */
'use strict';

const makeMongoUrl = require('./makeMongoUrl');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');

function getInstructions(config){
    
    log('getting instructions...');
   
    const mongoUrl = makeMongoUrl(config.mongodb);
    
    mongodb.connect(mongoUrl, (error, db) => {
        
        if(error)
            return log('error getting instructions.', error);
            
        log('connected to mongodb. loading instructions...')
        
        db.collection('clients').find({ id: config.id }).toArray((err, data) => {
            
            let newConfig = data[0];
            
            log('loaded instructions for ' + newConfig.services.length + ' services. starting...');
            
            if(newConfig.version > config.version) {
                
                log('stored instructions were obsolete. saving new ones...');
                
                newConfig.mongodb = config.mongodb;
                
                fs.writeFileSync(path.resolve(__dirname + './../config.js'), 'module.exports = ' + JSON.stringify(newConfig));
            
                log('instructions updated. proceeding...');
            
            }
            
            for(let service of newConfig.services)
                handlers[service.type](service);
                
            log('getInstructions finished.');
            log('client operational.');
            
        });
        
    });
    
    
}

module.exports = getInstructions;