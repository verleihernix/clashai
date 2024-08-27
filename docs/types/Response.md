## Response

Represents the structure of the Response from a request to the `/chat/completions` endpoint.

- Type: \{ choices: Array\<\{ finish_reason: string, index: number, logprobs: string, message: \{ content: string } }>, created: number, id: string, model: string, object: string, system_fingerprint: string \| null, usage: \{ completion_tokens: number, prompt_tokens: number, total_tokens: number } }

- [Source](https://github.com/verleihernix/clashai/blob/580221aa13f2b13b59c03a36a2ac2c0e7c4a03b8/src/index.ts#L67)