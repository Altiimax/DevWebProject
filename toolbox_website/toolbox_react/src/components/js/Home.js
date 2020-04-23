import React from "react";
import logo from "../../nut.svg";
import "../css/Home.css";


export default function Home() {
  return (
    <>
      <div className="Home">
        <section>
          <img src={logo} className="Home-logo" alt="logo" />
        </section>
      </div>
    </>
  );
}
