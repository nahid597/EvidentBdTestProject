import axios from "axios";
import { success, error } from "./responseHandler";

const RESPONSE_TYPE = { responseType: "text" };
const LOGIN_URL = "http://localhost:8080/api/auth";
const REGISTER_URL = "http://localhost:8080/api/user";

class AuthService {
  async login(user) {
    try {
      const response = await axios.post(LOGIN_URL, user, RESPONSE_TYPE);
      if (!response.data.successful) {
        return error(response);
      }
      return success(response);
    } catch (e) {
      return error(e);
    }
  }

  async register(user) {
    try {
      const response = await axios.post(REGISTER_URL, user, RESPONSE_TYPE);
      if (!response.data.successful) {
        return error(response);
      }
      return success(response);
    } catch (e) {
      return error(e);
    }
  }
}

export default new AuthService();
