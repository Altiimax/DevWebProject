import React from "react";
import "./App.css";
import Route from "./Routes";
import Header from "./components/js/Header";
import Footer from "./components/js/Footer";

function App() {
  return (
    <div className="page-container">
      <header>
        <Header />
      </header>
      <div className="content-wrap">
        <Route />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
