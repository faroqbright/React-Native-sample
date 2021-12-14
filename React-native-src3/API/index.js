import { client, clientMultiPart } from './config';

export const getRequest = (url) => client.get(url);

export const postRequest = (url, payload = {}, extra = {}) => client.post(url, payload, extra);

export const patchRequest = (url, payload = {}) => client.patch(url, payload);

export const putRequest = (url, payload = {}) => clientMultiPart.put(url, payload);

export const deleteRequest = (url, payload = {}) =>
  client.delete(url, { payload });
