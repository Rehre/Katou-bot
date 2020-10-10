export default {
  WIKIPEDIA_URL:
    'https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=',
  OPENWEATHERMAP_URL: 'http://api.openweathermap.org/data/2.5/weather?q=',
  OPENWEATHERMAP_QUERY: '&units=metric&APPID=',
  OPENWEATHERMAP_APPID: process.env.OPENWEATHERMAP_APPID,
  YANDEXTRANSLATE_URL:
    'https://translate.yandex.net/api/v1.5/tr.json/translate?key=',
  YANDEXTRANSLATE_KEY: process.env.YANDEXTRANSLATE_KEY,
  YANDEXTEXT_QUERY: '&text=',
  YANDEXLANG_QUERY: '&lang=',
  YANDEX_OTHERQUERY: '&format=plain&option=',
  CHARTAPI_URL: 'https://chart.apis.google.com/chart?chs=300x50&cht=p3&chtt=',
  CHARTAPI_QUERY: '&chts=FFFFFF,24&chf=bg,s,000000',
  RAPID_API_LOVEMETER_HOST: 'love-calculator.p.rapidapi.com',
  RAPID_API_LOVEMETERURL:
    'https://love-calculator.p.rapidapi.com/getPercentage?fname=',
  RAPID_API_LOVEMETERQUERY: '&sname=',
  RAPID_API_KEY: process.env.RAPID_API_KEY,
  OSUAPI_KEY: process.env.OSUAPI_KEY,
  KATOULEAVEIMG_URL:
    'https://image.ibb.co/kYhBYa/1d1827a76c94bfacc205047717824948279041b1_hq.jpg',
  TELEGRAM_HELP: `List keywords:
/katou - panggil katou
/help - list keyword
/ramal - ramal dirimu
/say - buat katou bicara
/wiki - tanya katou apa saja
/hbd - ucapkan selamat ulang tahun
/weather - dapatkan cuaca
/write - suruh katou menulis
/animequote - dapatkan quote dari anime
/lovemeter - dapatkan persentase cinta pasangan
/translate - katou akan menerjemahkan teks
/osu - dapatkan profile osu kamu
`,
};
