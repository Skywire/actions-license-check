const core = require('@actions/core');
const github = require('@actions/github');
const licenseFinder = require("./license-finder");
const licenseGenerator = require("./license-generator");

try {
    const namespaces = core.getInput('namespaces');
    console.log(`Searching ${namespaces}`);

    var missing = licenseFinder.findMissingLicenses(namespaces.split(','));

    if(missing.length > 0) {
        let missingString = missing.join("\n");
        console.log("LICENSE.txt missing from these paths:\n" + missingString);
        console.log('Auto generating missing licenses');
        licenseGenerator.addLicenses(missing);
    }
} catch (error) {
    core.setFailed(error.message);
}