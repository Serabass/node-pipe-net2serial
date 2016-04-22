require('pipe').install();

module.exports = function (options) {
    var _opts = {
        host: options.host || 'localhost',
        port: options.port || 6969,
        serialPort: options.serialPort || 'COM1',
        baudRate: options.baudRate || 9600
    };

    var net = require('net'),
        SerialPort = require('serialport').SerialPort;

    net.createServer(function(sock) {
        var serialPort = new SerialPort(_opts.serialPort, {
            baudrate: _opts.baudRate
        });

        serialPort | sock;
        sock | serialPort;
    }).listen(_opts.port, _opts.host);
};