const Axios = require('./node_modules/axios/');

const os = require('os');
const networkInterfaces = os.networkInterfaces();
const endpointUrl = `http://${networkInterfaces.en0[1].address}:9090/wcms/api/refreshCache`;

exports.handler = async () => {
  const REFRESH_CMS_DATA = process.env.WCMS_URL || endpointUrl;
  console.log("About to call refresh cache url: " + REFRESH_CMS_DATA);

  try {
    let result = await Axios.get(REFRESH_CMS_DATA);
    console.log("Call to refresh cache api completed successfully with following response:");
    console.log(result.data)
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.data)
    };
    return response;

  } catch (error) {
    console.log("ERROR: Call to refresh cache api failed: ", error);
    throw error.message;
  }
}