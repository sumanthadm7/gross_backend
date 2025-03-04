const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const itemController = require('../controllers/itemContoller');
const auth = require('../middleware/auth');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const printer = require('../controllers/billController');


router.get('/profile', auth, authController.profile);

//routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/item/:id', itemController.getItem);
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);
router.post('/print', printer.printReceipt);



module.exports = router;