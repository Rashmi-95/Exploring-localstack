const { sqs } = require('../config/constant');


const createSqs = async (sqsName) => {
  const params = {
    QueueName: sqsName,
    Attributes: {
      'DelaySeconds': '60',
      'MessageRetentionPeriod': '86400'
    }
  };
  try {
    let result = await sqs.createQueue(params).promise();
    result = await sqs.getQueueUrl({ QueueName: sqsName }).promise();
    return result.QueueUrl;
  } catch (err) {
    throw err
  }
};

const listSqs = async () => {
  try {
    const result = await sqs.listQueues({}).promise();
    return result;
  } catch (err) {
    throw err
  }
};

const deleteSqsMessage = async (QueueName, handle) => {
  var deleteParams = {
    QueueUrl: `http://localhost:4576/queue/${QueueName}`,
    ReceiptHandle: handle
  };
  try {
    const result = await sqs.deleteMessage(deleteParams).promise();
    return result;
  } catch (err) {
    throw err
  }
};

const receiveSqsMessage = async (QueueName) => {
  const params = {
    AttributeNames: [
      "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      "All"
    ],
    QueueUrl: `http://localhost:4576/queue/${QueueName}`,
    VisibilityTimeout: 10,
  };
  try {
    const result = await sqs.receiveMessage(params).promise();
    return result;
  } catch (err) {
    throw err
  }
};

const sendSqsMessage = async (QueueName, message) => {
  const params = {
    DelaySeconds: 2,
    MessageBody: message,
    QueueUrl: `http://localhost:4576/queue/${QueueName}`
  };
  try {
    const result = await sqs.sendMessage(params).promise();
    return result;
  } catch (err) {
    throw err
  }
};

const deleteSqs = async (QueueName) => {
  var deleteParams = {
    QueueUrl: `http://localhost:4576/queue/${QueueName}`
  };
  try {
    const result = await sqs.deleteQueue(deleteParams).promise();
    return result;
  } catch (err) {
    throw err
  }
};

// createSqs('test-3').then(r => console.log(r))
// listSqs().then(r => console.log(r));
// sendSqsMessage('test', JSON.stringify({ name: 'rashmi' })).then(r => console.log(r))

// receiveSqsMessage('test').then(r => {
//   deleteSqsMessage('test', r.Messages[0].ReceiptHandle).then(r => console.log(r));
// });

// deleteSqs('test-2').then(r => console.log(r));

module.exports = {
  createSqs,
  listSqs,
  deleteSqsMessage,
  receiveSqsMessage,
  sendSqsMessage,
  deleteSqs
};