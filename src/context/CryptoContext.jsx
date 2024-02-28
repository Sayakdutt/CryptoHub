import { createContext, useLayoutEffect, useState } from "react";

//create context object
export const CryptoContext = createContext({});

//create the provider component
// eslint-disable-next-line react/prop-types
export const CryptoProvider = ({ children }) => {
  const [crypto, setCrypto] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");
  const [coinData,setCoinData] = useState();
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage,setPerPage] = useState(8);

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => res.json())
        .then((json) => json);

      setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      );
      const json = await data.json();
      setCrypto(json);
    } catch (error) {
      console.log(error);
    }
  };
  const getCoinData = async (coinId) => {
    
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?locallization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      );
      const json = await data.json();
      setCoinData(json);
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const json = await data.json();
      setSearchData(json);
    } catch (error) {
      console.log(error);
    }
  };
  const resetFunction = ()=>{
    setPage(1);
    setCoinSearch("");
  }
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page,perPage]);
  return (
    <CryptoContext.Provider
      value={{
        crypto,
        searchData,
        getSearchResult,
        setCoinSearch,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        perPage,
        setPerPage,
        coinData,
        getCoinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
