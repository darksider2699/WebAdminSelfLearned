import { apiUrl } from "../config/index";
import RequestHelper from "../helpers/RequestHelper";

export const signInRequest = ({ username, password }) => {
  return RequestHelper.post(`${apiUrl}/auth/signin`, {
    username,
    password,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllMedicalInformationRequest = () => {
  return RequestHelper.get(`${apiUrl}/user/medical_user/daily_checkin/all`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getCheckinByDateRequest = (body) => {
  return RequestHelper.post(`${apiUrl}/user/daily_checkin`, body)
    .then((res) => {
      console.log("Checkin by date", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getCheckoutByDateRequest = (body) => {
  return RequestHelper.post(`${apiUrl}/user/daily_checkout`, body)
    .then((res) => {
      console.log("checkout by date", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getCheckoutByDateAndIdUserRequest = (param) => {
  return RequestHelper.post(`${apiUrl}/user/daily_checkout/${param.id}`, {
    dateRecord: param.dateRecord,
  })
    .then((res) => {
      console.log("checkout by date and id", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllTestResultRequest = () => {
  console.log("Get All TEst Result Request");
  return RequestHelper.get(`${apiUrl}/test_result/all_result`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getTestResultByDateRequest = (body) => {
  return RequestHelper.post(`${apiUrl}/test_result`, body)
    .then((res) => {
      console.log("Test result by date", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const addListTestResultRequest = ({ listTestAdded }) => {
  return RequestHelper.post(
    `${apiUrl}/user/medical_user/test_result`,
    listTestAdded
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllQuestionRequest = () => {
  console.log("Get All Question Request");
  return RequestHelper.get(`${apiUrl}/question/all`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getQuestionByIdRequest = (id) => {
  console.log("Get All Question Request");
  return RequestHelper.get(`${apiUrl}/question/${id}`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const editQuestionRequest = (
  id,
  label,
  answerRequest,
  rightAnswerPosition
) => {
  console.log({ id, label, answerRequest, rightAnswerPosition });
  return RequestHelper.put(`${apiUrl}/question/${id}`, {
    label: label,
    answerRequest: answerRequest,
    rightAnswerPosition: rightAnswerPosition,
  })
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const createNewQuestionRequest = (
  label,
  answerRequest,
  rightAnswerPosition
) => {
  console.log({ label, answerRequest, rightAnswerPosition });
  return RequestHelper.post(`${apiUrl}/question/add_question`, {
    label: label,
    answerRequest: answerRequest,
    rightAnswerPosition: rightAnswerPosition,
  })
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const deleteQuestionRequest = (id) => {
  return RequestHelper.delete(`${apiUrl}/question/${id}`)
    .then((res) => {
      console.log("API RESPONSE:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("API RESPONSE ERROR:", error);
      throw new Error(error);
    });
};
export const getAllCovidCaseRequest = () => {
  console.log("Get All Covid Case Request");
  return RequestHelper.get(`${apiUrl}/user/covid_case/all`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const deleteCaseRequest = (id) => {
  return RequestHelper.delete(`${apiUrl}/user/covid_case/${id}`)
    .then((res) => {
      console.log("API RESPONSE:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("API RESPONSE ERROR:", error);
      throw new Error(error);
    });
};
export const createNewCaseRequest = (id, covidStatus, dateRecord) => {
  console.log({ id, covidStatus, dateRecord });
  return RequestHelper.post(`${apiUrl}/user/covid_case`, {
    id: id,
    covidStatus: covidStatus,
    dateRecord: dateRecord,
  })
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllAccountRequest = () => {
  console.log("Get All Covid Case Request");
  return RequestHelper.get(`${apiUrl}/account/all`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};