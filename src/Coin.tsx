import './Coin.css';

function Coin({image, symbol, name, price, volume, highest, lowest, rank, currencySymbol}) {

  return <div className='coin-container' onClick={e => window.location.href='https://www.coinbase.com/price/' + name}>
      <div className='coin-row'>
        <p className='coin-rank'>{rank}</p>
        <img className='coin-image' src={image} alt="crypto"/>
        <div className='coin-NS'>
          <h1 className='coin-name'>{name}</h1>
          <p className='coin-symbol'>{symbol.toUpperCase()}</p>
          </div>
        <p className='coin-price'>{currencySymbol}{price}</p>
        <p className='coin-volume'>{currencySymbol}{volume.toLocaleString()}</p>
        <p className='coin-highest'>{currencySymbol}{highest}</p>
        <p className='coin-lowest'>{currencySymbol}{lowest}</p>
      </div>
  </div>;
}

export default Coin;
