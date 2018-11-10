"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _telegram = _interopRequireDefault(require("../reply-wrapper/telegram"));

var TelegramEventHandler =
/*#__PURE__*/
function () {
  function TelegramEventHandler(sendBackFunc) {
    (0, _classCallCheck2.default)(this, TelegramEventHandler);
    this.sendBack = sendBackFunc;
  }

  (0, _createClass2.default)(TelegramEventHandler, [{
    key: "parseKeyword",
    value: function parseKeyword(event, keyword) {
      var regex = "(/".concat(keyword, "@KatouBot)|(/").concat(keyword, ")");
      return event.message.text.replace(new RegExp(regex, "g"), "");
    }
  }, {
    key: "handle",
    value: function handle(event) {
      if (!event.message) return;
      var command = event.message.text;
      var sendBack = this.sendBack;

      if (command.includes("/say")) {
        sendBack(_telegram.default.replyTextMessage(event.message.chat.id, this.parseKeyword(event, "say")));
      }
    }
  }]);
  return TelegramEventHandler;
}();

exports.default = TelegramEventHandler;