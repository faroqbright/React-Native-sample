import {postRequest, getRequest, putRequest} from '../index';

export const RedeemPointsApi = payload => postRequest(`/createRedeemPoints`, payload);
export const redeemPointsCheckApi = payload => postRequest(`/redeemPointsValue`, payload);
export const getPointsApi = () => getRequest(`/calculateRedeemPoints`);
export const getPointsHistoryApi = () => getRequest(`/redeemHistory`);
export const redeemEarnedPointsApi = (payload) => postRequest(`/earningPoints`,payload);
