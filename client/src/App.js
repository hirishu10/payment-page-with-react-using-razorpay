import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <h1>404 Sorry! Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
