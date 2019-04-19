// Load the AWS SDK for Node.js
let AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: "local",
  accessKeyId: "AKIAIYBJD3QCVPFCUFDQ",
  secretAccessKey: "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",
  apiVersions: {
    lambda: '2015-03-31',
    sqs: '2012-11-05',
    s3: '2006-03-01'
  }
});

const lambda = new AWS.Lambda();
const sqs = new AWS.SQS();
const sns = new AWS.SNS();
const s3 = new AWS.S3();


s3.createBucket({ Bucket: 'refresh-lambda-bucket' }, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
    var uploadParams = { Bucket: 'refresh-lambda-bucket', Key: '', Body: '' };
    var file = '../refresh-lambda/refreshLambda.zip';

    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    var path = require('path');
    uploadParams.Key = path.basename(file);

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
        var params = {
          Code: { /* required */
            S3Bucket: 'refresh-lambda-bucket',
            S3Key: 'refreshLambda.zip'
          },
          FunctionName: 'slotTurn', /* required */
          Handler: 'index.handler', /* required */
          Role: 'arn:aws:iam::555716740514:role/lime', /* required */
          Runtime: 'nodejs8.10', /* required */
          Description: 'Slot machine game results generator'
        };
        lambda.createFunction(params, function (err, data) {
          if (err) console.log(err); // an error occurred
          else console.log("success");// successful response
        });
      }
    });
  }
});
