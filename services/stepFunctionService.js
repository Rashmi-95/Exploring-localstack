const { stepfunction } = require('../config/constant');

const createStepfunction = async (name, resource) => {
  const params = {
    name,
    roleArn: 'arn:aws:iam::0123456789:role/service-role/MyRole',
    definition: JSON.stringify({
      "Comment": name,
      "StartAt": "refreshCache",
      "States": {
        "refreshCache": {
          "Type": "Task",
          "Resource": resource,
          "TimeoutSeconds": 5,
          "Retry": [{ "ErrorEquals": ["States.Timeout"], "IntervalSeconds": 10, "MaxAttempts": 5, "BackoffRate": 2 }],
          "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "Fail" }],
          "End": true
        },
        "Fail": { "Type": "Fail", "Error": "Error", "Cause": "error" }
      }
    })
  };
  try {
    let result = stepfunction.createStateMachine(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteStepfunction = async (stateMachineName) => {
  const stateMachineArn = stateMachineName.includes('arn') ? stateMachineName : 'arn:aws:states:us-east-2:0123456789:stateMachine:' + stateMachineName;

  const params = { stateMachineArn };
  try {
    let result = await stepfunction.deleteStateMachine(params).promise();
    return result;
  } catch (err) {
    throw err
  }
};

const executeStepfunction = async () => {

};

const listStepfunction = async () => {
  try {
    let result = await stepfunction.listStateMachines({}).promise();
    return result;
  } catch (err) {
    throw err
  }
};

// createStepfunction('refresh-cache-state-machine', "arn:aws:lambda:us-east-2:000000000000:function:refreshFunction").then(r => console.log(r))
// deleteStepfunction('refresh-cache-state-machine').then(r => console.log(r))
// listStepfunction().then(r => console.log(r))

module.exports = {
  createStepfunction,
  deleteStepfunction,
  executeStepfunction,
  listStepfunction
};