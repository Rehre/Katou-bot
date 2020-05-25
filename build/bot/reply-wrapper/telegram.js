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
  }, {
    key: "replyPhoto",
    value: function replyPhoto(chat_id, photo) {
      return {
        method: "sendPhoto",
        chat_id: chat_id,
        photo: photo
      };
    }
  }, {
    key: "replyVideo",
    value: function replyVideo(chat_id, caption, video) {
      return {
        method: "sendVideo",
        chat_id: chat_id,
        video: video,
        caption: caption
      };
    }
  }, {
    key: "replyLocation",
    value: function replyLocation(chat_id, lat, long) {
      return {
        method: "sendLocation",
        chat_id: chat_id,
        latitude: latitude,
        longitude: longitude
      };
    }
  }, {
    key: "replyOsuProfile",
    value: function replyOsuProfile(chat_id, objUser) {
      return {
        method: "sendMessage",
        chat_id: chat_id,
        text: "OSU PROFIL\nusername: ".concat(objUser.username, "\nprofil_description: ").concat(objUser.deskripsi_profil, "\nurl_profil: \"https://osu.ppy.sh/u/").concat(objUser.user_id, "\"\n\nBEST SCORE\nbeatmap: ").concat(objUser.deskripsi_best || "none", "\nurl_beatmap: \"https://osu.ppy.sh/s/").concat(objUser.beatmapset_id || "none", "\"\n")
      };
    }
  }]);
  return Wrapper;
}();

exports.default = Wrapper;