let escpos;
try {
    escpos = require('escpos');
    escpos.USB = require('escpos-usb');
} catch (error) {
    console.log('Using mock escpos');
    escpos = require('../utils/mockEscpos');
}

const printReceipt = async (req, res) => {
    try {
        const { items, total, date, receiptNumber } = req.body;

        // Connect to the printer
        let device;
        try {
            device = new escpos.USB(); // Use USB connection for wired printer
        } catch (error) {
            console.log('Using mock device');
            device = new escpos.USB(); // Use mock device
        }

        const printer = new escpos.Printer(device);

        device.open(() => {
            printer
                .font('a')
                .align('ct')
                .style('bu')
                .size(1, 1)
                .text('Store Name')
                .text('Address Line 1')
                .text('Address Line 2')
                .text('Phone: 123-456-7890')
                .text(' ')
                .text(`Receipt #: ${receiptNumber}`)
                .text(`Date: ${date}`)
                .text(' ')
                .align('lt')
                .text('Item        Qty   Price   Total')
                .text('--------------------------------')
                .font('b')
                .size(1, 1);

            items.forEach(item => {
                printer.text(`${item.name}   ${item.qty}   ${item.price}   ${item.total}`);
            });

            printer
                .text('--------------------------------')
                .text(`Total: ${total}`)
                .text(' ')
                .text('Thank you for your purchase!')
                .cut()
                .close();

            res.status(200).json({ message: 'Receipt printed successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    printReceipt
};