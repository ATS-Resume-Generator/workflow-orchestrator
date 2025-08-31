const { Octokit } = require("@octokit/rest");
const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function triggerWorkflow(workflowId, inputs) {
  try {
    const response = await octokit.actions.createWorkflowDispatch({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      workflow_id: workflowId,
      ref: 'main', // or the branch you want to trigger the workflow on
      inputs: inputs,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger workflow: ${error.message}`);
  }
}

async function getWorkflowRunStatus(runId) {
  try {
    const response = await octokit.actions.getWorkflowRun({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      run_id: runId,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get workflow run status: ${error.message}`);
  }
}

module.exports = {
  triggerWorkflow,
  getWorkflowRunStatus,
};