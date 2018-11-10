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
    if (!event.message) sendBack(null);

    const command = event.message.text;
    const messageObject = event.message;
    const receiverChatID = event.message.chat.id;
    const sendBack = this.sendBack;
    const botApi = this.botApi;

    if (command.includes("/katou") || command === "katou") {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          botApi.sendReply(messageObject.chat.first_name)
        )
      );
    }

    if (command.includes("/ramal")) {
      sendBack(Wrapper.replyTextMessage(receiverChatID, botApi.getRamal()));
    }

    if (command.includes("/wiki")) {
      botApi
        .getWiki(this.parseKeyword("wiki"))
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/say")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          this.parseKeyword(messageObject, "say")
        )
      );
    }

    if (command.includes("/hbd")) {
      sendBack(
        Wrapper.replyTextMessage(
          `Selamat ulang tahun ${this.parseKeyword("hbd")} :D`
        )
      );
    }

    if (command.includes("/weather")) {
      botApi
        .getWeather(this.parseKeyword("weather"))
        .then(result => {
          sendBack(Wrapper.replyTextMessage(result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(err));
        });
    }

    if (command.includes("/calc")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          eval(this.parseKeyword("calc"))
        )
      );
    }

    if (command.includes("/pic")) {
      botApi
        .getImageUrl(this.parseKeyword("/pic"))
        .then(result => {
          sendBack(Wrapper.replyPhoto(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }
  }
}
