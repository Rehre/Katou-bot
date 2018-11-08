"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  line: {
    channelAccessToken: JSON.stringify(process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN),
    channelSecret: JSON.stringify(process.env.LINE_BOT_CHANNEL_SECRET)
  }
};
exports.default = _default;