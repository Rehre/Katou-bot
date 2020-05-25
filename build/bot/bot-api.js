"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _gIS = _interopRequireDefault(require("g-i-s"));

var _youtubeSearch = _interopRequireDefault(require("youtube-search"));

var _ytdlCore = _interopRequireDefault(require("ytdl-core"));

var _animequote = _interopRequireDefault(require("animequote"));

var osu = _interopRequireWildcard(require("osu"));

var _constants = _interopRequireDefault(require("./constants"));

var BotApi =
/*#__PURE__*/
function () {
  function BotApi() {
    (0, _classCallCheck2.default)(this, BotApi);

    this.getRandomIndex = function (length) {
      return Math.floor(Math.random() * length);
    };
  }

  (0, _createClass2.default)(BotApi, [{
    key: "getNLP",
    value: function () {
      var _getNLP = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(keyword) {
        var response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _requestPromise.default)({
                  uri: "https://katou-nlp-service.herokuapp.com/classify",
                  method: "POST",
                  json: true,
                  body: {
                    keyword: keyword
                  }
                });

              case 2:
                response = _context.sent;

                if (response) {
                  _context.next = 5;
                  break;
                }

                throw new Error("Error fetching: response");

              case 5:
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNLP(_x) {
        return _getNLP.apply(this, arguments);
      }

      return getNLP;
    }()
  }, {
    key: "sendReply",
    value: function sendReply(username) {
      var replyString = ["Iya, " + username + " ?", "Ada apa " + username + " ?", "Ada yang bisa dibantu " + username + " ?"];
      return replyString[this.getRandomIndex(replyString.length)];
    }
  }, {
    key: "getRamal",
    value: function getRamal() {
      var ramalan = ["Berhati-hatilah hari ini adalah hari tersial mu", "Hari ini mungkin agak menyusahkan bagimu jadi berhati-hatilah", "Hari ini mungkin kamu akan menemukan jodohmu", "Hari ini mungkin akan sangat menguntungkan bagi keuanganmu", "Tiada hari yang lebih baik dari hari ini bagimu"];
      return ramalan[this.getRandomIndex(ramalan.length)];
    }
  }, {
    key: "getWiki",
    value: function () {
      var _getWiki = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(keyword) {
        var keywordEncoded, response, pages, urlForText, i, extractedText;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                keywordEncoded = encodeURI(keyword);
                _context2.next = 4;
                return (0, _requestPromise.default)({
                  uri: _constants.default.WIKIPEDIA_URL + keywordEncoded,
                  json: true
                });

              case 4:
                response = _context2.sent;

                if (response) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("Error fetching: response");

              case 7:
                pages = response.query.pages;
                urlForText = "https://id.wikipedia.org/wiki/".concat(keywordEncoded);
                _context2.t0 = _regenerator.default.keys(pages);

              case 10:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 22;
                  break;
                }

                i = _context2.t1.value;
                extractedText = pages[i].extract;

                if (!(extractedText === "")) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", "Link dialihkan ke: ".concat(urlForText));

              case 15:
                if (!(extractedText === null)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("return", "Tidak ditemukan hasil dengan keyword : ".concat(keyword));

              case 17:
                if (!(extractedText !== null)) {
                  _context2.next = 20;
                  break;
                }

                if (extractedText.length > 1900) {
                  extractedText = extractedText.substr(0, 1900) + "...";
                }

                return _context2.abrupt("return", "".concat(extractedText, "\nRead more: ").concat(urlForText));

              case 20:
                _context2.next = 10;
                break;

              case 22:
                _context2.next = 27;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t2 = _context2["catch"](0);
                throw new Error("Request gagal atau halaman wikipedia tidak ditemukan ERR: ".concat(_context2.t2));

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 24]]);
      }));

      function getWiki(_x2) {
        return _getWiki.apply(this, arguments);
      }

      return getWiki;
    }()
  }, {
    key: "getImageUrl",
    value: function getImageUrl(keyword) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        (0, _gIS.default)({
          searchTerm: keyword,
          queryStringAddition: "&safe=active&tbs=isz:m"
        }, function (err, result) {
          console.log(err, result);
          if (err) reject("Gambar ".concat(keyword, " tidak ditemukan"));
          result === undefined ? reject("Gambar ".concat(keyword, " tidak ditemukan")) : null;
          result[_this.getRandomIndex(result.length)] === undefined ? reject("Gambar ".concat(keyword, " tidak ditemukan")) : resolve(result[_this.getRandomIndex(result.length)].url);
        });
      });
    }
  }, {
    key: "getWeather",
    value: function () {
      var _getWeather = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(keyword) {
        var response, resultData;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _requestPromise.default)({
                  uri: "".concat(_constants.default.OPENWEATHERMAP_URL).concat(keyword).concat(_constants.default.OPENWEATHERMAP_QUERY).concat(_constants.default.OPENWEATHERMAP_APPID),
                  json: true
                });

              case 3:
                response = _context3.sent;

                if (response) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Error fetching: response");

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
                throw new Error("Request gagal atau kota tidak ditemukan ERR: ".concat(_context3.t0));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function getWeather(_x3) {
        return _getWeather.apply(this, arguments);
      }

      return getWeather;
    }()
  }, {
    key: "getVideo",
    value: function getVideo(keyword) {
      return new Promise(function (resolve, reject) {
        (0, _youtubeSearch.default)(keyword, {
          maxResults: 5,
          order: "relevance",
          type: "video",
          safeSearch: "strict",
          key: _constants.default.GOOGLECLOUDAPI_KEY
        }, function (err, result) {
          if (err || result == undefined || result == [] || result.length <= 0) {
            reject("Video tidak ditemukan atau LIMIT");
          } else {
            var randomIndex = Math.round(Math.random() * result.length);
            var resultVideo = {
              link: result[randomIndex].link,
              title: result[randomIndex].title,
              thumbnail: result[randomIndex].thumbnails.default.url
            };

            _ytdlCore.default.getInfo(resultVideo.link, {}, function (err, info) {
              if (err) {
                resultVideo.videoUrl = "undefined";
                resolve(resultVideo);
              } else if (info == undefined) {
                resultVideo.videoUrl = "undefined";
                resolve(resultVideo);
              } else {
                for (var i = 0; i < info.formats.length; i++) {
                  if (info.formats[i].container === "mp4") {
                    resultVideo.videoUrl = info.formats[i].url;
                    resolve(resultVideo);
                    break;
                  }
                }
              }
            });
          }
        });
      });
    }
  }, {
    key: "translateText",
    value: function () {
      var _translateText = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(text, lang) {
        var response;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return (0, _requestPromise.default)({
                  uri: "".concat(_constants.default.YANDEXTRANSLATE_URL).concat(_constants.default.YANDEXTRANSLATE_KEY).concat(_constants.default.YANDEXTEXT_QUERY).concat(text).concat(_constants.default.YANDEXLANG_QUERY).concat(lang).concat(_constants.default.YANDEX_OTHERQUERY)
                });

              case 3:
                response = _context4.sent;

                if (response) {
                  _context4.next = 6;
                  break;
                }

                throw new Error("Error fetching: response");

              case 6:
                return _context4.abrupt("return", "".concat(response).match(/<text>.*?<\/text>/g)[0].replace(/<text>|<\/text>/g, ""));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                throw new Error("Request gagal atau kode bahasa tidak ditemukan ERR: ".concat(_context4.t0));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function translateText(_x4, _x5) {
        return _translateText.apply(this, arguments);
      }

      return translateText;
    }()
  }, {
    key: "getLocation",
    value: function () {
      var _getLocation = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(keyword) {
        var encodedKeyword, response, formatted_address, latitude, longitude;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                encodedKeyword = encodeURI(keyword);
                _context5.next = 4;
                return (0, _requestPromise.default)({
                  uri: "".concat(_constants.default.GMAPSJS_URL).concat(encodedKeyword).concat(_constants.default.GMAPSJS_QUERY).concat(_constants.default.GMAPSJS_KEY),
                  json: true
                });

              case 4:
                response = _context5.sent;

                if (response) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Error Fetching: response");

              case 7:
                if (response.result) {
                  _context5.next = 9;
                  break;
                }

                throw new Error("Error Fetching: result");

              case 9:
                formatted_address = response.results[0].formatted_address;
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;

                if (formatted_address.length > 100) {
                  formatted_address = ((0, _readOnlyError2.default)("formatted_address"), formatted_address.substr(0, 90) + "...");
                }

                return _context5.abrupt("return", {
                  formatted_address: formatted_address,
                  latitude: latitude,
                  longitude: longitude
                });

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](0);
                throw new Error("Request gagal atau tidak dapat menemukan lokasi ERR: ".concat(_context5.t0));

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 16]]);
      }));

      function getLocation(_x6) {
        return _getLocation.apply(this, arguments);
      }

      return getLocation;
    }()
  }, {
    key: "getYoutubeUrl",
    value: function getYoutubeUrl(keyword) {
      return new Promise(function (resolve, reject) {
        (0, _youtubeSearch.default)(keyword, {
          maxResults: 5,
          order: "relevance",
          type: "video",
          safeSearch: "strict",
          key: _constants.default.GOOGLECLOUDAPI_KEY
        }, function (err, result) {
          if (err || result == undefined || result == [] || result.length <= 0) {
            reject("Video tidak ditemukan atau LIMIT");
          } else {
            var resultVideo = {
              link: result[0].link,
              title: result[0].title
            };
            resolve(resultVideo);
          }
        });
      });
    }
  }, {
    key: "getLoveMeter",
    value: function () {
      var _getLoveMeter = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(keyword) {
        var couple, person1, person2, response;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                couple = keyword.split(":");
                person1 = couple[0];
                person2 = couple[1];
                _context6.next = 6;
                return (0, _requestPromise.default)({
                  uri: "".concat(_constants.default.RAPID_API_LOVEMETERURL).concat(person1).concat(_constants.default.RAPID_API_LOVEMETERQUERY).concat(person2),
                  json: true,
                  headers: {
                    "x-rapidapi-host": _constants.default.RAPID_API_LOVEMETER_HOST,
                    "x-rapidapi-key": _constants.default.RAPID_API_KEY,
                    Accept: "application/json"
                  }
                });

              case 6:
                response = _context6.sent;

                if (response) {
                  _context6.next = 9;
                  break;
                }

                throw new Error("Error fetching: response");

              case 9:
                return _context6.abrupt("return", response);

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](0);
                throw new Error("Request gagal atau tidak dapat menghitung persentase pasangan ERR: ".concat(_context6.t0));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 12]]);
      }));

      function getLoveMeter(_x7) {
        return _getLoveMeter.apply(this, arguments);
      }

      return getLoveMeter;
    }()
  }, {
    key: "getAnimeQuote",
    value: function getAnimeQuote() {
      return (0, _animequote.default)();
    }
  }, {
    key: "getOsuProfile",
    value: function getOsuProfile(keyword, mode) {
      return new Promise(function (resolve, reject) {
        var osuApi = osu.api(_constants.default.OSUAPI_KEY);
        var resultProfile;
        var resultBest;
        var deskripsi_profil;
        var deskripsi_best;
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
          deskripsi_profil = "Level : " + Math.floor(parseInt(resultProfile[0].level)) + "    Acc : " + Math.floor(parseInt(resultProfile[0].accuracy)) + "%\nRank : " + resultProfile[0].pp_rank + "\nPP :" + resultProfile[0].pp_raw;

          if (resultBest[0].length === 0) {
            resolve({
              withBeatmap: false,
              userId: resultProfile[0].user_id,
              username: resultProfile[0].username,
              deskripsi_profil: deskripsi_profil
            });
          }

          return osuApi.getBeatmaps({
            b: resultBest[0].beatmap_id,
            limit: 1
          });
        }).then(function (resultBeatmap) {
          var beatmapTitle = resultBeatmap[0].title;

          if (beatmapTitle.length > 26) {
            beatmapTitle = ((0, _readOnlyError2.default)("beatmapTitle"), beatmapTitle.substr(0, 26) + "...");
          }

          deskripsi_best = beatmapTitle + "\nScore : " + resultBest[0].score + "\nPP : " + Math.floor(parseInt(resultBest[0].pp));
          resolve({
            withBeatmap: true,
            user_id: resultProfile[0].user_id,
            username: resultProfile[0].username,
            deskripsi_profil: deskripsi_profil,
            beatmapset_id: resultBeatmap[0].beatmapset_id,
            deskripsi_best: deskripsi_best
          });
        }).catch(function (err) {
          reject("Request gagal atau tidak dapat menemukan user osu!");
        });
      });
    }
  }]);
  return BotApi;
}(); // for development
// const botApi = new BotApi();
// console.log(
//   botApi.getLoveMeter("akmal:katou").catch((err) => console.log(err))
// );


exports.default = BotApi;