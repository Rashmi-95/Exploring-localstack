const AWS = require('aws-sdk');

const os = require('os');
const networkInterfaces = os.networkInterfaces();
const endpointUrl = `http://${networkInterfaces.en0[1].address}`;
const region = "us-east-2";
const port = {
  lambda: 4574,
  sqs: 4576,
  sns: 4575,
  stepfunctions: 4584,
  s3: 4572
};

AWS.config.update({
  region,
  force_path_style: true,
  accessKeyId: "AKIAIYBJD3QCVPFCUFDQ",
  secretAccessKey: "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",
  apiVersions: {
    lambda: '2015-03-31',
    sqs: '2012-11-05',
    sns: '2010-03-31',
    s3: '2006-03-01',
    stepfunctions: '2016-11-23'
  }
});

const sqs = new AWS.SQS({ endpoint: `${endpointUrl}:${port.sqs}` });
const sns = new AWS.SNS({ endpoint: `${endpointUrl}:${port.sns}` });
const lambda = new AWS.Lambda({ endpoint: `${endpointUrl}:${port.lambda}` });
const stepfunction = new AWS.StepFunctions({ endpoint: `${endpointUrl}:${port.stepfunctions}` });
const s3 = new AWS.S3({ });

module.exports = { sqs, sns, lambda, stepfunction, s3, region };