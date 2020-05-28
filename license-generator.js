const { readdirSync, statSync, copyFileSync, existsSync } = require('fs')
const { resolve } = require('path')

module.exports = {
    addLicenses: function(paths) {
        const license = 'LICENSE.txt';
        paths.forEach(path => {
            const dest = path + '/LICENSE.txt';
            copyFileSync(license, dest);
          });
    }
}