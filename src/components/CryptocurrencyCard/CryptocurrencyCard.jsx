import React from 'react';
import millify from 'millify';
import './CryptocurrencyCard.scss';
const CryptocurrencyCard = ({
  name,
  price,
  marketCap,
  change,
  rank,
  iconUrl,
}) => {
  return (
    <div className="cryptocurrency-card">
      <div className="cryptocurrency-card__head">
        <span>
          {rank}. {name}
        </span>
        <img src={iconUrl} alt={name} />
      </div>
      <div className="cryptocurrency-card__content">
        <p>Price: ${millify(price)}</p>
        <p>Market Cap: ${millify(marketCap)}</p>
        <p>Daily Change: {millify(change)}%</p>
      </div>
    </div>
  );
};

export default CryptocurrencyCard;
