const { readdirSync, statSync } = require('fs')
const { join } = require('path')

module.exports = {
    getDirs: function(namespaces) {
        var directories = [];
        namespaces.forEach(path => {
            const dirs = readdirSync(path)
            
            dirs.forEach(filePath => {
                if(statSync(path+'/'+filePath).isDirectory()) {
                    directories.push(path+'/'+filePath);
                }
            });

        });
        
        return directories;
    },

    findMissingLicenses: function (namespaces) {
        const dirs = this.getDirs(namespaces);
        var missing = [];

        dirs.map(function(path, index) {
            const files = readdirSync(path);
            if(files.indexOf('LICENSE.txt') === -1) {
                missing.push(path);
            }
        });

        return missing;
    }
}