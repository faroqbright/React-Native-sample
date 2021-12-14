import {postRequest, deleteRequest,getRequest} from '../index';

export const savingProductAPI = (id) => postRequest(`/product/saveProduct/${id}`);
export const favoritingProductAPI = (id) => postRequest(`/product/favourite/${id}`);
export const UnsaveProductAPI = (id) => deleteRequest(`/product/unsaveProduct/${id}`);
export const UnFovoriteProductAPI = (id) => deleteRequest(`/product/unFavourite/${id}`);
export const AllsavedProductsAPI = () => getRequest(`/product/savedProducts`);
export const AllFavoriteProductsAPI = () => getRequest(`/product/allFavourite`);
export const getAllVideosAPI = () => getRequest(`/video/savedVideos/`);
export const getAllProductsApi = () => getRequest(`/getProducts`);
export const viewProductApi = (id) => getRequest(`/product/viewProduct/${id}`);





