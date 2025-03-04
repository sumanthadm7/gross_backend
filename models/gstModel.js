const mongoose = require('mongoose');

const gstSchema = new mongoose.Schema({
    gst: {
        type: Number,
        required: true
    }
})

const Gst = mongoose.model('Gst', gstSchema);
module.exports = Gst;