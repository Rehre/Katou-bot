import rp from 'request-promise';
import animequote from 'animequote';
import * as osu from 'osu';

import constants from './constants';

// TODO: add image search, video search and location search
/**
 * BotApi
 */
export default class BotApi {
  /**
   * get random number between 0 to max
   * @param {number} max the maximum random number
   * @return {number} the random number
   */
  getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * NOTE: EXPERIMENTAL FEATURE
   * get the result of language processing in percentage from the katou-nlp-service
   * @param {string} text text to be processed to katou-nlp-service
   * @return {object} the processed result from the katou-nlp-service
   */
  async getNLP(text) {
    const response = await rp({
      uri: 'https://katou-nlp-service.herokuapp.com/classify',
      method: 'POST',
      json: true,
      body: {
        keyword: text,
      },
    });

    if (!response) throw new Error('Error fetching response');
    return response;
  }

  /**
   * get reply from the bot
   * @param {string} username username to be used in the text as the name of the user
   * @return {string} the reply from the bot
   */
  sendReply(username) {
    const replyString = [
      'Iya, ' + username + ' ?',
      'Ada apa ' + username + ' ?',
      'Ada yang bisa dibantu ' + username + ' ?',
    ];

    return replyString[this.getRandomIndex(replyString.length)];
  }

  /**
   * get fortune telling randomly from the bot
   * @return {string} tne text of the fortune
   */
  getRamal() {
    const ramalan = [
      'Berhati-hatilah hari ini adalah hari tersial mu',
      'Hari ini mungkin agak menyusahkan bagimu jadi berhati-hatilah',
      'Hari ini mungkin kamu akan menemukan jodohmu',
      'Hari ini mungkin akan sangat menguntungkan bagi keuanganmu',
      'Tiada hari yang lebih baik dari hari ini bagimu',
    ];

    return ramalan[this.getRandomIndex(ramalan.length)];
  }

  /**
   * get wikipedia result from the keyword
   * @param {string} keyword wikipedia search keywod
   * @return {string} returned text from the wikipedia
   */
  async getWiki(keyword) {
    try {
      const keywordEncoded = encodeURIComponent(keyword);

      const response = await rp({
        uri: constants.WIKIPEDIA_URL + keywordEncoded,
        json: true,
      });

      if (!response) throw new Error('Error fetching response');
      const pages = response.query.pages;
      const urlForText = `https://id.wikipedia.org/wiki/${keywordEncoded}`;

      let extractedText = Object.values(pages)[0].extract;

      if (extractedText === '') {
        return `Link dialihkan ke: ${urlForText}`;
      }

      if (extractedText === null) {
        return `Tidak ditemukan hasil dengan keyword : ${keyword}`;
      }

      if (extractedText !== null) {
        if (extractedText.length > 1900) {
          extractedText = extractedText.substr(0, 1900) + '...';
        }

        return `${extractedText}\nRead more: ${urlForText}`;
      }
    } catch {
      throw new Error(`Request gagal atau halaman wikipedia tidak ditemukan`);
    }
  }

  /**
   * get weather data from location
   * @param {string} keyword the location of the weather
   * @return {string} weather data of the location
   */
  async getWeather(keyword) {
    try {
      const response = await rp({
        uri: `${constants.OPENWEATHERMAP_URL}${keyword}${constants.OPENWEATHERMAP_QUERY}${constants.OPENWEATHERMAP_APPID}`,
        json: true,
      });

      if (!response) throw new Error('Error fetching response');

      const resultData = {
        cityName: response.name,
        degree: `${response.main.temp} C`,
        humidity: `${response.main.humidity}%`,
        pressure: `${response.main.pressure} HPa`,
        windSpeed: `${response.wind.speed} m/s`,
      };

      return `Cuaca di kota ${resultData.cityName} : \nSuhu : ${resultData.degree} \nKelembaban : ${resultData.humidity} \nTekanan Udara : ${resultData.pressure}\nKecepatan Angin : ${resultData.windSpeed} `;
    } catch {
      throw new Error(`Request gagal atau kota tidak ditemukan`);
    }
  }

  /**
   * translate text
   * @param {string} text text to translate
   * @param {string} lang language code
   * @return {string} the translated text
   */
  async translateText(text, lang) {
    try {
      const response = await rp({
        uri: `${constants.YANDEXTRANSLATE_URL}${constants.YANDEXTRANSLATE_KEY}${constants.YANDEXTEXT_QUERY}${text}${constants.YANDEXLANG_QUERY}${lang}${constants.YANDEX_OTHERQUERY}`,
      });

      if (!response) throw new Error('Error fetching response');
      return `${JSON.parse(response).text}`;
    } catch {
      throw new Error(`Request gagal atau kode bahasa tidak ditemukan`);
    }
  }

  /**
   * get lovemeter of couple from the api
   * @param {string} keyword keyword that has couple names (person1:person2)
   * @return {object} the percentage result object
   */
  async getLoveMeter(keyword) {
    try {
      const couple = keyword.split(':');
      const person1 = couple[0];
      const person2 = couple[1];

      const response = await rp({
        uri: `${constants.RAPID_API_LOVEMETERURL}${person1}${constants.RAPID_API_LOVEMETERQUERY}${person2}`,
        json: true,
        headers: {
          'x-rapidapi-host': constants.RAPID_API_LOVEMETER_HOST,
          'x-rapidapi-key': constants.RAPID_API_KEY,
          Accept: 'application/json',
        },
      });

      if (!response) throw new Error('Error fetching response');

      return response;
    } catch {
      throw new Error(
        `Request gagal atau tidak dapat menghitung persentase pasangan`
      );
    }
  }

  /**
   * get anime quote from the animequote library
   * @return {string} the quote string
   */
  getAnimeQuote() {
    return animequote();
  }

  /**
   * get osu player info
   * @param {string} keyword the player username
   * @param {string} mode the mode stats for the player
   * @return {object} object of the player stats
   */
  getOsuProfile(keyword, mode) {
    return new Promise((resolve, reject) => {
      const osuApi = osu.api(constants.OSUAPI_KEY);

      let resultProfile;
      let resultBest;
      let deskripsiProfil;
      let deskripsiBest;

      osuApi
        .getUser({ u: keyword, m: mode })
        .then((resultProfiles) => {
          resultProfile = resultProfiles;

          return osuApi.getUserBest({ u: keyword, m: mode, limit: 1 });
        })
        .then((resultBests) => {
          resultBest = resultBests;

          deskripsiProfil =
            'Level : ' +
            Math.floor(parseInt(resultProfile[0].level)) +
            '    Acc : ' +
            Math.floor(parseInt(resultProfile[0].accuracy)) +
            '%\nRank : ' +
            resultProfile[0].pp_rank +
            '\nPP :' +
            resultProfile[0].pp_raw;

          if (resultBest[0].length === 0) {
            resolve({
              withBeatmap: false,
              userId: resultProfile[0].user_id,
              username: resultProfile[0].username,
              deskripsi_profil: deskripsiProfil,
            });
          }

          return osuApi.getBeatmaps({ b: resultBest[0].beatmap_id, limit: 1 });
        })
        .then((resultBeatmap) => {
          const beatmapTitle = resultBeatmap[0].title;

          if (beatmapTitle.length > 26) {
            beatmapTitle = beatmapTitle.substr(0, 26) + '...';
          }

          deskripsiBest =
            beatmapTitle +
            '\nScore : ' +
            resultBest[0].score +
            '\nPP : ' +
            Math.floor(parseInt(resultBest[0].pp));

          resolve({
            withBeatmap: true,
            user_id: resultProfile[0].user_id,
            username: resultProfile[0].username,
            deskripsi_profil,
            beatmapset_id: resultBeatmap[0].beatmapset_id,
            deskripsi_best: deskripsiBest,
          });
        })
        .catch(() => {
          reject(Error('Request gagal atau tidak dapat menemukan user osu'));
        });
    });
  }
}
