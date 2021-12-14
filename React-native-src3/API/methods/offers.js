import {postRequest, getRequest,deleteRequest} from '../index';

export const getAllOffersAPI = () => getRequest(`/allOffers`);

export const viewOffersAPI = id => getRequest(`/viewOffer/${id}`);
export const favouritingAPI = (id) => postRequest(`/product/favourite/${id}`);
export const saveOfferApi = (id) => postRequest(`/offer/saveOffer/${id}`);
export const unSaveOfferApi = (id) => deleteRequest(`/offer/unsaveOffer/${id}`);
export const allSavedOffersApi = () => getRequest(`/offer/savedOffers`);


// export const userProfileAPI = (payload) =>
// postRequest(`/userProfile`, payload);
