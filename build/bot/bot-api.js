"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _animequote = _interopRequireDefault(require("animequote"));

var osu = _interopRequireWildcard(require("osu"));

var _constants = _interopRequireDefault(require("./constants"));

// TODO: add image search, video search and location search

/**
 * BotApi
 */
var BotApi = /*#__PURE__*/function () {
  function BotApi() {
    (0, _classCallCheck2["default"])(this, BotApi);
  }

  (0, _createClass2["default"])(BotApi, [{
    key: "getRandomIndex",

    /**
     * get random number between 0 to max
     * @param {number} max the maximum random number
     * @return {number} the random number
     */
    value: function getRandomIndex(max) {
      return Math.floor(Math.random() * max);
    }
    /**
     * NOTE: EXPERIMENTAL FEATURE
     * get the result of language processing in percentage from the katou-nlp-service
     * @param {string} text text to be processed to katou-nlp-service
     * @return {object} the processed result from the katou-nlp-service
     */

  }, {
    key: "getNLP",
    value: function () {
      var _getNLP = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
        var response, message, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _nodeFetch["default"])('https://katou-nlp-service.herokuapp.com/classify', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    keyword: text
                  })
                });

              case 3:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 7;
                  break;
                }

                message = "An error has occured: ".concat(response.status);
                throw new Error(message);

              case 7:
                _context.next = 9;
                return response.json();

              case 9:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                throw new Error('Error fetching response');

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function getNLP(_x) {
        return _getNLP.apply(this, arguments);
      }

      return getNLP;
    }()
    /**
     * get reply from the bot
     * @param {string} username username to be used in the text as the name of the user
     * @return {string} the reply from the bot
     */

  }, {
    key: "sendReply",
    value: function sendReply(username) {
      var replyString = ['Iya, ' + username + ' ?', 'Ada apa ' + username + ' ?', 'Ada yang bisa dibantu ' + username + ' ?'];
      return replyString[this.getRandomIndex(replyString.length)];
    }
    /**
     * get fortune telling randomly from the bot
     * @return {string} tne text of the fortune
     */

  }, {
    key: "getRamal",
    value: function getRamal() {
      var ramalan = ['Berhati-hatilah hari ini adalah hari tersial mu', 'Hari ini mungkin agak menyusahkan bagimu jadi berhati-hatilah', 'Hari ini mungkin kamu akan menemukan jodohmu', 'Hari ini mungkin akan sangat menguntungkan bagi keuanganmu', 'Tiada hari yang lebih baik dari hari ini bagimu'];
      return ramalan[this.getRandomIndex(ramalan.length)];
    }
    /**
     * get wikipedia result from the keyword
     * @param {string} keyword wikipedia search keywod
     * @return {string} returned text from the wikipedia
     */

  }, {
    key: "getWiki",
    value: function () {
      var _getWiki = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(keyword) {
        var keywordEncoded, response, message, result, pages, urlForText, extractedText;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                keywordEncoded = encodeURIComponent(keyword);
                _context2.next = 4;
                return (0, _nodeFetch["default"])("".concat(_constants["default"].WIKIPEDIA_URL).concat(keywordEncoded));

              case 4:
                response = _context2.sent;

                if (response.ok) {
                  _context2.next = 8;
                  break;
                }

                message = "An error has occured: ".concat(response.status);
                throw new Error(message);

              case 8:
                _context2.next = 10;
                return response.json();

              case 10:
                result = _context2.sent;
                pages = result.query.pages;
                urlForText = "https://id.wikipedia.org/wiki/".concat(keywordEncoded);
                extractedText = Object.values(pages)[0].extract;

                if (!(extractedText === '')) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", "Link dialihkan ke: ".concat(urlForText));

              case 16:
                if (!(extractedText === null)) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return", "Tidak ditemukan hasil dengan keyword : ".concat(keyword));

              case 18:
                if (!(extractedText !== null)) {
                  _context2.next = 21;
                  break;
                }

                if (extractedText.length > 1900) {
                  extractedText = extractedText.substr(0, 1900) + '...';
                }

                return _context2.abrupt("return", "".concat(extractedText, "\nRead more: ").concat(urlForText));

              case 21:
                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](0);
                throw new Error("Request gagal atau halaman wikipedia tidak ditemukan");

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 23]]);
      }));

      function getWiki(_x2) {
        return _getWiki.apply(this, arguments);
      }

      return getWiki;
    }()
    /**
     * get weather data from location
     * @param {string} keyword the location of the weather
     * @return {string} weather data of the location
     */

  }, {
    key: "getWeather",
    value: function () {
      var _getWeather = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(keyword) {
        var response, message, result, resultData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants["default"].OPENWEATHERMAP_URL).concat(keyword).concat(_constants["default"].OPENWEATHERMAP_QUERY).concat(_constants["default"].OPENWEATHERMAP_APPID));

              case 3:
                response = _context3.sent;

                if (response.ok) {
                  _context3.next = 7;
                  break;
                }

                message = "An error has occured: ".concat(response.status);
                throw new Error(message);

              case 7:
                _context3.next = 9;
                return response.json();

              case 9:
                result = _context3.sent;
                resultData = {
                  cityName: result.name,
                  degree: "".concat(result.main.temp, " C"),
                  humidity: "".concat(result.main.humidity, "%"),
                  pressure: "".concat(result.main.pressure, " HPa"),
                  windSpeed: "".concat(result.wind.speed, " m/s")
                };
                return _context3.abrupt("return", "Cuaca di kota ".concat(resultData.cityName, " : \nSuhu : ").concat(resultData.degree, " \nKelembaban : ").concat(resultData.humidity, " \nTekanan Udara : ").concat(resultData.pressure, "\nKecepatan Angin : ").concat(resultData.windSpeed, " "));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                throw new Error("Request gagal atau kota tidak ditemukan");

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function getWeather(_x3) {
        return _getWeather.apply(this, arguments);
      }

      return getWeather;
    }()
    /**
     * get anime quote from the animequote library
     * @return {string} the quote string
     */

  }, {
    key: "getAnimeQuote",
    value: function getAnimeQuote() {
      return (0, _animequote["default"])();
    }
    /**
     * get osu player info
     * @param {string} keyword the player username
     * @param {string} mode the mode stats for the player
     * @return {object} object of the player stats
     */

  }, {
    key: "getOsuProfile",
    value: function getOsuProfile(keyword, mode) {
      return new Promise(function (resolve, reject) {
        var osuApi = osu.api(_constants["default"].OSUAPI_KEY);
        var resultProfile;
        var resultBest;
        var deskripsiProfil;
        var deskripsiBest;
        osuApi.getUser({
          u: keyword,
          m: mode
        }).then(function (resultProfiles) {
          resultProfile = resultProfiles;
          return osuApi.getUserBest({
            u: keyword,
            m: mode,
            limit: 1
          });
        }).then(function (resultBests) {
          resultBest = resultBests;
          deskripsiProfil = 'Level : ' + Math.floor(parseInt(resultProfile[0].level)) + '    Acc : ' + Math.floor(parseInt(resultProfile[0].accuracy)) + '%\nRank : ' + resultProfile[0].pp_rank + '\nPP :' + resultProfile[0].pp_raw;

          if (resultBest[0].length === 0) {
            resolve({
              withBeatmap: false,
              userId: resultProfile[0].user_id,
              username: resultProfile[0].username,
              deskripsi_profil: deskripsiProfil
            });
          }

          return osuApi.getBeatmaps({
            b: resultBest[0].beatmap_id,
            limit: 1
          });
        }).then(function (resultBeatmap) {
          var beatmapTitle = resultBeatmap[0].title;

          if (beatmapTitle.length > 26) {
            beatmapTitle = beatmapTitle.substr(0, 26) + '...';
          }

          deskripsiBest = beatmapTitle + '\nScore : ' + resultBest[0].score + '\nPP : ' + Math.floor(parseInt(resultBest[0].pp));
          resolve({
            withBeatmap: true,
            user_id: resultProfile[0].user_id,
            username: resultProfile[0].username,
            deskripsi_profil: deskripsiProfil,
            beatmapset_id: resultBeatmap[0].beatmapset_id,
            deskripsi_best: deskripsiBest
          });
        })["catch"](function () {
          reject(Error('Request gagal atau tidak dapat menemukan user osu'));
        });
      });
    }
  }]);
  return BotApi;
}();

exports["default"] = BotApi;