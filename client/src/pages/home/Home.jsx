import useGetData from "../../hooks/useGetData";
import { API } from "../../services/api";
import Accordion from "./components/Accordion";
// import data from "../../db/data.json";

const Home = () => {
  const { data, loading } = useGetData(API.home);
  return (
    <section className="Container page_py flex flex-col sm:flex-row items-start gap-[29px] ">
      <Accordion defaultActiveIndex={0} items={data} />
      <div className="max-w-[399px] w-full h-[100px] bg-amber-50"></div>
    </section>
  );
};

export default Home;
