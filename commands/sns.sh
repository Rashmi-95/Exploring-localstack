
// create topic
aws --endpoint-url=http://localhost:4575 sns create-topic --name sns-topic

// list topics
aws --endpoint-url=http://localhost:4575 sns list-topics  


// subscribe queue
aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:us-east-2:123456789012:sns-topic --protocol sqs --notification-endpoint arn:aws:sns:us-east-2:queue:doc-queue

// subscribe lambda
aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:us-east-2:123456789012:sns-topic --protocol lambda --notification-endpoint arn:aws:lambda:us-east-2:000000000000:function:triggerStepFunction

aws --endpoint-url=http://localhost:4575 sns subscribe --topic-arn arn:aws:sns:us-east-2:123456789012:sns-topic --protocol lambda --notification-endpoint arn:aws:lambda:us-east-2:000000000000:function:sqsFunction


// list subscriptions 
aws --endpoint-url=http://localhost:4575 sns list-subscriptions

// unsubscribe 
aws --endpoint-url=http://localhost:4575 sns unsubscribe --subscription-arn <arn>

// send message
aws --endpoint-url=http://localhost:4575 sns publish --topic-arn arn:aws:sns:us-east-2:123456789012:sns-topic --message "Hi"
