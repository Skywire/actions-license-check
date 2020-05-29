const { readdirSync } = require('fs')
const chai = require('chai');
const licenseFinder = require('../license-finder.js')
const licenseGenerator = require('../license-generator.js')
const fsmock = require('mock-fs');
 
fsmock({
  "LICENSE.dist": 'Lorem ispsum dolor sit amet',
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

describe('License Generator', function () {
  describe('#addLicenses', function () {
      it('Should add license files to missing paths', function () {
          paths = [
            'app/code/Foo/Foo1',
            'app/code/Bar/Bar2',
          ];

          paths.forEach(path => {
            const files = readdirSync(path);
            chai.expect(files).not.include('LICENSE.txt');
          });

          licenseGenerator.addLicenses(paths);

          paths.forEach(path => {
            const files = readdirSync(path);
            chai.expect(files).include('LICENSE.txt');
          });
      });
  });
});