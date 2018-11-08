export default {
  WIKIPEDIA_URL:
    "https://id.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=",
  OPENWEATHERMAP_URL: "http://api.openweathermap.org/data/2.5/weather?q=",
  OPENWEATHERMAP_QUERY: "&units=metric&APPID=",
  OPENWEATHERMAP_APPID: JSON.stringify(process.env.OPENWEATHERMAP_APPID),
  GOOGLECLOUDAPI_KEY: JSON.stringify(process.env.GOOGLECLOUDAPI_KEY),
  INSTAGRAM_URL: "https://www.instagram.com/",
  YANDEXTRANSLATE_URL:
    "https://translate.yandex.net/api/v1.5/tr/translate?key=",
  YANDEXTRANSLATE_KEY: JSON.stringify(process.env.YANDEXTRANSLATE_KEY),
  YANDEXTEXT_QUERY: "&text=",
  YANDEXLANG_QUERY: "&lang=",
  YANDEX_OTHERQUERY: "&format=plain&option=",
  GMAPSJS_URL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
  GMAPSJS_QUERY: "&key=",
  GMAPSJS_KEY: JSON.stringify(process.env.GMAPSJS_KEY),
  CHARTAPI_URL: "https://chart.apis.google.com/chart?chs=300x50&cht=p3&chtt=",
  CHARTAPI_QUERY: "&chts=FFFFFF,24&chf=bg,s,000000",
  $9GAG_URL: "https://9gag.com/",
  MP3YOUTUBE_URL: "http://mp3you.tube/get/?direct=",
  MASHAPE_LOVEMETERURL:
    "https://love-calculator.p.mashape.com/getPercentage?fname=",
  MASHAPE_LOVEMETERQUERY: "&sname=",
  MASHAPE_APPKEY: JSON.stringify(process.env.MASHAPE_APPKEY),
  OSUAPI_KEY: process.env.OSUAPI_KEY,
  KATOULEAVEIMG_URL:
    "https://image.ibb.co/kYhBYa/1d1827a76c94bfacc205047717824948279041b1_hq.jpg"
};
