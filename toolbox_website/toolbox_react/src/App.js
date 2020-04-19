import React from "react";
import "./App.css";
import Route from "./Routes";
import Header from "./components/js/Header";
import Footer from "./components/js/Footer";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <body>
        <Route />
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
