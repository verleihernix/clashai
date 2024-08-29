/// <reference types="node" />
import EventEmitter from "events";
/**
 * Utility functions for working with arrays, objects, and other data structures.
 */
export declare namespace Utils {
    /**
 * Returns an iterator that yields pairs of indices and values from an unsorted array.
 * @param {T[]} arr - The array to iterate over.
 * @template T - The type of the array elements.
 * @returns {IterableIterator<[number, T]>} An iterator that yields pairs of indices and values.
 * @example
 * const arr = ['a', 'b', 'c'];
 * for (const [i, val] of pairs(arr)) {
 *    console.log(i, val); // i = index, val = value (val is from type string)
 * }
 */
    function pairs<T>(arr: T[]): IterableIterator<[number, T]>;
    /**
     * Returns an iterator that yields pairs of indices and values from a sorted array.
     * @param {T[]} arr - The array to iterate over.
     * @template T - The type of the array elements.
     * @returns {IterableIterator<[number, T]>} An iterator that yields pairs of indices and values.
     * @example
     * const unsortedArr = ['c', 'a', 'b'];
     * for (const [i, val] of ipairs(unsortedArr)) {
     *   console.log(i, val); // [0, 'a'], [1, 'b'], [2, 'c']
     * }
     */
    function ipairs<T>(arr: T[]): IterableIterator<[number, T]>;
    /**
     * Splits an array into chunks of a specified size.
     * @param {T[]} arr - The array to split.
     * @param {number} size - The size of each chunk.
     * @template T - The type of the array elements.
     * @returns {T[][]} An array of chunks.
     * @example
     * const arr = [1, 2, 3, 4, 5];
     * const chunks = chunk(arr, 2);
     * console.log(chunks); // [[1, 2], [3, 4], [5]]
     */
    function chunk<T>(arr: T[], size: number): T[][];
    /**
     * Flattens a nested array by one level.
     * @param {T[][]} arr - The array to flatten.
     * @template T - The type of the array elements.
     * @returns {T[]} A flattened array.
     * @example
     * const arr = [[1, 2], [3, 4], [5]];
     * const flattened = flatten(arr);
     * console.log(flattened); // [1, 2, 3, 4, 5]
     */
    function flatten<T>(arr: T[][]): T[];
    /**
     * Returns a new array with only unique values from the original array.
     * @param {T[]} arr - The array to filter.
     * @template T - The type of the array elements.
     * @returns {T[]} An array with only unique values.
     * @example
     * const arr = [1, 2, 2, 3, 4, 4, 5];
     * const uniqueArr = unique(arr);
     * console.log(uniqueArr); // [1, 2, 3, 4, 5]
     */
    function unique<T>(arr: T[]): T[];
    /**
     * Groups the elements of an array based on a givem creiteria function.
     * @param {T[]} arr - The array to group.
     * @param {(item: T) => K} keyFn - The function that returns the key to group by.
     * @template T - The type of the array elements.
     * @template K - The type of the key.
     * @returns {Record<K, T[]>} An object with keys as the result of the key function and values as the grouped elements.
     * @example
     * const grouped = groupBy(['one', 'two', 'three'], str => str.length); // group by the length of the strings
     * // {3: ['one', 'two'], 5: ['three']} (one and two have 3 characters, three has 5 characters)
     */
    function groupBy<T, K extends keyof any>(arr: T[], keyFn: (item: T) => K): Record<K, T[]>;
    /**
     * Debounces a function, delaying its execution until after a specified delay has passed since it was last invoked.
     * @param {Function} func - The function to debounce.
     * @param {number} delay - The delay in milliseconds.
     * @returns {Function} - A debounced version of the oiiginal function.
     * @example
     * const debounced = debounce(() => console.log('Hello'), 5000);
     * debounced(); // Hello is logged after 5 seconds
     */
    function debounce(func: Function, delay: number): (...args: any[]) => void;
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * @param {number} min The minimum value.
     * @param {number} max The maximum value.
     * @returns {number} A random integer within the specified range.
     * @example
     * const rand = randomInt(1, 10); // Random integer between 1 and 10
     */
    function randomInt(min: number, max: number): number;
    /**
     * Ensures a function is only executed once.
     * @param {Function} func The function to execute only once.
     * @returns {Function} A function that will only execute the original function once.
     * @example
     * const initialize = once(() => console.log('Initialized!'));
     * initialize(); // 'Initialized!'
     * initialize(); // (No output)
     */
    function once(func: Function): () => any;
    /**
     * Throttles a function so it can only be invoked once per specified time period.
     * @param {Function} func The function to throttle.
     * @param {number} limit The time period in milliseconds.
     * @returns {Function} A throttled version of the original function.
     * @example
     * const throttled = throttle(() => console.log('Throttled!'), 1000);
     * throttled(); // 'Throttled!' (invoked immediately)
     * throttled(); // (No output) (invoked after 1 second)
     */
    function throttle(func: Function, limit: number): (...args: any[]) => void;
}
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
export declare class Client extends EventEmitter {
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
