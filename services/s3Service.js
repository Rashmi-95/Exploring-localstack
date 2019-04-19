const fs = require('fs');
const { s3, region } = require('../config/constant');

console.log(s3);

const createS3 = async (bucketName) => {
  const bucketParams = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: region
    }
  };
  try {
    const result = await s3.createBucket(bucketParams).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteS3 = async (bucketName) => {
  const bucketParams = { Bucket: bucketName };
  try {
    const result = await s3.deleteBucket(bucketParams).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const listS3Objects = async (bucketName) => {
  const bucketParams = { Bucket: bucketName };
  try {
    const result = await s3.listObjects(bucketParams).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const uploadFileS3 = async (bucketName, fileName, key) => {
  const uploadParams = { Bucket: bucketName, Key: key, Body: '' };
  const file = fileName;
  var fileStream = fs.createReadStream(file);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;

  var path = require('path');
  uploadParams.Key = path.basename(file);

  try {
    let result = await s3.upload(uploadParams).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const listS3 = async () => {
  try {
    const result = await s3.listBuckets().promise();
    return result;
  } catch (err) {
    throw err;
  }
};

const getResourceLink = async (bucketName, fileName) => {
  try {
    const params = { Bucket: bucketName, Key: fileName };
    const result = await s3.getSignedUrl('getObject', params);
    return result;
  } catch (err) {
    throw err;
  }
};

const getObject = async (bucketName, key) => {
  try {
    const bucketParams = { Bucket: bucketName, Key: key };
    const result = await s3.getObject(bucketParams).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

createS3('testanmol').then(r => console.log(r));
// listS3().then(r => console.log(r));
// listS3Objects('testanmol').then(r => console.log(r));
// uploadFileS3('testanmol', '/Users/rashmiranganathan/Pictures/alberto-restifo-95349.jpg', 'image').then(r => console.log(r));
// getResourceLink('testanmol', 'alberto-restifo-95349.jpg').then(r => console.log(r));
// getObject('testanmol', 'alberto-restifo-95349.jpg').then(r => console.log(r));
module.exports = {
  createS3,
  deleteS3,
  listS3,
  uploadFileS3,
  listS3Objects,
  getResourceLink
};
