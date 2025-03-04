const item = require('../models/itemModel');

// Add a new item
const createItem = async (req, res) => {
    try {
        const { itemName, itemPrice, itemDescription, itemImage, itemStock } = req.body;
        const newItem = new item({
            itemName,
            itemPrice,
            itemDescription,
            itemImage,
            itemStock
        });

        if (!itemName || !itemPrice) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get all items
const getAllItems = async (req, res) => {
    try {
        const items = await item.find();
        if(items.length < 1){
            return res.status(404).json({ message: "No items found" });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single item
const getItem = async (req, res) =>{
    try {
        const { id } = req.params;
        const singleItem = await item.findById(id);
        if(!singleItem){
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(singleItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemPrice, itemDescription, itemImage, itemStock } = req.body;
        if (!itemName || !itemPrice) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const updatedItem = { itemName, itemPrice, itemDescription, itemImage, itemStock };
        const result = await item.findByIdAndUpdate(id, updatedItem, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await item.findByIdAndDelete(id);
        if(!deletedItem){
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem
};