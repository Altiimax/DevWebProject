import React from "react";

import "../css/NotFound.css";

export default function NotFound() {
  return (
    <div className="NotFound">
      <h1 className="error">ERROR 404</h1>
      <h3>
        We are sorry but the page "{window.location.pathname}" you are looking
        for does not exist.
      </h3>
    </div>
  );
}
