/* global handlers */
'use strict';

const makeMongoUrl = require('./makeMongoUrl');
const mongodb = require('mongodb');
const fs = require('fs');

function getInstructions(config){
   
    const mongoUrl = makeMongoUrl(config.mongodb);
    
    mongodb.connect(mongoUrl, (error, db) => {
        
        db.collection('clients').find({ id: config.id }).toArray((err, data) => {
            
            let newConfig = data[0];
            
            newConfig.initialized = true;
            
            fs.writeFileSync('./../config.js', JSON.stringify(newConfig));
            
            for(let service in newConfig.services)
                handlers[service.type](service);
            
        });
        
    });
    
    
}

module.exports = getInstructions;