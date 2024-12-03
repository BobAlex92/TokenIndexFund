import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";


function App() {
  return (
    <Router basename="/TIF">
      <Routes>
        {/* This will make LandingPage the default route */}
        <Route path="/" element={<LandingPage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;

