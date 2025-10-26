import { useCart } from '../context/CartContext';
import api from '../api';

function CartSummary() {
  const { items, vendorId, clearCart } = useCart();

  const handleSubmit = () => {
    const payload = {
      vendor: vendorId,
      items: items.map(i => ({
        produce: i.produce.id,
        quantity: i.quantity
      }))
    };

    api.post('orders/', payload)
      .then(() => {
        alert('Order submitted!');
        clearCart();
      })
      .catch(err => console.error('Order error:', err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Order</h1>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.produce.id} className="bg-white p-4 rounded shadow">
            {i.produce.name} — {i.quantity} {i.produce.unit}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Submit Order
      </button>
    </div>
  );
}

export default CartSummary;
