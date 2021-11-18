import React from "react";

import LeftCat from "./LeftCat";
import RightDog from "./RightDog";
import Intro from "./Intro";

export default function Main() {

  return (
    <div className="main">
      <section className="main_section">
        <LeftCat />
        <RightDog />
      </section>
      <section className="main_section">
        <Intro />
      </section>
    </div>
  );
} 