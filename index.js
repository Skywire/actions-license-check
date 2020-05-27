const core = require('@actions/core');
const github = require('@actions/github');

try {
    const namespaces = core.getInput('namespaces');
    console.log(`Searching ${namespaces}!`);

    core.error('License not found')
} catch (error) {
    core.setFailed(error.message);
}