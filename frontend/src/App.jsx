import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DonorsPage from "./pages/DonorsPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";

function App() {
 return (
  <Router>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/view/donors" element={<DonorsPage />} />
    <Route path="/view/requests" element={<RequestsPage />} />
   </Routes>
  </Router>
 );
}

export default App;
