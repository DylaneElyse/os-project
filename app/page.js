'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // State to track the item being edited

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      if (!res.ok) {
        throw new Error('Failed to fetch inventory');
      }
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

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

      setName('');
      setQuantity('');
      fetchInventory();

    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleUpdate = async (id) => {
    setError(null);

    try {
      const res = await fetch('/api/inventory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity: parseInt(editingItem.quantity) }),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      setEditingItem(null);
      fetchInventory();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Inventory Management</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* ... (form for adding items remains the same) ... */}
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

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-4">Current Inventory</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {inventory.length > 0 ? (
              <ul className="space-y-3">
                {inventory.map((item) => (
                  <li key={item.id} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                    {editingItem && editingItem.id === item.id ? (
                      <>
                        <span className="font-semibold text-gray-800">{item.name}</span>
                        <input
                          type="number"
                          value={editingItem.quantity}
                          onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                          className="shadow-sm appearance-none border rounded w-24 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div>
                          <button onClick={() => handleUpdate(item.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">Save</button>
                          <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm ml-2">Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-gray-800">{item.name}</span>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-4">Quantity: {item.quantity}</span>
                          <button onClick={() => handleEdit(item)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm">Edit</button>
                        </div>
                      </>
                    )}
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
