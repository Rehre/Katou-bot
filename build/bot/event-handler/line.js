"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _line = _interopRequireDefault(require("../reply-wrapper/line"));

var _botApi = _interopRequireDefault(require("../bot-api"));

var _constants = _interopRequireDefault(require("../constants"));

/**
 * Line event handler
 */
var LineEventHandler = /*#__PURE__*/function () {
  /**
   * @param {LineClient} client Line client from line bot nodejs sdk
   */
  function LineEventHandler(client) {
    (0, _classCallCheck2["default"])(this, LineEventHandler);
    this.client = client;
    this.botApi = new _botApi["default"]();
    this.handle = this.handle.bind(this);
  }
  /**
   * function to handle incoming line event
   * @param {object} event line event object
   * @return {Promise} a returned promise
   */


  (0, _createClass2["default"])(LineEventHandler, [{
    key: "handle",
    value: function handle(event) {
      var client = this.client;
      var botApi = this.botApi;
      var replyToken = event.replyToken;
      var source = event.source.type;
      var reqProfile = {
        userId: event.source.userId,
        groupId: event.source.groupId || null,
        roomId: event.source.roomId || null
      };

      if (event.type === 'join') {
        return client.replyMessage(replyToken, _line["default"].replyText('Terima kasih telah mengundang bot ini.\n\nSilahkan ketik "Katou keyword" untuk melihat keyword.'));
      }

      if (event.type === 'message') {
        if (event.message.type !== 'text') return Promise.resolve(null);
        var msgText = event.message.text.toLowerCase();

        if (!msgText.split('')[0].trim() !== 'katou') {
          return Promise.resolve(null);
        }

        if (msgText === 'katou') {
          return client.getProfile(reqProfile.userId).then(function (profile) {
            return client.replyMessage(replyToken, _line["default"].replyText(botApi.sendReply(profile.displayName)));
          })["catch"](function () {
            return client.replyMessage(replyToken, _line["default"].replyText(botApi.sendReply('Tanpa Nama')));
          });
        }

        if (msgText === 'katou keyword') {
          return client.replyMessage(replyToken, _line["default"].replyKeyword());
        }

        if (msgText === 'katou ramal') {
          return client.replyMessage(replyToken, _line["default"].replyText(botApi.getRamal()));
        }

        if (msgText.includes('katou apa itu')) {
          var keyword = msgText.substr(13);
          botApi.getWiki(keyword).then(function (result) {
            return client.replyMessage(replyToken, _line["default"].replyText(result));
          })["catch"](function (err) {
            return client.replyMessage(replyToken, _line["default"].replyText(err.message));
          });
        }

        if (msgText.includes('katou ucapkan selamat ulang tahun ke')) {
          var _keyword = msgText.substr(37);

          return client.replyMessage(replyToken, _line["default"].replyText("Selamat ulang tahun ".concat(_keyword, " :D")));
        }

        if (msgText.includes('katou cuaca')) {
          var _keyword2 = msgText.substr(12);

          botApi.getWeather(_keyword2).then(function (result) {
            return client.replyMessage(replyToken, _line["default"].replyText(result));
          })["catch"](function (err) {
            return client.replyMessage(replyToken, _line["default"].replyText(err.message));
          });
        }

        if (msgText.includes('katou tulis')) {
          var _keyword3 = msgText.substr(12);

          if (_keyword3.length <= 0) {
            return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan teks yang ingin diubah'));
          }

          _keyword3 = encodeURI(_keyword3);
          var imgUrl = "".concat(_constants["default"].CHARTAPI_URL).concat(_keyword3).concat(_constants["default"].CHARTAPI_QUERY);
          return client.replyMessage(replyToken, _line["default"].replyImg(imgUrl, imgUrl));
        }

        if (msgText === 'katou anime quotes') {
          var quotesItem = botApi.getAnimeQuote();
          return client.replyMessage(replyToken, _line["default"].replyText("\"".concat(quotesItem.quotesentence, "\"\nBy : ").concat(quotesItem.quotecharacter, "\nFrom :  ").concat(quotesItem.quoteanime)));
        }

        if (msgText.includes('katou osu')) {
          if (msgText.substr(10).trim().length === 0) {
            return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan modenya'));
          }

          var _keyword4;

          var mode;

          if (msgText.includes('osustd')) {
            _keyword4 = msgText.substr(13).trim();

            if (_keyword4.length === 0) {
              return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan nickname usernya'));
            }

            mode = 0;
          }

          if (msgText.includes('osumania')) {
            _keyword4 = msgText.substr(15).trim();

            if (_keyword4.length === 0) {
              return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan nickname usernya'));
            }

            mode = 3;
          }

          if (msgText.includes('osutaiko')) {
            _keyword4 = msgText.substr(15).trim();

            if (_keyword4.length === 0) {
              return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan nickname usernya'));
            }

            mode = 1;
          }

          if (msgText.includes('osuctb')) {
            _keyword4 = msgText.substr(13).trim();

            if (_keyword4.length === 0) {
              return client.replyMessage(replyToken, _line["default"].replyText('Silahkan masukan nickname usernya'));
            }

            mode = 2;
          }

          botApi.getOsuProfile(_keyword4, mode).then(function (result) {
            return client.replyMessage(replyToken, _line["default"].replyOsuProfile(result));
          })["catch"](function (err) {
            return client.replyMessage(replyToken, _line["default"].replyText(err.message));
          });
        }

        if (msgText === 'bye katou') {
          return client.replyMessage(replyToken, [_line["default"].replyText('Bye - Bye'), _line["default"].replyImg(_constants["default"].KATOULEAVEIMG_URL, _constants["default"].KATOULEAVEIMG_URL)]).then(function () {
            if (source === 'room') {
              client.leaveRoom(reqProfile.roomId);
            } else if (source === 'group') {
              client.leaveGroup(reqProfile.groupId);
            }
          })["catch"](function () {
            return client.replyMessage(replyToken, _line["default"].replyText('ERROR tidak bisa keluar melalui keyword silahkan kick katou melalui setting group'));
          });
        }
      }
    }
  }]);
  return LineEventHandler;
}();

exports["default"] = LineEventHandler;