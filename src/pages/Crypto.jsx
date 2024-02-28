import Filter from "../components/Filter"
import Table from "../components/Table"
import {Outlet} from "react-router-dom";

const Crypto = () => {
  return (
    <section className="xs:w-[80%] w-[90%]  h-full flex flex-col  mb-24 lg:mt-16 mt-8 relative">
      <Filter />
      <Table />
      <Outlet />
    </section>
  )
}

export default Crypto
