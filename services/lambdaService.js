const { lambda } = require('../config/constant');

createLambda('refreshFunction', )
const createLambda = async (functionName) => {
  var params = {
    Code: {
    },
    Description: "",
    FunctionName: "functionName",
    Handler: "index.handler",
    MemorySize: 128,
    Publish: true,
    Role: "arn:aws:iam::123456789012:role/service-role/success-role",
    Runtime: "nodejs8.10",
    Timeout: 15,
    VpcConfig: {
    }
  };
  try {
    let result = lambda.createFunction(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteLambda = async () => {

};

const invokeLambda = async () => {

};

const listLambda = async () => {
  try {
    let result = await lambda.listFunctions({}).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

listLambda().then(r => console.log(r))


module.exports = {
  createLambda,
  deleteLambda,
  invokeLambda,
  listLambda
};