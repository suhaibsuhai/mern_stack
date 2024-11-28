const Item = require('../models/item.model');

// Get all items
exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json({ message: 'Failed to fetch items', error: err }));
};

// Get a single item by ID
exports.getItemById = (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    })
    .catch((err) => res.status(500).json({ message: 'Failed to fetch item', error: err }));
};

// Create a new item
exports.createItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  newItem.save()
    .then((item) => res.status(201).json(item))
    .catch((err) => res.status(500).json({ message: 'Failed to create item', error: err }));
};

// Update an existing item by ID
exports.updateItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    })
    .catch((err) => res.status(500).json({ message: 'Failed to update item', error: err }));
};

// Delete an item by ID
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    })
    .catch((err) => res.status(500).json({ message: 'Failed to delete item', error: err }));
};
