import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GardenList from './views/GardenList';
import GardenDetail from './views/GardenDetail';
import VendorList from './views/VendorList';
import ProduceList from './views/ProduceList';
import LandingPage from './views/LandingPage';
import AuthScreen from './pages/AuthScreen';
import VendorDashboard from './pages/VendorDashboard';
import GardenerDashboard from './pages/GardenerDashboard';
import MainLayout from './components/MainLayout';
import CartSummary from './views/CartSummary';
import ThankYou from './views/ThankYou';
import { CartProvider } from './context/CartContext'; // ✅ Import CartProvider

function App() {
  return (
    <CartProvider> {/* ✅ Wrap everything in CartProvider */}
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthScreen />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/gardens" element={<GardenList />} />
            <Route path="/gardens/:id" element={<GardenDetail />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/produce" element={<ProduceList />} />
            <Route path="/gardener/dashboard" element={<GardenerDashboard />} />
            <Route path="/vendor/garden/:id" element={<GardenDetail />} />
            <Route path="/cart" element={<CartSummary />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
