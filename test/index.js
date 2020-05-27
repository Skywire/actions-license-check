var chai = require('chai');
var licenseFinder = require('../license-finder.js')

describe('License Finder', function () {
    describe('#getDirs', function () {
        it('should return 2 directory paths', function () {
            let namespaces = ['app/code/Foo', 'app/code/Bar'];
            let dirs = licenseFinder.getDirs(namespaces);
            chai.assert.lengthOf(dirs, 2)
        });
    });

    describe('#findMissingLicenses', function () {
        it('should return 2 license file paths', function () {
            let missing = licenseFinder.findMissingLicenses(['app/code/Foo', 'app/code/Bar'])
            chai.assert.lengthOf(missing, 2)
        });
    });
});