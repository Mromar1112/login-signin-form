import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Login";
import SignInForm from "./SignInForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
