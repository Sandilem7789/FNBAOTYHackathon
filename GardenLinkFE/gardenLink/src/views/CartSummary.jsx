import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // ✅ Matching Navbar icon style
import api from '../api';

function CartSummary() {
  const { items, vendorId, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.quantity * i.produce.price, 0);

  const handleSubmit = async () => {
    if (!vendorId || vendorId <= 0) {
      alert('Vendor ID is missing or invalid. Please log in again.');
      return;
    }

    const payload = {
      vendor: Number(vendorId),
      items: items.map(i => ({
        produce: Number(i.produce.id),
        quantity: Number(i.quantity)
      }))
    };

    try {
      await api.post('orders/', payload);
      clearCart();
      navigate('/thank-you');
    } catch (err) {
      console.error('Order error:', err.response?.data || err.message);
      alert('Order failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">🛒 Your Order</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map(i => (
              <li
                key={i.produce.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{i.produce.name}</h3>
                  <p className="text-sm text-gray-600">
                    {i.quantity} {i.produce.unit} @ R{i.produce.price} each
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-green-700 font-bold">
                    R{(i.quantity * i.produce.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(i.produce.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right text-xl font-bold text-green-800">
            Total: R{total.toFixed(2)}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Submit Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartSummary;
