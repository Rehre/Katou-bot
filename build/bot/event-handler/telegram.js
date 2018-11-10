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
      if (!event.message) return;
      var command = event.message.text;
      var messageObject = event.message;
      var receiverChatID = event.message.chat.id;
      var sendBack = this.sendBack;
      var botApi = this.botApi;

      if (command === "katou") {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.sendReply(messageObject.chat.first_name)));
      }

      if (command.includes("/ramal")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.getRamal()));
      }

      if (command.includes("/say")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, this.parseKeyword(messageObject, "say")));
      }
    }
  }]);
  return TelegramEventHandler;
}();

exports.default = TelegramEventHandler;