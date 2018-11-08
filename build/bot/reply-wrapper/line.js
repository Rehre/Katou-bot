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
    key: "replyText",
    value: function replyText(rtext) {
      return {
        type: "text",
        text: rtext
      };
    }
  }, {
    key: "replyImg",
    value: function replyImg(originalContent, thumbnail) {
      return {
        type: "image",
        originalContentUrl: originalContent,
        previewImageUrl: thumbnail
      };
    }
  }, {
    key: "replyVideo",
    value: function replyVideo(videoUrl, thumbnail) {
      return {
        type: "video",
        originalContentUrl: videoUrl,
        previewImageUrl: thumbnail
      };
    }
  }, {
    key: "replyButtonURLConfirm",
    value: function replyButtonURLConfirm(buttonTitle, buttonLabel, url) {
      return {
        type: "template",
        altText: "Download Video",
        template: {
          type: "buttons",
          text: buttonTitle,
          actions: [{
            type: "uri",
            label: buttonLabel,
            uri: url
          }]
        }
      };
    }
  }, {
    key: "replyInstagramProfile",
    value: function replyInstagramProfile(instagramInfo) {
      if (instagramInfo.tertutup === false) {
        return {
          type: "template",
          altText: "Stalk",
          template: {
            type: "carousel",
            columns: [{
              thumbnailImageUrl: instagramInfo.profile_pic,
              title: instagramInfo.username,
              text: instagramInfo.deskripsi_profil,
              actions: [{
                type: "uri",
                label: "Ke Profil",
                uri: instagramInfo.profile_url
              }, {
                type: "uri",
                label: "Ke Post",
                uri: instagramInfo.code
              }, {
                type: "uri",
                label: "Download Gambar Post",
                uri: instagramInfo.src
              }]
            }, {
              thumbnailImageUrl: instagramInfo.src,
              title: "Postingan Terakhir",
              text: instagramInfo.deskripsi_post,
              actions: [{
                type: "uri",
                label: "Ke Profil",
                uri: instagramInfo.profile_url
              }, {
                type: "uri",
                label: "Ke Post",
                uri: instagramInfo.code
              }, {
                type: "uri",
                label: "Download Gambar Post",
                uri: instagramInfo.src
              }]
            }]
          }
        };
      } else {
        return {
          type: "template",
          altText: "Stalk",
          template: {
            type: "carousel",
            columns: [{
              thumbnailImageUrl: instagramInfo.profile_pic,
              title: instagramInfo.username,
              text: instagramInfo.objUser.deskripsi_profil,
              actions: [{
                type: "uri",
                label: "Ke Profil",
                uri: instagramInfo.profile_url
              }]
            }]
          }
        };
      }
    }
  }, {
    key: "replyLocation",
    value: function replyLocation(keyword, objLocation) {
      return {
        type: "location",
        title: keyword,
        address: objLocation.formatted_address,
        latitude: objLocation.latitude,
        longitude: objLocation.longitude
      };
    }
  }, {
    key: "replyOsuProfile",
    value: function replyOsuProfile(objUser) {
      if (objUser.withBeatmap === false) {
        return {
          type: "template",
          altText: "Osu Profile",
          template: {
            type: "carousel",
            columns: [{
              thumbnailImageUrl: "https://a.ppy.sh/" + objUser.user_id,
              title: objUser.username,
              text: objUser.deskripsi_profil,
              actions: [{
                type: "uri",
                label: "Ke profile",
                uri: "https://osu.ppy.sh/u/" + objUser.user_id
              }]
            }]
          }
        };
      } else {
        return {
          type: "template",
          altText: "Osu Profile",
          template: {
            type: "carousel",
            columns: [{
              thumbnailImageUrl: "https://a.ppy.sh/" + objUser.user_id,
              title: objUser.username,
              text: objUser.deskripsi_profil,
              actions: [{
                type: "uri",
                label: "Ke profile",
                uri: "https://osu.ppy.sh/u/" + objUser.user_id
              }, {
                type: "uri",
                label: "Ke beatmap terbaik",
                uri: "https://osu.ppy.sh/s/" + objUser.beatmapset_id
              }]
            }, {
              thumbnailImageUrl: "https://b.ppy.sh/thumb/" + objUser.beatmapset_id + "l.jpg",
              title: "Skor Terbaik",
              text: objUser.deskripsi_best,
              actions: [{
                type: "uri",
                label: "Ke profile",
                uri: "https://osu.ppy.sh/u/" + objUser.user_id
              }, {
                type: "uri",
                label: "Ke beatmap terbaik",
                uri: "https://osu.ppy.sh/s/" + objUser.beatmapset_id
              }]
            }]
          }
        };
      }
    }
  }, {
    key: "replyKeyword",
    value: function replyKeyword() {
      return {
        type: "template",
        altText: "Keyword",
        template: {
          type: "buttons",
          title: "Keyword",
          text: "List keyword",
          actions: [{
            type: "message",
            label: "Keyword 1",
            text: "/keyword 1"
          }, {
            type: "message",
            label: "Keyword 2",
            text: "/keyword 2"
          }, {
            type: "message",
            label: "Keyword 3",
            text: "/keyword 3"
          }, {
            type: "uri",
            label: "Developer",
            uri: "http://line.me/ti/p/~akl2340"
          }]
        }
      };
    }
  }]);
  return Wrapper;
}();

exports.default = Wrapper;