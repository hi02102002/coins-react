import logoImg from '../assets/img/logo.svg';
import safetyBoxImg from '../assets/img/Bitcoin-3.png';
import {
  UilEstate,
  UilComparison,
  UilUsdCircle,
  UilNewspaper,
} from '@iconscout/react-unicons';

export const IMG = {
  logo: logoImg,
  safetyBox: safetyBoxImg,
};

export const NAVS = [
  {
    name: 'Home',
    url: '/',
    icon: <UilEstate />,
  },

  {
    name: 'Cryptocurrencies',
    url: '/cryptocurrencies',
    icon: <UilComparison />,
  },
  {
    name: 'Exchanges',
    url: '/exchanges',
    icon: <UilUsdCircle />,
  },
  {
    name: 'News',
    url: '/news',
    icon: <UilNewspaper />,
  },
];

export const COIN_URL = process.env.REACT_APP_COIN_API_URL;
export const COIN_RAPID_HOST = process.env.REACT_APP_COIN_RAPID_HOST;
export const KEY_RAPID_API = process.env.REACT_APP_RAPID_API;
export const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;
export const NEWS_RAPIDAPI_HOST = process.env.REACT_APP_NEWS_RAPIDAPI_HOST;
