import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchNews } from 'features/news/newsSlice';
import NewsCard from 'components/NewsCard/NewsCard';
import './NewsPage.scss';
import { fetchCoins } from 'features/coins/coinsSlice';
import Loading from 'components/Loading/Loading';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#fff',
    padding: '1rem',
    backgroundColor: state.isSelected ? '#ff971d' : '#202022',
  }),

  container: provided => ({
    ...provided,
    margin: '0 auto',
    marginBottom: '2.4rem',
    width: '50%',
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
    margin: '0 auto',
  }),
};

const NewsPage = props => {
  const count = props.simple ? 10 : 50;
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.news);
  const coins = useSelector(state => state.coins.coins);
  const isLoading = useSelector(state => state.news.isLoading);
  const [selectedOption, setSelectedOption] = useState({
    value: 'crypto',
    label: '',
  });

  const options = coins.map(coin => {
    return {
      value: coin.name,
      label: coin.name,
    };
  });

  useEffect(() => {
    dispatch(fetchNews({ query: `${selectedOption.value}`, count: count }));
    dispatch(fetchCoins(20));
  }, [dispatch, selectedOption, count]);

  return (
    <div
      className={isLoading ? 'loading newspage' : 'newspage'}
      style={props.simple ? { padding: '0' } : null}
    >
      {props.simple ? null : (
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          styles={customStyles}
        />
      )}
      {isLoading && !props.simple ? (
        <Loading />
      ) : (
        <ul className="news">
          {news.map(item => {
            return (
              <li key={item.name}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  <NewsCard
                    description={item.description}
                    title={item.name}
                    imgProvider={item?.provider[0]?.image?.thumbnail.contentUrl}
                    nameProvider={item?.provider[0]?.name}
                    datePublished={item.datePublished}
                    imgUrl={item.image?.thumbnail.contentUrl}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
