## ClientEvents

Represents events that can be emitted by the `Client` class.
- `error`: Emitted when an error occurs.
- `requestMade`: Emitted when a request is made to a model.

- Type: \{ error: (error: Error) => void \| Promise\<void>, requestMade: (infos: RequestMadeInfoParams) => void \| Promise\<void> }

- [Source](https://github.com/verleihernix/clashai/blob/580221aa13f2b13b59c03a36a2ac2c0e7c4a03b8/src/index.ts#L22)