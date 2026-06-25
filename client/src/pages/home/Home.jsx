import { useState } from "react";
import Accordion from "./components/Accordion";
import Card from "../../components/ui/Card";
import Counter from "../../components/ui/Counter";
import data from "../../db/data.json";

const Home = () => {
  return (
    <section className="Container page_py flex flex-col sm:flex-row items-start gap-[29px] ">
      <Accordion defaultActiveIndex={0} items={data?.steps} />
      <div className="max-w-[399px] w-full h-[100px] bg-amber-50"></div>
    </section>
  );
};

export default Home;
