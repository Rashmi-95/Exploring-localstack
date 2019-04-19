
// create sqs
aws --endpoint-url=http://localhost:4576 sqs create-queue --queue-name doc-queue

// list sqs
aws --endpoint-url=http://localhost:4576 sqs list-queues


// send message
aws --endpoint-url=http://localhost:4576 sqs send-message --queue-url http://localhost:4576/queue/doc-queue --message-body 'Test Message 1 -debug'


=================================== not working yet ======================================

// receive message
aws --endpoint-url=http://localhost:4576 sqs receive-message --queue-url http://localhost:4576/queue/doc-queue


// delete message
aws --endpoint-url=http://localhost:4576 sqs delete-message --queue-url http://localhost:4576/queue/doc-queue --receipt-handle <ReceiptHandle>