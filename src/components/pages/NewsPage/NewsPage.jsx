import { fetchNews } from 'features/news/newsSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.news);
  console.log(news);

  useEffect(() => {
    dispatch(fetchNews({ query: 'coin', count: 10 }));
  }, [dispatch]);

  return (
    <div className="newspage">
      <ul className="news">
        {news.map(item => {
          return <li></li>;
        })}
      </ul>
    </div>
  );
};

export default NewsPage;
