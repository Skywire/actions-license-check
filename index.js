const core = require('@actions/core');
const github = require('@actions/github');
const licenseFinder = require("./license-finder");

try {
    const namespaces = core.getInput('namespaces');
    console.log(`Searching ${namespaces}`);

    var missing = licenseFinder.findMissingLicenses(namespaces.split(','));

    if(missing.length > 0) {
        let missingString = missing.join("\n");
        throw new Error("LICENSE.txt missing from these paths:\n" + missingString);
    }
} catch (error) {
    core.setFailed(error.message);
}