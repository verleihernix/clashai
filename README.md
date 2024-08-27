# ClashAI API Wrapper
> An easy-to-use Api Wrapper for the [ClashAI](https://discord.gg/t72xtYb6aT) API.

## Installation
```bash
npm install clashai.js
```

> You can access the documentation [**here**](https://clashai-js.gitbook.io/docs)

## Usage
### TypeScript
```ts
import Client from 'clashai.js';
const client = new Client('your-api-key', 'gpt-4o');
client.on("error", err => {
    console.log(err.message);
});
client.on("requestMade", info => {
    console.log(info);
});
(async () => {
    const response = await client.makeRequest([{ role: "system", content: "You are a friendly chatbot developed in typescript. You use emojis in your answers." }, { role: "user", content: "How are you?" }]);
    console.log(response.choices[0].message.content);
})();
```
### JavaScript
```js
const Client = require('clashai.js');
const client = new Client('your-api-key', 'gpt-4o');
client.on("error", err => {
    console.log(err.message);
});
client.on("requestMade", info => {
    console.log(info);
});
(async () => {
    const response = await client.makeRequest("Hello how are you?", [{ role: "system", content: "You are a friendly chatbot developed in javascript. You use emojis in your answers." }, { role: "user", content: "How are you?" }]);
    console.log(response.choices[0].message.content);
})();
```