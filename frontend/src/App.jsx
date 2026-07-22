import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <BrowserRouter>
  <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/login" element={<LoginPage />} />

    <Route path="/signup" element={<SignupPage />} />

    <Route path="/dashboard/*" element={<DashboardLayout />} />

    <Route
      path="/analysis"
      element={<AnalysisPage />}
    />

  </Routes>
</BrowserRouter>
  );
}

export default App;
