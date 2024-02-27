import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext.jsx";
import debounce from "lodash.debounce";
import searchIcon from "../assets/search-icon.svg";
// eslint-disable-next-line react/prop-types
const SearchInput = ({ handleSearch }) => {
  const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);
  const [searchText, setSearchText] = useState("");
  const handleInput = (event)=> {
    event.preventDefault();
    const query = event.target.value;
    setSearchText(query);
    handleSearch(searchText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };
  return (
    <>
      <form
        className="xl:w-96 lg:w-60 w-full relative flex items-center lg:ml-7 font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 outline-0 border border-transparent focus:border-cyan"
          placeholder="search here..."
          autoComplete="off"
          value={searchText}
          required
          onChange={handleInput}
          onBlur={() => setSearchText("")}
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} alt="search-icon" className="w-full h-auto"/>
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul
          className="absolute top-11 right-0 w-96 h-96 rounded
        overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 
        backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200"
        >
          {searchData ? (
            searchData?.coins?.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                  
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};
const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};


export default Search;
