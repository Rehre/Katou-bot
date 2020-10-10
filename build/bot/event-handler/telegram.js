"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _telegram = _interopRequireDefault(require("../reply-wrapper/telegram"));

var _botApi = _interopRequireDefault(require("../bot-api"));

var _constants = _interopRequireDefault(require("../constants"));

/**
 * Telegram event handler
 */
var TelegramEventHandler = /*#__PURE__*/function () {
  /**
   * @param {function} sendBackFunc function to send back response to telegram request
   */
  function TelegramEventHandler(sendBackFunc) {
    (0, _classCallCheck2["default"])(this, TelegramEventHandler);
    this.sendBack = sendBackFunc;
    this.botApi = new _botApi["default"]();
    this.commandList = ['/ai', '/katou', '/help', '/ramal', '/say', '/wiki', '/hbd', '/weather', '/write', '/animequote', '/osu'];
  }
  /**
   * function to format the telegram keyword message
   * @param {object} messageObject telegram message object
   * @param {string} keyword keyword from the message
   * @return {string} a formatted keyword text
   */


  (0, _createClass2["default"])(TelegramEventHandler, [{
    key: "parseKeyword",
    value: function parseKeyword(messageObject, keyword) {
      // eslint-disable-next-line no-useless-escape
      var regex = "(/".concat(keyword, "@KatouBot)|(/").concat(keyword, ")");
      return messageObject.text.replace(new RegExp(regex, 'g'), '');
    }
    /**
     * function to handle incoming telegram event
     * @param {object} event telegram event object
     */

  }, {
    key: "handle",
    value: function handle(event) {
      var _this = this;

      if (!event.message) {
        this.sendBack({});
        return;
      }

      var botApi = this.botApi;
      var messageObject = event.message;
      var command = event.message.text.split(' ')[0].trim();
      var receiverChatID = event.message.chat.id;

      if (!command) {
        this.sendBack({});
        return;
      }

      if (!this.commandList.some(function (item) {
        return command.includes(item);
      })) {
        this.sendBack({});
        return;
      } // NOTE: EXPERIMENTAL FEATURE


      if (command.includes('/ai')) {
        var keyword = this.parseKeyword(messageObject, 'ai');
        botApi.getNLP(keyword).then(function (result) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, result));
        })["catch"](function (err) {
          return _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, err.message));
        });
      }

      if (command.includes('/katou')) {
        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, botApi.sendReply(messageObject.from.first_name)));
      }

      if (command.includes('/help')) {
        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, _constants["default"].TELEGRAM_HELP));
      }

      if (command.includes('/ramal')) {
        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, botApi.getRamal()));
      }

      if (command.includes('/say')) {
        var _keyword = this.parseKeyword(messageObject, 'say').trim();

        if (!_keyword) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti ini: /say keyword'));
          return;
        }

        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, _keyword));
      }

      if (command.includes('/wiki')) {
        var _keyword2 = this.parseKeyword(messageObject, 'wiki').trim();

        if (!_keyword2) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti ini: /wiki keyword'));
          return;
        }

        botApi.getWiki(_keyword2).then(function (result) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, result));
        })["catch"](function (err) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, err.message));
        });
      }

      if (command.includes('/hbd')) {
        var _keyword3 = this.parseKeyword(messageObject, 'hbd').trim();

        if (!_keyword3) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti ini: /hbd keyword'));
          return;
        }

        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, "Selamat ulang tahun ".concat(_keyword3, " :D")));
      }

      if (command.includes('/weather')) {
        var _keyword4 = this.parseKeyword(messageObject, 'weather').trim();

        if (!_keyword4) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti ini: /weather keyword'));
          return;
        }

        botApi.getWeather(_keyword4).then(function (result) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, result));
        })["catch"](function (err) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, err.message));
        });
      }

      if (command.includes('/write')) {
        var _keyword5 = this.parseKeyword(messageObject, 'write').trim();

        if (!_keyword5) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti ini: /write keyword'));
          return;
        }

        this.sendBack(_telegram["default"].replyPhoto(receiverChatID, "".concat(_constants["default"].CHARTAPI_URL).concat(_keyword5).concat(_constants["default"].CHARTAPI_QUERY)));
      }

      if (command.includes('/animequote')) {
        var quotesItem = botApi.getAnimeQuote();
        this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, "\"".concat(quotesItem.quotesentence, "\"\nBy : ").concat(quotesItem.quotecharacter, "\nFrom :  ").concat(quotesItem.quoteanime)));
      }

      if (command.includes('/osu')) {
        var _keyword6 = this.parseKeyword(messageObject, 'osu').trim();

        if (!_keyword6) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan keyword seperti: /osu osustd|osumania|osutaiko|osuctb user'));
          return;
        }

        var mode = 0;

        var modeKeyword = _keyword6.split(' ')[0];

        var user = _keyword6.split(' ')[1];

        if (!user) {
          this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, 'Tolong masukan nickname usernya'));
          return;
        }

        if (modeKeyword === 'osustd') {
          mode = 0;
        }

        if (modeKeyword === 'osutaiko') {
          mode = 1;
        }

        if (modeKeyword === 'osuctb') {
          mode = 2;
        }

        if (modeKeyword === 'osumania') {
          mode = 3;
        }

        botApi.getOsuProfile(user, mode).then(function (result) {
          _this.sendBack(_telegram["default"].replyOsuProfile(receiverChatID, result));
        })["catch"](function (err) {
          _this.sendBack(_telegram["default"].replyTextMessage(receiverChatID, err.message));
        });
      }
    }
  }]);
  return TelegramEventHandler;
}();

exports["default"] = TelegramEventHandler;