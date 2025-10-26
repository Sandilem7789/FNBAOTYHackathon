import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [vendorId, setVendorId] = useState(null); // Set this when vendor logs in or selects

  const addToCart = (produce, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.produce.id === produce.id);
      if (existing) {
        return prev.map(i =>
          i.produce.id === produce.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { produce, quantity }];
    });
  };

  const removeFromCart = (produceId) => {
    setItems(prev => prev.filter(i => i.produce.id !== produceId));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, vendorId, setVendorId, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
