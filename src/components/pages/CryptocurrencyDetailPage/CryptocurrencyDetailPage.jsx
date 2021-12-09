import LineChart from 'components/LineChart/LineChart';
import Loading from 'components/Loading/Loading';
import { fetchCoinHistory } from 'features/coins/coinHistorySlice';
import { fetchCoin } from 'features/coins/coinSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  UilBitcoinCircle,
  UilArrowGrowth,
  UilBolt,
  UilTrophy,
  UilYenCircle,
  UilCheck,
  UilInfoCircle,
  UilChartLine,
  UilTimes,
} from '@iconscout/react-unicons';
import './CryptocurrencyDetailPage.scss';
import Select from 'react-select';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
const times = ['3h', '24h', '7d', '30d'];

const options = times.map(time => {
  return {
    value: time,
    label: time,
  };
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#fff',
    padding: '1rem',
    backgroundColor: state.isSelected ? '#ff971d' : '#202022',
  }),

  container: provided => ({
    ...provided,
    marginBottom: '2.4rem',
    width: '30rem',
  }),

  menu: provided => ({
    ...provided,
    backgroundColor: '#202022',
    borderRadius: '1rem',
    overFlow: 'hidden',
  }),

  control: provided => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#202022',
    borderRadius: '1rem',
  }),
};

const CryptocurrencyDetailPage = props => {
  const [timeperiod, setTimeperiod] = useState({ value: '7d', label: '7d' });
  const { id } = useParams();
  const dispatch = useDispatch();
  const coin = useSelector(state => state.coin.coin);
  const isLoading = useSelector(state => state.coin.isLoading);
  const coinHistory = useSelector(state => state.history.history);
  useEffect(() => {
    dispatch(fetchCoin(id));
    dispatch(fetchCoinHistory({ id: id, timePeriod: timeperiod.value }));
  }, [dispatch, id, timeperiod]);

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coin.price && millify(coin.price)}`,
      icon: <UilBitcoinCircle />,
    },
    { title: 'Rank', value: coin.rank, icon: <UilArrowGrowth /> },
    {
      title: '24h Volume',
      value: `$ ${coin.volume && millify(coin.volume)}`,
      icon: <UilBolt />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coin.marketCap && millify(coin.marketCap)}`,
      icon: <UilBitcoinCircle />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${coin.allTimeHigh?.price && millify(coin.allTimeHigh?.price)}`,
      icon: <UilTrophy />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coin.numberOfMarkets && millify(coin.numberOfMarkets),
      icon: <UilChartLine />,
    },
    {
      title: 'Number Of Exchanges',
      value: coin.numberOfExchanges && millify(coin.numberOfExchanges),
      icon: <UilYenCircle />,
    },
    {
      title: 'Aprroved Supply',
      value: coin.approvedSupply ? <UilCheck /> : <UilTimes />,
      icon: <UilInfoCircle />,
    },
    {
      title: 'Total Supply',
      value: `$ ${coin.totalSupply && millify(coin.totalSupply)}`,
      icon: <UilInfoCircle />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${coin.circulatingSupply && millify(coin.circulatingSupply)}`,
      icon: <UilInfoCircle />,
    },
  ];

  return (
    <div
      className={
        isLoading ? 'cryptocurrency-detail loading' : 'cryptocurrency-detail'
      }
    >
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div style={{ textAlign: 'center', marginBottom: '2.4rem  ' }}>
            <h2 className="heading cryptocurrency-detail__heading">
              {coin.name} {`(${coin.slug})`} Price
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              {coin.name} live price in US Dollar (USD). View value statistics,
              market cap and supply.
            </p>
          </div>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            defaultValue={timeperiod}
            onChange={setTimeperiod}
            options={options}
            styles={customStyles}
          />
          <LineChart
            coinHistory={coinHistory}
            coinName={coin.name || ''}
            currentPrice={coin.price || ''}
            coinChange={coin.change}
          />

          <div className="detail__row">
            <div className="detail__col">
              <h3 className="heading detail__heading">
                {coin.name} Value Statistics
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                An overview showing the statistics of {coin.name}, such as the
                base and quote currency, the rank, and trading volume.
              </p>
              <div>
                {stats.map(stat => {
                  return (
                    <div key={Math.random()} className="stat">
                      {stat.icon}
                      <span className="title">{stat.title}</span>
                      <span className="value">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="detail__col">
              <h3 className="heading detail__heading">Other Stats Info</h3>
              <p style={{ marginBottom: '1rem' }}>
                An overview showing the statistics of {coin.name}, such as the
                base and quote currency, the rank, and trading volume.
              </p>
              {genericStats.map(stat => {
                return (
                  <div className="stat" key={Math.random()}>
                    {stat.icon}
                    <span className="title">{stat.title}</span>
                    <span className="value">{stat.value}</span>
                  </div>
                );
              })}
            </div>
            <div className="detail__col">
              <div className="desc">
                <h3 className="heading detail__heading">
                  What is {coin.name}?
                </h3>
                {HTMLReactParser(coin.description ? coin.description : '')}
              </div>
            </div>
            <div className="detail__col">
              <h3 className="heading detail__heading">{coin.name} Links</h3>
              <div>
                {coin.links?.map(link => {
                  return (
                    <div key={Math.random()} className="link">
                      <span>{link.type}</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CryptocurrencyDetailPage;
