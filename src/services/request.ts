import axios, { AxiosRequestConfig } from 'axios';
import { set } from 'lodash';
import queryString from 'query-string';
import storage from '../utils/sessionStorage';
import lodash from '../utils/lodash';

const DOMAIN = 'https://slldt-server-867d33706c66.herokuapp.com/';
// const DOMAIN = 'http://localhost:8080/';

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  headers: {
    Accept: 'application/json',
  },
});

type mixType = string | number | null;

type IFetchArg = {
  method?: 'get' | 'post' | 'delete' | 'put';
  url: string;
  body?: Record<string, mixType | unknown> | FormData;
  params?: Record<string, mixType | Array<mixType>>;
  configs?: AxiosRequestConfig<Record<string, unknown | mixType>> | undefined;
};
const fetch = async ({
  method = 'get',
  url = '',
  body = {},
  params = {},
  configs = {},
}: IFetchArg) => {
  const paramsPasser = queryString.stringify(
    { ...params },
    { arrayFormat: 'bracket' }
  );
  // let urlWithParams = url + '?' + paramsPasser;
  const urlWithParams = url + '?' + paramsPasser;

  // const merchant_code: string = storage.merchantCode.get();

  // if (merchant_code) {
    // urlWithParams = urlWithParams.replaceAll(':merchant_code', merchant_code);
  //   urlWithParams = urlWithParams;
  // }
  const token = storage.token.get();
  if (token) {
    set(configs, 'headers.Authorization', 'Bearer ' + token);
  }

  const getAxios = async () => {
    switch (method) {
      case 'post':
        return await axiosInstance.post(urlWithParams, body, configs);
      case 'put':
        return await axiosInstance.put(urlWithParams, body, configs);
      case 'delete':
        return await axiosInstance.delete(urlWithParams, configs);
      default:
        return await axiosInstance.get(urlWithParams, configs);
    }
  };

  try {
    const res = await getAxios();
    return res;
  } catch (error) {
    const status = lodash.get(error, 'response.status');
    if (status === 401 || status === 403) {
      // handle refresh token here
    }
    return Promise.reject(error);
  }
};

export default fetch;
