import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import millify from 'millify';
import { Line } from 'react-chartjs-2';
import './LineChar.scss';
const LineChart = ({ coinHistory, currentPrice, coinName, coinChange }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  coinHistory.forEach(coin => {
    coinPrice.push(coin.price);
    coinTimestamp.push(new Date(coin.timestamp).toLocaleDateString());
  });

  const dataChart = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        borderColor: '#ff971d',
        backgroundColor: '#ff971d',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          color: '#313135',
        },
      },

      x: {
        grid: {
          color: '#313135',
        },
      },
    },
  };

  return (
    <>
      <div className="chart-header">
        <h3 className="chart-heading heading">{coinName} Price Chart </h3>
        <div className="price-container">
          <h5 className="price-change heading">Change: {coinChange}%</h5>
          <h5 className="current-price heading">
            Current {coinName} Price: $ {millify(Number(currentPrice))}
          </h5>
        </div>
      </div>
      <Line data={dataChart} options={options} />
    </>
  );
};

export default LineChart;
