const AWS = require('aws-sdk');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

const stepFunctions = new AWS.StepFunctions({
  region: "us-east-2",
  accessKeyId: "AKIAIYBJD3QCVPFCUFDQ",
  secretAccessKey: "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",
  endpoint: `http://${networkInterfaces.en0[1].address}:4584`,
});

exports.handler = (event, context, callback) => {

  // stepfunctionsLocal.startExecution()
  const params = {
    stateMachineArn: 'arn:aws:states:us-east-2:0123456789:stateMachine:refresh-cache-state-machine',
    // input: JSON.stringify({}), Optional if your statemachine requires an application/json input, make sure its stringified 
    name: `TestExecution2${Math.round(Math.random()*1000,3)}` // name can be anything you want, but it should change for every execution
  };

  stepFunctions.startExecution(params, (err, data) => {
    if (err) {
      console.log(err);
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: err
        })
      };
      callback(null, response);
    } else {
      console.log(data);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data
        })
      };
      callback(null, response);
    }
  });
}; 