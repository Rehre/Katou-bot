import Wrapper from "../reply-wrapper/telegram";

export default class TelegramEventHandler {
  constructor(sendBackFunc) {
    this.sendBack = sendBackFunc;
  }

  parseKeyword(event, keyword) {
    const regex = `(\/${keyword}@KatouBot)|(\/${keyword})`;

    return event.message.text.replace(new RegExp(regex, "g"), "");
  }

  handle(event) {
    if (!event.message) return;

    const command = event.message.text;
    const sendBack = this.sendBack;

    if (command.includes("/say")) {
      sendBack(
        Wrapper.replyTextMessage(
          event.message.chat.id,
          this.parseKeyword(event, "say")
        )
      );
    }
  }
}
