/**
 * Line response wrapper
 */
export default class LineWrapper {
  /**
   * send text reply to line
   * @param {string} replyText text message
   * @return {object} text reply template
   */
  static replyText(replyText) {
    return {
      type: 'text',
      text: replyText,
    };
  }

  /**
   * send image to line
   * @param {string} originalContent original image url
   * @param {string} thumbnail thumbnail image url
   * @return {object} image reply template
   */
  static replyImg(originalContent, thumbnail) {
    return {
      type: 'image',
      originalContentUrl: originalContent,
      previewImageUrl: thumbnail,
    };
  }

  /**
   * send video to line
   * @param {string} videoUrl video url
   * @param {string} thumbnail video thumbnail url
   * @return {object} video reply template
   */
  static replyVideo(videoUrl, thumbnail) {
    return {
      type: 'video',
      originalContentUrl: videoUrl,
      previewImageUrl: thumbnail,
    };
  }

  /**
   * send location to line
   * @param {string} keyword location keyword
   * @param {object} objLocation object of location
   * @return {object} location reply template
   */
  static replyLocation(keyword, objLocation) {
    return {
      type: 'location',
      title: keyword,
      address: objLocation.formatted_address,
      latitude: objLocation.latitude,
      longitude: objLocation.longitude,
    };
  }

  /**
   * send osu stats to line
   * @param {object} objUser user stats object
   * @return {object} osu reply template
   */
  static replyOsuProfile(objUser) {
    if (objUser.withBeatmap === false) {
      return {
        type: 'template',
        altText: 'Osu Profile',
        template: {
          type: 'carousel',
          columns: [
            {
              thumbnailImageUrl: 'https://a.ppy.sh/' + objUser.user_id,
              title: objUser.username,
              text: objUser.deskripsi_profil,
              actions: [
                {
                  type: 'uri',
                  label: 'Ke profile',
                  uri: 'https://osu.ppy.sh/u/' + objUser.user_id,
                },
              ],
            },
          ],
        },
      };
    } else {
      return {
        type: 'template',
        altText: 'Osu Profile',
        template: {
          type: 'carousel',
          columns: [
            {
              thumbnailImageUrl: 'https://a.ppy.sh/' + objUser.user_id,
              title: objUser.username,
              text: objUser.deskripsi_profil,
              actions: [
                {
                  type: 'uri',
                  label: 'Ke profile',
                  uri: 'https://osu.ppy.sh/u/' + objUser.user_id,
                },
                {
                  type: 'uri',
                  label: 'Ke beatmap terbaik',
                  uri: 'https://osu.ppy.sh/s/' + objUser.beatmapset_id,
                },
              ],
            },
            {
              thumbnailImageUrl:
                'https://b.ppy.sh/thumb/' + objUser.beatmapset_id + 'l.jpg',
              title: 'Skor Terbaik',
              text: objUser.deskripsi_best,
              actions: [
                {
                  type: 'uri',
                  label: 'Ke profile',
                  uri: 'https://osu.ppy.sh/u/' + objUser.user_id,
                },
                {
                  type: 'uri',
                  label: 'Ke beatmap terbaik',
                  uri: 'https://osu.ppy.sh/s/' + objUser.beatmapset_id,
                },
              ],
            },
          ],
        },
      };
    }
  }

  /**
   * send keywords menu to line
   * @return {object} keywords menu template
   */
  static replyKeyword() {
    return {
      type: 'template',
      altText: 'Keyword',
      template: {
        type: 'buttons',
        title: 'Keyword',
        text: 'List keyword',
        actions: [
          {
            type: 'message',
            label: 'Keyword 1',
            text: '/keyword 1',
          },
          {
            type: 'message',
            label: 'Keyword 2',
            text: '/keyword 2',
          },
          {
            type: 'uri',
            label: 'Developer',
            uri: 'http://line.me/ti/p/~akl2340',
          },
        ],
      },
    };
  }
}
