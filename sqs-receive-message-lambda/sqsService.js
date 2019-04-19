// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "AKIAIYBJD3QCVPFCUFDQ",
  secretAccessKey: "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"
});

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

var params = {
  DelaySeconds: 10,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Whistler"
    },
    "Author": {
      DataType: "String",
      StringValue: "John Grisham"
    },
    "WeeksOn": {
      DataType: "Number",
      StringValue: "6"
    }
  },
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  QueueUrl: `http://localhost:4576/queue/doc-queue`
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});