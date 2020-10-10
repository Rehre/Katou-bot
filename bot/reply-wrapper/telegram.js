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

  static replyVideo(chat_id, caption, video) {
    return {
      method: "sendVideo",
      chat_id,
      video,
      caption
    };
  }

  static replyLocation(chat_id, latitude, longitude) {
    return {
      method: "sendLocation",
      chat_id,
      latitude,
      longitude
    };
  }

  static replyOsuProfile(chat_id, objUser) {
    return {
      method: "sendMessage",
      chat_id,
      text: `OSU PROFIL
username: ${objUser.username}
profile description: ${objUser.deskripsi_profil}
url profile: "https://osu.ppy.sh/u/${objUser.user_id}"

BEST SCORE
beatmap: ${objUser.deskripsi_best || "none"}
url beatmap: "https://osu.ppy.sh/s/${objUser.beatmapset_id || "none"}"
`
    };
  }
}
