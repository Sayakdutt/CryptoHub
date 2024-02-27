import { useContext, useRef } from "react";
import leftSubmit from "../assets/left-arrow.svg";
import rightSubmit from "../assets/right-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const inputRef = useRef(null);
  const { setPerPage } = useContext(CryptoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito mr-6"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="currency"
        className="relative flex justify-center mr-2 font-bold"
      >
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="10"
        className="hover:appearance-none appearance-none w-8 h-6 rounded bg-gray-200 placeholder:text-gray-100 placeholder:text-sm required outline-0 
        border border-transparent focus:border-cyan leading-4  text-center text-sm
        "
        autoComplete="off"
        required
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img
          src={submitIcon}
          alt="submit"
          className="w-full h-auto"
        />
      </button>
    </form>
  );
};
const Pagination = () => {
  const { page, setPage, totalPages, perPage, crypto } =
    useContext(CryptoContext);
  const TotalNumber = Math.ceil(totalPages / perPage);
  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };
  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };
  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 3);
    }
  };
  if (crypto && crypto.length >= perPage) {
    return (
      <div className="flex md:flex-row flex-col items-center md:mt-0 mt-4">
        <PerPage />
        <ul className="flex items-center justify-end text-sm sm:mt-0 mt-4">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
              <img src={leftSubmit} alt="left" className="w-full h-auto" />
            </button>
          </li>
          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-md"
                onClick={multiStepPrev}
              >
                ...
              </button>
            </li>
          ) : null}
          {page - 1 != 0 ? (
            <li>
              <button
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-md bg-gray-200 mx-1"
                onClick={prev}
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 rounded-full w-8 h-8 flex items-center justify-center text-md bg-cyan text-gray-300 mx-1.5">
              {page}
            </button>
          </li>
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-md bg-gray-200 mx-1"
                onClick={next}
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {" "}
              <button
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-md"
                onClick={multiStepNext}
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== TotalNumber ? (
            <li>
              <button
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-md bg-gray-200 mx-1.5"
                onClick={() => setPage(TotalNumber)}
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img src={rightSubmit} alt="right" className="w-full h-auto" />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
