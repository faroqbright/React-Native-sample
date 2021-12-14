import { postRequest, getRequest, putRequest } from '../index';

export const signupAPI = payload => postRequest(`/signup`, payload);

export const getAllCitiesAPI = () => getRequest(`/allCities`);

export const getCategoriesAPI = () => getRequest(`/getCategories`);

export const otpVerificationAPI = payload => postRequest(`/verify`, payload, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export const checkNumberAPI = payload => postRequest(`/checkPhone`, payload);

export const updateProfileApi = (payload, id) =>
  putRequest(`/userProfile/update/${id}`, payload);
