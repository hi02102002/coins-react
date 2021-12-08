import React from 'react';
import moment from 'moment';
import './NewsCard.scss';
const NewsCard = props => {
  const {
    description,
    title,
    imgProvider,
    nameProvider,
    datePublished,
    imgUrl,
  } = props;
  return (
    <div className="news-card">
      <div className="news-card__head">
        <h4 className="heading">{title}</h4>
        <img src={imgUrl} alt="" />
      </div>
      <div className="news-card__content">
        <p className="desc">{description}</p>
        <div className="provider">
          <img src={imgProvider} alt="" />
          <span className="name">{nameProvider}</span>
          <span className="hour">
            {moment(datePublished).startOf('second').fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
