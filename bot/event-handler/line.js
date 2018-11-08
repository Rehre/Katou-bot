import Wrapper from "../reply-wrapper/line";
import BotApi from "../bot-api";
import constants from "../constants";

export default class LineEventHandler {
  constructor(client) {
    this.client = client;
    this.botApi = new BotApi();

    this.handle = this.handle.bind(this);
  }

  handle(event) {
    const client = this.client;
    const botApi = this.botApi;

    const replyToken = event.replyToken;
    const source = event.source.type;
    const reqProfile = {
      userId: event.source.userId,
      groupId: event.source.groupId || null,
      roomId: event.source.roomId || null
    };

    if (event.type === "join") {
      return client.replyMessage(
        replyToken,
        Wrapper.replyText(
          'Terima kasih telah mengundang bot ini.\n\nSilahkan ketik "Katou keyword" untuk melihat keyword.'
        )
      );
    }

    if (event.type === "message") {
      if (event.message.type !== "text") return Promise.resolve(null);

      const msgText = event.message.text.toLowerCase();

      if (!msgText.includes("katou")) return Promise.resolve(null);

      if (msgText === "katou") {
        return client
          .getProfile(reqProfile.userId)
          .then(profile =>
            client.replyMessage(
              replyToken,
              Wrapper.replyText(botApi.sendReply(profile.displayName))
            )
          )
          .catch(() =>
            client.replyMessage(
              replyToken,
              Wrapper.replyText(botApi.sendReply("Tanpa Nama"))
            )
          );
      }

      if (msgText === "katou keyword") {
        return client.replyMessage(replyToken, Wrapper.replyKeyword());
      }

      if (msgText === "katou ramal") {
        return client.replyMessage(
          replyToken,
          Wrapper.replyText(botApi.getRamal())
        );
      }

      if (msgText.includes("katou berapa")) {
        const calcText = msgText.substr(13);

        if (calcText.length === 0) {
          return client.replyMessage(
            replyToken,
            Wrapper.replyText(`Tolong masukan angka yang ingin dihitung`)
          );
        }

        return client.replyMessage(
          replyToken,
          Wrapper.replyText(`Hasil dari ${calcText} : ${eval(calcText)}`)
        );
      }

      if (msgText.includes("katou apa itu")) {
        const keyword = msgText.substr(13);

        botApi
          .getWiki(keyword)
          .then(result => {
            return client.replyMessage(replyToken, Wrapper.replyText(result));
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou cari gambar")) {
        const keyword = encodeURI(msgText.substr(18));
        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan nama gambar yang ingin dicari")
          );

        botApi
          .getImageUrl(keyword)
          .then(result => {
            return client
              .replyMessage(replyToken, Wrapper.replyImg(result, result))
              .catch(err => {
                return client.replyMessage(
                  replyToken,
                  Wrapper.replyText(
                    "Gambar yang ditemukan terlalu besar untuk dimuat silahkan coba lagi."
                  )
                );
              });
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou ucapkan selamat ulang tahun ke")) {
        const keyword = msgText.substr(37);

        return client.replyMessage(
          replyToken,
          Wrapper.replyText(`Selamat ulang tahun ${keyword} :D`)
        );
      }

      if (msgText.includes("katou cuaca")) {
        let keyword = msgText.substr(12);

        botApi
          .getWeather(keyword)
          .then(result => {
            return client.replyMessage(replyToken, Wrapper.replyText(result));
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou cari video")) {
        const keyword = msgText.substr(17);
        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan nama video yang ingin dicari")
          );

        botApi
          .getVideo(keyword)
          .then(result => {
            if (source !== "room" && source !== "group")
              return client
                .replyMessage(
                  replyToken,
                  Wrapper.replyText(`${result.title} \n ${result.link}`)
                )
                .catch(console.log("Error"));

            return client
              .replyMessage(
                replyToken,
                Wrapper.replyText(`${result.title} \n ${result.link}`)
              )
              .catch(console.log("Error"));
          })
          .catch(err => {
            return client
              .replyMessage(replyToken, Wrapper.replyText(err))
              .catch(console.log("Error"));
          });
      }

      if (msgText.includes("katou terjemahkan")) {
        const text = msgText.substr(24).trim();
        const lang = msgText.slice(18, 24).trim();

        if (lang.length <= 0 || text.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText(
              "Silahkan masukan kode bahasa dan teks yang ingin diterjemahkan"
            )
          );

        botApi
          .translateText(text, lang)
          .then(result => {
            return client.replyMessage(replyToken, Wrapper.replyText(result));
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou cari lokasi")) {
        const keyword = msgText.substr(17).trim();

        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan lokasi yang ingin dicari")
          );

        botApi
          .getLocation(keyword)
          .then(result => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyLocation(keyword, result)
            );
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou tulis")) {
        let keyword = msgText.substr(12);

        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan teks yang ingin diubah")
          );

        keyword = encodeURI(keyword);
        const imgUrl = `${constants.CHARTAPI_URL}${keyword}${
          constants.CHARTAPI_QUERY
        }`;

        return client
          .replyMessage(replyToken, Wrapper.replyImg(imgUrl, imgUrl))
          .catch(err => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyText("Silahkan masukan teks yang ingin diubah")
            );
          });
      }

      if (msgText.includes("katou download musik")) {
        const keyword = msgText.substr(21).trim();

        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan nama musiknya")
          );

        botApi
          .getUrlYoutube(keyword)
          .then(result => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyText(
                `${result.title}\n\n Link download : ${
                  constants.MP3YOUTUBE_URL
                }${result.link}`
              )
            );
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText.includes("katou lovemeter")) {
        const keyword = msgText.substr(16).trim();

        if (keyword.length <= 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan nama pasangannya")
          );

        botApi
          .getLoveMeter(msgText)
          .then(result => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyText(
                `Persentase pasangan ${result.fname} dan ${result.sname} :\n\n${
                  result.percentage
                }%\n\nSaran: ${result.result}`
              )
            );
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText === "katou anime quotes") {
        const quotesItem = botApi.getAnimeQuote();
        return client.replyMessage(
          replyToken,
          Wrapper.replyText(
            `\"${quotesItem.quotesentence}\"\nBy : ${
              quotesItem.quotecharacter
            }\nFrom :  ${quotesItem.quoteanime}`
          )
        );
      }

      if (msgText.includes("katou osu")) {
        if (msgText.substr(10).trim().length === 0)
          return client.replyMessage(
            replyToken,
            Wrapper.replyText("Silahkan masukan modenya")
          );
        let keyword;
        let mode;

        if (msgText.includes("osustd")) {
          keyword = msgText.substr(13).trim();

          if (keyword.length === 0)
            return client.replyMessage(
              replyToken,
              Wrapper.replyText("Silahkan masukan nickname usernya")
            );
          mode = 0;
        }

        if (msgText.includes("osumania")) {
          keyword = msgText.substr(15).trim();

          if (keyword.length === 0)
            return client.replyMessage(
              replyToken,
              Wrapper.replyText("Silahkan masukan nickname usernya")
            );
          mode = 3;
        }

        if (msgText.includes("osutaiko")) {
          keyword = msgText.substr(15).trim();

          if (keyword.length === 0)
            return client.replyMessage(
              replyToken,
              Wrapper.replyText("Silahkan masukan nickname usernya")
            );
          mode = 1;
        }

        if (msgText.includes("osuctb")) {
          keyword = msgText.substr(13).trim();

          if (keyword.length === 0)
            return client.replyMessage(
              replyToken,
              Wrapper.replyText("Silahkan masukan nickname usernya")
            );
          mode = 2;
        }

        botApi
          .getOsuProfile(keyword, mode)
          .then(result => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyOsuProfile(result)
            );
          })
          .catch(err => {
            return client.replyMessage(replyToken, Wrapper.replyText(err));
          });
      }

      if (msgText === "bye katou") {
        return client
          .replyMessage(replyToken, [
            Wrapper.replyText("Bye - Bye"),
            Wrapper.replyImg(
              constants.KATOULEAVEIMG_URL,
              constants.KATOULEAVEIMG_URL
            )
          ])
          .then(result => {
            if (source === "room") {
              client.leaveRoom(reqProfile.roomId);
            } else if (source === "group") {
              client.leaveGroup(reqProfile.groupId);
            }
          })
          .catch(err => {
            return client.replyMessage(
              replyToken,
              Wrapper.replyText(
                "ERROR tidak bisa keluar melalui keyword silahkan kick katou melalui setting group"
              )
            );
          });
      }
    }
  }
}
