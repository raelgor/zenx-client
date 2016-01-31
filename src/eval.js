/* global log */
'use strict';

const fs = require('fs');
const cp = require('child_process');

function handler(options) {
    
    let repoName = options.repository.match(/\/([a-zA-Z0-9\-\.]*)\.git$/)[1];
    
    try { fs.statSync('./' + repoName) } catch(err) {
        log('repo missing. cloning...');
        cp.execSync('git clone ' + options.repository);
        cp.execSync('cd ' + repoName + ' & npm i');
    }
    
    log('repo present. running scripts...');

    for(let file of options.configuration)
        fs.writeFileSync('./' + repoName + '/' + file.filename, JSON.stringify(file.contents));
        
    cp.exec(options.script).stdout.pipe(process.stdout);
    
    log('eval service started. proceeding...');
    
}

module.exports = handler;