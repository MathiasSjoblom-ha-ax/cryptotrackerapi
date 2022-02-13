import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {

  //let status: string;
  const [status, setStatus] = useState("")
  const [serverStatus, setserverStatus] = useState(Boolean)
  const [coins, setCoins] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('usd')
  const [currencySymbol, setCurrencySymbol] = useState("$")

  useEffect(() => {
    updateTable()
  });
  /*
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  });
  */
  //Ping server
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/ping', { headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
    .then(res => {
      setStatus(res.data)
      if(status) {
        setserverStatus(true);
        console.log("API online")
      } else {
        setserverStatus(false);
        console.log("API offline")
      }
    }).catch(error => console.log(error))
  });
  
  function checkServerStatus() {
    axios.get('https://api.coingecko.com/api/v3/ping')
    .then(res => {
      setStatus(res.data)
      if(status) {
        setserverStatus(true);
        console.log("API online")
      } else {
        setserverStatus(false);
        console.log("API offline")
      }
    }).catch(error => console.log(error))
  }
  
  function updateTable() {
    if(currency === "usd") {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        updateCurrencySymbol()
      }).catch(error => console.log(error))
    }
    if(currency === "eur") {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        updateCurrencySymbol()
      }).catch(error => console.log(error))
    }
    if(currency === "jpy") {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        updateCurrencySymbol()
      }).catch(error => console.log(error))
    }
    if(currency === "rub") {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=rub&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        updateCurrencySymbol()
      }).catch(error => console.log(error))
    }
  }

  function updateCurrencySymbol() {
    if(currency === "usd") {
      setCurrencySymbol("$")
    }
    if(currency === "eur") {
      setCurrencySymbol("€")
    }
    if(currency === "jpy") {
      setCurrencySymbol("¥")
    }
    if(currency === "rub") {
      setCurrencySymbol("₽")
    }
  }

  function updateTableCurrency(event: { target: { value: any } }) {
    setCurrency(event.target.value)
    updateCurrencySymbol()
  }
  
  //Updating coin prices every 10 seconds if update avalible from API
  
  useEffect(() => {
    const interval = setInterval(() => 
    {
      updateTable()
      //alert("Updated");
    }, 10000);
    return () => 
    clearInterval(interval);
  });
  
  const coinFilter = (e: any) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))
    
    if(serverStatus === false) {
      return (
        <div>
          <text>Checking API status, this will take a few seconds </text>
          <button id='rePing' onClick={checkServerStatus}>Check API status</button>
        </div>
      )
    }
    
    return (
      <div className="App">
        <div className='Searcher'>
          <h1 className='Coin-text'>Search a coin</h1>
          <form>
            <input type='text' placeholder='Search Coin' className='Coin-searcher' onChange={coinFilter}/>
          </form>
          <button className='Refresh-button' onClick={updateTable}>⟳</button>
          <select className='Currency-selecter' id='selector' onChange={updateTableCurrency}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
            <option value="rub">RUB</option>
          </select>
        </div>
        <div className='Table-bar'>
        <div className='properties-bar'>
          <p>#</p>
          <p>Logo</p>
          <p>Name</p>
          <p>Price</p>
          <p>Volume</p>
          <p>24h Highest</p>
          <p>24h Lowest</p>
        </div>
        <div className='Coin-bar'>
        {filteredCoins.map(coin => {
          return (
            <Coin 
            key={coin.id} 
            currencySymbol={currencySymbol}
            rank={coin.market_cap_rank}
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol} 
            volume={coin.total_volume} 
            price={coin.current_price}
            highest={coin.high_24h}
            lowest={coin.low_24h}
            />
          );
        })}
        </div>
        </div>
      </div>
    );
}

export default App;
