import rp from "request-promise";
import gis from "g-i-s";
import youtubeSearch from "youtube-search";
import ytdlCore from "ytdl-core";
import animequote from "animequote";
import * as osu from "osu";

import constants from "./constants";

export default class BotApi {
  constructor() {
    this.getRandomIndex = length => Math.floor(Math.random() * length);
  }

  sendReply(username) {
    const replyString = [
      "Iya, " + username + " ?",
      "Ada apa " + username + " ?",
      "Ada yang bisa dibantu " + username + " ?"
    ];

    return replyString[this.getRandomIndex(replyString.length)];
  }

  getRamal() {
    const ramalan = [
      "Berhati-hatilah hari ini adalah hari tersial mu",
      "Hari ini mungkin agak menyusahkan bagimu jadi berhati-hatilah",
      "Hari ini mungkin kamu akan menemukan jodohmu",
      "Hari ini mungkin akan sangat menguntungkan bagi keuanganmu",
      "Tiada hari yang lebih baik dari hari ini bagimu"
    ];

    return ramalan[this.getRandomIndex(ramalan.length)];
  }

  async getWiki(keyword) {
    try {
      const keywordEncoded = encodeURI(keyword);

      const response = await rp({
        uri: constants.WIKIPEDIA_URL + keywordEncoded,
        json: true
      });

      if (!response) throw new Error("Error fetching: response");
      const pages = response.query.pages;
      const urlForText = `https://id.wikipedia.org/wiki/${keywordEncoded}`;

      for (let i in pages) {
        let extractedText = pages[i].extract;

        if (extractedText === "") {
          return `Link dialihkan ke: ${urlForText}`;
        }

        if (extractedText === null) {
          return `Tidak ditemukan hasil dengan keyword : ${keyword}`;
        }

        if (extractedText !== null) {
          if (extractedText.length > 1900) {
            extractedText = extractedText.substr(0, 1900) + "...";
          }

          return `${extractedText}\nRead more: ${urlForText}`;
        }
      }
    } catch (err) {
      throw new Error(
        `Request gagal atau halaman wikipedia tidak ditemukan ERR: ${err}`
      );
    }
  }

  getImageUrl(keyword) {
    return new Promise((resolve, reject) => {
      gis(
        {
          searchTerm: keyword,
          queryStringAddition: "&safe=active&tbs=isz:m"
        },
        (err, result) => {
          if (err) reject(`Gambar ${keyword} tidak ditemukan`);
          result === undefined
            ? reject(`Gambar ${keyword} tidak ditemukan`)
            : null;

          result[this.getRandomIndex(result.length)] === undefined
            ? reject(`Gambar ${keyword} tidak ditemukan`)
            : resolve(result[this.getRandomIndex(result.length)].url);
        }
      );
    });
  }

  async getWeather(keyword) {
    try {
      const response = await rp({
        uri: `${constants.OPENWEATHERMAP_URL}${keyword}${
          constants.OPENWEATHERMAP_QUERY
        }${constants.OPENWEATHERMAP_APPID}`,
        json: true
      });

      if (!response) throw new Error("Error fetching: response");

      const resultData = {
        cityName: response.name,
        degree: `${response.main.temp} C`,
        humidity: `${response.main.humidity}%`,
        pressure: `${response.main.pressure} HPa`,
        windSpeed: `${response.wind.speed} m/s`
      };

      return `Cuaca di kota ${resultData.cityName} : \nSuhu : ${
        resultData.degree
      } \nKelembaban : ${resultData.humidity} \nTekanan Udara : ${
        resultData.pressure
      }\nKecepatan Angin : ${resultData.windSpeed} `;
    } catch (err) {
      throw new Error(`Request gagal atau kota tidak ditemukan ERR: ${err}`);
    }
  }

  getVideo(keyword) {
    return new Promise((resolve, reject) => {
      youtubeSearch(
        keyword,
        {
          maxResults: 5,
          order: "relevance",
          type: "video",
          safeSearch: "strict",
          key: constants.GOOGLECLOUDAPI_KEY
        },
        (err, result) => {
          if (
            err ||
            result == undefined ||
            result == [] ||
            result.length <= 0
          ) {
            reject("Video tidak ditemukan atau LIMIT");
          } else {
            let randomIndex = Math.round(Math.random() * result.length);
            let resultVideo = {
              link: result[randomIndex].link,
              title: result[randomIndex].title,
              thumbnail: result[randomIndex].thumbnails.default.url
            };

            ytdlCore.getInfo(resultVideo.link, {}, (err, info) => {
              if (err) {
                resultVideo.videoUrl = "undefined";
                resolve(resultVideo);
              } else if (info == undefined) {
                resultVideo.videoUrl = "undefined";
                resolve(resultVideo);
              } else {
                for (let i = 0; i < info.formats.length; i++) {
                  if (info.formats[i].container === "mp4") {
                    resultVideo.videoUrl = info.formats[i].url;

                    resolve(resultVideo);
                    break;
                  }
                }
              }
            });
          }
        }
      );
    });
  }

  async translateText(text, lang) {
    try {
      const response = await rp({
        uri: `${constants.YANDEXTRANSLATE_URL}${constants.YANDEXTRANSLATE_KEY}${
          constants.YANDEXTEXT_QUERY
        }${text}${constants.YANDEXLANG_QUERY}${lang}${
          constants.YANDEX_OTHERQUERY
        }`
      });

      if (!response) throw new Error("Error fetching: response");

      return `${response}`
        .match(/<text>.*?<\/text>/g)[0]
        .replace(/<text>|<\/text>/g, "");
    } catch (err) {
      throw new Error(
        `Request gagal atau kode bahasa tidak ditemukan ERR: ${err}`
      );
    }
  }

  async getLocation(keyword) {
    try {
      const encodedKeyword = encodeURI(keyword);

      const response = await rp({
        uri: `${constants.GMAPSJS_URL}${encodedKeyword}${
          constants.GMAPSJS_QUERY
        }${constants.GMAPSJS_KEY}`,
        json: true
      });

      if (!response) throw new Error("Error Fetching: response");
      if (!response.result) throw new Error("Error Fetching: result");

      const formatted_address = response.results[0].formatted_address;
      const latitude = response.results[0].geometry.location.lat;
      const longitude = response.results[0].geometry.location.lng;

      if (formatted_address.length > 100) {
        formatted_address = formatted_address.substr(0, 90) + "...";
      }

      return { formatted_address, latitude, longitude };
    } catch (err) {
      throw new Error(
        `Request gagal atau tidak dapat menemukan lokasi ERR: ${err}`
      );
    }
  }

  getYoutubeUrl(keyword) {
    return new Promise((resolve, reject) => {
      youtubeSearch(
        keyword,
        {
          maxResults: 5,
          order: "relevance",
          type: "video",
          safeSearch: "strict",
          key: constants.GOOGLECLOUDAPI_KEY
        },
        (err, result) => {
          if (
            err ||
            result == undefined ||
            result == [] ||
            result.length <= 0
          ) {
            reject("Video tidak ditemukan atau LIMIT");
          } else {
            let resultVideo = {
              link: result[0].link,
              title: result[0].title
            };

            resolve(resultVideo);
          }
        }
      );
    });
  }

  async getLoveMeter(keyword) {
    try {
      const couple = keyword.split(":");
      const person1 = couple[0];
      const person2 = couple[1];

      const response = await rp({
        uri: `${constants.MASHAPE_LOVEMETERURL}${person1}${
          constants.MASHAPE_LOVEMETERQUERY
        }${person2}`,
        json: true,
        headers: {
          "X-Mashape-Key": `${constants.MASHAPE_APPKEY}`,
          Accept: "application/json"
        }
      });

      if (!response) throw new Error("Error fetching: response");

      return response;
    } catch (err) {
      throw new Error(
        `Request gagal atau tidak dapat menghitung persentase pasangan ERR: ${err}`
      );
    }
  }

  getAnimeQuote() {
    return animequote();
  }

  getOsuProfile(keyword, mode) {
    return new Promise((resolve, reject) => {
      const osuApi = osu.api(constants.OSUAPI_KEY);

      let resultProfile;
      let resultBest;
      let deskripsi_profil;
      let deskripsi_best;

      osuApi
        .getUser({ u: keyword, m: mode })
        .then(resultProfiles => {
          resultProfile = resultProfiles;

          return osuApi.getUserBest({ u: keyword, m: mode, limit: 1 });
        })
        .then(resultBests => {
          resultBest = resultBests;

          deskripsi_profil =
            "Level : " +
            Math.floor(parseInt(resultProfile[0].level)) +
            "    Acc : " +
            Math.floor(parseInt(resultProfile[0].accuracy)) +
            "%\nRank : " +
            resultProfile[0].pp_rank +
            "\nPP :" +
            resultProfile[0].pp_raw;

          if (resultBest[0].length === 0) {
            resolve({
              withBeatmap: false,
              userId: resultProfile[0].user_id,
              username: resultProfile[0].username,
              deskripsi_profil
            });
          }

          return osuApi.getBeatmaps({ b: resultBest[0].beatmap_id, limit: 1 });
        })
        .then(resultBeatmap => {
          const beatmapTitle = resultBeatmap[0].title;

          if (beatmapTitle.length > 26) {
            beatmapTitle = beatmapTitle.substr(0, 26) + "...";
          }

          deskripsi_best =
            beatmapTitle +
            "\nScore : " +
            resultBest[0].score +
            "\nPP : " +
            Math.floor(parseInt(resultBest[0].pp));
          resolve({
            withBeatmap: true,
            user_id: resultProfile[0].user_id,
            username: resultProfile[0].username,
            deskripsi_profil,
            beatmapset_id: resultBeatmap[0].beatmapset_id,
            deskripsi_best
          });
        })
        .catch(err => {
          reject("Request gagal atau tidak dapat menemukan user osu!");
        });
    });
  }
}
// for development
// const botApi = new BotApi();
// console.time("time to response");
// console.log(botApi.getAnimeQuote())
// botApi
//   .getOsuProfile("rehre", 2)
//   .then(result => {
//     console.log(result);
//     console.timeEnd("time to response");
//   })
//   .catch(error => {
//     console.log(error);
//     console.timeEnd("time to response");
//   });
