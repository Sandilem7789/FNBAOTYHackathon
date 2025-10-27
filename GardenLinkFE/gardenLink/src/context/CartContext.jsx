import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ Restore vendorId from localStorage
  const [vendorId, setVendorId] = useState(() => {
    const stored = localStorage.getItem('vendorId');
    return stored ? Number(stored) : null;
  });

  const [items, setItems] = useState([]);

  // ✅ Update vendorId and persist it
  const updateVendorId = (id) => {
    localStorage.setItem('vendorId', id);
    setVendorId(Number(id));
  };

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
    <CartContext.Provider
      value={{
        items,
        vendorId,
        setVendorId: updateVendorId, // ✅ Use the updater
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
