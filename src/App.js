import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PrintBill from "./components/PrintBill";
import Error from "./components/Error";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/printbill" element={<PrintBill />} />
          <Route path="/error" element={<Error />} />
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
