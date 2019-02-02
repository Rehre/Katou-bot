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
    this.commandList = ["/katou", "/ramal", "/say", "/wiki", "/weather", "/calc", "/pic", "/video", "/location", "/write", "/music", "/animequote", "/lovemeter", "/translate", "/osu", "/help"];
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
      if (!event.message) {
        this.sendBack({});
        return;
      }

      var command = event.message.text;
      var messageObject = event.message;
      var receiverChatID = event.message.chat.id;
      var sendBack = this.sendBack;
      var botApi = this.botApi;

      if (!command) {
        this.sendBack({});
        return;
      }

      if (!this.commandList.some(function (item) {
        return command.includes(item);
      })) {
        this.sendBack({});
        return;
      }

      if (command.includes("/katou") || command.includes("/start")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.sendReply(messageObject.from.first_name)));
      }

      if (command.includes("/help")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, _constants.default.TELEGRAM_HELP));
      }

      if (command.includes("/ramal")) {
        sendBack(_telegram.default.replyTextMessage(receiverChatID, botApi.getRamal()));
      }

      if (command.includes("/say")) {
        var keyword = this.parseKeyword(messageObject, "say");

        if (!keyword.trim()) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /say {keyword}"));
          return;
        }

        sendBack(_telegram.default.replyTextMessage(receiverChatID, keyword.trim()));
      }

      if (command.includes("/wiki")) {
        var _keyword = this.parseKeyword(messageObject, "wiki");

        if (!_keyword.trim()) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /wiki {keyword}"));
          return;
        }

        botApi.getWiki(_keyword.trim()).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/hbd")) {
        var _keyword2 = this.parseKeyword(messageObject, "hbd");

        if (!_keyword2.trim()) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /hbd {keyword}"));
          return;
        }

        sendBack(_telegram.default.replyTextMessage(receiverChatID, "Selamat ulang tahun ".concat(_keyword2.trim(), " :D")));
      }

      if (command.includes("/weather")) {
        var _keyword3 = this.parseKeyword(messageObject, "weather");

        if (!_keyword3.trim()) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /weather {keyword}"));
          return;
        }

        botApi.getWeather(_keyword3.trim()).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tidak dapat menemukan ".concat(_keyword3)));
        });
      } // TODO adding funciton for this


      if (command.includes("/calc")) {
        var _keyword4 = this.parseKeyword(messageObject, "calc");

        if (!_keyword4.trim()) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /calc {keyword}{operator}{keyword}"));
          return;
        }

        sendBack(_telegram.default.replyTextMessage(receiverChatID, _keyword4.trim()));
      }

      if (command.includes("/pic")) {
        var _keyword5 = this.parseKeyword(messageObject, "pic").trim();

        if (!_keyword5) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /pic {keyword}"));
          return;
        }

        botApi.getImageUrl(_keyword5).then(function (result) {
          sendBack(_telegram.default.replyPhoto(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/video")) {
        var _keyword6 = this.parseKeyword(messageObject, "video").trim();

        if (!_keyword6) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /video {keyword}"));
          return;
        }

        botApi.getYoutubeUrl(_keyword6).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "".concat(result.title, "\n\n").concat(result.link)));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/location")) {
        var _keyword7 = this.parseKeyword(messageObject, "location").trim();

        if (!_keyword7) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /location {keyword}"));
          return;
        }

        botApi.getLocation(_keyword7).then(function (result) {
          sendBack(_telegram.default.replyLocation(receiverChatID, result.latitude, result.longitude));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/write")) {
        var _keyword8 = this.parseKeyword(messageObject, "write").trim();

        if (!_keyword8) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /write {keyword}"));
          return;
        }

        sendBack(_telegram.default.replyPhoto(receiverChatID, "".concat(_constants.default.CHARTAPI_URL).concat(_keyword8).concat(_constants.default.CHARTAPI_QUERY)));
      }

      if (command.includes("/music")) {
        var _keyword9 = this.parseKeyword(messageObject, "music").trim();

        if (!_keyword9) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /music {keyword}"));
          return;
        }

        botApi.getYoutubeUrl(_keyword9).then(function (result) {
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
        var _keyword10 = this.parseKeyword(messageObject, "lovemeter").trim();

        if (!_keyword10) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /lovemeter {name}:{name}"));
          return;
        }

        botApi.getLoveMeter(_keyword10).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Persentase pasangan ".concat(result.fname, " dan ").concat(result.sname, " :\n\n").concat(result.percentage, "%\n\nSaran: ").concat(result.result)));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/translate")) {
        var _keyword11 = this.parseKeyword(messageObject, "translate").trim();

        if (!_keyword11) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /translate {kode bahasa dari}:{kode bahasa ke} {text}"));
          return;
        }

        var keywordArray = _keyword11.split(" ");

        var lang = keywordArray[0];
        var text = keywordArray[1];
        botApi.translateText(text, lang).then(function (result) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }

      if (command.includes("/osu")) {
        var _keyword12 = this.parseKeyword(messageObject, "osu").trim();

        if (!_keyword12) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan keyword seperti: /osu {osustd|osumania|osutaiko|osuctb} {user}"));
          return;
        }

        var mode = 0;

        var user = _keyword12.split(" ")[1];

        if (!user) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, "Tolong masukan nickname usernya"));
          return;
        }

        if (_keyword12.split(" ")[0] === "osustd") {
          mode = 0;
        }

        if (_keyword12.split(" ")[0] === "osumania") {
          mode = 3;
        }

        if (_keyword12.split(" ")[0] === "osutaiko") {
          mode = 1;
        }

        if (_keyword12.split(" ")[0] === "osuctb") {
          mode = 2;
        }

        botApi.getOsuProfile(user, mode).then(function (result) {
          sendBack(_telegram.default.replyOsuProfile(receiverChatID, result));
        }).catch(function (err) {
          sendBack(_telegram.default.replyTextMessage(receiverChatID, err));
        });
      }
    }
  }]);
  return TelegramEventHandler;
}();

exports.default = TelegramEventHandler;