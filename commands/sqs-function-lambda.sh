aws lambda --endpoint http://0.0.0.0:4574 create-function --function-name sqsFunction --runtime nodejs8.10 --role lime-role --handler index.handler --zip-file fileb://sqs-lambda/sqsLambda.zip


// example to test 
aws lambda --endpoint http://0.0.0.0:4574 invoke --invocation-type RequestResponse --function-name sqsFunction --payload file://files/sqs-sample-message.json output/sqs-function-output.txt

aws lambda --endpoint http://0.0.0.0:4574 invoke --function-name sqsFunction ./output/trigger-output.txt


// creating mapping
aws lambda --endpoint http://0.0.0.0:4574 create-event-source-mapping --function-name sqsFunction --event-source arn:aws:sqs:us-east-2:queue:doc-queue --batch-size 1

// list mapping
aws lambda --endpoint http://0.0.0.0:4574 list-event-source-mappings --function-name sqsFunction --event-source arn:aws:sqs:us-east-2:queue:doc-queue

//delete mapping
aws lambda --endpoint http://0.0.0.0:4574 delete-event-source-mapping --uuid <uid>
