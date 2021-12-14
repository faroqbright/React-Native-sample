import {postRequest, getRequest} from '../index';

// export const getCategoriesAPI = () =>
//     getRequest(`/getCategories`);

export const userProfileAPI = payload => postRequest(`/userProfile/${payload}`);
