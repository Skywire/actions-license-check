var chai = require('chai');
var licenseFinder = require('../license-finder.js')

const fsmock = require('mock-fs');
 
fsmock({
  'app/code/Foo': {
    'Foo1': {/** empty directory */},
    'Foo2': {'LICENSE.txt': 'file content here',},
  },
  'app/code/Bar': {
    'Bar1': {'LICENSE.txt': 'file content here',},
    'Bar2': {/** empty directory */},
  },
});

describe('License Finder', function () {
    describe('#getDirs', function () {
        it('should return 4 directory paths', function () {
            let namespaces = ['app/code/Foo', 'app/code/Bar'];
            let dirs = licenseFinder.getDirs(namespaces);
            chai.assert.lengthOf(dirs, 4)
        });
    });

    describe('#findMissingLicenses', function () {
        it('should return 2 directory paths without LICENSE.txt files', function () {
            let missing = licenseFinder.findMissingLicenses(['app/code/Foo', 'app/code/Bar'])
            chai.assert.lengthOf(missing, 2)
            chai.expect(["app/code/Foo/Foo1", "app/code/Bar/Bar2"]).to.eql(missing);
        });
    });
});