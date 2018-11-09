import express from "express";
import {
  Client as LineClient,
  middleware as LineMiddleware
} from "@line/bot-sdk";

import botConfig from "./bot-config";
import LineEventHandler from "./event-handler/line";

// server setup
const app = express();
app.set("PORT", process.env.PORT || 3000);

// -- START LINE BOT SETUP --

// setup the event handler for LINE
const lineEventHandler = new LineEventHandler(new LineClient(botConfig.line));

// listen to the API post /webhook_line for getting the LINE response
app.post("/webhook_line", LineMiddleware(botConfig.line), (req, res) => {
  // wait for all the requested events to be finished then send the result;
  Promise.all(req.body.events.map(lineEventHandler.handle)).then(result =>
    res.json(result)
  );
});

// -- END LINE BOT SETUP --

// -- START TELEGRAM BOT SETUP --

app.post(botConfig.telegram.token, (req, res) => {
  res.header("Content-Type", "application/json");

  console.log(req.body);
});

// -- END TELEGRAM BOT SETUP --

// start the server
app.listen(app.get("PORT"), () =>
  console.log(`Katou is listening in PORT: ${app.get("PORT")}`)
);
