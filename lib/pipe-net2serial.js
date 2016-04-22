
module.exports = function (options) {
    if ( ! options.serialPort) {
        console.log('serialPort argument is not optional');
        process.exit();
    }

    var _opts = {
        host: options.host || 'localhost',
        port: options.port || 6969,
        serialPort: options.serialPort,
        baudRate: options.baudRate || 9600
    };

    var net = require('net'),
        SerialPort = require('serialport').SerialPort;

    return net.createServer(function(sock) {
        var serialPort = new SerialPort(_opts.serialPort, {
            baudRate: _opts.baudRate
        });

        function pipeIt() {
            if (serialPort.isOpen()) {
                serialPort.close();
            }

            serialPort.pipe(sock);
            sock.pipe(serialPort);
        }

        pipeIt();

        sock.on('error', function () {
            pipeIt();
        });
    }).listen(_opts.port, _opts.host);
};