import { useEffect, useState } from 'react';
import './App.css';
import Keypad from './components/Keypad';
import Display from './components/Display';
import CurrencySelector from './components/CurrencySelector';
import './index.css';

function App() {
  const backend = 'http://localhost:5000/api';
  const [display, setDisplay] = useState('0');
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rateInfo, setRateInfo] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    fetchSymbols();
  }, []);
  
  const fetchSymbols = async () => {
    try {
      const res = await fetch(`${backend}/symbols`);
      const data = await res.json();
      setSymbols(data);
      console.log('Symbols fetched:', data);
    } catch (error) {
      console.error('Failed to fetch symbols:', error);
    }
  };
  
  const convertFX = async () => {
    setIsloading(true);
    setError('');
    try {
      const res = await fetch(`${backend}/rate?from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      if (res.ok) {
        const converted = (parseFloat(display) * data.rate);
        setDisplay(converted.toFixed(2)); 
        setRateInfo(data);
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      setError('Failed to convert');
    } finally {
      setIsloading(false);
    }
  };

  const handleKeyPress = (key) => {
    if(key === 'AC') {
      setDisplay('0');
      setRateInfo(0);
    } else if(key === '\u232B') {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if(key === 'FX') {
      convertFX()
      setIsloading(true);
    } else {
      setDisplay(prev => prev === '0' ? key : prev + key);
    }
  }
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-3xl p-6 shadow-2xl">
        <CurrencySelector 
          symbols={symbols}
          from={fromCurrency}
          to={toCurrency}
          setFrom={setFromCurrency}
          setTo={setToCurrency}
        />
        
        <Display 
          value={display}
          rateInfo={rateInfo}
          error={error}
        />
        
        <Keypad 
          onKeyPress={handleKeyPress}
          loading={isloading}
        />
      </div>
    </div>
  );
}

export default App;
