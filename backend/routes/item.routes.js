const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Routes for CRUD operations on items
router.get('/', itemController.getAllItems);         // Get all items
router.get('/:id', itemController.getItemById);      // Get a specific item by ID
router.post('/', itemController.createItem);         // Create a new item
router.put('/:id', itemController.updateItem);       // Update an item by ID
router.delete('/:id', itemController.deleteItem);    // Delete an item by ID

module.exports = router;
