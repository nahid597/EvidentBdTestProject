import axios from "axios";
import GLOBAL from "../global";
import { success, error } from "./responseHandler";
const DATA_POST_URL = "http://localhost:8080/api/data";

class DataService {
  async postData(data) {
    const userInfo = JSON.parse(GLOBAL.USER_INFO);
    const RESPONSE_TYPE = {
      responseType: "text",
      headers: { "x-auth-token": `${userInfo.token}` },
    };
    try {
      const response = await axios.post(DATA_POST_URL, data, RESPONSE_TYPE);

      if (!response.data.successful) {
        return error(response);
      }
      return success(response);
    } catch (e) {
      return error(e);
    }
  }
}

export default new DataService();
