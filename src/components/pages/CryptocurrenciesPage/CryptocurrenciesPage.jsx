import CryptocurrencyCard from 'components/CryptocurrencyCard/CryptocurrencyCard';
import Loading from 'components/Loading/Loading';
import { fetchCoins } from 'features/coins/coinsSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './CryptocurrenciesPage.scss';
const CryptocurrenciesPage = props => {
  const limited = props.simple ? 10 : 100;
  const dispatch = useDispatch();
  const coinsData = useSelector(state => state.coins.coins);
  const isLoading = useSelector(state => state.coins.isLoading);
  useEffect(() => {
    dispatch(fetchCoins(limited));
  }, [dispatch, limited]);
  const [coinsSearch, setCoinsSearch] = useState(coinsData);
  const [isSearching, setIsSearching] = useState(false);

  const searchHandler = e => {
    setIsSearching(true);
    const text = e.target.value.toLowerCase().trim();
    const filterData = coinsData.filter(coin => {
      return coin.name.toLowerCase().includes(text);
    });
    setCoinsSearch(filterData);
  };

  const data = isSearching ? coinsSearch : coinsData;

  return (
    <div
      className={
        isLoading ? 'cryptocurrenciespage loading' : 'cryptocurrenciespage'
      }
      style={props.simple ? { padding: '0', marginBottom: '2.4rem' } : null}
    >
      {props.simple ? null : (
        <input
          className="search-field"
          type="text"
          placeholder="Search Cryptocurrency..."
          onChange={searchHandler}
          onBlur={e => {
            setIsSearching(false);
            e.target.value = '';
          }}
        />
      )}
      {isLoading && !props.simple ? (
        <Loading />
      ) : (
        <ul className="cryptocurrencies">
          {data.map(coin => {
            return (
              <li key={coin.uuid}>
                <Link to={`/cryptocurrencies/${coin.id}`}>
                  <CryptocurrencyCard
                    name={coin.name}
                    price={coin.price}
                    rank={coin.rank}
                    marketCap={coin.marketCap}
                    change={coin.change}
                    iconUrl={coin.iconUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CryptocurrenciesPage;
