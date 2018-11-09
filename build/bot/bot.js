"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _botSdk = require("@line/bot-sdk");

var _botConfig = _interopRequireDefault(require("./bot-config"));

var _line = _interopRequireDefault(require("./event-handler/line"));

// server setup
var app = (0, _express.default)();
app.set("PORT", process.env.PORT || 3000); // -- START LINE BOT SETUP --
// setup the event handler for LINE

var lineEventHandler = new _line.default(new _botSdk.Client(_botConfig.default.line)); // listen to the API post /webhook_line for getting the LINE response

app.post("/webhook_line", (0, _botSdk.middleware)(_botConfig.default.line), function (req, res) {
  // wait for all the requested events to be finished then send the result;
  Promise.all(req.body.events.map(lineEventHandler.handle)).then(function (result) {
    return res.json(result);
  });
}); // -- END LINE BOT SETUP --
// -- START TELEGRAM BOT SETUP --

app.post("/".concat(_botConfig.default.telegram.token), _bodyParser.default.json(), function (req, res) {
  res.header("Content-Type", "application/json");

  if (req.body.message.chat.text.includes('/say')) {
    res.status(200).send(JSON.stringify({
      method: "sendMessage",
      chat_id: req.body.message.chat.id,
      text: req.body.message.text.match(/[^\/say@KatouBot|/say]/g)[0]
    }));
    return;
  }

  res.status(200).send(JSON.stringify({
    method: "sendMessage",
    chat_id: req.body.message.chat.id,
    text: req.body.message.text
  }));
  console.log(req.body);
}); // -- END TELEGRAM BOT SETUP --
// start the server

app.listen(app.get("PORT"), function () {
  return console.log("Katou is listening in PORT: ".concat(app.get("PORT")));
});