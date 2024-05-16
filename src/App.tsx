import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Choose from "./pages/Choose.tsx";
import Practice from "./pages/Practice.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Choose />} />
        <Route path="/practice/:number" element={<Practice />} />
      </Routes>
    </Router>
  );
};

export default App;
