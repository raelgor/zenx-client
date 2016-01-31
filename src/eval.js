'use strict';

const fs = require('fs');
const cp = require('child_process');

function handler(options) {
    
    cp.execSync('git clone ' + options.repository);

    let repoName = options.repository.match(/\/([a-zA-Z0-9\-\.]*)\.git$/)[1];
    
    for(let file of options.configuration)
        fs.writeFileSync('./' + repoName + '/' + file.filename, JSON.stringify(file.contents));
        
    cp.exec(options.script);
    
}

module.exports = handler;