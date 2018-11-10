export default class Wrapper {
  static replyTextMessage(chat_id, text) {
    return {
      method: "sendMessage",
      chat_id,
      text
    };
  }
}
