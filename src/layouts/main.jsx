import React from "react";
import DatesForm from "../components/ui/datesForm";
import Slider from "../components/ui/slider";
const Main = () => {
  return (
    <>
      {" "}
      <header>
        <h1 className="heading">Отели</h1>
      </header>
      <main>
        <DatesForm />
        <Slider />
      </main>
      ;
    </>
  );
};

export default Main;
