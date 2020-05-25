"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  WIKIPEDIA_URL: "https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
  OPENWEATHERMAP_URL: "http://api.openweathermap.org/data/2.5/weather?q=",
  OPENWEATHERMAP_QUERY: "&units=metric&APPID=",
  OPENWEATHERMAP_APPID: process.env.OPENWEATHERMAP_APPID,
  GOOGLECLOUDAPI_KEY: process.env.GOOGLECLOUDAPI_KEY,
  INSTAGRAM_URL: "https://www.instagram.com/",
  YANDEXTRANSLATE_URL: "https://translate.yandex.net/api/v1.5/tr.json/translate?key=",
  YANDEXTRANSLATE_KEY: process.env.YANDEXTRANSLATE_KEY,
  YANDEXTEXT_QUERY: "&text=",
  YANDEXLANG_QUERY: "&lang=",
  YANDEX_OTHERQUERY: "&format=plain&option=",
  GMAPSJS_URL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
  GMAPSJS_QUERY: "&key=",
  GMAPSJS_KEY: process.env.GMAPSJS_KEY,
  CHARTAPI_URL: "https://chart.apis.google.com/chart?chs=300x50&cht=p3&chtt=",
  CHARTAPI_QUERY: "&chts=FFFFFF,24&chf=bg,s,000000",
  $9GAG_URL: "https://9gag.com/",
  MP3YOUTUBE_URL: "http://mp3you.tube/get/?direct=",
  RAPID_API_LOVEMETER_HOST: "love-calculator.p.rapidapi.com",
  RAPID_API_LOVEMETERURL: "https://love-calculator.p.rapidapi.com/getPercentage?fname=",
  RAPID_API_LOVEMETERQUERY: "&sname=",
  RAPID_API_KEY: process.env.RAPID_API_KEY,
  OSUAPI_KEY: process.env.OSUAPI_KEY,
  KATOULEAVEIMG_URL: "https://image.ibb.co/kYhBYa/1d1827a76c94bfacc205047717824948279041b1_hq.jpg",
  TELEGRAM_HELP: "List keywords:\n/katou - panggil katou\n/ramal - ramal dirimu\n/say - buat katou bicara\n/wiki - tanya katou apa saja\n/hbd - ucapkan selamat ulang tahun\n/weather - dapatkan cuaca\n/calc - suruh katou untuk menghitung\n/pic - cari gambar\n/video - cari video\n/location - cari lokasi\n/write - suruh katou menulis\n/music - suruh katou mencari musik\n/animequote - dapatkan quote dari anime\n/lovemeter - dapatkan persentase cinta pasangan\n/translate - katou akan menerjemahkan teks\n/osu - dapatkan profile osu kamu\n"
};
exports.default = _default;