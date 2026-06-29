import Empty from "../../components/ui/Empty";
import useGetData from "../../hooks/useGetData";
import { useCart } from "../../providers/CartProvider";
import { API } from "../../services/api";
import Accordion from "./components/Accordion";
import AccordionSkeleton from "./components/loading/AccordionSkeleton";
import Review from "./components/Review";
// import data from "../../db/data.json";

const Home = () => {
  const { data, loading, error } = useGetData(API.home);
  const { cartLoader } = useCart();
  console.log((data && !loading) || error, "dd");
  if ((!data && !loading) || error) {
    return <Empty />;
  }
  return (
    <section className="Container page_py flex flex-col lg:flex-row items-start gap-[29px] ">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="sm:hidden  text-center display_xl text-neutral-950 -tracking-[.06px] ">
          Let’s get started!
        </h1>
        {loading ? (
          <AccordionSkeleton itemsCount={4} />
        ) : (
          <Accordion defaultActiveIndex={0} items={data} />
        )}
      </div>
      {cartLoader ? (
        <div className="animate-pulse bg-neutral-100 h-[900px] rounded-[10px] w-full lg:max-w-[399px] w-full" />
      ) : (
        <div className="w-full lg:max-w-[399px] w-full h-full bg-primary-50 rounded-[10px]">
          <Review />
        </div>
      )}
    </section>
  );
};

export default Home;
