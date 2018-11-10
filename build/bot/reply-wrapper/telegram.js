"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Wrapper =
/*#__PURE__*/
function () {
  function Wrapper() {
    (0, _classCallCheck2.default)(this, Wrapper);
  }

  (0, _createClass2.default)(Wrapper, null, [{
    key: "replyTextMessage",
    value: function replyTextMessage(chat_id, text) {
      return {
        method: "sendMessage",
        chat_id: chat_id,
        text: text
      };
    }
  }]);
  return Wrapper;
}();

exports.default = Wrapper;