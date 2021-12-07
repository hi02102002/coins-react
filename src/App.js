import Navbar from 'components/Navbar/Navbar';
import CryptocurrenciesPage from 'components/pages/CryptocurrenciesPage/CryptocurrenciesPage';
import Homepage from 'components/pages/Homepage/Homepage';
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
