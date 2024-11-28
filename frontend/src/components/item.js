import React, { useState, useEffect } from 'react';
import ItemService from '../services/item.service';

const Item = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: '', description: '', price: 0, _id: null });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from the backend
  const fetchItems = async () => {
    try {
      const response = await ItemService.getItems();
      setItems(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch items.');
    }
  };

  // Handle form submission for add or update
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (item._id) {
      // Update item
      try {
        await ItemService.updateItem(item._id, item);
        fetchItems();  // Refresh the list
        setItem({ name: '', description: '', price: 0, _id: null }); // Reset form
      } catch (error) {
        setErrorMessage('Failed to update item.');
      }
    } else {
      // Add new item
      try {
        const response = await ItemService.addItem(item);
        setItems([...items, response.data]);  // Add the new item to the list
        setItem({ name: '', description: '', price: 0, _id: null }); // Reset form
      } catch (error) {
        setErrorMessage('Failed to add item.');
      }
    }
  };

  // Handle editing an item
  const handleEdit = (item) => {
    setItem({ ...item });
  };

  // Handle deleting an item
  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await ItemService.deleteItem(itemId);
        setItems(items.filter((item) => item._id !== itemId));
      } catch (error) {
        setErrorMessage('Failed to delete item.');
      }
    }
  };

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/* Form for adding or editing an item */}
      <div>
        <h2>{item._id ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) })}
              required
              min="0"
            />
          </div>
          <button type="submit">{item._id ? 'Update Item' : 'Add Item'}</button>
        </form>
      </div>

      {/* List of Items */}
      <div>
        {items.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <h3>{item.name}</h3>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* No Items Message */}
      {items.length === 0 && <p>No items available. Add a new item!</p>}
    </div>
  );
};

export default Item;
