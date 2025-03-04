class MockDevice {
    open(callback) {
        console.log('MockDevice: open');
        callback();
    }
}

class MockPrinter {
    constructor(device) {
        this.device = device;
    }

    font() {
        console.log('MockPrinter: font');
        return this;
    }

    align() {
        console.log('MockPrinter: align');
        return this;
    }

    style() {
        console.log('MockPrinter: style');
        return this;
    }

    size() {
        console.log('MockPrinter: size');
        return this;
    }

    text(text) {
        console.log(`MockPrinter: text - ${text}`);
        return this;
    }

    cut() {
        console.log('MockPrinter: cut');
        return this;
    }

    close() {
        console.log('MockPrinter: close');
        return this;
    }
}

module.exports = {
    USB: MockDevice,
    Printer: MockPrinter
};