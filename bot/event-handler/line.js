import LineWrapper from '../reply-wrapper/line';
import BotApi from '../bot-api';
import constants from '../constants';

/**
 * Line event handler
 */
export default class LineEventHandler {
  /**
   * @param {LineClient} client Line client from line bot nodejs sdk
   */
  constructor(client) {
    this.client = client;
    this.botApi = new BotApi();

    this.handle = this.handle.bind(this);
  }

  /**
   * function to handle incoming line event
   * @param {object} event line event object
   * @return {Promise} a returned promise
   */
  handle(event) {
    const client = this.client;
    const botApi = this.botApi;

    const replyToken = event.replyToken;
    const source = event.source.type;
    const reqProfile = {
      userId: event.source.userId,
      groupId: event.source.groupId || null,
      roomId: event.source.roomId || null,
    };

    if (event.type === 'join') {
      return client.replyMessage(
        replyToken,
        LineWrapper.replyText(
          'Terima kasih telah mengundang bot ini.\n\nSilahkan ketik "Katou keyword" untuk melihat keyword.'
        )
      );
    }

    if (event.type === 'message') {
      if (event.message.type !== 'text') return Promise.resolve(null);

      const msgText = event.message.text.toLowerCase();

      if (!msgText.split('')[0].trim() !== 'katou') {
        return Promise.resolve(null);
      }

      if (msgText === 'katou') {
        return client
          .getProfile(reqProfile.userId)
          .then((profile) =>
            client.replyMessage(
              replyToken,
              LineWrapper.replyText(botApi.sendReply(profile.displayName))
            )
          )
          .catch(() =>
            client.replyMessage(
              replyToken,
              LineWrapper.replyText(botApi.sendReply('Tanpa Nama'))
            )
          );
      }

      if (msgText === 'katou keyword') {
        return client.replyMessage(replyToken, LineWrapper.replyKeyword());
      }

      if (msgText === 'katou ramal') {
        return client.replyMessage(
          replyToken,
          LineWrapper.replyText(botApi.getRamal())
        );
      }

      if (msgText.includes('katou apa itu')) {
        const keyword = msgText.substr(13);

        botApi
          .getWiki(keyword)
          .then((result) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(result)
            );
          })
          .catch((err) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(err.message)
            );
          });
      }

      if (msgText.includes('katou ucapkan selamat ulang tahun ke')) {
        const keyword = msgText.substr(37);

        return client.replyMessage(
          replyToken,
          LineWrapper.replyText(`Selamat ulang tahun ${keyword} :D`)
        );
      }

      if (msgText.includes('katou cuaca')) {
        const keyword = msgText.substr(12);

        botApi
          .getWeather(keyword)
          .then((result) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(result)
            );
          })
          .catch((err) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(err.message)
            );
          });
      }

      if (msgText.includes('katou tulis')) {
        let keyword = msgText.substr(12);

        if (keyword.length <= 0) {
          return client.replyMessage(
            replyToken,
            LineWrapper.replyText('Silahkan masukan teks yang ingin diubah')
          );
        }

        keyword = encodeURI(keyword);
        const imgUrl = `${constants.CHARTAPI_URL}${keyword}${constants.CHARTAPI_QUERY}`;

        return client.replyMessage(
          replyToken,
          LineWrapper.replyImg(imgUrl, imgUrl)
        );
      }

      if (msgText === 'katou anime quotes') {
        const quotesItem = botApi.getAnimeQuote();

        return client.replyMessage(
          replyToken,
          LineWrapper.replyText(
            `"${quotesItem.quotesentence}"\nBy : ${quotesItem.quotecharacter}\nFrom :  ${quotesItem.quoteanime}`
          )
        );
      }

      if (msgText.includes('katou osu')) {
        if (msgText.substr(10).trim().length === 0) {
          return client.replyMessage(
            replyToken,
            LineWrapper.replyText('Silahkan masukan modenya')
          );
        }

        let keyword;
        let mode;

        if (msgText.includes('osustd')) {
          keyword = msgText.substr(13).trim();

          if (keyword.length === 0) {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText('Silahkan masukan nickname usernya')
            );
          }
          mode = 0;
        }

        if (msgText.includes('osumania')) {
          keyword = msgText.substr(15).trim();

          if (keyword.length === 0) {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText('Silahkan masukan nickname usernya')
            );
          }
          mode = 3;
        }

        if (msgText.includes('osutaiko')) {
          keyword = msgText.substr(15).trim();

          if (keyword.length === 0) {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText('Silahkan masukan nickname usernya')
            );
          }
          mode = 1;
        }

        if (msgText.includes('osuctb')) {
          keyword = msgText.substr(13).trim();

          if (keyword.length === 0) {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText('Silahkan masukan nickname usernya')
            );
          }
          mode = 2;
        }

        botApi
          .getOsuProfile(keyword, mode)
          .then((result) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyOsuProfile(result)
            );
          })
          .catch((err) => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(err.message)
            );
          });
      }

      if (msgText === 'bye katou') {
        return client
          .replyMessage(replyToken, [
            LineWrapper.replyText('Bye - Bye'),
            LineWrapper.replyImg(
              constants.KATOULEAVEIMG_URL,
              constants.KATOULEAVEIMG_URL
            ),
          ])
          .then(() => {
            if (source === 'room') {
              client.leaveRoom(reqProfile.roomId);
            } else if (source === 'group') {
              client.leaveGroup(reqProfile.groupId);
            }
          })
          .catch(() => {
            return client.replyMessage(
              replyToken,
              LineWrapper.replyText(
                'ERROR tidak bisa keluar melalui keyword silahkan kick katou melalui setting group'
              )
            );
          });
      }
    }
  }
}
