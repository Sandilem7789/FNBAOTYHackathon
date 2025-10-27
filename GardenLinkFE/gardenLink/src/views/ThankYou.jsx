import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
        src="/landing-background.mp4" // ✅ Use your landing page video
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-6">
          Thank you for supporting local communities through GardenLink 🌱
        </h1>
        <div className="space-x-4">
          <Link to="/gardens">
            <button className="bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-green-100 transition">
              Continue Shopping
            </button>
          </Link>
          <Link to="/">
            <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
