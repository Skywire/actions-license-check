const { readdirSync, statSync, copyFileSync, existsSync } = require('fs')
const { resolve } = require('path')

module.exports = {
    addLicenses: function(paths) {
        const license = resolve(__dirname,'LICENSE.txt');
        paths.forEach(path => {
            var workspace = process.env.GITHUB_WORKSPACE;
            if(!workspace) {
                workspace = __dirname;
            }
            const dest = resolve(workspace, path) + '/LICENSE.txt';
            copyFileSync(license, dest);
          });
    }
}