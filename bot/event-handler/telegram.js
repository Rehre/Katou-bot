import Wrapper from "../reply-wrapper/telegram";
import BotApi from "../bot-api";
import constants from "../constants";

export default class TelegramEventHandler {
  constructor(sendBackFunc) {
    this.sendBack = sendBackFunc;
    this.botApi = new BotApi();
    this.commandList = [
      "/katou",
      "/ramal",
      "/say",
      "/wiki",
      "/weather",
      "/calc",
      "/pic",
      "/video",
      "/location",
      "/write",
      "/music",
      "/animequote",
      "/lovemeter",
      "/translate",
      "/osu"
    ];
  }

  parseKeyword(messageObject, keyword) {
    const regex = `(\/${keyword}@KatouBot)|(\/${keyword})`;

    return messageObject.text.replace(new RegExp(regex, "g"), "");
  }

  // TODO
  // adding osu keyword
  // adding translate keyword
  handle(event) {
    if (!event.message) {
      this.sendBack({});
      return;
    }

    const command = event.message.text;
    const messageObject = event.message;
    const receiverChatID = event.message.chat.id;
    const sendBack = this.sendBack;
    const botApi = this.botApi;

    if (!command) {
      this.sendBack({});
      return;
    }
    if (!this.commandList.some(item => command.includes(item))) {
      this.sendBack({});
      return;
    }

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
      const keyword = this.parseKeyword(messageObject, "say");

      if (!keyword.trim()) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /say {keyword}"
          )
        );

        return;
      }

      sendBack(Wrapper.replyTextMessage(receiverChatID, keyword.trim()));
    }

    if (command.includes("/wiki")) {
      const keyword = this.parseKeyword(messageObject, "wiki");

      if (!keyword.trim()) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /wiki {keyword}"
          )
        );

        return;
      }

      botApi
        .getWiki(keyword.trim())
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/hbd")) {
      const keyword = this.parseKeyword(messageObject, "hbd");

      if (!keyword.trim()) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /hbd {keyword}"
          )
        );

        return;
      }

      sendBack(
        Wrapper.replyTextMessage(
          receiverChatID,
          `Selamat ulang tahun ${keyword.trim()} :D`
        )
      );
    }

    if (command.includes("/weather")) {
      const keyword = this.parseKeyword(messageObject, "weather");

      if (!keyword.trim()) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /weather {keyword}"
          )
        );

        return;
      }

      botApi
        .getWeather(keyword.trim())
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }
    // TODO adding funciton for this
    if (command.includes("/calc")) {
      const keyword = this.parseKeyword(messageObject, "calc");

      if (!keyword.trim()) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /calc {keyword}{operator}{keyword}"
          )
        );

        return;
      }

      sendBack(Wrapper.replyTextMessage(receiverChatID, keyword.trim()));
    }

    if (command.includes("/pic")) {
      const keyword = this.parseKeyword(messageObject, "pic").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /pic {keyword}"
          )
        );

        return;
      }

      botApi
        .getImageUrl(keyword)
        .then(result => {
          sendBack(Wrapper.replyPhoto(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/video")) {
      const keyword = this.parseKeyword(messageObject, "video").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /video {keyword}"
          )
        );

        return;
      }

      botApi
        .getYoutubeUrl(keyword)
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
      const keyword = this.parseKeyword(messageObject, "location").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /location {keyword}"
          )
        );

        return;
      }

      botApi
        .getLocation(keyword)
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
      const keyword = this.parseKeyword(messageObject, "write").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /write {keyword}"
          )
        );

        return;
      }

      sendBack(
        Wrapper.replyPhoto(
          receiverChatID,
          `${constants.CHARTAPI_URL}${keyword}${constants.CHARTAPI_QUERY}`
        )
      );
    }

    if (command.includes("/music")) {
      const keyword = this.parseKeyword(messageObject, "music").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /music {keyword}"
          )
        );

        return;
      }

      botApi
        .getYoutubeUrl(keyword)
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
      const keyword = this.parseKeyword(messageObject, "lovemeter").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /lovemeter {name}:{name}"
          )
        );

        return;
      }

      botApi
        .getLoveMeter(keyword)
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

    if (command.includes("/translate")) {
      const keyword = this.parseKeyword(messageObject, "translate").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /translate {kode bahasa dari}:{kode bahasa ke} {text}"
          )
        );

        return;
      }

      const keywordArray = keyword.split(" ");
      const lang = keywordArray[0];
      const text = keywordArray[1];

      botApi
        .translateText(text, lang)
        .then(result => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }

    if (command.includes("/osu")) {
      const keyword = this.parseKeyword(messageObject, "osu").trim();

      if (!keyword) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan keyword seperti: /osu {osustd|osumania|osutaiko|osuctb} {user}"
          )
        );

        return;
      }

      let mode = 0;
      const user = keyword.split(" ")[1];

      if (!user) {
        sendBack(
          Wrapper.replyTextMessage(
            receiverChatID,
            "Tolong masukan nickname usernya"
          )
        );

        return;
      }

      if (msgText.includes("osustd")) {
        mode = 0;
      }

      if (msgText.includes("osumania")) {
        mode = 3;
      }

      if (msgText.includes("osutaiko")) {
        mode = 1;
      }

      if (msgText.includes("osuctb")) {
        mode = 2;
      }

      botApi
        .getOsuProfile(user, mode)
        .then(result => {
          sendBack(Wrapper.replyOsuProfile(receiverChatID, result));
        })
        .catch(err => {
          sendBack(Wrapper.replyTextMessage(receiverChatID, err));
        });
    }
  }
}
