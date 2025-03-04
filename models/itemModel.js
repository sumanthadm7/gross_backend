const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        itemName:{
            type: String,
            required: true
        },
        itemPrice:{
            type: Number,
            required: true
        },
        itemStock:{
            type: Number,
            required: false
        }
    }
)

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;