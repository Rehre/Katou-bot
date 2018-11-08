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

      if (msgText.includes("katou") == false) return Promise.resolve(null);

      if (msgText === "katou") {
        return client
          .getProfile(reqProfile.userId)
          .then(profile =>
            client.replyMessage(
              replyToken,
              Wrapper.replyText(botApi.sendReply(profile.displayName))
            )
          )
          .catch(err =>
            client.replyMessage(
              replyToken,
              Wrapper.replyText(botApi.sendReply("Tanpa Nama"))
            )
          );
      }
    }
  }
}
