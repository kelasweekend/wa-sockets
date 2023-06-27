![Banner](https://raw.githubusercontent.com/kelasweekend/nodejs-Api-Whatsapp/main/20230627_232616_0000.png)

## Whatsapp Sockets - Connecting Whatsapp

Connecting Your app with Whatsapp Messaging this Unofficial Repositories

Lightweight library for whatsapp. Not require Selenium or any other browser.

## For Informations

that we no longer provide sending type button and list messages because they are no longer available,

please if you want to use these type messages use the Whatsapp Meta API on the business meta page.

## Installation

Install package using npm

```
npm install wa-sockets
```

Then import your code

Using JS Module

```ts
import * as whatsapp from "wa-sockets";
```

or using CommonJS

```ts
const whatsapp = require("wa-sockets");
```

## Session Usage/Examples

Start New Session

```ts
// create session with ID : wa-sessions

const session = await whatsapp.startSession("wa-sessions");
// Then, scan QR on terminal
```

Get All Session ID

```ts
const sessions = whatsapp.getAllSession();
// returning all session ID that has been created
```

Get Session Data By ID

```ts
const session = whatsapp.getSession("wa-sessions");
// returning session data
```

Load Session From Storage / Load Saved Session

```ts
whatsapp.loadSessionsFromStorage();
// Start saved session without scan again
```

## Messaging Usage/Examples

Send Text Message

```ts
await whatsapp.sendTextMessage({
  sessionId: "mysessionid", // session ID
  to: "62813xxx", // always add country code (ex: 62)
  text: "Hi There, This is Message from Server!", // message you want to send
});
```

Send Image

```ts
const image = fs.readFileSync("./myimage.png");
const send = await whatsapp.sendImage({
  sessionId: "session1",
  to: "62813xxx",
  text: "My Image Caption",
  media: image, // can from URL too
});
```

Send Video

```ts
const video = fs.readFileSync("./myvideo.mp4");
const send = await whatsapp.sendImage({
  sessionId: "session1",
  to: "62813xxx",
  text: "My Video Caption",
  media: video, // can from URL too
});
```

Send Location

```ts
const video = fs.readFileSync("./myvideo.mp4");
const send = await whatsapp.sendImage({
  sessionId: "session1",
  to: "62813xxx",
  longitude: 51.223121,
  latitude: 13.131412,
});
```

Read a Message

```ts
await whatsapp.readMessage({
  sessionId: "session1",
  key: msg.key,
});
```

Send Typing Effect

```ts
await whatsapp.sendTyping({
  sessionId: "session1",
  to: "62813xxx",
  duration: 3000,
});
```

## Listener Usage/Examples

Add Listener/Callback When Receive a Message

```ts
whatsapp.onMessageReceived((msg) => {
  console.log(`New Message Received On Session: ${msg.sessionId} >>>`, msg);
});
```

Add Listener/Callback When QR Printed

```ts
whatsapp.onQRUpdated(({ sessionId, qr }) => {
  console.log(qr);
});
```

Add Listener/Callback When Session Connected

```ts
whatsapp.onConnected((sessionId) => {
  console.log("session connected :" + sessionId);
});
```

## Handling Incoming Message Examples

```ts
whatsapp.onMessageReceived(async (msg) => {
  if (msg.key.fromMe || msg.key.remoteJid.includes("status")) return;
  await whatsapp.readMessage({
    sessionId: msg.sessionId,
    key: msg.key,
  });
  await whatsapp.sendTyping({
    sessionId: msg.sessionId,
    to: msg.key.remoteJid,
    duration: 3000,
  });
  await whatsapp.sendTextMessage({
    sessionId: msg.sessionId,
    to: msg.key.remoteJid,
    text: "Hello!",
    answering: msg, // for quoting message
  });
});
```

## Save Media Message (Image, Video, Document)

```ts
wa.onMessageReceived(async (msg) => {
  if (msg.message?.imageMessage) {
    // save image
    msg.saveImage("./myimage.jpg");
  }

  if (msg.message?.videoMessage) {
    // save video
    msg.saveVideo("./myvideo.mp4");
  }

  if (msg.message?.documentMessage) {
    // save document
    msg.saveDocument("./mydocument"); // without extension
  }
});
```

## Optional Configuration Usage/Examples

Set custom credentials directory

```ts
// default dir is "wa_sessions"
whatsapp.setCredentialsDir("my_custom_dir");
// or : credentials/mycreds
```

## Authors

- [@kelasweekend](https://www.github.com/kelasweekend)

## Feedback or Support

If you have any feedback or support, please contact me at kelasweekend.id@gmail.com
If there is a code problem please do open issue page of my repository, I will immediately make repairs as soon as possible

copyright 2023
