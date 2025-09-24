import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnAboutYokai from './pages/LearnAboutYokai';



function App() {
  return (
    <Router>
          <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn" element={<LearnAboutYokai />} />
            </Routes>
            <Footer />
          </div>
        </Router>
  );
}

export default App;