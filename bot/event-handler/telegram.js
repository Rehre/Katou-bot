import TelegramWrapper from '../reply-wrapper/telegram';
import BotApi from '../bot-api';
import constants from '../constants';

/**
 * Telegram event handler
 */
export default class TelegramEventHandler {
  /**
   * @param {function} sendBackFunc function to send back response to telegram request
   */
  constructor(sendBackFunc) {
    this.sendBack = sendBackFunc;
    this.botApi = new BotApi();
    this.commandList = [
      '/ai',
      '/katou',
      '/help',
      '/ramal',
      '/say',
      '/wiki',
      '/hbd',
      '/weather',
      '/write',
      '/animequote',
      '/osu',
    ];
  }

  /**
   * function to format the telegram keyword message
   * @param {object} messageObject telegram message object
   * @param {string} keyword keyword from the message
   * @return {string} a formatted keyword text
   */
  parseKeyword(messageObject, keyword) {
    // eslint-disable-next-line no-useless-escape
    const regex = `(\/${keyword}@KatouBot)|(\/${keyword})`;

    return messageObject.text.replace(new RegExp(regex, 'g'), '');
  }

  /**
   * function to handle incoming telegram event
   * @param {object} event telegram event object
   */
  handle(event) {
    if (!event.message) {
      this.sendBack({});
      return;
    }

    const botApi = this.botApi;
    const messageObject = event.message;
    const command = event.message.text.split(' ')[0].trim();
    const receiverChatID = event.message.chat.id;

    if (!command) {
      this.sendBack({});
      return;
    }

    if (!this.commandList.some((item) => command.includes(item))) {
      this.sendBack({});
      return;
    }

    // NOTE: EXPERIMENTAL FEATURE
    if (command.includes('/ai')) {
      const keyword = this.parseKeyword(messageObject, 'ai');

      botApi
        .getNLP(keyword)
        .then((result) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, result)
          );
        })
        .catch((err) =>
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, err.message)
          )
        );
    }

    if (command.includes('/katou')) {
      this.sendBack(
        TelegramWrapper.replyTextMessage(
          receiverChatID,
          botApi.sendReply(messageObject.from.first_name)
        )
      );
    }

    if (command.includes('/help')) {
      this.sendBack(
        TelegramWrapper.replyTextMessage(
          receiverChatID,
          constants.TELEGRAM_HELP
        )
      );
    }

    if (command.includes('/ramal')) {
      this.sendBack(
        TelegramWrapper.replyTextMessage(receiverChatID, botApi.getRamal())
      );
    }

    if (command.includes('/say')) {
      const keyword = this.parseKeyword(messageObject, 'say').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti ini: /say keyword'
          )
        );

        return;
      }

      this.sendBack(TelegramWrapper.replyTextMessage(receiverChatID, keyword));
    }

    if (command.includes('/wiki')) {
      const keyword = this.parseKeyword(messageObject, 'wiki').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti ini: /wiki keyword'
          )
        );

        return;
      }

      botApi
        .getWiki(keyword)
        .then((result) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, result)
          );
        })
        .catch((err) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, err.message)
          );
        });
    }

    if (command.includes('/hbd')) {
      const keyword = this.parseKeyword(messageObject, 'hbd').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti ini: /hbd keyword'
          )
        );

        return;
      }

      this.sendBack(
        TelegramWrapper.replyTextMessage(
          receiverChatID,
          `Selamat ulang tahun ${keyword} :D`
        )
      );
    }

    if (command.includes('/weather')) {
      const keyword = this.parseKeyword(messageObject, 'weather').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti ini: /weather keyword'
          )
        );

        return;
      }

      botApi
        .getWeather(keyword)
        .then((result) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, result)
          );
        })
        .catch((err) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, err.message)
          );
        });
    }

    if (command.includes('/write')) {
      const keyword = this.parseKeyword(messageObject, 'write').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti ini: /write keyword'
          )
        );

        return;
      }

      this.sendBack(
        TelegramWrapper.replyPhoto(
          receiverChatID,
          `${constants.CHARTAPI_URL}${keyword}${constants.CHARTAPI_QUERY}`
        )
      );
    }

    if (command.includes('/animequote')) {
      const quotesItem = botApi.getAnimeQuote();

      this.sendBack(
        TelegramWrapper.replyTextMessage(
          receiverChatID,
          `"${quotesItem.quotesentence}"\nBy : ${quotesItem.quotecharacter}\nFrom :  ${quotesItem.quoteanime}`
        )
      );
    }

    if (command.includes('/osu')) {
      const keyword = this.parseKeyword(messageObject, 'osu').trim();

      if (!keyword) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan keyword seperti: /osu osustd|osumania|osutaiko|osuctb user'
          )
        );

        return;
      }

      let mode = 0;
      const modeKeyword = keyword.split(' ')[0];
      const user = keyword.split(' ')[1];

      if (!user) {
        this.sendBack(
          TelegramWrapper.replyTextMessage(
            receiverChatID,
            'Tolong masukan nickname usernya'
          )
        );

        return;
      }

      if (modeKeyword === 'osustd') {
        mode = 0;
      }

      if (modeKeyword === 'osutaiko') {
        mode = 1;
      }

      if (modeKeyword === 'osuctb') {
        mode = 2;
      }

      if (modeKeyword === 'osumania') {
        mode = 3;
      }

      botApi
        .getOsuProfile(user, mode)
        .then((result) => {
          this.sendBack(
            TelegramWrapper.replyOsuProfile(receiverChatID, result)
          );
        })
        .catch((err) => {
          this.sendBack(
            TelegramWrapper.replyTextMessage(receiverChatID, err.message)
          );
        });
    }
  }
}
