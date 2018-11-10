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
}
