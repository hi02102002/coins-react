import Navbar from 'components/Navbar/Navbar';
import CryptocurrenciesPage from 'components/pages/CryptocurrenciesPage/CryptocurrenciesPage';
import CryptocurrencyDetailPage from 'components/pages/CryptocurrencyDetailPage/CryptocurrencyDetailPage';
import ExchangesPage from 'components/pages/ExchangesPage/ExchangesPage';
import Homepage from 'components/pages/Homepage/Homepage';
import NewsPage from 'components/pages/NewsPage/NewsPage';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route
            exact
            path="/cryptocurrencies"
            element={<CryptocurrenciesPage />}
          />
          <Route exact path="/news" element={<NewsPage />} />
          <Route exact path="/exchanges" element={<ExchangesPage />} />
          <Route
            path="/cryptocurrencies/:id"
            element={<CryptocurrencyDetailPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
