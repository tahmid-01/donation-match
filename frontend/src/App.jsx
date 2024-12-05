import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DonorsPage from "./pages/DonorsPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Donor from "./pages/Donor.jsx";
import Request from "./pages/Request.jsx";
import NewRequest from "./pages/NewRequest.jsx";
import NewDonation from "./pages/NewDonation";

function App() {
 return (
  <Router>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/request" element={<NewRequest />} />
    <Route path="/donate" element={<NewDonation />} />
    <Route path="/donor/:id" element={<Donor />} />
    <Route path="/request/:id" element={<Request />} />
    <Route path="/view/donors" element={<DonorsPage />} />
    <Route path="/view/requests" element={<RequestsPage />} />
   </Routes>
  </Router>
 );
}

export default App;
