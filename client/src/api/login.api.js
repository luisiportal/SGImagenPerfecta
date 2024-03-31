import axios from "./axios.js";

//login
export const loginRequest = async (values) =>
  await axios.post(`/api/trabajadores/login/`, values);

//logout

export const logoutRequest = async () =>
  await axios.post(`/api/trabajadores/logout`);

  export const verifyTokenRequest = () => axios.get(`api/auth/verify`);