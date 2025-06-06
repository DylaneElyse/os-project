'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventory, setInventory] = useState([]); // State to hold the inventory list
  const [error, setError] = useState(null);

  // --- 1. Function to fetch inventory data ---
  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      if (!res.ok) {
        throw new Error('Failed to fetch inventory');
      }
      const data = await res.json();
      setInventory(data); // Update the state with the fetched data
    } catch (err) {
      setError(err.message);
    }
  };

  // --- 2. useEffect to fetch data when the component loads ---
  useEffect(() => {
    fetchInventory();
  }, []); // The empty array means this effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity: parseInt(quantity) }),
      });

      if (!res.ok) {
        throw new Error('Failed to add item');
      }

      // Clear the form
      setName('');
      setQuantity('');
      
      // --- 3. Re-fetch the inventory to show the new item ---
      fetchInventory();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Inventory Management</h1>
        
        {/* --- Form to Add Items --- */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Item Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Item
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>

        {/* --- 4. Section to Display Inventory --- */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-4">Current Inventory</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {inventory.length > 0 ? (
              <ul className="space-y-3">
                {inventory.map((item) => (
                  <li key={item.item_id} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                    <span className="font-semibold text-gray-800">{item.item_name}</span>
                    <span className="text-gray-600">Quantity: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No items in inventory.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}