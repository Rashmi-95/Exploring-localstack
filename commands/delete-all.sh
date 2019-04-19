aws iam delete-role --role-name role-lambda

aws lambda --endpoint http://0.0.0.0:4574 delete-function --function-name simpleFunction

aws lambda --endpoint http://0.0.0.0:4574 delete-function --function-name triggerStepFunction

aws lambda --endpoint http://0.0.0.0:4574 delete-function --function-name refreshFunction

aws lambda --endpoint http://0.0.0.0:4574 delete-function --function-name sqsFunction

aws stepfunctions --endpoint http://0.0.0.0:4584 delete-state-machine --state-machine-arn arn:aws:states:us-east-2:0123456789:stateMachine:refresh-cache-state-machine

aws stepfunctions --endpoint http://0.0.0.0:4584 stop-execution --execution-arn arn:aws:states:local:0123456789:execution:refresh-cache-state-machine:refresh-cache-execution