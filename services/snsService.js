const { sns } = require('../config/constant');

const createSnsTopic = async (topicName) => {
  try {
    const result = await sns.createTopic({ Name: topicName }).promise();
    return result.TopicArn;
  } catch (err) {
    throw err;
  }
};

const listSnsTopics = async () => {
  try {
    const result = await sns.listTopics({}).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const subscribeSnsTopic = async (protocol, topicName, serviceArn) => {
  const TopicArn = topicName.includes('arn') ? topicName : 'arn:aws:sns:us-east-2:123456789012:' + topicName;
  const Endpoint = serviceArn.includes('arn') ? serviceArn : 'arn:aws:lambda:us-east-2:000000000000:function:' + serviceArn;
  var params = {
    Protocol: protocol,
    TopicArn,
    Endpoint
  };
  try {
    const result = await sns.subscribe(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const listSnsSubscriptions = async (topicName) => {
  const TopicArn = topicName.includes('arn') ? topicName : 'arn:aws:sns:us-east-2:123456789012:' + topicName;
  try {
    const result = await sns.listSubscriptionsByTopic({ TopicArn }).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const unSubscribeSnsTopic = async (SubscriptionArn) => {
  try {
    const result = await sns.unsubscribe({ SubscriptionArn }).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const sendSnsMessage = async (topicName, message) => {
  const TopicArn = topicName.includes('arn') ? topicName : 'arn:aws:sns:us-east-2:123456789012:' + topicName;
  const params = {
    Message: message,
    TopicArn
  };
  try {
    const result = await sns.publish(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteSnsTopic = async (topicName) => {
  const TopicArn = topicName.includes('arn') ? topicName : 'arn:aws:sns:us-east-2:123456789012:' + topicName;
  try {
    const result = await sns.deleteTopic({ TopicArn }).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

// createSnsTopic('test).then(r => console.log(r))
// listSnsTopics().then(r => console.log(r))
// subscribeSnsTopic('lambda', 'test', 'triggerStepFunction').then(r => console.log(r))
// listSnsSubscriptions('test').then(r => console.log(r))
// unSubscribeSnsTopic('arn:aws:sns:us-east-2:123456789012:test:ca4aa096-5e5c-4248-93e2-31ff9fcc8fb5').then(r => console.log(r))
// deleteSnsTopic('test).then(r => console.log(r))
// sendSnsMessage('test', 'message').then(r => console.log(r))

module.exports = {
  createSnsTopic,
  listSnsTopics,
  subscribeSnsTopic,
  listSnsSubscriptions,
  unSubscribeSnsTopic,
  sendSnsMessage,
  deleteSnsTopic
};