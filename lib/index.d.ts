/// <reference types="node" />
import EventEmitter from "events";
export type RequestMadeInfoParams = {
    /**
     * The id of the user that made the request.
     */
    user_id: string | undefined;
    /**
     * The messages that were sent to the model.
     */
    messages: Array<Messages> | undefined;
};
/**
 * Represents events that can be emitted by the `Client` class.
 * - `error`: Emitted when an error occurs.
 * - `requestMade`: Emitted when a request is made to a model.
 */
export type ClientEvents = {
    /**
     * Emitted when an error occurs.
     * @param {Error} error - The error that occurred.
     * @returns {void | Promise<void>}
     */
    error: (error: Error) => void | Promise<void>;
    /**
     * Emitted when a request is made to a model.
     * @param {RequestMadeInfoParams} infos - The information about the request made.
     * @returns {void | Promise<void>}
     */
    requestMade: (infos: RequestMadeInfoParams) => void | Promise<void>;
};
/**
 * Defines the possible roles in a conversation.
 * - "user": The person interacting with the model.
 * - "system": The system or administrative messages.
 * - "assistant": The model's responses.
 */
export type Role = "user" | "system" | "assistant";
/**
 * Represents the structure of the messages in the conversation.
 * - `role`: The role of the message sender.
 * - `content`: The content of the message.
 */
export type Messages = {
    /**
     * The role of the message sender.
     * - "user": The person interacting with the model.
     * - "system": The system or administrative messages. (with this you can set the personality of the model)
     * - "assistant": The model itself.
     */
    role: Role;
    /**
     * The content of the message.
     */
    content: string;
};
/**
 * Represents the structure of the Response from a request to the `/chat/completions` endpoint.
 */
export type Response = {
    /** Unique identifier for the response. */
    id: string;
    /** The type of object returned, typically "chat.completion". */
    object: string;
    /** The timestamp when the response was created. */
    created: number;
    /** The model that generated the response. */
    model: string;
    /** An optional fingerprint for the system that generated the response. */
    system_fingerprint: string | null;
    /** An array of choice objects, each representing a possible completion. */
    choices: Array<{
        /** The index of this choice in the array. */
        index: number;
        /** The message object containing the completion content. */
        message: {
            /** The content of the completion message. */
            content: string;
        };
        /** Log probabilities associated with this choice, if applicable. */
        logprobs: string;
        /** The reason why the completion stopped, e.g., "length" or "stop". */
        finish_reason: string;
    }>;
    /** Usage statistics for the API call. */
    usage: {
        /** Number of tokens in the prompt. */
        prompt_tokens: number;
        /** Number of tokens in the completion. */
        completion_tokens: number;
        /** Total number of tokens used. */
        total_tokens: number;
    };
};
/**
 * Represents the structure of the StatsResultResponse from a request to the `/my_stats` endpoint.
 */
export type StatsResultResponse = {
    /**
     * The result of the request.
     */
    result: {
        /**
         * The status of the request.
         */
        message: string;
        /**
         * The ID of the user with this statistics.
         */
        user_id: string | number;
        /**
         * The number of requests made by the user.
         */
        requests_all_time: number;
        /**
         * The number of requests made by the user in the last minute.
        */
        requests_this_minute: number;
    };
};
/**
 * A list of supported models.
 * - "gpt-4o": The GPT-4 OpenAI model.
 * - "chatgpt-4o-latest": The latest version of the ChatGPT model.
 * - "gpt-4-turbo": The GPT-4 Turbo model.
 * - "gpt-4o-2024-08-06": The GPT-4 OpenAI model trained on data up to August 6, 2024.
 * - "gpt-4o-mini": The GPT-4 OpenAI model with fewer parameters.
 * - "gpt-4": The GPT-4 OpenAI model.
 * - "hermes-3-llama-3.1-405b": The Hermes-3 Llama-3.1 model with 405 billion parameters.
 * - "gpt-4o-2024-05-13": The GPT-4 OpenAI model trained on data up to May 13, 2024.
 * - "gpt-4o-mini-2024-07-18": The GPT-4 OpenAI model with fewer parameters trained on data up to July 18, 2024.
 * - "llama-3.1-405b-instruct": The Llama-3.1 model with 405 billion parameters and instruction-based training.
 * - "qwen-2-7b-instruct": The Qwen-2 model with 7 billion parameters and instruction-based training.
 * - "nous-capybara-7b": The Nous Capybara model with 7 billion parameters.
 * - "phi-3-medium-128k-instruct": The Phi-3 model with medium size and instruction-based training.
 * - "openchat-7b": The OpenChat model with 7 billion parameters.
 * - "llama-3.1-70b-instruct": The Llama-3.1 model with 70 billion parameters and instruction-based training.
 * - "toppy-m-7b": The Toppy-M model with 7 billion parameters.
 * - "gemma-7b-it": The Gemma model with 7 billion parameters and instruction-based training.
 * - "mythomist-7b": The Mythomist model with 7 billion parameters.
 * - "phi-3-mini-128k-instruct": The Phi-3 model with mini size and instruction-based training.
 * - "gemma-2-9b-it": The Gemma-2 model with 9 billion parameters and instruction-based training.
 * - "llama-3-8b-instruct": The Llama-3 model with 8 billion parameters and instruction-based training.
 * - "mixtral-8x22b-v0.1": The Mixtral model with 8x22 billion parameters and version 0.1.
 * - "mixtral-8x22b-instruct-v0.1": The Mixtral model with 8x22 billion parameters, instruction-based training, and version 0.1.
 * - "llama-3-70b-instruct": The Llama-3 model with 70 billion parameters and instruction-based training.
 * - "llama-2-70b-chat-hf": The Llama-2 model with 70 billion parameters for chat and high-frequency prompts.
 * - "llama-2-13b-chat-hf": The Llama-2 model with 13 billion parameters for chat and high-frequency prompts.
 * - "llama-2-7b-chat-hf": The Llama-2 model with 7 billion parameters for chat and high-frequency prompts.
 * - "zephyr-7b-beta": The Zephyr model with 7 billion parameters in beta.
 * - "llama-3.1-8b-instruct": The Llama-3.1 model with 8 billion parameters and instruction-based training.
 * - "mixtral-8x7b-instruct-v0.1": The Mixtral model with 8x7 billion parameters, instruction-based training, and version 0.1.
 */
export type Models = "gpt-4o" | "chatgpt-4o-latest" | "gpt-4-turbo" | "gpt-4o-2024-08-06" | "gpt-4o-mini" | "gpt-4" | "hermes-3-llama-3.1-405b" | "gpt-4o-2024-05-13" | "gpt-4o-mini-2024-07-18" | "llama-3.1-405b-instruct" | "qwen-2-7b-instruct" | "nous-capybara-7b" | "phi-3-medium-128k-instruct" | "openchat-7b" | "llama-3.1-70b-instruct" | "toppy-m-7b" | "gemma-7b-it" | "mythomist-7b" | "phi-3-mini-128k-instruct" | "gemma-2-9b-it" | "llama-3-8b-instruct" | "mixtral-8x22b-v0.1" | "mixtral-8x22b-instruct-v0.1" | "llama-3-70b-instruct" | "llama-2-70b-chat-hf" | "llama-2-13b-chat-hf" | "llama-2-7b-chat-hf" | "zephyr-7b-beta" | "llama-3.1-8b-instruct" | "mixtral-8x7b-instruct-v0.1";
/**
 * A class for interacting with the ClashAI API.
 * @class
 * @example
 * const gpt = new Client("your clash ai api key", "chatgpt-4o-latest");
 */
export default class Client extends EventEmitter {
    #private;
    /**
     * Returns the user histories map.
     * @returns {Map<string, Array<Messages>>}
     */
    get user_histories(): Map<string, Array<Messages>>;
    /**
     * @param {K} event - The event to listen for.
     * @param {ClientEvents[K]} listener - The listener to call when the event is emitted.
     * @template K - The type of event to listen for.
     * @returns {this}
     */
    on<K extends keyof ClientEvents>(event: K, listener: ClientEvents[K]): this;
    /**
     * @param {K} event - The event to listen for.
     * @param {ClientEvents[K]} listener - The listener to call when the event is emitted.
     * @template K - The type of event to listen for.
     * @returns {this}
     */
    once<K extends keyof ClientEvents>(event: K, listener: ClientEvents[K]): this;
    /**
     * @param {K} event - The event to emit.
     * @param {Parameters<ClientEvents[K]>} args - The arguments to pass to the event listener.
     * @template K - The type of event to emit.
     * @returns {boolean}
     */
    emit<K extends keyof ClientEvents>(event: K, ...args: Parameters<ClientEvents[K]>): boolean;
    /**
     * @param {K} eventName - The event to listen for.
     * @param {ClientEvents[K]} listener - The callback function.
     * @template K - The type of event to listen for.
     * @returns
     */
    prependListener<K extends keyof ClientEvents>(eventName: K, listener: ClientEvents[K]): this;
    /**
     * @param {K} eventName - The event to listen for.
     * @param {ClientEvents[K]} listener - The callback function.
     * @template K - The type of event to listen for.
     * @returns
     */
    prependOnceListener<K extends keyof ClientEvents>(eventName: K, listener: ClientEvents[K]): this;
    /**
     * @param {K} event - The event to count the listeners for.
     * @template K - The type of the event
     * @returns {number} - The number of listeners for the event.
     */
    listenerCount<K extends keyof ClientEvents>(event: K): number;
    /**
     * @param {K} event - The event to copy the listeners from.
     * @template K - The type of the event
     * @returns {Function[]} - The listeners for the event.
     */
    listeners<K extends keyof ClientEvents>(eventName: K): Function[];
    /**
     * Creates a new `Client`.
     * @param {string} api_key - Your {@link https://discord.gg/t72xtYb6aT ClashAI} API key
     * @param {Models} model - The model to use for generating completions.
     * @constructor
     * @example
     * const gpt = new Client("your clash ai api key", "chatgpt-4o-latest");
     * (async () => {
     *    const response = await gpt.makeRequest("Hello, how are you?", [{ role: "system", content: "You are a friendly chatbot." }]);
     *    console.log(response.choices[0].message.content);
     * })();
     */
    constructor(api_key: string, model: Models);
    /**
     * Asks the model a question and returns the response.
     * @param {Array<Messages>} messages - Format to modify the personality of the model, the question and other things.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<Response> | null} - The response from the model. `Null` if an error occurs.
     * @example
     * const client = new Client("your clash ai api key", "gpt-4o");
     * const response = await client.makeRequest([{ role: "system", content: "You are a friendly chatbot." }, { role: "user", content: "Hello, how are you?" }]);
     */
    makeRequest(messages?: Array<Messages>, user_id?: string): Promise<Response | null>;
    /**
     * Returns the statistics of a specific user.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<StatsResultResponse> | null} - The statistics of the user. `Null` if an error occurs.
     * @example
     * const client = new Client("your clash ai api key", "chatgpt-4o-latest");
     * const stats = await client.getUsage("your user id");
     */
    getUsage(user_id: string): Promise<StatsResultResponse | null>;
}
