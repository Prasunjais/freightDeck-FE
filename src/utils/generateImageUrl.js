import { api as APIConfig } from "../appConfig";

// get actual image 
export const getActualImage = async (id) => {
  // returning the request
  return APIConfig.base_url + "v1/file/image/download/file/" + id
};


// get thumbnail
export const getThumbnail = async (id) => {
  // returning the request
  return APIConfig.base_url + "v1/file/image/download/thumbnail/" + id
};

export const getImageUrl = APIConfig.base_url + "v1/file/image/download/thumbnail/";
