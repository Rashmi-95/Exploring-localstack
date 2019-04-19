// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');

// Set the region 
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "AKIAIYBJD3QCVPFCUFDQ",
  secretAccessKey: "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",
  apiVersions: {
    lambda: '2015-03-31',
    sqs: '2012-11-05'
  },
  force_path_style: true
});

// Create a lambda object
const lambda = new AWS.Lambda({
  endpoint: 'http://172.30.204.78:4574'
});
const sqs = new AWS.SQS();

const sqsParams = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: "http://localhost:4576/queue/doc-queue",
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

const lambdaParams = {
  FunctionName: 'triggerStepFunction',
  InvocationType: 'RequestResponse',
  LogType: 'None'
};


sqs.receiveMessage(sqsParams, function (err, sqsData) {
  if (err) {
    console.log("Receive Error", err);
  } else if (sqsData.Messages) {
    console.log('sqsData', sqsData);
    lambda.invoke(lambdaParams, function (err, lambdaData) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log('lambdaData', lambdaData);
        const deleteParams = {
          QueueUrl: sqsParams.QueueUrl,
          ReceiptHandle: sqsData.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function (err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
    });
  }
});