import { postRequest, getRequest } from '../index';

export const getPartnersAPI = () =>
    getRequest(`/getPartners`);

// export const userProfileAPI = (payload) =>
// postRequest(`/userProfile`, payload);
