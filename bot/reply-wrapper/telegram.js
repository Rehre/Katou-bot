/**
 * Telegram response wrapper
 */
export default class TelegramWrapper {
  /**
   * reply with text message to telegram
   * @param {string} chatId telegram chat id
   * @param {string} text replied text
   * @return {object} text reply template
   */
  static replyTextMessage(chatId, text) {
    return {
      method: 'sendMessage',
      chat_id: chatId,
      text,
    };
  }
  /**
   * reply with image to telegram
   * @param {string} chatId telegram chat id
   * @param {string} photo replied image url
   * @return {object} image reply template
   */
  static replyPhoto(chatId, photo) {
    return {
      method: 'sendPhoto',
      chat_id: chatId,
      photo,
    };
  }

  /**
   * reply with video to telegram
   * @param {string} chatId telegram chat id
   * @param {string} caption video caption
   * @param {string} video video url
   * @return {object} video reply template
   */
  static replyVideo(chatId, caption, video) {
    return {
      method: 'sendVideo',
      chat_id: chatId,
      video,
      caption,
    };
  }

  /**
   * reply with location to telegram
   * @param {string} chatId
   * @param {number} latitude
   * @param {number} longitude
   * @return {object} location reply template
   */
  static replyLocation(chatId, latitude, longitude) {
    return {
      method: 'sendLocation',
      chat_id: chatId,
      latitude,
      longitude,
    };
  }

  /**
   * reply with osu profile to telegram
   * @param {string} chatId telegram chat id
   * @param {object} objUser user info object
   * @return {object} osu reply template
   */
  static replyOsuProfile(chatId, objUser) {
    return {
      method: 'sendMessage',
      chat_id: chatId,
      text: `OSU PROFIL
username: ${objUser.username}
profile description: ${objUser.deskripsi_profil}
url profile: "https://osu.ppy.sh/u/${objUser.user_id}"

BEST SCORE
beatmap: ${objUser.deskripsi_best || 'none'}
url beatmap: "https://osu.ppy.sh/s/${objUser.beatmapset_id || 'none'}"
`,
    };
  }
}
