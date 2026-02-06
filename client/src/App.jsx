import "./App.css";
import MyForm from "./MyForm";
import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BookHotel from "./BookHotel";
import ManageHotels from "./ManageHotels";
import About from "./About";
import Contact from "./Contact";
import BookingList from "./BookingList";
import BookingPage from "./HotelBookingPage";
import DefaultLayout from "./components/DefaultLayout";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <DefaultLayout>
          <Navbar title="Hotel Management" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<MyForm title="Customer Registration" />} />
            <Route path="/Book" element={<BookHotel />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/manage_hotels" element={<ManageHotels />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route 
              path="*" 
              element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      404
                    </h1>
                    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      The page you're looking for doesn't exist.
                    </p>
                    <a 
                      href="/" 
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Go Back Home
                    </a>
                  </div>
                </div>
              } 
            />
          </Routes>
          <Footer />
        </DefaultLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;