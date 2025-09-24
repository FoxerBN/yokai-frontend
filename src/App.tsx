import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './sections/HeroSection';
import FeaturedSection from './sections/FeaturedSection';
import CategoriesSection from './sections/CategoriesSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
}

export default App;