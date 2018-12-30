"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _line = _interopRequireDefault(require("../reply-wrapper/line"));

var _botApi = _interopRequireDefault(require("../bot-api"));

var _constants = _interopRequireDefault(require("../constants"));

var LineEventHandler =
/*#__PURE__*/
function () {
  function LineEventHandler(client) {
    (0, _classCallCheck2.default)(this, LineEventHandler);
    this.client = client;
    this.botApi = new _botApi.default();
    this.handle = this.handle.bind(this);
  }

  (0, _createClass2.default)(LineEventHandler, [{
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

      if (event.type === "join") {
        return client.replyMessage(replyToken, _line.default.replyText('Terima kasih telah mengundang bot ini.\n\nSilahkan ketik "Katou keyword" untuk melihat keyword.'));
      }

      if (event.type === "message") {
        if (event.message.type !== "text") return Promise.resolve(null);
        var msgText = event.message.text.toLowerCase();
        if (!msgText.includes("katou")) return Promise.resolve(null);

        if (msgText === "katou") {
          return client.getProfile(reqProfile.userId).then(function (profile) {
            return client.replyMessage(replyToken, _line.default.replyText(botApi.sendReply(profile.displayName)));
          }).catch(function () {
            return client.replyMessage(replyToken, _line.default.replyText(botApi.sendReply("Tanpa Nama")));
          });
        }

        if (msgText === "katou keyword") {
          return client.replyMessage(replyToken, _line.default.replyKeyword());
        }

        if (msgText === "katou ramal") {
          return client.replyMessage(replyToken, _line.default.replyText(botApi.getRamal()));
        }

        if (msgText.includes("katou berapa")) {
          var calcText = msgText.substr(13);

          if (calcText.length === 0) {
            return client.replyMessage(replyToken, _line.default.replyText("Tolong masukan angka yang ingin dihitung"));
          }

          return client.replyMessage(replyToken, _line.default.replyText("Hasil dari ".concat(calcText, " : ").concat(eval(calcText))));
        }

        if (msgText.includes("katou apa itu")) {
          var keyword = msgText.substr(13);
          botApi.getWiki(keyword).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyText(result));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou cari gambar")) {
          var _keyword = encodeURI(msgText.substr(18));

          if (_keyword.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nama gambar yang ingin dicari"));
          botApi.getImageUrl(_keyword).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyImg(result, result)).catch(function (err) {
              return client.replyMessage(replyToken, _line.default.replyText("Gambar yang ditemukan terlalu besar untuk dimuat silahkan coba lagi."));
            });
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou ucapkan selamat ulang tahun ke")) {
          var _keyword2 = msgText.substr(37);

          return client.replyMessage(replyToken, _line.default.replyText("Selamat ulang tahun ".concat(_keyword2, " :D")));
        }

        if (msgText.includes("katou cuaca")) {
          var _keyword3 = msgText.substr(12);

          botApi.getWeather(_keyword3).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyText(result));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou cari video")) {
          var _keyword4 = msgText.substr(17);

          if (_keyword4.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nama video yang ingin dicari"));
          botApi.getVideo(_keyword4).then(function (result) {
            if (source !== "room" && source !== "group") return client.replyMessage(replyToken, _line.default.replyText("".concat(result.title, " \n ").concat(result.link))).catch(console.log("Error"));
            return client.replyMessage(replyToken, _line.default.replyText("".concat(result.title, " \n ").concat(result.link))).catch(console.log("Error"));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err)).catch(console.log("Error"));
          });
        }

        if (msgText.includes("katou terjemahkan")) {
          var text = msgText.substr(24).trim();
          var lang = msgText.slice(18, 24).trim();
          if (lang.length <= 0 || text.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan kode bahasa dan teks yang ingin diterjemahkan"));
          botApi.translateText(text, lang).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyText(result));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou cari lokasi")) {
          var _keyword5 = msgText.substr(17).trim();

          if (_keyword5.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan lokasi yang ingin dicari"));
          botApi.getLocation(_keyword5).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyLocation(_keyword5, result));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou tulis")) {
          var _keyword6 = msgText.substr(12);

          if (_keyword6.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan teks yang ingin diubah"));
          _keyword6 = encodeURI(_keyword6);
          var imgUrl = "".concat(_constants.default.CHARTAPI_URL).concat(_keyword6).concat(_constants.default.CHARTAPI_QUERY);
          return client.replyMessage(replyToken, _line.default.replyImg(imgUrl, imgUrl)).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan teks yang ingin diubah"));
          });
        }

        if (msgText.includes("katou download musik")) {
          var _keyword7 = msgText.substr(21).trim();

          if (_keyword7.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nama musiknya"));
          botApi.getYoutubeUrl(_keyword7).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyText("".concat(result.title, "\n\n Link download : ").concat(_constants.default.MP3YOUTUBE_URL).concat(result.link)));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText.includes("katou lovemeter")) {
          var _keyword8 = msgText.substr(16).trim();

          if (_keyword8.length <= 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nama pasangannya"));
          botApi.getLoveMeter(msgText).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyText("Persentase pasangan ".concat(result.fname, " dan ").concat(result.sname, " :\n\n").concat(result.percentage, "%\n\nSaran: ").concat(result.result)));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText === "katou anime quotes") {
          var quotesItem = botApi.getAnimeQuote();
          return client.replyMessage(replyToken, _line.default.replyText("\"".concat(quotesItem.quotesentence, "\"\nBy : ").concat(quotesItem.quotecharacter, "\nFrom :  ").concat(quotesItem.quoteanime)));
        }

        if (msgText.includes("katou osu")) {
          if (msgText.substr(10).trim().length === 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan modenya"));

          var _keyword9;

          var mode;

          if (msgText.includes("osustd")) {
            _keyword9 = msgText.substr(13).trim();
            if (_keyword9.length === 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nickname usernya"));
            mode = 0;
          }

          if (msgText.includes("osumania")) {
            _keyword9 = msgText.substr(15).trim();
            if (_keyword9.length === 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nickname usernya"));
            mode = 3;
          }

          if (msgText.includes("osutaiko")) {
            _keyword9 = msgText.substr(15).trim();
            if (_keyword9.length === 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nickname usernya"));
            mode = 1;
          }

          if (msgText.includes("osuctb")) {
            _keyword9 = msgText.substr(13).trim();
            if (_keyword9.length === 0) return client.replyMessage(replyToken, _line.default.replyText("Silahkan masukan nickname usernya"));
            mode = 2;
          }

          botApi.getOsuProfile(_keyword9, mode).then(function (result) {
            return client.replyMessage(replyToken, _line.default.replyOsuProfile(result));
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText(err));
          });
        }

        if (msgText === "bye katou") {
          return client.replyMessage(replyToken, [_line.default.replyText("Bye - Bye"), _line.default.replyImg(_constants.default.KATOULEAVEIMG_URL, _constants.default.KATOULEAVEIMG_URL)]).then(function (result) {
            if (source === "room") {
              client.leaveRoom(reqProfile.roomId);
            } else if (source === "group") {
              client.leaveGroup(reqProfile.groupId);
            }
          }).catch(function (err) {
            return client.replyMessage(replyToken, _line.default.replyText("ERROR tidak bisa keluar melalui keyword silahkan kick katou melalui setting group"));
          });
        }
      }
    }
  }]);
  return LineEventHandler;
}();

exports.default = LineEventHandler;