var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const userID = 0;

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("User Connected");
    socket.on('message', (msg) => {
        var today = new Date();
        console.log(today.toLocaleString("en-US"));
      console.log('message: ' + JSON.stringify(msg));
      bot.sendMessage(userID, `${msg["msg"]}\nSensor:\t${msg["sensor"]}\nABS Sensor:\t${msg["absSensor"]}`)
    });
    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    });
});

http.listen(port, '0.0.0.0', () => {
  console.log('listening on *:' + port);
});