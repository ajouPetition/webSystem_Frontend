import axios from "axios";

// login 로직
export const requestLogin = async (usrname, pw) => {
  return await axios
    .post(
      "//localhost:3000/api/users/login",
      {
        username: usrname,
        password: pw,
      },
      { withCredentials: true }
    )
    .then((response) => {
      /// token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return "아이디와 비밀번호를 확인하세요.";
    });
};

// refresh Token으로 accessToken 받아오기
export const requestAccessToken = async (refresh_toekn) => {
  return await axios
    .post("//localhost:3000/api/users/token/refresh", {
      refresh: refresh_toekn,
    })
    .then((response) => {
      return response.data.access;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const checkAccessToken = async (refresh_toekn) => {
  if (axios.defaults.headers.common["Authorization"] === undefined) {
    return await requestAccessToken(refresh_token).then((response) => {
      return response;
    });
  } else {
    return axios.defaults.headers.common["Authorization"].split(" ")[1];
  }
};
