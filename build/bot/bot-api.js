"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

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
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _requestPromise["default"])({
                  uri: 'https://katou-nlp-service.herokuapp.com/classify',
                  method: 'POST',
                  json: true,
                  body: {
                    keyword: text
                  }
                });

              case 2:
                response = _context.sent;

                if (response) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Error fetching response');

              case 5:
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
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
        var keywordEncoded, response, pages, urlForText, extractedText;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                keywordEncoded = encodeURIComponent(keyword);
                _context2.next = 4;
                return (0, _requestPromise["default"])({
                  uri: _constants["default"].WIKIPEDIA_URL + keywordEncoded,
                  json: true
                });

              case 4:
                response = _context2.sent;

                if (response) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Error fetching response');

              case 7:
                pages = response.query.pages;
                urlForText = "https://id.wikipedia.org/wiki/".concat(keywordEncoded);
                extractedText = Object.values(pages)[0].extract;

                if (!(extractedText === '')) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", "Link dialihkan ke: ".concat(urlForText));

              case 12:
                if (!(extractedText === null)) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", "Tidak ditemukan hasil dengan keyword : ".concat(keyword));

              case 14:
                if (!(extractedText !== null)) {
                  _context2.next = 17;
                  break;
                }

                if (extractedText.length > 1900) {
                  extractedText = extractedText.substr(0, 1900) + '...';
                }

                return _context2.abrupt("return", "".concat(extractedText, "\nRead more: ").concat(urlForText));

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                throw new Error("Request gagal atau halaman wikipedia tidak ditemukan");

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 19]]);
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
        var response, resultData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _requestPromise["default"])({
                  uri: "".concat(_constants["default"].OPENWEATHERMAP_URL).concat(keyword).concat(_constants["default"].OPENWEATHERMAP_QUERY).concat(_constants["default"].OPENWEATHERMAP_APPID),
                  json: true
                });

              case 3:
                response = _context3.sent;

                if (response) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('Error fetching response');

              case 6:
                resultData = {
                  cityName: response.name,
                  degree: "".concat(response.main.temp, " C"),
                  humidity: "".concat(response.main.humidity, "%"),
                  pressure: "".concat(response.main.pressure, " HPa"),
                  windSpeed: "".concat(response.wind.speed, " m/s")
                };
                return _context3.abrupt("return", "Cuaca di kota ".concat(resultData.cityName, " : \nSuhu : ").concat(resultData.degree, " \nKelembaban : ").concat(resultData.humidity, " \nTekanan Udara : ").concat(resultData.pressure, "\nKecepatan Angin : ").concat(resultData.windSpeed, " "));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                throw new Error("Request gagal atau kota tidak ditemukan");

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function getWeather(_x3) {
        return _getWeather.apply(this, arguments);
      }

      return getWeather;
    }()
    /**
     * translate text
     * @param {string} text text to translate
     * @param {string} lang language code
     * @return {string} the translated text
     */

  }, {
    key: "translateText",
    value: function () {
      var _translateText = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(text, lang) {
        var response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return (0, _requestPromise["default"])({
                  uri: "".concat(_constants["default"].YANDEXTRANSLATE_URL).concat(_constants["default"].YANDEXTRANSLATE_KEY).concat(_constants["default"].YANDEXTEXT_QUERY).concat(text).concat(_constants["default"].YANDEXLANG_QUERY).concat(lang).concat(_constants["default"].YANDEX_OTHERQUERY)
                });

              case 3:
                response = _context4.sent;

                if (response) {
                  _context4.next = 6;
                  break;
                }

                throw new Error('Error fetching response');

              case 6:
                return _context4.abrupt("return", "".concat(JSON.parse(response).text));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                throw new Error("Request gagal atau kode bahasa tidak ditemukan");

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }));

      function translateText(_x4, _x5) {
        return _translateText.apply(this, arguments);
      }

      return translateText;
    }()
    /**
     * get lovemeter of couple from the api
     * @param {string} keyword keyword that has couple names (person1:person2)
     * @return {object} the percentage result object
     */

  }, {
    key: "getLoveMeter",
    value: function () {
      var _getLoveMeter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(keyword) {
        var couple, person1, person2, response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                couple = keyword.split(':');
                person1 = couple[0];
                person2 = couple[1];
                _context5.next = 6;
                return (0, _requestPromise["default"])({
                  uri: "".concat(_constants["default"].RAPID_API_LOVEMETERURL).concat(person1).concat(_constants["default"].RAPID_API_LOVEMETERQUERY).concat(person2),
                  json: true,
                  headers: {
                    'x-rapidapi-host': _constants["default"].RAPID_API_LOVEMETER_HOST,
                    'x-rapidapi-key': _constants["default"].RAPID_API_KEY,
                    Accept: 'application/json'
                  }
                });

              case 6:
                response = _context5.sent;

                if (response) {
                  _context5.next = 9;
                  break;
                }

                throw new Error('Error fetching response');

              case 9:
                return _context5.abrupt("return", response);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                throw new Error("Request gagal atau tidak dapat menghitung persentase pasangan");

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function getLoveMeter(_x6) {
        return _getLoveMeter.apply(this, arguments);
      }

      return getLoveMeter;
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
            beatmapTitle = ((0, _readOnlyError2["default"])("beatmapTitle"), beatmapTitle.substr(0, 26) + '...');
          }

          deskripsiBest = beatmapTitle + '\nScore : ' + resultBest[0].score + '\nPP : ' + Math.floor(parseInt(resultBest[0].pp));
          resolve({
            withBeatmap: true,
            user_id: resultProfile[0].user_id,
            username: resultProfile[0].username,
            deskripsi_profil: deskripsi_profil,
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