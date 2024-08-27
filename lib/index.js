"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Client_instances, _Client_api_key, _Client_model, _Client_base_url, _Client_user_histories, _Client_get_user_history;
Object.defineProperty(exports, "__esModule", { value: true });
const axios = __importStar(require("axios"));
const crypto = __importStar(require("crypto"));
const events_1 = __importDefault(require("events"));
/**
 * A class for interacting with the ClashAI API.
 * @class
 * @example
 * const gpt = new Client("your clash ai api key", "chatgpt-4o-latest");
 */
class Client extends events_1.default {
    /**
     * Returns the user histories map.
     * @returns {Map<string, Array<Messages>>}
     */
    get user_histories() {
        return __classPrivateFieldGet(this, _Client_user_histories, "f");
    }
    /**
     * @param {K} event - The event to listen for.
     * @param {ClientEvents[K]} listener - The listener to call when the event is emitted.
     * @template K - The type of event to listen for.
     * @returns {this}
     */
    on(event, listener) {
        return super.on(event, listener);
    }
    /**
     * @param {K} event - The event to listen for.
     * @param {ClientEvents[K]} listener - The listener to call when the event is emitted.
     * @template K - The type of event to listen for.
     * @returns {this}
     */
    once(event, listener) {
        return super.once(event, listener);
    }
    /**
     * @param {K} event - The event to emit.
     * @param {Parameters<ClientEvents[K]>} args - The arguments to pass to the event listener.
     * @template K - The type of event to emit.
     * @returns {boolean}
     */
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
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
    constructor(api_key, model) {
        super();
        _Client_instances.add(this);
        /**
         * The API key used to authenticate with the ClashAI API.
         * @private
         * @type {string}
         */
        _Client_api_key.set(this, void 0);
        /**
         * The model used for generating completions.
         * @private
         * @type {Models}
         */
        _Client_model.set(this, void 0);
        /**
         * The base URL for the ClashAI API.
         * @private
         * @type {string}
         * @default "http://clashai.3utilities.com:25621"
         */
        _Client_base_url.set(this, 'http://clashai.3utilities.com:25621');
        /**
         * A map of user IDs to their conversation history.
         * @private
         * @type {Map<string, Array<Messages>>}
         */
        _Client_user_histories.set(this, new Map());
        if (!api_key) {
            throw new Error("API key is required.");
        }
        else if (!model) {
            throw new Error("Model is required.");
        }
        __classPrivateFieldSet(this, _Client_api_key, api_key, "f");
        __classPrivateFieldSet(this, _Client_model, model, "f");
    }
    /**
     * Asks the model a question and returns the response.
     * @param {Array<Messages>} messages - Format to modify the personality of the model, the question and other things.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<Response> | null} - The response from the model. `Null` if an error occurs.
     * @example
     * const client = new Client("your clash ai api key", "gpt-4o");
     * const response = await client.makeRequest([{ role: "system", content: "You are a friendly chatbot." }, { role: "user", content: "Hello, how are you?" }]);
     */
    async makeRequest(messages = [], user_id) {
        if (!user_id) {
            user_id = crypto.randomUUID();
        }
        const user_history = __classPrivateFieldGet(this, _Client_instances, "m", _Client_get_user_history).call(this, user_id);
        user_history?.push(...messages);
        try {
            const response = await axios.post(`${__classPrivateFieldGet(this, _Client_base_url, "f")}/v1/chat/completions`, {
                model: __classPrivateFieldGet(this, _Client_model, "f"),
                messages: user_history,
            }, {
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _Client_api_key, "f")}`,
                    "Content-Type": "application/json",
                }
            });
            const assistant_message = response.data.choices[0].message.content;
            user_history?.push({ role: "assistant", content: assistant_message }); // Chat history (Adds the assistant message to the chat/user history)
            this.emit("requestMade", { user_id: user_id, messages: user_history });
            return response.data;
        }
        catch (error) {
            this.emit("error", error);
            return null;
        }
    }
    /**
     * Returns the statistics of a specific user.
     * @param {string} user_id - The unique identifier for the user.
     * @returns {Promise<StatsResultResponse> | null} - The statistics of the user. `Null` if an error occurs.
     * @example
     * const client = new Client("your clash ai api key", "chatgpt-4o-latest");
     * const stats = await client.getUsage("your user id");
     */
    async getUsage(user_id) {
        const url = `http://clashai.3utilities.com:25621/my_stats/${user_id}`;
        try {
            const response = await axios.get(url);
            if (typeof response.data.result === "string") {
                response.data = JSON.parse(response.data.result);
            }
            return response.data;
        }
        catch (error) {
            this.emit("error", error);
            return null;
        }
    }
}
_Client_api_key = new WeakMap(), _Client_model = new WeakMap(), _Client_base_url = new WeakMap(), _Client_user_histories = new WeakMap(), _Client_instances = new WeakSet(), _Client_get_user_history = function _Client_get_user_history(user_id) {
    if (!__classPrivateFieldGet(this, _Client_user_histories, "f").has(user_id)) {
        __classPrivateFieldGet(this, _Client_user_histories, "f").set(user_id, []);
    }
    return __classPrivateFieldGet(this, _Client_user_histories, "f").get(user_id);
};
exports.default = Client;
