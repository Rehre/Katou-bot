"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _telegram = _interopRequireDefault(require("../reply-wrapper/telegram"));

var _botApi = _interopRequireDefault(require("../bot-api"));

var _constants = _interopRequireDefault(require("../constants"));

var TelegramEventHandler =
/*#__PURE__*/
function () {
  function TelegramEventHandler(sendBackFunc) {
    (0, _classCallCheck2.default)(this, TelegramEventHandler);
    this.sendBack = sendBackFunc;
    this.botApi = new _botApi.default();
  }

  (0, _createClass2.default)(TelegramEventHandler, [{
    key: "parseKeyword",
    value: function parseKeyword(messageObject, keyword) {
      var regex = "(/".concat(keyword, "@KatouBot)|(/").concat(keyword, ")");
      return messageObject.text.replace(new RegExp(regex, "g"), "");
    }
  }, {
    key: "handle",
    value: function handle(event) {
      if (!event.message) this.sendBack({});
      var command = event.message.text;
      var messageObject = event.message;
      var receiverChatID = event.message.chat.id;
      var sendBack = this.sendBack;
      var botApi = this.botApi;
      if (command[0] != "/") this.sendBack({});

      if (command.includes("/katou")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.sendReply(messageObject.from.first_name)));
      }

      if (command.includes("/ramal")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.getRamal()));
      }

      if (command.includes("/say")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, this.parseKeyword(messageObject, "say")));
      }

      if (command.includes("/wiki")) {
        botApi.getWiki(this.parseKeyword(messageObject, "wiki")).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/hbd")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, "Selamat ulang tahun ".concat(this.parseKeyword(messageObject, "hbd"), " :D")));
      }

      if (command.includes("/weather")) {
        botApi.getWeather(this.parseKeyword(messageObject, "weather")).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/calc")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, eval(this.parseKeyword(messageObject, "calc"))));
      }

      if (command.includes("/pic")) {
        botApi.getImageUrl(this.parseKeyword(messageObject, "pic")).then(function (result) {
          sendBack(_telegram.default.replyPhoto(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/video")) {
        botApi.getYoutubeUrl(this.parseKeyword(messageObject, "video")).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "".concat(result.title, "\n\n").concat(result.link)));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/location")) {
        botApi.getLocation(this.parseKeyword(messageObject, "location")).then(function (result) {
          sendBack(_telegram.default.replyLocation(receiverChatID, result.latitude, result.longitude));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/write")) {
        sendBack(_telegram.default.replyPhoto(receiverChatID, "".concat(_constants.default.CHARTAPI_URL).concat(this.parseKeyword(messageObject, "write")).concat(_constants.default.CHARTAPI_QUERY)));
      }

      if (command.includes("/music")) {
        botApi.getYoutubeUrl(this.parseKeyword(messageObject, "music")).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "".concat(result.title, "\n\n Link download : ").concat(_constants.default.MP3YOUTUBE_URL).concat(result.link)));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/animequote")) {
        var quotesItem = botApi.getAnimeQuote();
        sendBack(_telegram.default.replyTextMessage(receiverChatID, "\"".concat(quotesItem.quotesentence, "\"\nBy : ").concat(quotesItem.quotecharacter, "\nFrom :  ").concat(quotesItem.quoteanime)));
      }

      if (command.includes("/lovemeter")) {
        botApi.getLoveMeter(this.parseKeyword(messageObject, "lovemeter")).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Persentase pasangan ".concat(result.fname, " dan ").concat(result.sname, " :\n\n").concat(result.percentage, "%\n\nSaran: ").concat(result.result)));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }
    }
  }]);
  return TelegramEventHandler;
}();

exports.default = TelegramEventHandler;