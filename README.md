# ClashAI API Wrapper
> An easy-to-use Api Wrapper for the [ClashAI](https://discord.gg/t72xtYb6aT) API.

## Installation
```bash
npm install clashai
```

## Usage
### TypeScript
```ts
import Wrapper from 'clashai';
const client = new Wrapper('your-api-key', 'gpt-4o');
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
const Wrapper = require('clashai');
const client = new Wrapper('your-api-key', 'gpt-4o');
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