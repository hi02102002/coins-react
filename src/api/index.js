import axios from 'axios';
import {
  COIN_URL,
  COIN_RAPID_HOST,
  KEY_RAPID_API,
  NEWS_URL,
  NEWS_RAPIDAPI_HOST,
} from 'constants/index';

export const instanceCoins = axios.create({
  baseURL: COIN_URL,
  headers: {
    'x-rapidapi-host': COIN_RAPID_HOST,
    'x-rapidapi-key': KEY_RAPID_API,
  },
});

export const instanceNews = (query, count) => {
  return axios.create({
    baseURL: NEWS_URL,
    params: {
      q: `${query}`,
      freshness: 'Day',
      textFormat: 'Raw',
      safeSearch: 'Off',
      count: `${count}`,
    },
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': NEWS_RAPIDAPI_HOST,
      'x-rapidapi-key': KEY_RAPID_API,
    },
  });
};
