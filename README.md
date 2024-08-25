# ClashAI API Wrapper
> An easy-to-use Api Wrapper for the [ClashAI](https://discord.gg/t72xtYb6aT) API.

### **❗ Currently only supports Chat GPT Models**

## Installation
```bash
npm install clashai
```

## Usage
### TypeScript
```ts
import { GPT } from 'clashai';
const client = new GPT('your-api-key', 'gpt-4o');
(async () => {
    const response = await client.ask([{ role: "system", content: "You are a friendly chatbot developed in typescript. You use emojis in your answers." }, { role: "user", content: "How are you?" }]);
    console.log(response.choices[0].message.content);
})();
```
### JavaScript
```js
const { GPT } = require('clashai');
const client = new GPT('your-api-key', 'gpt-4o');
(async () => {
    const response = await client.ask("Hello how are you?", [{ role: "system", content: "You are a friendly chatbot developed in javascript. You use emojis in your answers." }, { role: "user", content: "How are you?" }]);
    console.log(response.choices[0].message.content);
})();
```