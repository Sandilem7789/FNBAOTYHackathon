import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GardenList from './views/GardenList';
import GardenDetail from './views/GardenDetail';
import VendorList from './views/VendorList';
import ProduceList from './views/ProduceList';
import LandingPage from './views/LandingPage';
import AuthScreen from './pages/AuthScreen';
import VendorDashboard from './pages/VendorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendor/login" element={<AuthScreen />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/gardens" element={<GardenList />} />
        <Route path="/gardens/:id" element={<GardenDetail />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/produce" element={<ProduceList />} />
      </Routes>
    </Router>
  );
}

export default App;
