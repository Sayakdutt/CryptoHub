import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import NavBar from "../components/NavBar.jsx";
import { CryptoProvider } from "../context/CryptoContext.jsx";
import { TrendingProvider } from "../context/TrendingContext.jsx";
import { StorageProvider } from "../context/StorageContext.jsx";

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main
            className="w-full h-full flex flex-col content-center
     items-center relative text-white font-nunito"
          >
            <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
            <Link
              to="/"
              className="absolute sm:top-[1.5rem] top-[1rem] sm:left-[1.5rem] left-[1rem] [text-decoration:none]  text-cyan cursor-pointer flex items-center sm:text-lg text-md "
            >
              <img src={logo} alt="cryptohub logo" className="w-[25%] h-auto"/>
              <span>CryptoHub</span>
            </Link>
            <NavBar />
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
