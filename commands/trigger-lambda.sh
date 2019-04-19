aws lambda --endpoint http://0.0.0.0:4574 create-function --function-name triggerStepFunction --runtime nodejs8.10 --role arn:aws:iam::555716740514:role/lime --handler index.handler --zip-file fileb://trigger-lambda/triggerLambda.zip


aws lambda --endpoint http://0.0.0.0:4574 invoke --function-name triggerStepFunction ./output/trigger-output.txt