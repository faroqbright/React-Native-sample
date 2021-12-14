import { getRequest,postRequest } from '../index';

export const getLatestViewsApi = (payload) => postRequest(`/latestViews`,payload);
export const getWatchedVideosApi = (payload) => postRequest(`/viewsCount`,payload);





