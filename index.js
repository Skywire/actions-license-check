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
        const message = ("LICENSE.txt missing from these paths:\n" + missingString);
        if(core.getInput('auto_generate')) {
            console.log(message);
            console.log('Auto generating missing licenses');
            licenseGenerator.addLicenses(missing);
        } else {
            throw new Error(message);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}