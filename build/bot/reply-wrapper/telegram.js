"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Telegram response wrapper
 */
var TelegramWrapper = /*#__PURE__*/function () {
  function TelegramWrapper() {
    (0, _classCallCheck2["default"])(this, TelegramWrapper);
  }

  (0, _createClass2["default"])(TelegramWrapper, null, [{
    key: "replyTextMessage",

    /**
     * reply with text message to telegram
     * @param {string} chatId telegram chat id
     * @param {string} text replied text
     * @return {object} text reply template
     */
    value: function replyTextMessage(chatId, text) {
      return {
        method: 'sendMessage',
        chat_id: chatId,
        text: text
      };
    }
    /**
     * reply with image to telegram
     * @param {string} chatId telegram chat id
     * @param {string} photo replied image url
     * @return {object} image reply template
     */

  }, {
    key: "replyPhoto",
    value: function replyPhoto(chatId, photo) {
      return {
        method: 'sendPhoto',
        chat_id: chatId,
        photo: photo
      };
    }
    /**
     * reply with video to telegram
     * @param {string} chatId telegram chat id
     * @param {string} caption video caption
     * @param {string} video video url
     * @return {object} video reply template
     */

  }, {
    key: "replyVideo",
    value: function replyVideo(chatId, caption, video) {
      return {
        method: 'sendVideo',
        chat_id: chatId,
        video: video,
        caption: caption
      };
    }
    /**
     * reply with location to telegram
     * @param {string} chatId
     * @param {number} latitude
     * @param {number} longitude
     * @return {object} location reply template
     */

  }, {
    key: "replyLocation",
    value: function replyLocation(chatId, latitude, longitude) {
      return {
        method: 'sendLocation',
        chat_id: chatId,
        latitude: latitude,
        longitude: longitude
      };
    }
    /**
     * reply with osu profile to telegram
     * @param {string} chatId telegram chat id
     * @param {object} objUser user info object
     * @return {object} osu reply template
     */

  }, {
    key: "replyOsuProfile",
    value: function replyOsuProfile(chatId, objUser) {
      return {
        method: 'sendMessage',
        chat_id: chatId,
        text: "OSU PROFIL\nusername: ".concat(objUser.username, "\nprofile description: ").concat(objUser.deskripsi_profil, "\nurl profile: \"https://osu.ppy.sh/u/").concat(objUser.user_id, "\"\n\nBEST SCORE\nbeatmap: ").concat(objUser.deskripsi_best || 'none', "\nurl beatmap: \"https://osu.ppy.sh/s/").concat(objUser.beatmapset_id || 'none', "\"\n")
      };
    }
  }]);
  return TelegramWrapper;
}();

exports["default"] = TelegramWrapper;