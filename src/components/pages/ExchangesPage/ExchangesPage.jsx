import { fetchExchanges } from 'features/coins/exchangesSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import './ExchangesPage.scss';
import Loading from 'components/Loading/Loading';

const ExchangesPage = () => {
  const dispatch = useDispatch();
  const exchanges = useSelector(state => state.exchanges.exchanges);
  const isLoading = useSelector(state => state.exchanges.isLoading);

  useEffect(() => {
    dispatch(fetchExchanges());
  }, [dispatch]);

  useEffect(() => {
    const toggleItem = item => {
      const exchangesContent = item.querySelector('.exchanges__content');

      if (item.classList.contains('active')) {
        exchangesContent.removeAttribute('style');
        item.classList.remove('active');
      } else {
        exchangesContent.style.height = exchangesContent.scrollHeight + 'px';
        item.classList.add('active');
      }
    };

    const exchangesItems = document.querySelectorAll('.exchanges__item');

    exchangesItems.forEach(item => {
      const exchangesHeader = item.querySelector('.exchanges__header');

      exchangesHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.exchanges__item .active');

        toggleItem(item);

        if (openItem && openItem !== item) {
          toggleItem(openItem);
        }
      });
    });
  });

  return (
    <div className={isLoading ? 'exchanges loading' : 'exchanges'}>
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="exchanges__row">
            <div className="exchanges__col"></div>
            <div className="exchanges__col"></div>
            <div className="exchanges__col"></div>
            <div className="exchanges__col"></div>
          </div>
          <div className="exchanges__container">
            <div className="exchanges__group">
              {exchanges.map(exchange => {
                return (
                  <div className="exchanges__item">
                    <div className="exchanges__header">
                      <div className="exchanges__row" key={exchange.uuid}>
                        <div className="exchanges__col">
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <span> {exchange.rank}.</span>{' '}
                            <img src={exchange.iconUrl} alt="" />
                            <span>{exchange.name}</span>
                          </div>
                        </div>
                        <div className="exchanges__col">
                          ${millify(exchange.volume)}
                        </div>
                        <div className="exchanges__col">
                          {millify(exchange.numberOfMarkets)}
                        </div>
                        <div className="exchanges__col">
                          {millify(exchange.marketShare)}%
                        </div>
                      </div>
                    </div>
                    <div className="exchanges__content">
                      <div className="exchanges__desc ">
                        {HTMLReactParser(exchange.description || 'Nothing!!!')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExchangesPage;
