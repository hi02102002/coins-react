import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalStats } from 'features/coins/globalStatsSlice';
import millify from 'millify';
import './Homepage.scss';
import CryptocurrenciesPage from '../CryptocurrenciesPage/CryptocurrenciesPage';
import NewsPage from '../NewsPage/NewsPage';
import Loading from 'components/Loading/Loading';

const Homepage = () => {
  const dispatch = useDispatch();
  const globalStats = useSelector(state => state.globalStats.globalStats);
  const isLoading = useSelector(state => state.globalStats.isLoading);
  useEffect(() => {
    dispatch(fetchGlobalStats());
  }, [dispatch]);

  return (
    <div className={isLoading ? 'homepage loading' : 'homepage'}>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h2 className="heading homepage__heading">Global Crypto Stats</h2>

          <div className="stats">
            <ul className="stats__list">
              <li>
                <h6 className="heading">Total Cryptocurrencies</h6>
                <span>
                  {globalStats.totalCoins
                    ? millify(globalStats.totalCoins)
                    : null}
                </span>
              </li>
              <li>
                <h6 className="heading">Total Exchanges</h6>
                <span>
                  {globalStats.totalExchanges
                    ? millify(globalStats.totalExchanges)
                    : null}
                </span>
              </li>
              <li>
                <h6 className="heading">Total Market Cap</h6>
                <span>
                  $
                  {globalStats.totalMarketCap
                    ? millify(globalStats.totalMarketCap)
                    : null}
                </span>
              </li>
              <li>
                <h6 className="heading">Total 24h Volume</h6>
                <span>
                  $
                  {globalStats.total24hVolume
                    ? millify(globalStats.total24hVolume)
                    : 'null'}
                </span>
              </li>
              <li>
                <h6 className="heading">Total Markets</h6>
                <span>
                  {globalStats.totalMarkets
                    ? millify(globalStats.totalMarkets)
                    : 'null'}
                </span>
              </li>
            </ul>
          </div>
          <div className="homepage__heading-container">
            <h2 className="heading homepage__heading">
              Top 10 Cryptos In The World
            </h2>
            <Link to="/cryptocurrencies" className="homepage__heading-link">
              See more
            </Link>
          </div>
          <CryptocurrenciesPage simple />
          <div className="homepage__heading-container">
            <h2 className="heading homepage__heading">Latest Crypto News</h2>
            <Link to="/news" className="homepage__heading-link">
              See more
            </Link>
          </div>
          <NewsPage simple />
        </React.Fragment>
      )}
    </div>
  );
};

export default Homepage;
