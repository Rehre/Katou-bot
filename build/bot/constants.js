"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  WIKIPEDIA_URL: 'https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
  OPENWEATHERMAP_URL: 'http://api.openweathermap.org/data/2.5/weather?q=',
  OPENWEATHERMAP_QUERY: '&units=metric&APPID=',
  OPENWEATHERMAP_APPID: process.env.OPENWEATHERMAP_APPID,
  CHARTAPI_URL: 'https://chart.apis.google.com/chart?chs=300x50&cht=p3&chtt=',
  CHARTAPI_QUERY: '&chts=FFFFFF,24&chf=bg,s,000000',
  OSUAPI_KEY: process.env.OSUAPI_KEY,
  KATOULEAVEIMG_URL: 'https://image.ibb.co/kYhBYa/1d1827a76c94bfacc205047717824948279041b1_hq.jpg',
  TELEGRAM_HELP: "List keywords:\n/katou - panggil katou\n/help - list keyword\n/ramal - ramal dirimu\n/say - buat katou bicara\n/wiki - tanya katou apa saja\n/hbd - ucapkan selamat ulang tahun\n/weather - dapatkan cuaca\n/write - suruh katou menulis\n/animequote - dapatkan quote dari anime\n/osu - dapatkan profile osu kamu\n"
};
exports["default"] = _default;