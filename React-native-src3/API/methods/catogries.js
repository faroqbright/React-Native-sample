import {postRequest, getRequest} from '../index';
// export const viewCatogryAPI = (id) => getRequest(`/getCategory/${id}`)
export const viewCatogryAPI = (payload) => postRequest(`/planAgainstCategory`,payload)