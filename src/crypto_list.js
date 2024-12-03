import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CSS/crypto_list.css';

const cryptoData = [
  { name: "Shiba Inu", symbol: "SHIB", id: "shiba-inu" },
  { name: "ChainLink Token", symbol: "LINK", id: "chainlink" },
  { name: "Uniswap", symbol: "UNI", id: "uniswap" },
  { name: "Pepe", symbol: "PEPE", id: "pepe" },
  { name: "Fetch", symbol: "FET", id: "fetch-ai" },
  { name: "OKB", symbol: "OKB", id: "okb" },
  { name: "Aave Token", symbol: "AAVE", id: "aave" },
  { name: "Arbitrum", symbol: "ARB", id: "arbitrum" },
  { name: "Immutable X", symbol: "IMX", id: "immutable-x" },
  { name: "Injective Token", symbol: "INJ", id: "injective-protocol" },
  { name: "Render Token", symbol: "RNDR", id: "render-token" },
  { name: "VeChain", symbol: "VEN", id: "vechain" },
  { name: "Graph Token", symbol: "GRT", id: "the-graph" },
  { name: "Floki", symbol: "FLOKI", id: "floki" },
  { name: "Theta Token", symbol: "THETA", id: "theta-token" },
  { name: "Maker", symbol: "MKR", id: "maker" },
  { name: "Lido DAO Token", symbol: "LDO", id: "lido-dao" },
  { name: "Quant", symbol: "QNT", id: "quant-network" },
  { name: "Matic Token", symbol: "MATIC", id: "matic-network" },
  { name: "Pendle", symbol: "PENDLE", id: "pendle" },
  { name: "ApeCoin", symbol: "APE", id: "apecoin" },
  { name: "SuperVerse", symbol: "SUPER", id: "superfarm" },
  { name: "Axelar", symbol: "AXL", id: "axelar" },
  { name: "Ethereum Name Service", symbol: "ENS", id: "ethereum-name-service" },
  { name: "ChiliZ", symbol: "CHZ", id: "chiliz" },
  { name: "Decentraland", symbol: "MANA", id: "decentraland" },
  { name: "Gnosis", symbol: "GNO", id: "gnosis" },
  { name: "Safe Token", symbol: "SAFE", id: "safe" },
  { name: "Synthetix Network Token", symbol: "SNX", id: "synthetix-network-token" },
  { name: "dYdX", symbol: "DYDX", id: "dydx" },
  { name: "Dexe", symbol: "DEXE", id: "dexe" },
  { name: "Blur", symbol: "BLUR", id: "blur" },
  { name: "IoTeX Network", symbol: "IOTX", id: "iotex" },
  { name: "Compound", symbol: "COMP", id: "compound-governance-token" },
  { name: "Arkham", symbol: "ARKM", id: "arkham" },
  { name: "Livepeer Token", symbol: "LPT", id: "livepeer" },
  { name: "ConstitutionDAO", symbol: "PEOPLE", id: "constitutiondao" },
  { name: "WOO Network", symbol: "WOO", id: "woo-network" },
  { name: "1INCH Token", symbol: "1INCH", id: "1inch" },
  { name: "Curve DAO Token", symbol: "CRV", id: "curve-dao-token" },
  { name: "Golem Network Token", symbol: "GLM", id: "golem" },
  { name: "Chroma", symbol: "CHR", id: "chromaway" },
  { name: "HoloToken", symbol: "HOT", id: "holotoken" },
  { name: "Amp", symbol: "AMP", id: "amp-token" },
  { name: "Mask Network", symbol: "MASK", id: "mask-network" },
  { name: "Zilliqa", symbol: "ZIL", id: "zilliqa" },
  { name: "ZRX", symbol: "ZRX", id: "0x" },
  { name: "MX Token", symbol: "MX", id: "mx-token" },
  { name: "ELF", symbol: "ELF", id: "aelf" },
  { name: "Olympus", symbol: "OHM", id: "olympus" },
  { name: "Aragon Network Token", symbol: "ANT", id: "aragon" },
  { name: "Metis Token", symbol: "METIS", id: "metis-token" },
  { name: "EnjinCoin", symbol: "ENJ", id: "enjincoin" },
  { name: "Ankr Network", symbol: "ANKR", id: "ankr" },
  { name: "BAT", symbol: "BAT", id: "basic-attention-token" },
  { name: "Trace", symbol: "TRAC", id: "origintrail" },
  { name: "Tribe", symbol: "TRIBE", id: "tribe" },
  { name: "Rocket Pool", symbol: "RPL", id: "rocket-pool" },
  { name: "Threshold Network Token", symbol: "T", id: "threshold-network-token" },
  { name: "Illuvium", symbol: "ILV", id: "illuvium" },
  { name: "SingularityNET Token", symbol: "AGIX", id: "singularitynet" },
  { name: "NXM", symbol: "NXM", id: "nxm" },
  { name: "UMA Voting Token v1", symbol: "UMA", id: "uma" },
  { name: "PAAL AI", symbol: "PAAL", id: "paal" },
  { name: "SKALE", symbol: "SKL", id: "skale" },
  { name: "API3", symbol: "API3", id: "api3" },
  { name: "Banana", symbol: "BANANA", id: "banana-token" },
  { name: "SPACE ID", symbol: "ID", id: "space-id" },
  { name: "GoMining Token", symbol: "GMT", id: "stepn" },
  { name: "Rollbit Coin", symbol: "RLB", id: "rollbit-coin" },
  { name: "COTI Token", symbol: "COTI", id: "coti" },
  { name: "SwissBorg", symbol: "CHSB", id: "swissborg" },
  { name: "yearn.finance", symbol: "YFI", id: "yearn-finance" },
  { name: "Swipe", symbol: "SXP", id: "swipe" },
  { name: "Convex Token", symbol: "CVX", id: "convex-finance" },
  { name: "BandToken", symbol: "BAND", id: "band-protocol" },
  { name: "Tellor Tributes", symbol: "TRB", id: "tellor" },
  { name: "Audius", symbol: "AUDIO", id: "audius" },
  { name: "Ocean Token", symbol: "OCEAN", id: "ocean-protocol" },
  { name: "LoopringCoin V2", symbol: "LRC", id: "loopring" },
];


function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [indexPerformance, setIndexPerformance] = useState([]); // Store performance data
  const [highestCoin, setHighestCoin] = useState(null); // Track highest-performing coin
  const [lowestCoin, setLowestCoin] = useState(null); // Track lowest-performing coin
  const [marketSentiment, setMarketSentiment] = useState(null); // Market Sentiment
  const [indexSentimentScore, setIndexSentimentScore] = useState(50); // Default 50 (Neutral)
  const [indexSentimentClass, setIndexSentimentClass] = useState('Neutral'); // Default sentiment class
  const [popupVisible, setPopupVisible] = useState(false); // Popup state

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const ids = cryptoData.map((coin) => coin.id).join(',');
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;
        const response = await fetch(url);
        const data = await response.json();

        const enrichedData = data.map((coin) => ({
          name: coin.name,
          symbol: coin.symbol,
          id: coin.id,
          icon: coin.image,
          price: coin.current_price || 'N/A',
          marketCap: coin.market_cap || 'N/A',
          totalSupply: coin.total_supply || 'N/A',
          priceChange: coin.price_change_percentage_24h || 0, // Trend indicator
        }));

        setCryptos(enrichedData);

        // Calculate the highest and lowest-performing coins
        const highest = enrichedData.reduce((max, coin) =>
          coin.priceChange > max.priceChange ? coin : max
        );
        const lowest = enrichedData.reduce((min, coin) =>
          coin.priceChange < min.priceChange ? coin : min
        );
       

        setHighestCoin(highest);
        setLowestCoin(lowest);

        // Calculate the average index performance
        const averageChange =
          enrichedData.reduce((sum, coin) => sum + coin.priceChange, 0) /
          enrichedData.length;
        setIndexPerformance((prev) => [...prev, averageChange]); // Add to performance history

        // Calculate Fear & Greed Score for your index
        const normalizedScore = Math.min(
          Math.max(Math.round((averageChange + 10) * 5), 0), // Normalize to 0–100
          100
        );
        setIndexSentimentScore(normalizedScore);

        // Determine classification based on score
        const classifySentiment = (score) => {
          if (score <= 20) return 'Extreme Fear';
          if (score <= 40) return 'Fear';
          if (score <= 60) return 'Neutral';
          if (score <= 80) return 'Greed';
          return 'Extreme Greed';
        };
        setIndexSentimentClass(classifySentiment(normalizedScore));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching CoinGecko data:', error);
        setLoading(false);
      }
    };

    const fetchMarketSentiment = async () => {
      try {
        const response = await fetch(
          'https://api.alternative.me/fng/?limit=1'
        );
        const data = await response.json();
        setMarketSentiment(data.data[0]); // Save the first result
      } catch (error) {
        console.error('Error fetching market sentiment:', error);
      }
    };

    fetchTokenData();
    fetchMarketSentiment();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = cryptos.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedCoins = showAll ? filteredCoins : filteredCoins.slice(0, 10);

  // Prepare data for the Chart.js graph
  const chartData = {
    labels: indexPerformance.map((_, index) => `Update ${index + 1}`),
    datasets: [
      {
        label: 'Index Performance (%)',
        data: indexPerformance,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.2, // Smooth line
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Performance (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time Updates',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  const togglePopup = () => setPopupVisible(!popupVisible);
    const overallPerformance =
              indexPerformance.reduce((sum, value) => sum + value, 0) /
              indexPerformance.length || 0;
  return (
    <div className="crypto-list-container">
      {/* Market Sentiment Section */}
      <div className="market-sentiment">
        <h3>Market Sentiment</h3>
        {marketSentiment ? (
          <div className="sentiment-indicator">
            <p>
              <strong>Fear & Greed (Overall Market):</strong>{' '}
              {marketSentiment.value_classification} ({marketSentiment.value}/100)
            </p>
            <p>
              <strong>TIF Index Sentiment:</strong> {indexSentimentClass} ({indexSentimentScore}/100)
            </p>
            <p>
              Last Updated:{' '}
              {new Date(marketSentiment.timestamp * 1000).toLocaleString()}
            </p>
            <a href="#" onClick={togglePopup} className="learn-more-link">
              Learn More
            </a>
          </div>
        ) : (
          <p>Loading sentiment data...</p>
        )}
      </div>
        {/* Popup Window */}
      {popupVisible && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>What is the Fear & Greed Index?</h2>
            <p>
              The <strong>Fear & Greed Index</strong> measures the market sentiment in the cryptocurrency space. It uses
              metrics like volatility, trading volume, and social media trends to determine whether the market is
              experiencing <em>fear</em> (bearish sentiment) or <em>greed</em> (bullish sentiment).
            </p>
            <div className="popup-icons">
              <div className="icon-group">
                <i className="fas fa-exclamation-triangle fear-icon"></i>
                <p>Fear</p>
              </div>
              <div className="icon-group">
                <i className="fas fa-chart-line greed-icon"></i>
                <p>Greed</p>
              </div>
            </div>
            <button className="close-button" onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <div className="chart-container">


        {/* Overall Performance */}
        <div className="overall-performance">
          <h2>{overallPerformance.toFixed(2)}%</h2>
          <p>Overall Index Performance</p>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>

      
       {/* Informative Hub */}
      <div className="informative-hub">

        {/* Highest and Lowest Performers */}
        {highestCoin && lowestCoin ? (
          <div className="performance-details">
            <div className="highest-coin">
              <h4>Highest Performer</h4>
              <img src={highestCoin.icon} alt={`${highestCoin.name} logo`} />
              <p>
                <strong>{highestCoin.name}</strong> ({highestCoin.symbol})
              </p>
              <p className="positive">{highestCoin.priceChange.toFixed(2)}%</p>
            </div>
            <div className="lowest-coin">
              <h4>Lowest Performer</h4>
              <img src={lowestCoin.icon} alt={`${lowestCoin.name} logo`} />
              <p>
                <strong>{lowestCoin.name}</strong> ({lowestCoin.symbol})
              </p>
              <p className="negative">{lowestCoin.priceChange.toFixed(2)}%</p>
            </div>
          </div>
        ) : (
          <p>Loading performance data...</p>
        )}
      </div>

      {/* Search and Filter */}
      <div className="search-and-select-container">
        <input
          type="text"
          placeholder="Search for a coin"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="toggle-button"
        >
          {showAll ? 'Show Top 10' : 'Show All'}
        </button>
      </div>

      {/* Crypto List */}
      {loading ? (
        <p className="loading-text">Loading token data...</p>
      ) : (
         <div className="crypto-list-container">
      

      {loading ? (
        <p className="loading-text">Loading token data...</p>
      ) : (

        <ul className="crypto-list">
        
        {/* Disclaimer Section */}
    <div className="disclaimer">
    <h1>TIF Index Tokens</h1>
      <p>(All prices and values in this index are represented in USD.)</p>
    </div>
          {displayedCoins.map((coin, index) => (
            <li key={coin.id} className="crypto-item">
              {/* Rank Indicator */}
              <div className="crypto-rank">#{index + 1}</div>
              <img
                src={coin.icon}
                alt={`${coin.name} logo`}
                className="crypto-icon"
              />
              <div className="crypto-details">
                <h3 className="crypto-name">{coin.name}</h3>
                <p className="crypto-symbol">({coin.symbol})</p>
                <p>
                  <span className="stat-label-price"> ${coin.price}</span>
                </p>
                <p>
                  <span className="stat-label">Market Cap:</span> $
                  {coin.marketCap.toLocaleString()}
                </p>
                <p
                  className={`price-change ${
                    coin.priceChange > 0 ? 'positive' : 'negative'
                  }`}
                >
                  <span className="stat-label">24h Change:</span>{' '}
                  {coin.priceChange.toFixed(2)}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
      )}
    </div>
  );
}

export default CryptoList;