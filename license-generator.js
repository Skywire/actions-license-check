const { copyFileSync } = require('fs')
const { resolve } = require('path')

module.exports = {
    addLicenses: function(paths) {
        const license = resolve(__dirname, 'LICENSE.dist');
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