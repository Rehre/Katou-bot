import Wrapper from "../reply-wrapper/telegram";
import BotApi from "../bot-api";
export default class TelegramEventHandler {
  constructor(sendBackFunc) {
    this.sendBack = sendBackFunc;
    this.botApi = new BotApi();
  }

  parseKeyword(messageObject, keyword) {
    const regex = `(\/${keyword}@KatouBot)|(\/${keyword})`;

    return messageObject.text.replace(new RegExp(regex, "g"), "");
  }

  handle(event) {
    if (!event.message) return;

    const command = event.message.text;
    const messageObject = event.message;
    const receiverChatID = event.message.chat.id;
    const sendBack = this.sendBack;
    const botApi = this.botApi;

    if (command === "katou") {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          botApi.sendReply(messageObject.chat.first_name)
        )
      );
    }

    if (command.includes("/ramal")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          botApi.getRamal()
        )
      )
    }

    if (command.includes("/say")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          this.parseKeyword(messageObject, "say")
        )
      );
    }
  }
}
