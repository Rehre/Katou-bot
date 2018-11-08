import rp from "request-promise";
import gis from "g-i-s";

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

      if (!response) throw new Error("Error fetching");
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
        `Request gagal atau halaman wikipedia tidak ditemukan ERR:${err}`
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

      if (!response) throw new Error("Error fetching");

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

  async getVideo(keyword) {}
}

const botApi = new BotApi();
console.time("time to response");
botApi
  .getImageUrl("bekasi")
  .then(result => {
    console.log(result);
    console.timeEnd("time to response");
  })
  .catch(error => {
    console.log(error);
    console.timeEnd();
  });
