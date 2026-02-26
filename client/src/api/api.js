import axios from "axios";

const uploadFile = async (url, data, config) => {
  try {
    const res = await axios.post(url, data, {
      ...(config || {}),
    });
    return res;
  } catch (error) {
    console.log(`ERROR in @${uploadFile.name} FUNCTION`);
    console.log(error);
    throw error;
  }
};

const apiServices = {
  uploadFile,
};

export default apiServices;
