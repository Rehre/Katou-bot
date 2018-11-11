import Wrapper from "../reply-wrapper/telegram";
import BotApi from "../bot-api";
import constants from "../constants";

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
    if (!event.message) this.sendBack({});

    const command = event.message.text;
    const messageObject = event.message;
    const receiverChatID = event.message.chat.id;
    const sendBack = this.sendBack;
    const botApi = this.botApi;

    if (!command) this.sendBack({});
    if (command[0] != "/") this.sendBack({});

    if (command.includes("/katou") || command.includes("/start")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          botApi.sendReply(messageObject.from.first_name)
        )
      );
    }

    if (command.includes("/help")) {
      sendBack(
        Wrapper.replyTextMessage(receiverChatID, constants.TELEGRAM_HELP)
      );
    }

    if (command.includes("/ramal")) {
      sendBack(Wrapper.replyTextMessage(receiverChatID, botApi.getRamal()));
    }

    if (command.includes("/say")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          this.parseKeyword(messageObject, "say")
        )
      );
    }

    if (command.includes("/wiki")) {
      botApi
        .getWiki(this.parseKeyword(messageObject, "wiki"))
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/hbd")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          `Selamat ulang tahun ${this.parseKeyword(messageObject, "hbd")} :D`
        )
      );
    }

    if (command.includes("/weather")) {
      botApi
        .getWeather(this.parseKeyword(messageObject, "weather"))
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/calc")) {
      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          eval(this.parseKeyword(messageObject, "calc")) || "can't calculate"
        )
      );
    }

    if (command.includes("/pic")) {
      botApi
        .getImageUrl(this.parseKeyword(messageObject, "pic"))
        .then(result => {
          sendBack(Wrapper.replyPhoto(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/video")) {
      botApi
        .getYoutubeUrl(this.parseKeyword(messageObject, "video"))
        .then(result => {
          sendBack(
            Wrapper.replyTextMessage(
              receiverChatID,
              `${result.title}\n\n${result.link}`
            )
          );
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/location")) {
      botApi
        .getLocation(this.parseKeyword(messageObject, "location"))
        .then(result => {
          sendBack(
            Wrapper.replyLocation(
              receiverChatID,
              result.latitude,
              result.longitude
            )
          );
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/write")) {
      sendBack(
        Wrapper.replyPhoto(
          receiverChatID,
          `${constants.CHARTAPI_URL}${this.parseKeyword(
            messageObject,
            "write"
          )}${constants.CHARTAPI_QUERY}`
        )
      );
    }

    if (command.includes("/music")) {
      botApi
        .getYoutubeUrl(this.parseKeyword(messageObject, "music"))
        .then(result => {
          sendBack(
            Wrapper.replyTextMessage(
              receiverChatID,
              `${result.title}\n\n Link download : ${constants.MP3YOUTUBE_URL}${
                result.link
              }`
            )
          );
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/animequote")) {
      const quotesItem = botApi.getAnimeQuote();

      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          `\"${quotesItem.quotesentence}\"\nBy : ${
            quotesItem.quotecharacter
          }\nFrom :  ${quotesItem.quoteanime}`
        )
      );
    }

    if (command.includes("/lovemeter")) {
      botApi
        .getLoveMeter(this.parseKeyword(messageObject, "lovemeter"))
        .then(result => {
          sendBack(
            Wrapper.replyTextMessage(
              receiverChatID,
              `Persentase pasangan ${result.fname} dan ${result.sname} :\n\n${
                result.percentage
              }%\n\nSaran: ${result.result}`
            )
          );
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }
  }
}
