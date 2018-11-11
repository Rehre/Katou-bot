export default class Wrapper {
  static replyTextMessage(chat_id, text) {
    return {
      method: "sendMessage",
      chat_id,
      text
    };
  }

  static replyPhoto(chat_id, photo) {
    return {
      method: "sendPhoto",
      chat_id,
      photo
    };
  }

  static replyVideo(chat_id, caption, video) {
    return {
      method: "sendVideo",
      chat_id,
      video,
      caption
    }
  }

  static replyLocation(chat_id, lat, long) {
    return {
      method: "sendLocation",
      chat_id,
      latitude,
      longitude
    }
  }
}
