import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  timeout: 100000,
});
const handleError = (error) => {
  if (error.response) {
    const message =
      error.response && error.response.data && error.response.data.message;
    if (message) {
      console.log("message", message);
    }
    throw new Error(message);
  } else if (error.request) {
    throw new Error(error.request);
  } else {
    console.log("An unknown error has occurred!");
    throw new Error(error);
  }
};
export default class RequestHelper {
  static async getHeader(config = {}) {
    return {
      accept: "application/json",
      contentType: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
      ...config,
    };
  }
  static async get(apiUrl, params) {
    console.log("Helper");
    const header = await this.getHeader();
    console.log("header", header);
    return instance
      .get(apiUrl, {
        headers: header,
        params,
        paramsSerializer: (params) => {
          return JSON.stringify(params, { arrayFormat: "repeat" });
        },
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        handleError(e);
        throw e;
      });
  }
  static async post(apiUrl, data, config, responseType) {
    return instance({
      method: "post",
      url: apiUrl,
      headers: await this.getHeader(config),
      data: data,
      responseType: responseType,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log("helper", e);
        handleError(e);
        throw e;
      });
  }
  static async put(apiUrl, data) {
    return instance({
      method: "put",
      url: apiUrl,
      headers: await this.getHeader(),
      data: data,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log("e:", e);
        handleError(e);
        throw e;
      });
  }
  static async delete(apiUrl) {
    return instance({
      method: "delete",
      url: apiUrl,
      headers: await this.getHeader(),
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        handleError(e);
        throw e;
      });
  }
}
